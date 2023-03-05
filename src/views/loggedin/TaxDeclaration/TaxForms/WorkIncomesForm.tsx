import { Checkbox } from 'flowbite-react/lib/esm/components/FormControls';
import React, { useContext } from 'react';
import { Controller } from 'react-hook-form';
import { TooltipWithIcon } from '../../../../components/common/TooltipWithIcon';
import {
  QuestionnaireContext,
  QuestionnaireContextType,
} from '../context/QuestionnaireContext';

export function WorkIncomesForm() {
  const { control, formData, register } = useContext(
    QuestionnaireContext
  ) as QuestionnaireContextType;

  return (
    <>
      <p className=" font-semibold">Avez-vous travaillé en 2022?</p>
      <Controller
        control={control}
        name="taxReport.workIncomes.workedLastYear"
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
      {formData?.taxReport?.workIncomes?.workedLastYear && (
        <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg">
          {formData?.taxReport?.workIncomes?.workedLastYear === true ? (
            <>
              <p className=" font-semibold">
                Veuillez indiquer quel genre de travail vous faisiez (cochez
                toutes les cases qui s&apos;appliquent)
              </p>
              <div className="flex items-center gap-2 py-2">
                <Checkbox {...register('taxReport.workIncomes.employed')} />
                <p>
                  J&apos;étais un employé (comprend le travail à la commission)
                </p>
              </div>
              {formData.taxReport.workIncomes.employed && (
                <>
                  <hr className="py-2"></hr>
                  <div className="px-8">
                    <p>Cochez toutes les cases qui s&apos;appliquent.</p>
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox
                        {...register('taxReport.workIncomes.employmentIncome')}
                      />
                      <p>T4 / Relevé 1 - Revenus d&apos;emploi</p>
                    </div>

                    <div className="flex items-center gap-2 py-2">
                      <Checkbox
                        {...register(
                          'taxReport.retirementIncomes.pensionRetirementAnnuityIncome'
                        )}
                      />
                      <p>
                        T4A / Relevé 2 / Relevé 1 - Pension, retraite, rente et
                        autres revenus
                      </p>
                    </div>
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox
                        {...register(
                          'taxReport.retirementIncomes.statementOfDistribution'
                        )}
                      />
                      <p>
                        T4A-RCA - État des montants distribués d&apos;une
                        convention de retraite
                      </p>
                    </div>
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox
                        {...register(
                          'taxReport.workIncomes.employmentProfitSharingPlan'
                        )}
                      />
                      <p>
                        T4PS / Relevé 25 - Régime de participation des employés
                        aux bénéfices
                      </p>
                    </div>
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox
                        {...register(
                          'taxReport.workIncomes.pensionAdjustmentReversal'
                        )}
                      />
                      <p>T10 - Facteur d&apos;équivalence rectifié (FER)</p>
                    </div>
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox
                        {...register('taxReport.workIncomes.foreignIncomes')}
                      />
                      <p>Étranger - Revenu provenant de sources étrangères</p>
                    </div>
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox
                        {...register(
                          'taxReport.workIncomes.outsideCanadaIncome'
                        )}
                      />
                      <p>
                        Relevé 17 - Rémunération provenant d&apos;un emploi à
                        l&apos;extérieur du Canada
                      </p>
                    </div>
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox
                        {...register(
                          'taxReport.workIncomes.multiEmployerInsurancePlanIncome'
                        )}
                      />
                      <p>
                        Relevé 22 - Revenu d&apos;emploi lié à un régime
                        d&apos;assurance interentreprises
                      </p>
                    </div>
                    <hr className="py-2"></hr>
                    <p className=" font-semibold">
                      Est-ce que l&apos;une des situations suivantes vous
                      concerne?
                    </p>

                    <div className="flex items-center gap-2 py-2">
                      <Checkbox
                        {...register(
                          'taxReport.workIncomes.formT1198RetroactivePayment'
                        )}
                      />
                      <p>
                        Déclarez-vous un paiement forfaitaire rétroactif
                        admissible sur le formulaire T1198?
                      </p>
                    </div>
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox
                        {...register(
                          'taxReport.workIncomes.wageLossReplacementPlan'
                        )}
                      />
                      <p>
                        J&apos;ai reçu un revenu d&apos;un régime
                        d&apos;assurance-salaire
                      </p>
                    </div>
                    <hr className="py-2"></hr>
                    <p className=" font-semibold">
                      Avez-vous des dépenses liées à votre emploi?
                      <TooltipWithIcon text="Si vous avez encouru des dépenses que vous avez payé personnellement afin d’obtenir un revenu de commission ou du salaire, il se peut que vous puissiez déduire ces dépenses. Si vous n’êtes pas certain cochez «Oui» et votre préparateur va entrer en contact avec vous."></TooltipWithIcon>
                    </p>
                    <Controller
                      control={control}
                      name="taxReport.workIncomes.jobRelatedExpenses"
                      render={({ field: { onChange, value } }) => (
                        <fieldset className="flex flex-row mx-4">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              value="no"
                              onChange={() => onChange(true)}
                              checked={value === true}
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
                    {formData?.taxReport?.workIncomes.jobRelatedExpenses && (
                      <>
                        <hr className="py-2"></hr>
                        <div className="mx-8">
                          <p>
                            Les dépenses d&apos;emploi peuvent être classées
                            dans une ou plus d&apos;une des catégories
                            suivantes.
                          </p>
                          <p>Cochez toutes les cases qui s&apos;appliquent.</p>
                          <div className="flex items-center gap-2 py-2">
                            <Checkbox
                              {...register(
                                'taxReport.workIncomes.remoteWorkExpenses'
                              )}
                            />
                            <p>J&apos;ai des dépenses d&apos;emploi</p>
                          </div>
                          <div className="flex items-center gap-2 py-2">
                            <Checkbox
                              {...register('taxReport.workIncomes.taxRefund')}
                            />
                            <p>
                              J&apos;ai reçu le remboursement de la TPS/TVH
                              (GST370)
                            </p>
                          </div>
                          <div className="flex items-center gap-2 py-2">
                            <Checkbox
                              {...register(
                                'taxReport.workIncomes.mealsAndAccomodation'
                              )}
                            />
                            <p>
                              J&apos;avais des frais de repas et de logement en
                              tant qu&apos;employé de transport
                            </p>
                          </div>
                          <div className="flex items-center gap-2 py-2">
                            <Checkbox
                              {...register(
                                'taxReport.workIncomes.unionsOrProfessionalDues'
                              )}
                            />
                            <p>
                              J&apos;ai payé des cotisations syndicales ou
                              professionnelles qui ne sont pas indiquées sur mon
                              feuillet T4
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
              <div className="flex items-center gap-2 py-2">
                <Checkbox
                  {...register(
                    'taxReport.workIncomes.employmentInsuranceOrParentalBenefits'
                  )}
                />
                <p>
                  J&apos;ai reçu des prestations d&apos;assurance-emploi ou de
                  congé parental
                </p>
              </div>
              {formData?.taxReport?.workIncomes
                .employmentInsuranceOrParentalBenefits && (
                <>
                  <hr className="py-2"></hr>
                  <div className="px-8">
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox
                        {...register('taxReport.workIncomes.insuranceBenefits')}
                      />
                      <p>
                        T4E / Relevé 6 - Prestations d&apos;assurance-emploi
                      </p>
                    </div>
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox
                        {...register(
                          'taxReport.retirementIncomes.pensionRetirementAnnuityIncome'
                        )}
                      />
                      <p>
                        T4A / Relevé 2 / Relevé 1 - Pension, retraite, rente et
                        autres revenus, incluant la PCU
                      </p>
                    </div>
                  </div>
                </>
              )}

              <div className="flex items-center gap-2 py-2">
                <Checkbox
                  {...register(
                    'taxReport.workIncomes.workerCompensationOrSocialAssistance'
                  )}
                />
                <p>
                  J&apos;ai reçu des indemnités pour accidents du travail ou de
                  l&apos;aide sociale
                </p>
              </div>
              {formData?.taxReport?.workIncomes
                .workerCompensationOrSocialAssistance && (
                <>
                  <hr className="py-2"></hr>
                  <div className="px-8">
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
                  </div>
                </>
              )}
              <div className="flex items-center gap-2 py-2">
                <Checkbox
                  {...register('taxReport.workIncomes.tipsOrCasualWork')}
                />
                <p>
                  J&apos;ai reçu des pourboires ou fait du travail occasionnel
                  et je ne recevrai pas de feuillet T4
                </p>
              </div>
            </>
          ) : (
            <>
              <p className=" font-semibold">
                Il semble que vous n&apos;avez pas travaillé en 2022. Est-ce que
                l&apos;une des situations suivantes vous concerne?
              </p>
              <div className="flex items-center gap-2 py-2">
                <Checkbox
                  {...register(
                    'taxReport.workIncomes.workerCompensationOrSocialAssistance'
                  )}
                />
                <p>
                  J&apos;ai reçu des indemnités pour accidents du travail ou de
                  l&apos;aide sociale
                </p>
              </div>
              {formData?.taxReport?.workIncomes
                .workerCompensationOrSocialAssistance && (
                <>
                  <hr className="py-2"></hr>
                  <div className="px-8">
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
                  </div>
                </>
              )}
              <div className="flex items-center gap-2 py-2">
                <Checkbox
                  {...register(
                    'taxReport.workIncomes.employmentInsuranceOrParentalBenefits'
                  )}
                />
                <p>
                  J&apos;ai reçu des prestations d&apos;assurance-emploi ou
                  d&apos;un congé parental, la PCU ou d&apos;autres montants
                </p>
              </div>
              {formData?.taxReport?.workIncomes
                .employmentInsuranceOrParentalBenefits && (
                <>
                  <hr className="py-2"></hr>
                  <div className="px-8">
                    <p>Cochez toutes les cases qui s&apos;appliquent.</p>
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox
                        {...register(
                          'taxReport.workIncomes.employmentInsuranceBenefits'
                        )}
                      />
                      <p>
                        T4E / Relevé 6 - Prestations d&apos;assurance-emploi
                      </p>
                    </div>
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox
                        {...register(
                          'taxReport.retirementIncomes.pensionRetirementAnnuityIncome'
                        )}
                      />
                      <p>
                        T4A / Relevé 2 / Relevé 1 - Pension, retraite, rente et
                        autres revenus, incluant la PCU
                      </p>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
