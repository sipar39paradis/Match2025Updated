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
  QuestionnaireContext,
  QuestionnaireContextType,
} from '../context/QuestionnaireContext';
import {
  uploadFileToStorage,
  uploadTaxReportPdfToStorage,
  writeRequiredFiles,
} from '../../../../client/firebaseClient';
import mapFiles, { getPDFTaxReport } from '../../../../utils/FileMapper';
import { EmptyQuestionnaire } from '../emptyQuestionnaire';
import { Dependent } from '../types/Questionnaire/Dependent';
import {
  ClientTypeEnum,
  QuestionnaireStateEnum,
} from '../types/Questionnaire/Questionnaire';
import { partnerQuestionnaireExists } from '../utils/partnerQuestionnaireExists';
import { useParams } from 'react-router-dom';
import { personalInformationAsExcel } from '../../../../components/ExcelExport';
import { calculatePrice } from '../Price/calculatePrice';

export function DeductionsAndTaxCreditsForm() {
  const {
    handleSubmit,
    saveFormAnswers,
    formData,
    control,
    setSearchParams,
    register,
    addQuestionnaire,
    questionnaires,
  } = useContext(QuestionnaireContext) as QuestionnaireContextType;

  const { id } = useParams();

  function onSubmitButton() {
    saveFormAnswers({ ...formData, state: QuestionnaireStateEnum.COMPLETED });
    const dependent = findDependentWhoNeedsQuestionnaire();

    if (partnerNeedsQuestionnaire()) {
      addQuestionnaire(
        ClientTypeEnum.PARTNER,
        {
          ...EmptyQuestionnaire,
          civilStatus: formData.civilStatus,
          contactDetails: formData.contactDetails,
        },
        TaxDeclarationStep.PERSONAL_INFORMATIONS
      );
    } else if (dependent) {
      addQuestionnaire(
        ClientTypeEnum.DEPENDENT,
        {
          ...EmptyQuestionnaire,
          contactDetails: formData.contactDetails,
          personalInformations: {
            firstName: dependent.firstName,
            lastName: dependent.lastName,
            birthDay: dependent.birthDay,
            socialInsuranceNumber: dependent.socialInsuranceNumber,
            email: null,
            bankruptcy: null,
            disabled: null,
          },
        },
        TaxDeclarationStep.INCOMES
      );
    } else {
      questionnaires?.forEach(async (value, key) => {
        await writeRequiredFiles(mapFiles(value?.taxReport), key);
      });
      setSearchParams({ step: TaxDeclarationStep.PRICE });
    }
  }

  function findDependentWhoNeedsQuestionnaire(): Dependent | null {
    let foundDependent = null;
    questionnaires.forEach((questionnaire) => {
      questionnaire.dependents.forEach((dependent) => {
        if (
          dependent.hasTaxReport &&
          !dependentQuestionnaireExists(
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

  function dependentQuestionnaireExists(
    firstName: string,
    lastName: string,
    birthDay: string
  ) {
    let exist = false;
    questionnaires.forEach((questionnaire) => {
      if (
        questionnaire.clientType === ClientTypeEnum.DEPENDENT &&
        `${questionnaire.personalInformations.firstName}-${questionnaire.personalInformations.lastName}-${questionnaire.personalInformations.birthDay}` ===
          `${firstName}-${lastName}-${birthDay}`
      ) {
        exist = true;
      }
    });
    return exist;
  }

  function partnerNeedsQuestionnaire() {
    return (
      formData?.clientType === ClientTypeEnum.MAIN_CLIENT &&
      formData?.civilStatus?.together &&
      !partnerQuestionnaireExists(questionnaires)
    );
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
            Aviez-vous une assurance maladie et médicaments en{' '}
            {new Date().getFullYear() - 1}?
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
          <p className="font-semibold mb-2">
            Autre chose que vous aimeriez mentionner qui n&apos;a pas été
            demandé dans le questionnaire ?
          </p>
          <textarea
            className="w-full"
            {...register('taxReport.userFreeText')}
          ></textarea>
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
              value={
                partnerNeedsQuestionnaire() ||
                !!findDependentWhoNeedsQuestionnaire()
                  ? 'Prochain questionnaire'
                  : 'Suivant'
              }
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            />
          </div>
        </form>
      </Fade>
    </section>
  );
}
