import { Breadcrumb } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { BoxRow } from './BoxRow';
import {
  ClientTypeEnum,
  Questionnaire,
  QuestionnaireStateEnum,
} from '../../views/loggedin/TaxDeclaration/types/Questionnaire/Questionnaire';
import { SnapshotQuestionnaire } from '../../client/firebaseClient';
import { AppContext, AppContextType } from '../../context/AppContext';
import { EmptyQuestionnaire } from '../../views/loggedin/TaxDeclaration/emptyQuestionnaire';
import { CivilStatus } from '../../views/loggedin/TaxDeclaration/types/Questionnaire/CivilStatus';
import { ContactDetails } from '../../views/loggedin/TaxDeclaration/types/Questionnaire/ContactDetails';
import { addDoc, collection } from 'firebase/firestore';
import { TaxDeclarationStep } from '../../views/loggedin/TaxDeclaration/types/TaxReport/TaxDeclarationStep';

interface BoxBodyProps {
  questionnaires?: SnapshotQuestionnaire[];
  noQuestionaire?: boolean;
}

export interface Info {
  firstName: string;
  lastName: string;
  questionnaire?: SnapshotQuestionnaire;
}

export function BoxBody({
  questionnaires,
  noQuestionaire = false,
}: BoxBodyProps) {
  const navigate = useNavigate();
  const { user, firestore } = useContext(AppContext) as AppContextType;
  let mainClient: SnapshotQuestionnaire;

  let secondaryClients: Info[] = questionnaires.map((questionnaire) => {
    if (questionnaire.questionnaire.clientType === ClientTypeEnum.MAIN_CLIENT) {
      mainClient = questionnaire;
    }
    return {
      firstName: questionnaire.questionnaire.personalInformations.firstName,
      lastName: questionnaire.questionnaire.personalInformations.lastName,
      questionnaire,
    };
  });

  const getDependants = (client: SnapshotQuestionnaire): Info[] => {
    return client?.questionnaire.dependents.map((dependant) => {
      //If rows does not contain this dependant
      if (
        !secondaryClients.some((questionnaire) => {
          questionnaire.questionnaire.questionnaire.personalInformations
            .firstName === dependant.firstName &&
            questionnaire.questionnaire.questionnaire.personalInformations
              .lastName === dependant.lastName;
        })
      ) {
        return {
          firstName: dependant.firstName,
          lastName: dependant.lastName,
          questionnaire: null,
        };
      }
    });
  };

  secondaryClients = secondaryClients.filter((questionnaire) => {
    return (
      questionnaire.questionnaire.questionnaire.clientType ===
      ClientTypeEnum.PARTNER
    );
  });

  let dependants: Info[] = [];

  questionnaires.forEach((questionnaire) => {
    dependants = dependants.concat(getDependants(questionnaire));
  });

  const mainClientInfo: Info = {
    firstName: mainClient
      ? mainClient.questionnaire.personalInformations.firstName
      : user?.displayName?.split(' ')[0],
    lastName: mainClient
      ? mainClient.questionnaire.personalInformations.lastName
      : user?.displayName?.split(' ')[1],
    questionnaire: mainClient ? mainClient : null,
  };

  if (!mainClientInfo.firstName && !mainClientInfo.lastName) {
    mainClientInfo.firstName = user?.displayName?.split(' ')[0];
    mainClientInfo.lastName = user?.displayName?.split(' ')[1];
  }

  async function addQuestionnaire(
    mainClient = true,
    civilStatus?: CivilStatus,
    contactDetails?: ContactDetails,
    isDependent = false
  ) {
    const defaultValues = {
      ...EmptyQuestionnaire,
      mainClient,
      state: QuestionnaireStateEnum.IN_PROGRESS,
      year: new Date().getFullYear(),
      isDependent,
      personalInformations: {
        ...EmptyQuestionnaire?.personalInformations,
        email: user.email,
      },
      civilStatus: civilStatus || null,
      contactDetails: contactDetails || null,
    };
    await addDoc(
      collection(firestore, 'taxReport', user.uid, 'questionnaires'),
      defaultValues
    ).then((docRef) => {
      navigate(
        `/platform/questionnaire/${docRef.id}?step=${TaxDeclarationStep.PERSONAL_INFORMATIONS}`
      );
    });
  }

  return (
    <div className="flex flex-col justify-center items-cente border-orange-400 rounded-lg shadow-xl">
      <>
        <BoxRow
          respondent={mainClientInfo}
          key={mainClientInfo.firstName}
          noQuestionaire={noQuestionaire}
          last={dependants.length === 0}
          onClick={() => (mainClient ? addQuestionnaire() : null)}
        />

        {secondaryClients.map((respondent) => (
          <BoxRow
            respondent={respondent}
            key={respondent.firstName}
            noQuestionaire={noQuestionaire}
            last={dependants.length === 0}
            onClick={() =>
              navigate(`/platform/questionnaire/${respondent.questionnaire.id}`)
            }
          />
        ))}
        {dependants.map((respondent, i) => (
          <BoxRow
            respondent={respondent}
            key={respondent.firstName}
            onClick={() =>
              navigate(`/platform/questionnaire/${respondent.questionnaire.id}`)
            }
            noQuestionaire={noQuestionaire}
            last={dependants.length - 1 === i}
          />
        ))}
      </>
    </div>
  );
}
