import React, { useContext, useEffect, useState } from 'react';
import { BreadcrumbWrapper } from '../../../components/profile/BreadcrumbWrapper';
import {
  SnapshotQuestionnaire,
  getAllQuestionnaires,
} from '../../../client/firebaseClient';
import { BoxBody } from '../../../components/boxComponents/BoxBody';
import { AppContext, AppContextType } from '../../../context/AppContext';

export function Foyer() {
  const { user } = useContext(AppContext) as AppContextType;

  const [noQuestionaire, setNoQuestionaire] = useState(true);
  const [questionnaires, setQuestionnaires] =
    useState<SnapshotQuestionnaire[]>(null);

  useEffect(() => {
    'YABqeVWkbrSeJlYZQ3Q9Tfqpkc63'
    getAllQuestionnaires(user.uid).then((res) => {
      console.log(res, 'res');
      if (res.length !== 0) {
        setNoQuestionaire(false);
        setQuestionnaires(res);
      }
    });
  }, []);

  return (
    <main>
      <div className="flex justify-start flex-col w-screen p-10 sm:px-30 lg:px-40">
        <BreadcrumbWrapper
          breadcrumbEndpoint={['profile', 'foyer']}
          breadcrumbName={['Mon Compte', 'Mon Foyer']}
        >
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Mon Foyer
          </h1>
          {noQuestionaire ? (
            <BoxBody questionnaires={[]} noQuestionaire={true} />
          ) : (
            <BoxBody questionnaires={questionnaires} noQuestionaire={true} />
          )}
        </BreadcrumbWrapper>
      </div>
    </main>
  );
}
