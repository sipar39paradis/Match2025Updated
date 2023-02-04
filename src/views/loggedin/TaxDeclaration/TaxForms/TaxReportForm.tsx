import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TaxDeclarationStep } from '../types/TaxReport/TaxDeclarationStep';
import { TaxReport } from '../types/TaxReport/TaxReport';
import Fade from 'react-reveal';
import { WorkIncomesForm } from './WorkIncomesForm';
import { RetirementIncomesForm } from './RetirementIncomeForm';
import { InvestmentIncomeForm as InvestmentIncomeForm } from './InvestmentIncomeForm';
import { SelfEmploymentRentalOtherIncomeForm } from './SelfEmploymentRentalOtherIncomeForm';
import { StudentLastYearForm } from './StudentLastYearForm';
import { TaxDeductionsForm } from './TaxDeductionsForm';
import { OtherDeductionsForm } from './OtherDeductionsForm';
import { VolunteerFirefighterForm } from './VolunteerFirefighterForm';
import { LossesForm } from './LossesForm';
import { ForeignAssetsForm } from './ForeignAssetsForm';
import { DonationsForm } from './DonationsForm';
import { MovingExpensesForm } from './MovingExpensesForm';
import { BoughtHomeForm } from './BoughtHomeForm';
import { SoldMainHomeForm } from './SoldMainHome';

export function TaxReportForm() {
  const {
    register,
    handleSubmit,
    formState: {},
    watch,
    control,
  } = useForm<TaxReport>();
  const navigate = useNavigate();
  const formData = watch();

  function onSubmitButton() {
    navigate(`/platform/questionnaire?step=${TaxDeclarationStep.REVIEW}`);
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
          <MovingExpensesForm />

          <p>
            Avez-vous engagé des frais médicaux pour vous-même, votre conjoint
            ou des personnes à charge?
          </p>
          <Controller
            control={control}
            name="medicalExpenses"
            render={({ field: { onChange, value } }) => (
              <fieldset className="flex flex-row m-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    value="yes"
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
                    value="no"
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
            name="homeAccessibilityTaxCredit"
            render={({ field: { onChange, value } }) => (
              <fieldset className="flex flex-row m-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    value="yes"
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
                    value="no"
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
          <LossesForm
            control={control}
            formData={formData}
            register={register}
          />
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
              value="Precedant"
              onClick={() =>
                navigate(
                  `/platform/questionnaire?step=${TaxDeclarationStep.DEPENDENTS}`
                )
              }
              className="bg-[#222C40] hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded cursor-pointer"
            />
            <input
              type="submit"
              value="Continuez"
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            />
          </div>
        </form>
      </Fade>
    </section>
  );
}
