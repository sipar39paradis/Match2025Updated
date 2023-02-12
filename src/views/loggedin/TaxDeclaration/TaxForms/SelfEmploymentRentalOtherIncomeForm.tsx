import { Checkbox } from 'flowbite-react';
import React from 'react';
import { Controller } from 'react-hook-form';
import { TaxReportFormProps } from '../types/TaxReport/TaxReportFormProps';

export function SelfEmploymentRentalOtherIncomeForm(props: TaxReportFormProps) {
  const { register, formData, control } = props;

  return (
    <>
      <p>
        Avez-vous un revenu de travailleur autonome, de location ou
        d&apos;autres revenus?
      </p>
      <Controller
        control={control}
        name="selfEmploymentRentalOtherIncomes.selfEmploymentRentalOtherIncomes"
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

      {formData?.selfEmploymentRentalOtherIncomes
        ?.selfEmploymentRentalOtherIncomes && (
        <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg w-full">
          <div className="flex items-center gap-2 py-2">
            <Checkbox
              {...register('selfEmploymentRentalOtherIncomes.selfEmployed')}
            />
            <p>J&apos;étais un travailleur autonome</p>
          </div>
          {formData?.selfEmploymentRentalOtherIncomes?.selfEmployed && (
            <>
              <hr className="py-2"></hr>
              <div className="px-8 pb-2">
                <p>Cochez toutes les cases qui s&apos;appliquent.</p>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register(
                      'selfEmploymentRentalOtherIncomes.selfEmployed.liberalProfession'
                    )}
                  />
                  <p>Profession libérale</p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register(
                      'selfEmploymentRentalOtherIncomes.selfEmployed.commission'
                    )}
                  />
                  <p>Commission</p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register(
                      'selfEmploymentRentalOtherIncomes.selfEmployed.other'
                    )}
                  />
                  <p>Autre</p>
                </div>
              </div>
            </>
          )}
          <div className="flex items-center gap-2 py-2">
            <Checkbox
              {...register(
                'selfEmploymentRentalOtherIncomes.rentalPropertyIncomes'
              )}
            />
            <p>
              J&apos;ai un bien locatif qui génère des revenus ou des dépenses
            </p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox
              {...register('selfEmploymentRentalOtherIncomes.RRSPorRRIFincome')}
            />
            <p>
              J&apos;ai retiré de l&apos;argent d&apos;un REER ou d&apos;un FERR
            </p>
          </div>
          {formData?.selfEmploymentRentalOtherIncomes?.RRSPorRRIFincome && (
            <>
              <hr className="py-2"></hr>
              <div className="px-8 pb-2">
                <p>Cochez toutes les cases qui s&apos;appliquent.</p>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register(
                      'selfEmploymentRentalOtherIncomes.homeOwnershipPlan'
                    )}
                  />
                  <p>
                    J&apos;ai participé au régime d&apos;accession à la
                    propriété
                  </p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register(
                      'selfEmploymentRentalOtherIncomes.continuingEducationIncentivePlan'
                    )}
                  />
                  <p>
                    J&apos;ai participé au régime d&apos;encouragement à
                    l&apos;éducation permanente
                  </p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox {...register('taxDeductions.T4RSP')} />
                  <p>J&apos;ai reçu un T4RSP / Relevé 2</p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox {...register('taxDeductions.T4RIF')} />
                  <p>J&apos;ai reçu un T4RIF / Relevé 2</p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register(
                      'selfEmploymentRentalOtherIncomes.spousalRRSP'
                    )}
                  />
                  <p>
                    J&apos;ai retiré de l&apos;argent d&apos;un REER de conjoint
                  </p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register(
                      'selfEmploymentRentalOtherIncomes.spousalRRIF'
                    )}
                  />
                  <p>
                    J&apos;ai retiré de l&apos;argent d&apos;un FERR de conjoint
                  </p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register(
                      'selfEmploymentRentalOtherIncomes.RRSPorRRIFdeductions'
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
            <Checkbox
              {...register('selfEmploymentRentalOtherIncomes.schoolIncome')}
            />
            <p>J&apos;ai un revenu scolaire</p>
          </div>
          {formData?.selfEmploymentRentalOtherIncomes?.schoolIncome && (
            <>
              <hr className="py-2"></hr>
              <div className="px-8 pb-2">
                <p>Cochez toutes les cases qui s&apos;appliquent.</p>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register(
                      'retirementIncomes.pensionRetirementAnnuityIncome'
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
                    {...register('workIncomes.employmentInsuranceBenefits')}
                  />
                  <p>T4E / Relevé 6 - Prestations d&apos;assurance-emploi</p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register(
                      'selfEmploymentRentalOtherIncomes.registeredRetirementSavingsPlanIncome'
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
              {...register('selfEmploymentRentalOtherIncomes.socialAssitance')}
            />
            <p>J&apos;ai reçu de l&apos;aide sociale</p>
          </div>
          {formData?.selfEmploymentRentalOtherIncomes?.socialAssitance && (
            <>
              <hr className="py-2"></hr>
              <div className="px-8 pb-2">
                <p>Cochez toutes les cases qui s&apos;appliquent.</p>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register('retirementIncomes.welfareSeniorSupplement')}
                  />
                  <p>
                    T5007 / Relevé 5 - Prestations d&apos;assistance sociale ou
                    de la CAT, supplément pour personnes âgées
                  </p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register('retirementIncomes.advancePayments')}
                  />
                  <p>Relevé 19 - Versements anticipés</p>
                </div>
              </div>
            </>
          )}
          <div className="flex items-center gap-2 py-2">
            <Checkbox
              {...register(
                'selfEmploymentRentalOtherIncomes.disabilityOrDeathBenefits'
              )}
            />
            <p>
              J&apos;ai reçu des prestations d&apos;invalidité ou des
              prestations de décès
            </p>
          </div>
          {formData?.selfEmploymentRentalOtherIncomes
            ?.disabilityOrDeathBenefits && (
            <>
              <hr className="py-2"></hr>
              <div className="px-8 pb-2">
                <p>Cochez toutes les cases qui s&apos;appliquent.</p>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register(
                      'selfEmploymentRentalOtherIncomes.canadaPensionPlanOrQuebecPensionPlanBenefits'
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
                      'selfEmploymentRentalOtherIncomes.registeredRetirementSavingsPlanIncome'
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
                'selfEmploymentRentalOtherIncomes.spousalOrChildSupportPayments'
              )}
            />
            <p>
              J&apos;ai reçu des versements de pension alimentaire au profit de
              l&apos;époux ou conjoint ou de pension alimentaire pour enfants
            </p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox
              {...register(
                'selfEmploymentRentalOtherIncomes.advancePaymentsWorkingIncomeTaxBenefitIncome'
              )}
            />
            <p>
              J&apos;ai reçu des versements anticipés de la prestation fiscale
              pour le revenu de travail
            </p>
          </div>
          {formData?.selfEmploymentRentalOtherIncomes
            ?.advancePaymentsWorkingIncomeTaxBenefitIncome && (
            <>
              <hr className="py-2"></hr>
              <div className="px-8 pb-2">
                <p>Cochez toutes les cases qui s&apos;appliquent.</p>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register(
                      'selfEmploymentRentalOtherIncomes.advancePaymentsWorkingIncomeTaxBenefit'
                    )}
                  />
                  <p>
                    RC210 - Versements anticipés de la prestation fiscale pour
                    le revenu de travail
                  </p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register('retirementIncomes.advancePayments')}
                  />
                  <p>Relevé 19 - Versements anticipés</p>
                </div>
              </div>
            </>
          )}

          <div className="flex items-center gap-2 py-2">
            <Checkbox
              {...register('selfEmploymentRentalOtherIncomes.otherRevenues')}
            />
            <p>
              J&apos;ai reçu d&apos;autres revenus qui ne sont pas inclus
              ailleurs
            </p>
          </div>
        </div>
      )}
    </>
  );
}
