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
import {
  ClientTypeEnum,
  Questionnaire,
} from './types/Questionnaire/Questionnaire';
import { DeductionsAndTaxCreditsForm } from './TaxForms/DeductionsAndTaxCreditsForm';
import { OctopusLoader } from '../../../components/common/OctopusLoader';
import {
  QuestionnaireContext,
  QuestionnaireContextType,
} from './context/QuestionnaireContext';
import { Price } from './Price/Price';
import { ContactUs } from './ContactUs/ContactUs';

export const TAX_DECLARATION_STEP = 'step';

export function QuestionnaireHandler() {
  const {
    user,
    questionnaires,
    resetForm,
    loadingQuestionnaires,
    personalInformationsForm,
  } = useContext(QuestionnaireContext) as QuestionnaireContextType;
  const { id } = useParams();
  const [clientTabs, setClientTabs] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentStep = searchParams.get(TAX_DECLARATION_STEP);
  const personnalInformationsFormData = personalInformationsForm.watch();

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
    });
  }, [currentStep]);

  useEffect(() => {
    if (user && id && questionnaires.size) {
      const currentQuestionnaire = questionnaires.get(id);
      resetForm(currentQuestionnaire);
      personalInformationsForm.setValue(
        'firstName',
        currentQuestionnaire?.personalInformations?.firstName
      );
    }
    generateTabs(questionnaires);
  }, [id, questionnaires]);

  useEffect(() => {
    if (questionnaires.size) {
      const currentQuestionnaire = questionnaires.get(id);
      questionnaires.set(id, {
        ...currentQuestionnaire,
        personalInformations: {
          ...currentQuestionnaire?.personalInformations,
          firstName: personnalInformationsFormData?.firstName,
        },
      });
      generateTabs(questionnaires);
    }
  }, [personnalInformationsFormData?.firstName]);

  useEffect(() => {
    generateTabs(questionnaires);
  }, [currentStep]);

  function generateTabs(questionnaires: Map<string, Questionnaire>) {
    const tabs = [];
    questionnaires.forEach((value: Questionnaire, key: string) =>
      tabs.push({
        value,
        key,
        active: key === id,
        disabled: disableTab(value.clientType),
      })
    );
    setClientTabs(tabs);
  }

  function disableTab(clientType: ClientTypeEnum) {
    if (
      clientType === ClientTypeEnum.PARTNER &&
      currentStep === TaxDeclarationStep.CIVIL_STATUS
    ) {
      return true;
    } else if (
      clientType === ClientTypeEnum.DEPENDENT &&
      currentStep !== TaxDeclarationStep.INCOMES &&
      currentStep !== TaxDeclarationStep.DEDUCTIONS_AND_TAX_CREDIT &&
      currentStep !== TaxDeclarationStep.UPLOAD_FILES
    ) {
      return true;
    }

    return false;
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
      case TaxDeclarationStep.PRICE:
        return <Price></Price>;
      case TaxDeclarationStep.CONTACT_US:
        return <ContactUs></ContactUs>;
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
      <div className="w-full lg:w-[800px] flex flex-row">
        {currentStep !== TaxDeclarationStep.PRICE &&
          currentStep !== TaxDeclarationStep.CONTACT_US &&
          currentStep !== TaxDeclarationStep.REVIEW &&
          clientTabs.map((tab) => (
            <div
              key={tab.key}
              className={` rounded-t-lg p-2 w-fit cursor-pointer hover:bg-gray-200 ${
                tab.active ? 'bg-white cursor-default' : 'bg-gray-200'
              } ${tab.disabled ? 'pointer-events-none' : ''}`}
              onClick={() => {
                if (!tab.disabled) {
                  navigate(
                    `/questionnaire/${tab?.key}?step=${searchParams.get(
                      TAX_DECLARATION_STEP
                    )}`
                  );
                }
              }}
            >
              <p className="font-semibold">
                {tab?.value?.personalInformations?.firstName || 'Client'}
              </p>
            </div>
          ))}
      </div>
      {loadingQuestionnaires ? (
        <div>
          <div className="h-full pt-16">
            <OctopusLoader />
          </div>
        </div>
      ) : (
        <div>
          <div className="lg:w-[800px] bg-white rounded-md p-8 h-fit w-full">
            {renderTaxReportStep(currentStep)}
          </div>
        </div>
      )}
    </div>
  );
}
