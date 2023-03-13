import React, { useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import { BoxRow } from './BoxRow';
import { ClientTypeEnum } from '../../views/loggedin/TaxDeclaration/types/Questionnaire/Questionnaire';
import { SnapshotQuestionnaire } from '../../client/firebaseClient';
import { AppContext, AppContextType } from '../../context/AppContext';

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
  const { user } = useContext(AppContext) as AppContextType;
  let mainClient: SnapshotQuestionnaire;

  console.log('questionaires', questionnaires);

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

  console.log('seconday', secondaryClients);

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

  // secondaryClients = secondaryClients.filter((questionnaire) => {
  //   return (
  //     questionnaire.questionnaire.questionnaire.clientType ===
  //     ClientTypeEnum.PARTNER
  //   );
  // });

  console.log('secondary after filter', secondaryClients);

  let dependants: Info[] = [];

  if (noQuestionaire) {
    questionnaires.forEach((questionnaire) => {
      dependants = dependants.concat(getDependants(questionnaire));
    });

    console.log('dependants', dependants);

    dependants = dependants.filter((val, i) => {
      const current = dependants.findIndex((dep) => {
        return val.firstName === dep.firstName && val.lastName === dep.lastName;
      });

      return current < 0 || (current === i && current >= 0);
    });

    dependants = dependants.filter((dep) => {
      dep.questionnaire;
    });
  }


  console.log('dependantsafterfileer', dependants);

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

  secondaryClients = secondaryClients.filter(secondary => {
    return secondary.firstName !== mainClientInfo.firstName || secondary.lastName !== mainClientInfo.lastName
  })

  return (
    <div className="flex flex-col justify-center items-cente border-orange-400 rounded-lg shadow-xl">
      <>
        <BoxRow
          respondent={mainClientInfo}
          key={mainClientInfo.firstName}
          noQuestionaire={noQuestionaire}
          last={secondaryClients.length === 0}
          onClick={() => {
            navigate(`/questionnaire/${mainClientInfo.questionnaire.id}`);
          }}
        />

        {secondaryClients.map((respondent, i) => (
          <BoxRow
            respondent={respondent}
            key={respondent.firstName}
            noQuestionaire={noQuestionaire}
            last={

                secondaryClients.length - 1 === i

            }
            onClick={() =>
              navigate(`/questionnaire/${respondent.questionnaire.id}`)
            }
          />
        ))}
        {dependants.map((respondent, i) => (
          <BoxRow
            respondent={respondent}
            key={respondent.firstName}
            onClick={() =>
              navigate(`/questionnaire/${respondent.questionnaire.id}`)
            }
            noQuestionaire={noQuestionaire}
            last={dependants.length - 1 === i}
          />
        ))}
      </>
    </div>
  );
}
