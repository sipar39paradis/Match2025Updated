import { Checkbox } from 'flowbite-react';
import React, { useState } from 'react';
import { TaxReportFormProps } from '../types/TaxReport/TaxReportFormProps';

export function SelfEmploymentRentalOtherIncomeForm(props: TaxReportFormProps) {
  const { register } = props;
  const [
    showSelfEmploymentRentalOtherIncomes,
    setShowSelfEmploymentRentalOtherIncomes,
  ] = useState(false);
  const [showSelfEmployed, setShowSelfEmployed] = useState(false);
  const [showSchoolIncome, setShowSchoolIncome] = useState(false);
  const [showRRSPorRRIFincomes, setShowRRSPorRRIFincomes] = useState(false);
  const [showSocialAssitance, setShowSocialAssitance] = useState(false);
  const [showDisabilityOrDeathBenefits, setShowDisabilityOrDeathBenefits] =
    useState(false);
  const [
    showAdvancePaymentsWorkingIncomeTaxBenefit,
    setShowAdvancePaymentsWorkingIncomeTaxBenefit,
  ] = useState(false);
  return (
    <>
      <p>
        Avez-vous un revenu de travailleur autonome, de location ou
        d&apos;autres revenus?
      </p>

      <fieldset className="flex flex-row m-4">
        <div className="flex items-center">
          <input
            type="radio"
            value="yes"
            onChange={() => setShowSelfEmploymentRentalOtherIncomes(true)}
            checked={showSelfEmploymentRentalOtherIncomes === true}
            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
          />
          <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
            Oui
          </p>
        </div>
        <div className="flex items-center m-4">
          <input
            type="radio"
            value="no"
            onChange={() => setShowSelfEmploymentRentalOtherIncomes(false)}
            checked={showSelfEmploymentRentalOtherIncomes === false}
            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
          />
          <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
            Non
          </p>
        </div>
      </fieldset>

      {showSelfEmploymentRentalOtherIncomes === true && (
        <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg w-full">
          <div className="flex items-center gap-2 py-2">
            <Checkbox onClick={() => setShowSelfEmployed(!showSelfEmployed)} />
            <p>J&apos;étais un travailleur autonome</p>
          </div>
          {showSelfEmployed && (
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
                      'selfEmploymentRentalOtherIncomes.selfEmployed.agriculture'
                    )}
                  />
                  <p>Agriculture</p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register(
                      'selfEmploymentRentalOtherIncomes.selfEmployed.fishing'
                    )}
                  />
                  <p>Pêche</p>
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
              onChange={() => setShowRRSPorRRIFincomes(!showRRSPorRRIFincomes)}
            />
            <p>
              J&apos;ai retiré de l&apos;argent d&apos;un REER ou d&apos;un FERR
            </p>
          </div>
          {showRRSPorRRIFincomes && (
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
            <Checkbox onClick={() => setShowSchoolIncome(!showSchoolIncome)} />
            <p>J&apos;ai un revenu scolaire</p>
          </div>
          {showSchoolIncome && (
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
              onClick={() => setShowSocialAssitance(!showSocialAssitance)}
            />
            <p>J&apos;ai reçu de l&apos;aide sociale</p>
          </div>
          {showSocialAssitance && (
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
              onClick={() =>
                setShowDisabilityOrDeathBenefits(showDisabilityOrDeathBenefits)
              }
            />
            <p>
              J&apos;ai reçu des prestations d&apos;invalidité ou des
              prestations de décès
            </p>
          </div>
          {showDisabilityOrDeathBenefits && (
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
              onClick={() =>
                setShowAdvancePaymentsWorkingIncomeTaxBenefit(
                  !showAdvancePaymentsWorkingIncomeTaxBenefit
                )
              }
            />
            <p>
              J&apos;ai reçu des versements anticipés de la prestation fiscale
              pour le revenu de travail
            </p>
          </div>
          {showAdvancePaymentsWorkingIncomeTaxBenefit && (
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
