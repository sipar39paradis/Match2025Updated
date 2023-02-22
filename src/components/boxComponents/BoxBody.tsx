import { Breadcrumb } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { BoxRow } from './BoxRow';
import { Questionnaire } from '../../views/loggedin/TaxDeclaration/types/Questionnaire/Questionnaire';
import { SnapshotQuestionnaire } from '../../client/firebaseClient';
import { AppContext, AppContextType } from '../../context/AppContext';

interface BoxBodyProps {
  questionnaires: SnapshotQuestionnaire[];
}

export interface Info {
  firstName: string;
  lastName: string;
  questionnaire?: SnapshotQuestionnaire;
}

export function BoxBody({ questionnaires }: BoxBodyProps) {
  const navigate = useNavigate();
  const { user } = useContext(AppContext) as AppContextType;
  let mainClient: SnapshotQuestionnaire;

  let secondaryClients: Info[] = questionnaires.map((questionnaire) => {
    if (questionnaire.questionnaire.mainClient) {
      mainClient = questionnaire;
    }
    return {
      firstName: questionnaire.questionnaire.personalInformations.firstName,
      lastName: questionnaire.questionnaire.personalInformations.lastName,
      questionnaire,
    };
  });


  const getDependants = (client: SnapshotQuestionnaire): Info[] => {
    return client?.questionnaire.dependents.map(
      (dependant) => {
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
      }
    );
  }

  secondaryClients = secondaryClients.filter(questionnaire => {
    return !(questionnaire.questionnaire.questionnaire.mainClient)
  })


  let dependants: Info[] = []

  questionnaires.forEach(questionnaire => {
    dependants = dependants.concat(getDependants(questionnaire))
  })

  const mainClientInfo:Info = {
    firstName: mainClient.questionnaire.personalInformations.firstName,
    lastName: mainClient.questionnaire.personalInformations.lastName,
    questionnaire: mainClient,
  }

  if(!(mainClientInfo.firstName)  && !(mainClientInfo.lastName)){
    mainClientInfo.firstName = user?.displayName?.split(' ')[0]
    mainClientInfo.lastName = user?.displayName?.split(' ')[1]
  }



  return (
    <div className="flex flex-col justify-center items-center">
      <>
      
        <BoxRow
          respondent={mainClientInfo}
          key={mainClient.questionnaire.personalInformations.firstName}
          onClick={() =>  navigate('/platform/questionnaire')}
        />
        {secondaryClients.map((respondent) => (
          <BoxRow respondent={respondent} 
          key={respondent.firstName} 
          onClick={() =>  navigate(`/platform/questionnaire/${respondent.questionnaire.id}`)}/>
        ))}
        {dependants.map((respondent) => (
          <BoxRow respondent={respondent} key={respondent.firstName} 
          onClick={() =>  navigate(`/platform/questionnaire/${respondent.questionnaire.id}`)}/>
        ))}
      </>
    </div>
  );
}
