import { Alert, Breadcrumb } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react';
import { HiHome } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { BreadcrumbWrapper } from '../../../components/profile/BreadcrumbWrapper';
import { BoxBody } from '../../../components/boxComponents/BoxBody';
import { SnapshotQuestionnaire, getAllQuestionnaires } from '../../../client/firebaseClient';
import { AppContext, AppContextType } from '../../../context/AppContext';
import { Questionnaire } from '../TaxDeclaration/types/Questionnaire/Questionnaire';

export function ViewQuestionnaire() {
  const navigate = useNavigate();
  const { user } = useContext(AppContext) as AppContextType;
  const [noQuestionaire, setNoQuestionaire] = useState(true);
  const [questionnaires, setQuestionnaires] = useState<SnapshotQuestionnaire[]>(null)

  useEffect(() => {
    ('BR5shBSMwPSxBTd91Ly5zjjhfiH2');
    getAllQuestionnaires(user.uid).then((res) => {
      console.log(res, 'res');
      if (res.length !== 0) {
        setNoQuestionaire(false);
        setQuestionnaires(res)
      }
    });
  }, []);

  return (
    <main>
      <div className="flex justify-start flex-col w-[96vw] p-10 sm:px-30 lg:px-40">
        <BreadcrumbWrapper
          breadcrumbEndpoint={['profile', 'viewQuestionnaire']}
          breadcrumbName={['Mon Compte', 'Mes Questionnaires']}
        >
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Mes Questionnaires
          </h1>
          {noQuestionaire ? (
            <a
              className=" text-orange-400 cursor-pointer font-bold"
              onClick={() => navigate('/platform/questionnaire')}
            >
              <Alert color="info">
                <p>
                  {
                    "Bonjour, il semblerait que vous n'ayez pas rempli votre déclaration d'impôts pour cette année. Cliquez ici pour être rediriger vers le questionnaire"
                  }
                </p>
              </Alert>
            </a>
          ) : (
            <BoxBody 
            questionnaires={questionnaires}/>
          )}
        </BreadcrumbWrapper>
      </div>
    </main>
  );
}
