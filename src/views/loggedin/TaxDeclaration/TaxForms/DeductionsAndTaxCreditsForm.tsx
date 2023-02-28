import React, { useContext } from 'react';
import { Controller } from 'react-hook-form';

import { TaxDeclarationStep } from '../types/TaxReport/TaxDeclarationStep';
import { BoughtHomeForm } from './BoughtHomeForm';
import { DonationsForm } from './DonationsForm';
import { MovingExpensesForm } from './MovingExpensesForm';
import { OtherDeductionsForm } from './OtherDeductionsForm';
import { SoldMainHomeForm } from './SoldMainHome';
import Fade from 'react-reveal';
import { TooltipWithIcon } from '../../../../components/common/TooltipWithIcon';
import {
  uploadTaxReportPdfToStorage,
  writeRequiredFiles,
} from '../../../../client/firebaseClient';
import mapFiles, { getPDFTaxReport } from '../../../../utils/FileMapper';
import { ClientTypeEnum } from '../types/Questionnaire/Questionnaire';
import { Dependent } from '../types/Questionnaire/Dependent';
import { EmptyQuestionnaire } from '../emptyQuestionnaire';
import {
  QuestionnaireContext,
  QuestionnaireContextType,
} from '../context/QuestionnaireContext';

export function DeductionsAndTaxCreditsForm() {
  const {
    register,
    handleSubmit,
    saveFormAnswers,
    formData,
    control,
    setSearchParams,
    addQuestionnaire,
    resetForm,
    questionnaires,
  } = useContext(QuestionnaireContext) as QuestionnaireContextType;

  function onSubmitButton() {
    saveFormAnswers();
    if (
      formData?.clientType === ClientTypeEnum.MAIN_CLIENT &&
      formData?.civilStatus?.together &&
      partnerQuestionnaireExist()
    ) {
      resetForm();
      addQuestionnaire(
        ClientTypeEnum.PARTNER,
        {
          ...EmptyQuestionnaire,
          civilStatus: formData.civilStatus,
          contactDetails: formData.contactDetails,
        },
        TaxDeclarationStep.PERSONAL_INFORMATIONS
      );
    }
    const dependent = findDependentWhoNeedsQuestionnaire();
    if (dependent) {
      resetForm();
      addQuestionnaire(
        ClientTypeEnum.DEPENDENT,
        {
          ...EmptyQuestionnaire,
          contactDetails: formData.contactDetails,
          personalInformations: {
            firstName: dependent.firstName,
            lastName: dependent.lastName,
            birthDay: dependent.birthDay,
            socialSecurityNumber: dependent.socialSecurityNumber,
            email: null,
            bankruptcy: null,
            disabled: null,
          },
        },
        TaxDeclarationStep.INCOMES
      );
    } else {
      questionnaires?.forEach((value, id) => {
        uploadTaxReportPdfToStorage(
          getPDFTaxReport(formData?.taxReport, value?.personalInformations),
          value?.personalInformations
        );
        writeRequiredFiles(mapFiles(value?.taxReport), id);
      });
      setSearchParams({ step: TaxDeclarationStep.UPLOAD_FILES });
    }
  }

  function findDependentWhoNeedsQuestionnaire(): Dependent | null {
    let foundDependent = null;
    questionnaires.forEach((questionnaire) => {
      questionnaire.dependents.forEach((dependent) => {
        if (
          dependent.hasTaxReport &&
          !dependentQuestionnaireAlreadyExist(
            dependent.firstName,
            dependent.lastName,
            dependent.birthDay.toString()
          )
        ) {
          foundDependent = dependent;
        }
      });
    });
    return foundDependent;
  }

  function dependentQuestionnaireAlreadyExist(
    firstName: string,
    lastName: string,
    birthDay: string
  ) {
    questionnaires.forEach((questionnaire) => {
      if (
        questionnaire.clientType === ClientTypeEnum.DEPENDENT &&
        `${questionnaire.personalInformations.firstName}-${questionnaire.personalInformations.lastName}-${questionnaire.personalInformations.birthDay}` ===
          `${firstName}-${lastName}-${birthDay}`
      ) {
        return true;
      }
    });
    return false;
  }

  function partnerQuestionnaireExist() {
    questionnaires.forEach((questionnaire) => {
      if (questionnaire.clientType === ClientTypeEnum.PARTNER) {
        console.log('inside')
        return true;
      }
    });
    return false;
  }

  return (
    <section className="flex flex-col align-baseline items-start w-full">
      <h1>Déductions et Crédits d’impôts </h1>
      <Fade>
        <form
          onSubmit={handleSubmit(onSubmitButton)}
          className="flex flex-col items-start mt-4 w-full"
        >
          <DonationsForm />
          <MovingExpensesForm />
          <p className="font-semibold">
            Avez-vous engagé des frais médicaux pour vous-même, votre conjoint
            ou des personnes à charge?
            <TooltipWithIcon text="Si vous avez eu des frais médicaux non remboursés par une assurance, vous êtes possiblement éligible pour avoir un crédit d’impôts pour les frais médicaux. Veuillez déposer dans la boite de dépôt tous les reçus pour frais médicaux que vous avez payés ainsi que le rapport de votre assureur (le cas échéant) afin que nous déterminions les dépenses qui peuvent vous permettre d’avoir une économie d’impôts. "></TooltipWithIcon>
          </p>
          <Controller
            control={control}
            name="taxReport.medicalExpenses"
            render={({ field: { onChange, value } }) => (
              <fieldset className="flex flex-row m-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    onChange={() => onChange(true)}
                    checked={value === true}
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <p className="block ml-2 font-medium text-gray-900 dark:text-gray-300">
                    Oui
                  </p>
                </div>
                <div className="flex items-center m-4">
                  <input
                    type="radio"
                    onChange={() => onChange(false)}
                    checked={value === false}
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
                    Non
                  </p>
                </div>
              </fieldset>
            )}
          />
          <p className="font-semibold">
            Aviez-vous une assurance maladie et médicaments en 2022?
            <TooltipWithIcon text="Si vous avez eu des frais médicaux non remboursés par une assurance, vous êtes possiblement éligible pour avoir un crédit d’impôts pour les frais médicaux. Veuillez déposer dans la boite de dépôt tous les reçus pour frais médicaux que vous avez payés ainsi que le rapport de votre assureur (le cas échéant) afin que nous déterminions les dépenses qui peuvent vous permettre d’avoir une économie d’impôts. "></TooltipWithIcon>
          </p>
          <Controller
            control={control}
            name="taxReport.healthAndDrugInsurance"
            render={({ field: { onChange, value } }) => (
              <fieldset className="flex flex-row m-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    onChange={() => onChange(true)}
                    checked={value === true}
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <p className="block ml-2 font-medium text-gray-900 dark:text-gray-300">
                    Oui
                  </p>
                </div>
                <div className="flex items-center m-4">
                  <input
                    type="radio"
                    onChange={() => onChange(false)}
                    checked={value === false}
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
                    Non
                  </p>
                </div>
              </fieldset>
            )}
          />
          <BoughtHomeForm />
          <SoldMainHomeForm></SoldMainHomeForm>

          <p className="font-semibold">
            Avez-vous engagé des dépenses admissibles vous donnant droit au
            crédit d&apos;impôt pour l&apos;accessibilité domiciliaire?
          </p>
          <Controller
            control={control}
            name="taxReport.homeAccessibilityTaxCredit"
            render={({ field: { onChange, value } }) => (
              <fieldset className="flex flex-row m-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    onChange={() => onChange(true)}
                    checked={value === true}
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <p className="block ml-2 font-medium text-gray-900 dark:text-gray-300">
                    Oui
                  </p>
                </div>
                <div className="flex items-center m-4">
                  <input
                    type="radio"
                    onChange={() => onChange(false)}
                    checked={value === false}
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
                    Non
                  </p>
                </div>
              </fieldset>
            )}
          />
          {formData?.taxReport?.homeAccessibilityTaxCredit && (
            <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg">
              <p className="font-semibold pb-2">
                Votre préparateur entrera en contact avec vous pour obtenir plus
                de renseignements.
              </p>
            </div>
          )}
          <OtherDeductionsForm />
          <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
          <div className="w-full flex justify-between mt-4">
            <input
              type="submit"
              value="Précédant"
              onClick={() => {
                saveFormAnswers();
                setSearchParams({ step: TaxDeclarationStep.INCOMES });
              }}
              className="bg-[#222C40] hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded cursor-pointer"
            />
            <input
              type="submit"
              value="Suivant"
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            />
          </div>
        </form>
      </Fade>
    </section>
  );
}
