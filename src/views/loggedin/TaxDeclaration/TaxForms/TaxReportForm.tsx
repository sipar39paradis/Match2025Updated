import React from 'react';
import { Controller } from 'react-hook-form';
import { TaxDeclarationStep } from '../types/TaxReport/TaxDeclarationStep';
import Fade from 'react-reveal';
import { WorkIncomesForm } from './WorkIncomesForm';
import { RetirementIncomesForm } from './RetirementIncomeForm';
import { InvestmentIncomeForm as InvestmentIncomeForm } from './InvestmentIncomeForm';
import { SelfEmploymentRentalOtherIncomeForm } from './SelfEmploymentRentalOtherIncomeForm';
import { StudentLastYearForm } from './StudentLastYearForm';
import { TaxDeductionsForm } from './TaxDeductionsForm';
import { OtherDeductionsForm } from './OtherDeductionsForm';
import { VolunteerFirefighterForm } from './VolunteerFirefighterForm';
import { ForeignAssetsForm } from './ForeignAssetsForm';
import { DonationsForm } from './DonationsForm';
import { MovingExpensesForm } from './MovingExpensesForm';
import { BoughtHomeForm } from './BoughtHomeForm';
import { SoldMainHomeForm } from './SoldMainHome';
import { RespondentFormProps } from '../types/Respondent/RespondentFormProps';

export function TaxReportForm(props: RespondentFormProps) {
  const {
    register,
    handleSubmit,
    saveFormAnswers,
    formData,
    control,
    setSearchParams,
    addQuestionnaire,
  } = props;

  function onSubmitButton() {
    saveFormAnswers();
    if (formData.mainClient && formData.civilStatus.together) {
      addQuestionnaire(false);
      setSearchParams({ step: TaxDeclarationStep.CIVIL_STATUS });
    }
    setSearchParams({ step: TaxDeclarationStep.REVIEW });
  }

  return (
    <section className="flex flex-col align-baseline items-start w-full">
      <h1>Qu&apos;est-ce qui a marqué l&apos;année 2022?</h1>
      <Fade>
        <form
          onSubmit={handleSubmit(onSubmitButton)}
          className="flex flex-col items-start mt-4 w-full"
        >
          <WorkIncomesForm
            control={control}
            formData={formData}
            register={register}
          />
          <RetirementIncomesForm
            control={control}
            formData={formData}
            register={register}
          />
          <InvestmentIncomeForm
            control={control}
            formData={formData}
            register={register}
          />
          <SelfEmploymentRentalOtherIncomeForm
            control={control}
            formData={formData}
            register={register}
          />
          <StudentLastYearForm
            control={control}
            formData={formData}
            register={register}
          />
          <TaxDeductionsForm
            control={control}
            formData={formData}
            register={register}
          />
          <ForeignAssetsForm
            control={control}
            formData={formData}
            register={register}
          />
          <DonationsForm
            control={control}
            formData={formData}
            register={register}
          />
          <MovingExpensesForm
            control={control}
            formData={formData}
            register={register}
          />

          <p>
            Avez-vous engagé des frais médicaux pour vous-même, votre conjoint
            ou des personnes à charge?
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
          <BoughtHomeForm register={register} />
          <SoldMainHomeForm></SoldMainHomeForm>

          <p>
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
              <p className="opacity-100 pb-2">
                Votre préparateur va entre en contact avec vous pour avoir plus
                de renseignements.
              </p>
            </div>
          )}
          <VolunteerFirefighterForm
            control={control}
            formData={formData}
            register={register}
          />
          <OtherDeductionsForm
            control={control}
            formData={formData}
            register={register}
          />
          <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
          <div className="w-full flex justify-between mt-4">
            <input
              type="submit"
              value="Précédant"
              onClick={() => {
                saveFormAnswers();
                setSearchParams({ step: TaxDeclarationStep.DEPENDENTS });
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
