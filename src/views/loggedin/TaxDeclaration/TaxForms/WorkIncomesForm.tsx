import { Checkbox } from 'flowbite-react/lib/esm/components/FormControls';
import React from 'react';
import { Controller } from 'react-hook-form';
import { TaxReportFormProps } from '../types/TaxReport/TaxReportFormProps';

export function WorkIncomesForm(props: TaxReportFormProps) {
  const { control, formData, register } = props;

  return (
    <>
      <p>Avez-vous travaillé en 2022?</p>
      <Controller
        control={control}
        name="workIncomes.workedLastYear"
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
      {formData?.workIncomes?.workedLastYear && (
        <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg">
          {formData.workIncomes.workedLastYear === true ? (
            <>
              <p>
                Veuillez indiquer quel genre de travail vous faisiez (cochez
                toutes les cases qui s&apos;appliquent)
              </p>
              <div className="flex items-center gap-2 py-2">
                <Checkbox {...register('workIncomes.employed')} />
                <p>
                  J&apos;étais un employé (comprend le travail à la commission)
                </p>
              </div>
              {formData.workIncomes.employed && (
                <>
                  <hr className="py-2"></hr>
                  <div className="px-8">
                    <p>Cochez toutes les cases qui s&apos;appliquent.</p>
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox {...register('workIncomes.employmentIncome')} />
                      <p>T4 / Relevé 1 - Revenus d&apos;emploi</p>
                    </div>

                    <div className="flex items-center gap-2 py-2">
                      <Checkbox
                        {...register(
                          'retirementIncomes.pensionRetirementAnnuityIncome'
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
                          'retirementIncomes.statementOfDistribution'
                        )}
                      />
                      <p>
                        T4A-RCA - État des montants distribués d&apos;une
                        convention de retraite
                      </p>
                    </div>
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox
                        {...register('workIncomes.employmentProfitSharingPlan')}
                      />
                      <p>
                        T4PS / Relevé 25 - Régime de participation des employés
                        aux bénéfices
                      </p>
                    </div>
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox
                        {...register('workIncomes.pensionAdjustmentReversal')}
                      />
                      <p>T10 - Facteur d&apos;équivalence rectifié (FER)</p>
                    </div>
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox {...register('workIncomes.foreignIncomes')} />
                      <p>Étranger - Revenu provenant de sources étrangères</p>
                    </div>
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox
                        {...register('workIncomes.outsideCanadaIncome')}
                      />
                      <p>
                        Relevé 17 - Rémunération provenant d&apos;un emploi à
                        l&apos;extérieur du Canada
                      </p>
                    </div>
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox
                        {...register(
                          'workIncomes.multiEmployerInsurancePlanIncome'
                        )}
                      />
                      <p>
                        Relevé 22 - Revenu d&apos;emploi lié à un régime
                        d&apos;assurance interentreprises
                      </p>
                    </div>
                    <hr className="py-2"></hr>
                    <p>
                      Est-ce que l&apos;une des situations suivantes vous
                      concerne?
                    </p>
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox {...register('workIncomes.clergyMember')} />
                      <p>J&apos;étais un membre du clergé</p>
                    </div>
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox
                        {...register('workIncomes.formT1198RetroactivePayment')}
                      />
                      <p>
                        Déclarez-vous un paiement forfaitaire rétroactif
                        admissible sur le formulaire T1198?
                      </p>
                    </div>
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox
                        {...register('workIncomes.wageLossReplacementPlan')}
                      />
                      <p>
                        J&apos;ai reçu un revenu d&apos;un régime
                        d&apos;assurance-salaire
                      </p>
                    </div>
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox
                        {...register(
                          'workIncomes.optionalCPPorQPPcontributions'
                        )}
                      />
                      <p>
                        Je veux verser des cotisations facultatives au RPC ou au
                        RRQ
                      </p>
                    </div>
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox {...register('workIncomes.stocks')} />
                      <p>
                        J&apos;ai des actions dans ma compagnie et j&apos;ai des
                        avantages tirés d&apos;une option d&apos;achat
                        d&apos;actions ou j&apos;ai payé de l&apos;impôt sur les
                        excédents à un régime de participation des employés aux
                        bénéfices ou je dois faire un choix pour reporter les
                        avantages tirés d&apos;une option d&apos;achat
                        d&apos;actions.
                      </p>
                    </div>
                    <hr className="py-2"></hr>
                    <p>Avez-vous des dépenses liées à votre emploi?</p>
                    <Controller
                      control={control}
                      name="workIncomes.jobRelatedExpenses"
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
                    {formData.workIncomes.jobRelatedExpenses && (
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
                              {...register('workIncomes.remoteWorkExpenses')}
                            />
                            <p>J&apos;ai des dépenses d&apos;emploi</p>
                          </div>
                          <div className="flex items-center gap-2 py-2">
                            <Checkbox {...register('workIncomes.taxRefund')} />
                            <p>
                              J&apos;ai reçu le remboursement de la TPS/TVH
                              (GST370)
                            </p>
                          </div>
                          <div className="flex items-center gap-2 py-2">
                            <Checkbox
                              {...register('workIncomes.mealsAndAccomodation')}
                            />
                            <p>
                              J&apos;avais des frais de repas et de logement en
                              tant qu&apos;employé de transport
                            </p>
                          </div>
                          <div className="flex items-center gap-2 py-2">
                            <Checkbox
                              {...register(
                                'workIncomes.unionsOrProfessionalDues'
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
                    'workIncomes.employmentInsuranceOrParentalBenefits'
                  )}
                />
                <p>
                  J&apos;ai reçu des prestations d&apos;assurance-emploi ou de
                  congé parental
                </p>
              </div>
              {formData.workIncomes.employmentInsuranceOrParentalBenefits && (
                <>
                  <hr className="py-2"></hr>
                  <div className="px-8">
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox
                        {...register('workIncomes.insuranceBenefits')}
                      />
                      <p>
                        T4E / Relevé 6 - Prestations d&apos;assurance-emploi
                      </p>
                    </div>
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox
                        {...register(
                          'retirementIncomes.pensionRetirementAnnuityIncome'
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
                    'workIncomes.workerCompensationOrSocialAssistance'
                  )}
                />
                <p>
                  J&apos;ai reçu des indemnités pour accidents du travail ou de
                  l&apos;aide sociale
                </p>
              </div>
              {formData.workIncomes.workerCompensationOrSocialAssistance && (
                <>
                  <hr className="py-2"></hr>
                  <div className="px-8">
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox
                        {...register(
                          'retirementIncomes.welfareSeniorSupplement'
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
                <Checkbox {...register('workIncomes.tipsOrCasualWork')} />
                <p>
                  J&apos;ai reçu des pourboires ou fait du travail occasionnel
                  et je ne recevrai pas de feuillet T4
                </p>
              </div>
            </>
          ) : (
            <>
              <p>
                Il semble que vous n&apos;avez pas travaillé en 2022. Est-ce que
                l&apos;une des situations suivantes vous concerne?
              </p>
              <div className="flex items-center gap-2 py-2">
                <Checkbox
                  {...register(
                    'workIncomes.workerCompensationOrSocialAssistance'
                  )}
                />
                <p>
                  J&apos;ai reçu des indemnités pour accidents du travail ou de
                  l&apos;aide sociale
                </p>
              </div>
              {formData.workIncomes.workerCompensationOrSocialAssistance && (
                <>
                  <hr className="py-2"></hr>
                  <div className="px-8">
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox
                        {...register(
                          'retirementIncomes.welfareSeniorSupplement'
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
                    'workIncomes.employmentInsuranceOrParentalBenefits'
                  )}
                />
                <p>
                  J&apos;ai reçu des prestations d&apos;assurance-emploi ou
                  d&apos;un congé parental, la PCU ou d&apos;autres montants
                </p>
              </div>
              {formData.workIncomes.employmentInsuranceOrParentalBenefits && (
                <>
                  <hr className="py-2"></hr>
                  <div className="px-8">
                    <p>Cochez toutes les cases qui s&apos;appliquent.</p>
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox
                        {...register('workIncomes.employmentInsuranceBenefits')}
                      />
                      <p>
                        T4E / Relevé 6 - Prestations d&apos;assurance-emploi
                      </p>
                    </div>
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox
                        {...register(
                          'retirementIncomes.pensionRetirementAnnuityIncome'
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
