import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { CivilStatusForm } from './ProfileForms/CivilStatusForm';
import { PersonnalInformationsForm } from './ProfileForms/PersonnalInformationsForm';
import { CivilStatusChangeForm } from './ProfileForms/CivilStatusChangeForm';
import { TaxDeclarationReview } from './TaxDeclarationReview';
import { ContactDetailsForm } from './ProfileForms/ContactDetailsForm';
import { TaxDeclarationStep } from './types/TaxReport/TaxDeclarationStep';
import { DependentsForm } from './ProfileForms/DependentsForm';
import { IncomesForm } from './TaxForms/IncomesForm';
import { TaxDeclarationFileUpload } from './TaxDeclarationFileUpload';
import { Questionnaire } from './types/Questionnaire/Questionnaire';
import { DeductionsAndTaxCreditsForm } from './TaxForms/DeductionsAndTaxCreditsForm';
import { OctopusLoader } from '../../../components/common/OctopusLoader';
import Fade from 'react-reveal';
import {
  QuestionnaireContext,
  QuestionnaireContextType,
} from './context/QuestionnaireContext';

export const TAX_DECLARATION_STEP = 'step';

export function QuestionnaireHandler() {
  const { user, questionnaires, resetForm, loadingQuestionnaires } = useContext(
    QuestionnaireContext
  ) as QuestionnaireContextType;
  const { id } = useParams();
  const [clientTabs, setClientTabs] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (user && id && questionnaires.size) {
      resetForm(questionnaires.get(id));
      generateTabs(questionnaires);
    }
  }, [id, questionnaires]);

  function generateTabs(questionnaires: Map<string, Questionnaire>) {
    const tabs = [];
    questionnaires.forEach((value: Questionnaire, key: string) =>
      tabs.push({ value, key, active: key === id })
    );
    setClientTabs(tabs);
  }

  function renderTaxReportStep(step: string) {
    switch (step) {
      case TaxDeclarationStep.CIVIL_STATUS:
        return <CivilStatusForm></CivilStatusForm>;
      case TaxDeclarationStep.PERSONAL_INFORMATIONS:
        return <PersonnalInformationsForm></PersonnalInformationsForm>;
      case TaxDeclarationStep.CIVIL_STATUS_CHANGE:
        return <CivilStatusChangeForm></CivilStatusChangeForm>;
      case TaxDeclarationStep.CONTACT_DETAILS:
        return <ContactDetailsForm></ContactDetailsForm>;
      case TaxDeclarationStep.DEPENDENTS:
        return <DependentsForm></DependentsForm>;
      case TaxDeclarationStep.INCOMES:
        return <IncomesForm></IncomesForm>;
      case TaxDeclarationStep.DEDUCTIONS_AND_TAX_CREDIT:
        return <DeductionsAndTaxCreditsForm></DeductionsAndTaxCreditsForm>;
      case TaxDeclarationStep.UPLOAD_FILES:
        return <TaxDeclarationFileUpload />;
      case TaxDeclarationStep.REVIEW:
        return <TaxDeclarationReview></TaxDeclarationReview>;
      default:
        return <PersonnalInformationsForm></PersonnalInformationsForm>;
    }
  }

  return (
    <div className="flex p-8 bg-orange-50 min-h-screen flex-col items-center">
      <div className="w-[800px] flex flex-row">
        {clientTabs.length > 1 &&
          clientTabs.map((tab) => (
            <div
              key={tab.key}
              className={` rounded-t-lg p-2 w-fit cursor-pointer hover:bg-gray-200 ${
                tab.active ? 'bg-gray-200' : 'bg-white'
              }`}
              onClick={() =>
                navigate(
                  `/questionnaire/${tab?.key}?step=${searchParams.get(
                    TAX_DECLARATION_STEP
                  )}`
                )
              }
            >
              <p className="font-semibold">
                {tab?.value?.personalInformations?.firstName || 'Client'}
              </p>
            </div>
          ))}
      </div>
      {loadingQuestionnaires ? (
        <Fade>
          <div className="h-full pt-16">
            <OctopusLoader />
          </div>
        </Fade>
      ) : (
        <Fade>
          <div className="w-[800px] bg-white rounded-md p-8 h-fit">
            {renderTaxReportStep(searchParams.get(TAX_DECLARATION_STEP))}
          </div>
        </Fade>
      )}
    </div>
  );
}
