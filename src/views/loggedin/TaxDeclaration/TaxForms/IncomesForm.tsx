import React from 'react';
import { TaxDeclarationStep } from '../types/TaxReport/TaxDeclarationStep';
import Fade from 'react-reveal';
import { WorkIncomesForm } from './WorkIncomesForm';
import { RetirementIncomesForm } from './RetirementIncomeForm';
import { InvestmentIncomeForm as InvestmentIncomeForm } from './InvestmentIncomeForm';
import { SelfEmploymentRentalOtherIncomeForm } from './SelfEmploymentRentalOtherIncomeForm';
import { StudentLastYearForm } from './StudentLastYearForm';
import { TaxDeductionsForm } from './TaxDeductionsForm';
import { ForeignAssetsForm } from './ForeignAssetsForm';
import { RespondentFormProps } from '../types/Questionnaire/QuestionnaireFormProp';

export function IncomesForm(props: RespondentFormProps) {
  const {
    register,
    handleSubmit,
    saveFormAnswers,
    formData,
    control,
    setSearchParams,
  } = props;

  function onSubmitButton() {
    saveFormAnswers();
    setSearchParams({ step: TaxDeclarationStep.DEDUCTIONS_AND_TAX_CREDIT });
  }

  return (
    <section className="flex flex-col align-baseline items-start w-full">
      <h1>Revenus 2022 </h1>
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
