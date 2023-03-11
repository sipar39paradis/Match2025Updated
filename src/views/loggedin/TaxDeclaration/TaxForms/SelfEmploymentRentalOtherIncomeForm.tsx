import { Checkbox } from 'flowbite-react';
import React, { useContext } from 'react';
import { Controller } from 'react-hook-form';
import { TooltipWithIcon } from '../../../../components/common/TooltipWithIcon';
import {
  QuestionnaireContext,
  QuestionnaireContextType,
} from '../context/QuestionnaireContext';

export function SelfEmploymentRentalOtherIncomeForm() {
  const { register, formData, control } = useContext(
    QuestionnaireContext
  ) as QuestionnaireContextType;
  return (
    <>
      <p className="font-semibold">
        Avez-vous un revenu de travailleur autonome?
        <TooltipWithIcon text="Si vous avez un revenu d’appoint, sachez que ce type de revenu est imposable sous forme de travail autonome. Toutefois, selon le cas, il est possible de déduire des dépenses afin de réduire le revenu de travail autonome"></TooltipWithIcon>
      </p>
      <Controller
        control={control}
        name="taxReport.selfEmploymentIncomes.selfEmployedIncomes"
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
      {formData?.taxReport?.selfEmploymentIncomes?.selfEmployedIncomes && (
        <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg w-full">
          <div className="px-8 pb-2">
            <p>Cochez toutes les cases qui s&apos;appliquent.</p>
            <div className="flex items-center gap-2 py-2">
              <Checkbox
                {...register(
                  'taxReport.selfEmploymentIncomes.liberalProfession'
                )}
              />
              <p>Profession libérale</p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <Checkbox
                {...register('taxReport.selfEmploymentIncomes.commission')}
              />
              <p>Commission</p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <Checkbox
                {...register('taxReport.selfEmploymentIncomes.other')}
              />
              <p>Autre</p>
            </div>
          </div>
          {(formData?.taxReport?.selfEmploymentIncomes?.liberalProfession ||
            formData?.taxReport?.selfEmploymentIncomes?.commission ||
            formData?.taxReport?.selfEmploymentIncomes?.other) && (
            <p className="font-semibold pb-2">
              Votre préparateur entrera en contact avec vous pour obtenir plus
              de renseignements.
            </p>
          )}
        </div>
      )}

      <p className="font-semibold">Avez-vous un revenu de location?</p>
      <Controller
        control={control}
        name="taxReport.rentalPropertyIncomes.rentalPropertyIncomes"
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
      {formData?.taxReport?.rentalPropertyIncomes?.rentalPropertyIncomes && (
        <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg w-full">
          <p className="mb-4">
            Veuillez entrer le nombre d&apos;immeuble locatif.
          </p>
          <div className="relative z-0 w-full mb-6 group">
            <input
              {...register(
                'taxReport.rentalPropertyIncomes.numberOfRentalPropertyIncomes',
                {
                  required: true,
                }
              )}
              type="number"
              className="block py-2.5 px-0 w-fit text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
              placeholder=" "
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Nombre d’immeuble locatif
            </label>
          </div>
          {/* <p className="font-semibold pb-2">
            Votre préparateur entrera en contact avec vous pour obtenir plus de
            renseignements.
          </p> */}
        </div>
      )}

      <p className="font-semibold">Avez-vous d&apos;autres revenus?</p>
      <Controller
        control={control}
        name="taxReport.otherIncomes.otherIncomes"
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

      {formData?.taxReport?.otherIncomes?.otherIncomes && (
        <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg w-full">
          <div className="px-8 pb-2">
            <p>Cochez toutes les cases qui s&apos;appliquent.</p>
            <div className="flex items-center gap-2 py-2">
              <Checkbox
                {...register('taxReport.otherIncomes.RRSPorRRIFincome')}
              />
              <p>
                J&apos;ai retiré de l&apos;argent d&apos;un REER ou d&apos;un
                FERR
              </p>
            </div>
            {formData?.taxReport?.otherIncomes?.RRSPorRRIFincome && (
              <>
                <hr className="py-2"></hr>
                <div className="px-8 pb-2">
                  <p>Cochez toutes les cases qui s&apos;appliquent.</p>
                  <div className="flex items-center gap-2 py-2">
                    <Checkbox
                      {...register('taxReport.otherIncomes.homeOwnershipPlan')}
                    />
                    <p>
                      J&apos;ai participé au régime d&apos;accession à la
                      propriété
                    </p>
                  </div>
                  <div className="flex items-center gap-2 py-2">
                    <Checkbox
                      {...register(
                        'taxReport.otherIncomes.continuingEducationIncentivePlan'
                      )}
                    />
                    <p>
                      J&apos;ai participé au régime d&apos;encouragement à
                      l&apos;éducation permanente
                    </p>
                  </div>
                  <div className="flex items-center gap-2 py-2">
                    <Checkbox {...register('taxReport.taxDeductions.T4RSP')} />
                    <p>J&apos;ai reçu un T4RSP / Relevé 2</p>
                  </div>
                  <div className="flex items-center gap-2 py-2">
                    <Checkbox {...register('taxReport.taxDeductions.T4RIF')} />
                    <p>J&apos;ai reçu un T4RIF / Relevé 2</p>
                  </div>
                  <div className="flex items-center gap-2 py-2">
                    <Checkbox
                      {...register('taxReport.otherIncomes.spousalRRSP')}
                    />
                    <p>
                      J&apos;ai retiré de l&apos;argent d&apos;un REER de
                      conjoint
                    </p>
                  </div>
                  <div className="flex items-center gap-2 py-2">
                    <Checkbox
                      {...register('taxReport.otherIncomes.spousalRRIF')}
                    />
                    <p>
                      J&apos;ai retiré de l&apos;argent d&apos;un FERR de
                      conjoint
                    </p>
                  </div>
                  <div className="flex items-center gap-2 py-2">
                    <Checkbox
                      {...register(
                        'taxReport.otherIncomes.RRSPorRRIFdeductions'
                      )}
                    />
                    <p>
                      J&apos;ai retiré des cotisations au REER ou au FERR non
                      déclarées pour lesquelles je pourrais avoir droit à une
                      déduction (formulaire T746)
                    </p>
                  </div>
                </div>
              </>
            )}
            <div className="flex items-center gap-2 py-2">
              <Checkbox {...register('taxReport.otherIncomes.schoolIncome')} />
              <p>J&apos;ai un revenu scolaire</p>
            </div>
            {formData?.taxReport?.otherIncomes?.schoolIncome && (
              <>
                <hr className="py-2"></hr>
                <div className="px-8 pb-2">
                  <p>Cochez toutes les cases qui s&apos;appliquent.</p>
                  <div className="flex items-center gap-2 py-2">
                    <Checkbox
                      {...register(
                        'taxReport.retirementIncomes.pensionRetirementAnnuityIncome'
                      )}
                    />
                    <p>
                      T4A / Relevé 2 / Relevé 1 - Pension, retraite, rente et
                      autres revenus (y compris bourses d&apos;études et
                      d&apos;entretien)
                    </p>
                  </div>
                  <div className="flex items-center gap-2 py-2">
                    <Checkbox
                      {...register(
                        'taxReport.workIncomes.employmentInsuranceBenefits'
                      )}
                    />
                    <p>T4E / Relevé 6 - Prestations d&apos;assurance-emploi</p>
                  </div>
                  <div className="flex items-center gap-2 py-2">
                    <Checkbox
                      {...register(
                        'taxReport.otherIncomes.registeredRetirementSavingsPlanIncome'
                      )}
                    />
                    <p>
                      T4RSP / Relevé 2 - Revenus d&apos;un régime enregistré
                      d&apos;épargne-retraite
                    </p>
                  </div>
                </div>
              </>
            )}
            <div className="flex items-center gap-2 py-2">
              <Checkbox
                {...register('taxReport.otherIncomes.socialAssitance')}
              />
              <p>J&apos;ai reçu de l&apos;aide sociale</p>
            </div>
            {formData?.taxReport?.otherIncomes?.socialAssitance && (
              <>
                <hr className="py-2"></hr>
                <div className="px-8 pb-2">
                  <p>Cochez toutes les cases qui s&apos;appliquent.</p>
                  <div className="flex items-center gap-2 py-2">
                    <Checkbox
                      {...register(
                        'taxReport.retirementIncomes.welfareSeniorSupplement'
                      )}
                    />
                    <p>
                      T5007 / Relevé 5 - Prestations d&apos;assistance sociale
                      ou de la CAT, supplément pour personnes âgées
                    </p>
                  </div>
                  <div className="flex items-center gap-2 py-2">
                    <Checkbox
                      {...register(
                        'taxReport.retirementIncomes.advancePayments'
                      )}
                    />
                    <p>Relevé 19 - Versements anticipés</p>
                  </div>
                </div>
              </>
            )}
            <div className="flex items-center gap-2 py-2">
              <Checkbox
                {...register(
                  'taxReport.otherIncomes.disabilityOrDeathBenefits'
                )}
              />
              <p>
                J&apos;ai reçu des prestations d&apos;invalidité ou des
                prestations de décès
              </p>
            </div>
            {formData?.taxReport?.otherIncomes?.disabilityOrDeathBenefits && (
              <>
                <hr className="py-2"></hr>
                <div className="px-8 pb-2">
                  <p>Cochez toutes les cases qui s&apos;appliquent.</p>
                  <div className="flex items-center gap-2 py-2">
                    <Checkbox
                      {...register(
                        'taxReport.otherIncomes.canadaPensionPlanOrQuebecPensionPlanBenefits'
                      )}
                    />
                    <p>
                      T4A(P) / Relevé 2 - Prestations du Régime de pensions du
                      Canada ou du Régime de rentes du Québec
                    </p>
                  </div>
                  <div className="flex items-center gap-2 py-2">
                    <Checkbox
                      {...register(
                        'taxReport.otherIncomes.registeredRetirementSavingsPlanIncome'
                      )}
                    />
                    <p>
                      T4A / Relevé 2 / Relevé 1 - Pension, retraite, rente et
                      autres revenus
                    </p>
                  </div>
                </div>
              </>
            )}
            <div className="flex items-center gap-2 py-2">
              <Checkbox
                {...register(
                  'taxReport.otherIncomes.spousalOrChildSupportPayments'
                )}
              />
              <p>
                J&apos;ai reçu des versements de pension alimentaire au profit
                de l&apos;époux ou conjoint ou de pension alimentaire pour
                enfants
              </p>
            </div>
            {formData?.taxReport?.otherIncomes
              ?.spousalOrChildSupportPayments && (
              <p className="font-semibold pb-2">
                Votre préparateur entrera en contact avec vous pour obtenir plus
                de renseignements.
              </p>
            )}

            <div className="flex items-center gap-2 py-2">
              <Checkbox
                {...register(
                  'taxReport.otherIncomes.advancePaymentsWorkingIncomeTaxBenefitIncome'
                )}
              />
              <p>
                J&apos;ai reçu des versements anticipés de la prestation fiscale
                pour le revenu de travail
              </p>
            </div>
            {formData?.taxReport?.otherIncomes
              ?.advancePaymentsWorkingIncomeTaxBenefitIncome && (
              <>
                <hr className="py-2"></hr>
                <div className="px-8 pb-2">
                  <p>Cochez toutes les cases qui s&apos;appliquent.</p>
                  <div className="flex items-center gap-2 py-2">
                    <Checkbox
                      {...register(
                        'taxReport.otherIncomes.advancePaymentsWorkingIncomeTaxBenefit'
                      )}
                    />
                    <p>
                      RC210 - Versements anticipés de la prestation fiscale pour
                      le revenu de travail
                    </p>
                  </div>
                  <div className="flex items-center gap-2 py-2">
                    <Checkbox
                      {...register(
                        'taxReport.retirementIncomes.advancePayments'
                      )}
                    />
                    <p>Relevé 19 - Versements anticipés</p>
                  </div>
                </div>
              </>
            )}
            <div className="flex items-center gap-2 py-2">
              <Checkbox
                {...register('taxReport.otherIncomes.otherIncomesNonIncluded')}
              />
              <p>
                J&apos;ai reçu d&apos;autres revenus qui ne sont pas inclus
                ailleurs
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
