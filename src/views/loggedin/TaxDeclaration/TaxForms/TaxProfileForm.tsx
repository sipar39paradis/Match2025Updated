import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TaxDeclarationStep } from '../types/TaxDeclarationStep';
import { TaxProfile } from '../types/TaxProfile';
import Fade from 'react-reveal';
import { WorkedLastYearForm } from './WorkedLastYearForm';
import { RetirementIncomeForm } from './RetirementIncomeForm';
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

export function TaxProfileForm() {
  const {
    handleSubmit,
    formState: {},
    watch,
    control,
  } = useForm<TaxProfile>();
  const navigate = useNavigate();
  const formData = watch();

  function onSubmitButton() {
    navigate(`/platform/tax-declaration?step=${TaxDeclarationStep.REVIEW}`);
  }

  return (
    <section className="flex flex-col align-baseline items-start w-full">
      <h1>Qu&apos;est-ce qui a marqué l&apos;année 2022?</h1>
      <Fade>
        <form
          onSubmit={handleSubmit(onSubmitButton)}
          className="flex flex-col items-start mt-4 w-full"
        >
          <WorkedLastYearForm control={control} formData={formData} />
          <RetirementIncomeForm control={control} formData={formData} />
          <InvestmentIncomeForm control={control} formData={formData} />
          <SelfEmploymentRentalOtherIncomeForm
            control={control}
            formData={formData}
          />
          <StudentLastYearForm control={control} formData={formData} />
          <TaxDeductionsForm control={control} formData={formData} />
          <ForeignAssetsForm control={control} formData={formData} />
          <DonationsForm control={control} formData={formData} />
          <MovingExpensesForm control={control} formData={formData} />

          <p>
            Avez-vous engagé des frais médicaux pour vous-même, votre conjoint
            ou des personnes à charge?
          </p>
          <fieldset className="flex flex-row m-4">
            <div className="flex items-center">
              <input
                type="radio"
                value="no"
                id="field-dead-person-yes"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
                Oui
              </p>
            </div>
            <div className="flex items-center m-4">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
                Non
              </p>
            </div>
          </fieldset>
          <p>
            Avez-vous acheté une maison, un condo, un appartement ou une maison
            mobile cette année? Sélectionnez Oui pour déterminer si vous êtes
            admissible au montant pour l&apos;achat d&apos;une première
            habitation ?
          </p>
          <fieldset className="flex flex-row m-4">
            <div className="flex items-center">
              <input
                type="radio"
                value="no"
                id="field-dead-person-yes"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
                Oui
              </p>
            </div>
            <div className="flex items-center m-4">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
                Non
              </p>
            </div>
          </fieldset>
          <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg w-full">
            <p>Avez-vous acheté ou vendu un domicile en 2022? </p>
            <fieldset className="flex flex-row m-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  value="no"
                  id="field-dead-person-yes"
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                />
                <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
                  Oui
                </p>
              </div>
              <div className="flex items-center m-4">
                <input
                  type="radio"
                  value="yes"
                  id="field-dead-person-no"
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                />
                <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
                  Non
                </p>
              </div>
            </fieldset>
            <hr className="py-2"></hr>
            <p>
              Possédiez-vous et viviez-vous dans un autre domicile entre le 1er
              janvier 2018 et le 31 décembre 2022?
            </p>
            <fieldset className="flex flex-row m-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  value="no"
                  id="field-dead-person-yes"
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                />
                <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
                  Oui
                </p>
              </div>
              <div className="flex items-center m-4">
                <input
                  type="radio"
                  value="yes"
                  id="field-dead-person-no"
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                />
                <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
                  Non
                </p>
              </div>
            </fieldset>
            <hr className="py-2"></hr>
            <p>
              Ce domicile a-t-il été acheté pour être une habitation plus
              accessible pour une personne handicapée?
            </p>
            <fieldset className="flex flex-row m-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  value="no"
                  id="field-dead-person-yes"
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                />
                <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
                  Oui
                </p>
              </div>
              <div className="flex items-center m-4">
                <input
                  type="radio"
                  value="yes"
                  id="field-dead-person-no"
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                />
                <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
                  Non
                </p>
              </div>
            </fieldset>
            <hr className="py-2"></hr>
            <p className="opacity-100">
              Vous n&apos;avez pas droit au crédit d&apos;impôt pour
              l&apos;achat d&apos;une habitation.
            </p>
          </div>
          <p>
            Avez-vous disposé d&apos;une propriété en 2022 qui était votre
            résidence principale pendant la période où vous en étiez
            propriétaire ?
          </p>
          <fieldset className="flex flex-row m-4">
            <div className="flex items-center">
              <input
                type="radio"
                value="no"
                id="field-dead-person-yes"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
                Oui
              </p>
            </div>
            <div className="flex items-center m-4">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
                Non
              </p>
            </div>
          </fieldset>
          <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg w-full">
            <p>
              Dès l&apos;année d&apos;imposition de 2016, les contribuables qui
              vendent leur résidence principale doivent déclarer la vente dans
              leur déclaration de revenus. Nous vous guiderons sur cette
              disposition dans la section Revenus.
            </p>
          </div>
          <p>
            Avez-vous engagé des dépenses admissibles vous donnant droit au
            crédit d&apos;impôt pour l&apos;accessibilité domiciliaire?
          </p>
          <fieldset className="flex flex-row m-4">
            <div className="flex items-center">
              <input
                type="radio"
                value="no"
                id="field-dead-person-yes"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
                Oui
              </p>
            </div>
            <div className="flex items-center m-4">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
                Non
              </p>
            </div>
          </fieldset>
          <LossesForm control={control} formData={formData} />
          <VolunteerFirefighterForm control={control} formData={formData} />
          <OtherDeductionsForm control={control} formData={formData} />
          <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
          <div className="w-full flex justify-between mt-4">
            <input
              type="submit"
              value="Precedant"
              onClick={() =>
                navigate(
                  `/platform/tax-declaration?step=${TaxDeclarationStep.DEPENDENTS}`
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
