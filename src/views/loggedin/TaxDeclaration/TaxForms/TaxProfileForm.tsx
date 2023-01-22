import { Checkbox, Label } from 'flowbite-react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TaxDeclarationStep } from '../types/TaxDeclarationStep';
import { TaxProfile } from '../types/TaxProfile';

export function TaxProfileForm() {
  const {
    handleSubmit,
    formState: {},
    watch,
    control,
  } = useForm<TaxProfile>();
  const navigate = useNavigate();
  const watchWorkedLastYear = watch('workedLastYear.workedLastYear');
  const watchInvestmentIncome = watch('investmentIncome.investmentIncome');
  const watchSelfEmploymentRentalOtherIncome = watch(
    'selfEmploymentRentalOtherIncome.selfEmploymentRentalOtherIncome'
  );

  function onSubmitButton() {
    navigate(`/platform/tax-declaration?step=${TaxDeclarationStep.REVIEW}`);
  }

  return (
    <section className="flex flex-col align-baseline items-start w-full">
      <h1>Qu&apos;est-ce qui a marqué l&apos;année 2022?</h1>
      <form
        onSubmit={handleSubmit(onSubmitButton)}
        className="flex flex-col items-start mt-4 w-full"
      >
        <p>Avez-vous travaillé en 2021?</p>
        <Controller
          control={control}
          name="workedLastYear.workedLastYear"
          render={({ field: { onChange, value } }) => (
            <fieldset className="flex flex-row m-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  value="no"
                  onChange={() => onChange(true)}
                  checked={value === true}
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="worked-last-year-option-1"
                  className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Oui
                </label>
              </div>
              <div className="flex items-center m-4">
                <input
                  type="radio"
                  value="yes"
                  onChange={() => onChange(false)}
                  checked={value === false}
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="worked-last-year-option-2"
                  className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Non
                </label>
              </div>
            </fieldset>
          )}
        />
        {watchWorkedLastYear !== undefined && (
          <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg">
            {watchWorkedLastYear === true ? (
              <>
                <p>
                  Veuillez indiquer quel genre de travail vous faisiez (cochez
                  toutes les cases qui s&apos;appliquent)
                </p>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember">
                    J&apos;étais un employé (comprend le travail à la
                    commission)
                  </Label>
                </div>
                <hr className="py-2"></hr>
                <div className="px-8">
                  <p>Cochez toutes les cases qui s&apos;appliquent.</p>
                  <div className="flex items-center gap-2 py-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">
                      T4 / Relevé 1 - Revenus d&apos;emploi
                    </Label>
                  </div>
                  <div className="flex items-center gap-2 py-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">
                      T4A / Relevé 2 / Relevé 1 - Pension, retraite, rente,
                      prestations liées à la COVID-19 reçues ou remboursées et
                      autres revenus
                    </Label>
                  </div>
                  <div className="flex items-center gap-2 py-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">
                      T4A-RCA - État des montants distribués d&apos;une
                      convention de retraite
                    </Label>
                  </div>
                  <div className="flex items-center gap-2 py-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">
                      T4PS / Relevé 25 - Régime de participation des employés
                      aux bénéfices
                    </Label>
                  </div>
                  <div className="flex items-center gap-2 py-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">
                      T10 - Facteur d&apos;équivalence rectifié (FER)
                    </Label>
                  </div>
                  <div className="flex items-center gap-2 py-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">
                      Étranger - Revenu provenant de sources étrangères
                    </Label>
                  </div>
                  <div className="flex items-center gap-2 py-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">
                      Relevé 17 - Rémunération provenant d&apos;un emploi à
                      l&apos;extérieur du Canada
                    </Label>
                  </div>
                  <div className="flex items-center gap-2 py-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">
                      Relevé 22 - Revenu d&apos;emploi lié à un régime
                      d&apos;assurance interentreprises
                    </Label>
                  </div>
                  <hr className="py-2"></hr>
                  <p>
                    Est-ce que l&apos;une des situations suivantes vous
                    concerne?
                  </p>
                  <div className="flex items-center gap-2 py-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">
                      J&apos;étais un membre du clergé
                    </Label>
                  </div>
                  <div className="flex items-center gap-2 py-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">
                      Déclarez-vous un paiement forfaitaire rétroactif
                      admissible sur le formulaire T1198?
                    </Label>
                  </div>
                  <div className="flex items-center gap-2 py-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">
                      J&apos;ai reçu un revenu d&apos;un régime
                      d&apos;assurance-salaire
                    </Label>
                  </div>
                  <div className="flex items-center gap-2 py-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">
                      Je veux verser des cotisations facultatives au RPC ou au
                      RRQ
                    </Label>
                  </div>
                  <div className="flex items-center gap-2 py-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">
                      J&apos;ai des actions dans ma compagnie et j&apos;ai des
                      avantages tirés d&apos;une option d&apos;achat
                      d&apos;actions ou j&apos;ai payé de l&apos;impôt sur les
                      excédents à un régime de participation des employés aux
                      bénéfices ou je dois faire un choix pour reporter les
                      avantages tirés d&apos;une option d&apos;achat
                      d&apos;actions.
                    </Label>
                  </div>
                  <hr className="py-2"></hr>
                  <p>Avez-vous des dépenses liées à votre emploi?</p>
                  <Controller
                    control={control}
                    name="retirementIncome.retirementIncome"
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
                          <label
                            htmlFor="worked-last-year-option-1"
                            className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Oui
                          </label>
                        </div>
                        <div className="flex items-center m-4">
                          <input
                            type="radio"
                            value="yes"
                            onChange={() => onChange(false)}
                            checked={value === false}
                            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor="worked-last-year-option-2"
                            className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Non
                          </label>
                        </div>
                      </fieldset>
                    )}
                  />
                  <hr className="py-2"></hr>
                  <div className="mx-8">
                    <p>
                      Les dépenses d&apos;emploi peuvent être classées dans une
                      ou plus d&apos;une des catégories suivantes. Cochez toutes
                      les cases qui s&apos;appliquent.
                    </p>
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox id="remember" />
                      <Label htmlFor="remember">
                        J&apos;ai des dépenses d&apos;emploi, y compris pour du
                        travail à domicile en raison de la COVID-19.
                      </Label>
                    </div>
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox id="remember" />
                      <Label htmlFor="remember">
                        J&apos;ai reçu le remboursement de la TPS/TVH (GST370)
                      </Label>
                    </div>
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox id="remember" />
                      <Label htmlFor="remember">
                        J&apos;avais des frais de repas et de logement en tant
                        qu&apos;employé de transport
                      </Label>
                    </div>
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox id="remember" />
                      <Label htmlFor="remember">
                        J&apos;ai payé des cotisations syndicales ou
                        professionnelles qui ne sont pas indiquées sur mon
                        feuillet T4
                      </Label>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember">
                    J&apos;ai reçu des prestations d&apos;assurance-emploi ou de
                    congé parental, ou j&apos;ai reçu/remboursé des prestations
                    liées à la COVID-19
                  </Label>
                </div>
                <hr className="py-2"></hr>
                <div className="px-8">
                  <p>Cochez toutes les cases qui s&apos;appliquent.</p>
                  <div className="flex items-center gap-2 py-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">
                      T4E / Relevé 6 - Prestations d&apos;assurance-emploi et
                      prestations ou remboursements liés à la COVID-19
                    </Label>
                  </div>
                  <div className="flex items-center gap-2 py-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">
                      T4A / Relevé 2 / Relevé 1 - Pension, retraite, rente et
                      autres revenus, incluant la PCU et le remboursement de
                      prestations liées à la COVID-19
                    </Label>
                  </div>
                </div>

                <div className="flex items-center gap-2 py-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember">
                    J&apos;ai reçu des indemnités pour accidents du travail ou
                    de l&apos;aide sociale
                  </Label>
                </div>
                <hr className="py-2"></hr>
                <div className="px-8">
                  <p>Cochez toutes les cases qui s&apos;appliquent.</p>
                  <div className="flex items-center gap-2 py-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">
                      T5007 / Relevé 5 - Prestations d&apos;assistance sociale
                      ou de la CAT, supplément pour personnes âgées
                    </Label>
                  </div>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember">
                    J&apos;ai reçu des pourboires ou fait du travail occasionnel
                    et je ne recevrai pas de feuillet T4
                  </Label>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember">
                    J&apos;ai participé à un programme de formation au travail
                  </Label>
                </div>
                <div className="px-8">
                  <p>Cochez toutes les cases qui s&apos;appliquent.</p>
                  <div className="flex items-center gap-2 py-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">
                      T4E / Relevé 6 - Prestations d&apos;assurance-emploi
                    </Label>
                  </div>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember">
                    J&apos;ai reçu une rétribution d&apos;une ressource de type
                    familial ou d&apos;une ressource intermédiaire (relevé 29)
                  </Label>
                </div>
              </>
            ) : (
              <>
                <p>
                  Veuillez indiquer quel genre de travail vous faisiez (cochez
                  toutes les cases qui s&apos;appliquent)
                </p>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember">
                    J&apos;ai reçu des indemnités pour accidents du travail ou
                    de l&apos;aide sociale
                  </Label>
                </div>
                <hr className="py-2"></hr>
                <div className="px-8">
                  <p>Cochez toutes les cases qui s&apos;appliquent.</p>
                  <div className="flex items-center gap-2 py-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">
                      T5007 / Relevé 5 - Prestations d&apos;assistance sociale
                      ou de la CAT, supplément pour personnes âgées
                    </Label>
                  </div>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember">
                    J&apos;ai reçu des prestations d&apos;assurance-emploi ou
                    d&apos;un congé parental, la PCU ou d&apos;autres montants
                  </Label>
                </div>
                <hr className="py-2"></hr>
                <div className="px-8">
                  <p>Cochez toutes les cases qui s&apos;appliquent.</p>
                  <div className="flex items-center gap-2 py-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">
                      T4E / Relevé 6 - Prestations d&apos;assurance-emploi
                    </Label>
                  </div>
                  <div className="flex items-center gap-2 py-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">
                      T4A / Relevé 2 / Relevé 1 - Pension, retraite, rente et
                      autres revenus, incluant la PCU
                    </Label>
                  </div>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember">
                    J&apos;ai participé à un programme de formation au travail
                  </Label>
                </div>
                <hr className="py-2"></hr>
                <div className="px-8">
                  <p>Cochez toutes les cases qui s&apos;appliquent.</p>
                  <div className="flex items-center gap-2 py-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">
                      T4E / Relevé 6 - Prestations d&apos;assurance-emploi
                    </Label>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
        <p>
          Avez-vous reçu un revenu de pension ou de retraite ou des prestations
          liées à la COVID-19, ou avez-vous retiré de l&apos;argent d&apos;un
          REER ou d&apos;un FERR? Cela n&apos;inclut pas les cotisations à un
          REER ni à un régime de retraite.
        </p>
        <Controller
          control={control}
          name="retirementIncome.retirementIncome"
          render={({ field: { onChange, value } }) => (
            <fieldset className="flex flex-row m-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  value="no"
                  onChange={() => onChange(true)}
                  checked={value === true}
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="worked-last-year-option-1"
                  className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Oui
                </label>
              </div>
              <div className="flex items-center m-4">
                <input
                  type="radio"
                  value="yes"
                  onChange={() => onChange(false)}
                  checked={value === false}
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="worked-last-year-option-2"
                  className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Non
                </label>
              </div>
            </fieldset>
          )}
        />
        <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg w-full">
          <p>Cochez toutes les cases qui s&apos;appliquent. </p>
          <div className="flex items-center gap-2 py-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">
              T4A (OAS) - Sécurité de la vieillesse
            </Label>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">
              T4A(P) / Relevé 2 - Prestations du Régime de pensions du Canada ou
              du Régime de rentes du Québec
            </Label>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">
              T5007 / Relevé 5 - Prestations d&apos;assistance sociale ou de la
              CAT, supplément pour personnes âgées
            </Label>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">
              T4A / Relevé 2 / Relevé 1 - Pension, retraite, rente, prestations
              liées à la COVID-19 reçues ou remboursées et autres revenus
            </Label>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">
              T4A-RCA - État des montants distribués d&apos;une convention de
              retraite
            </Label>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">
              T4RSP / Relevé 2 - Revenus d&apos;un régime enregistré
              d&apos;épargne-retraite
            </Label>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">
              T4RIF / Relevé 2 - Fonds enregistré de revenu de retraite
            </Label>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">
              Étranger - Revenu provenant de sources étrangères
            </Label>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Relevé 19 - Versements anticipés</Label>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">
              Je dois rajuster mon crédit pour revenu de pension parce que
              j&apos;avais un revenu de pension étranger ou un excédent
              provenant d&apos;un Fonds enregistré de revenu de retraite (FERR)
              ou d&apos;un régime de pension agréé collectif (RPAC)
            </Label>
          </div>
          <p className="mt-4">
            Voulez-vous fractionner votre revenu de pension admissible avec
            votre époux ou conjoint de fait (s&apos;il y a lieu)?
          </p>
          <Controller
            control={control}
            name="investmentIncome.investmentIncome"
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
                  <label
                    htmlFor="worked-last-year-option-1"
                    className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Oui
                  </label>
                </div>
                <div className="flex items-center m-4">
                  <input
                    type="radio"
                    value="yes"
                    onChange={() => onChange(false)}
                    checked={value === false}
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="worked-last-year-option-2"
                    className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Non
                  </label>
                </div>
              </fieldset>
            )}
          />
        </div>
        <p>
          Avez-vous un revenu provenant de placements? Le revenu de placement
          peut inclure les intérêts gagnés sur les placements, la vente
          d&apos;actions ou d&apos;options d&apos;achat d&apos;actions, les
          opérations en cryptomonnaie la vente de biens immobiliers et les frais
          de placement connexes.
        </p>
        <Controller
          control={control}
          name="investmentIncome.investmentIncome"
          render={({ field: { onChange, value } }) => (
            <fieldset className="flex flex-row m-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  value="no"
                  onChange={() => onChange(true)}
                  checked={value === true}
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="worked-last-year-option-1"
                  className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Oui
                </label>
              </div>
              <div className="flex items-center m-4">
                <input
                  type="radio"
                  value="yes"
                  onChange={() => onChange(false)}
                  checked={value === false}
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="worked-last-year-option-2"
                  className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Non
                </label>
              </div>
            </fieldset>
          )}
        />

        {watchInvestmentIncome === true && (
          <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg">
            <p>
              Avez-vous eu un revenu provenant de placements qui est déclaré sur
              un feuillet (par exemple, un T5, T3, T5008, T5013)?
            </p>
            <Controller
              control={control}
              name="investmentIncome.investmentIncome"
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
                    <label
                      htmlFor="worked-last-year-option-1"
                      className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Oui
                    </label>
                  </div>
                  <div className="flex items-center m-4">
                    <input
                      type="radio"
                      value="yes"
                      onChange={() => onChange(false)}
                      checked={value === false}
                      className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="worked-last-year-option-2"
                      className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Non
                    </label>
                  </div>
                </fieldset>
              )}
            />
            <hr className="py-2"></hr>
            <div className="px-8 pb-2">
              <p>Cochez toutes les cases qui s&apos;appliquent.</p>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">
                  T5 / Relevé 3 - Revenus de placements
                </Label>
              </div>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">
                  T3 / Relevé 16 - État des revenus de fiducie (répartitions et
                  attributions)
                </Label>
              </div>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">
                  T5008 / Relevé 18 - Opérations sur titres
                </Label>
              </div>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">
                  T5013 / Relevé 15 - Revenus d&apos;une société de personnes
                </Label>
              </div>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">
                  T101 / Relevé 11 - Frais d&apos;exploration et d&apos;actions
                  accréditives
                </Label>
              </div>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">
                  Relevé 7 - Placements dans un régime d&apos;investissement
                </Label>
              </div>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">
                  Relevé 10 - Crédit d&apos;impôt relatif à un fonds de
                  travailleurs
                </Label>
              </div>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">
                  Relevé 26 - Capital régional et coopératif Desjardins
                </Label>
              </div>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">
                  Étranger - Revenu provenant de sources étrangères
                </Label>
              </div>
            </div>
            <p>
              Avez-vous eu un revenu en intérêts, de dividendes ou d&apos;une
              société de personnes qui n&apos;est PAS déclaré sur un feuillet?
            </p>
            <Controller
              control={control}
              name="investmentIncome.investmentIncome"
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
                    <label
                      htmlFor="worked-last-year-option-1"
                      className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Oui
                    </label>
                  </div>
                  <div className="flex items-center m-4">
                    <input
                      type="radio"
                      value="yes"
                      onChange={() => onChange(false)}
                      checked={value === false}
                      className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="worked-last-year-option-2"
                      className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Non
                    </label>
                  </div>
                </fieldset>
              )}
            />
            <hr className="py-2"></hr>
            <div className="px-8 pb-2">
              <p>Cochez toutes les cases qui s&apos;appliquent.</p>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">
                  J&apos;avais un revenu en intérêts n&apos;apparaissant pas sur
                  un feuillet
                </Label>
              </div>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">
                  J&apos;avais un revenu de dividendes n&apos;apparaissant pas
                  sur un feuillet
                </Label>
              </div>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">
                  J&apos;avais un revenu ou une perte provenant d&apos;une
                  société de personnes et j&apos;étais soit un commanditaire ou
                  je ne participais pas de manière active dans la société de
                  personnes. Je ne recevrai pas de T5013.
                </Label>
              </div>
            </div>
            <p>
              Avez-vous acheté des actions, des obligations, des fonds communs,
              de l&apos;immobilier ou d&apos;autres biens cette année?
            </p>
            <Controller
              control={control}
              name="investmentIncome.investmentIncome"
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
                    <label
                      htmlFor="worked-last-year-option-1"
                      className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Oui
                    </label>
                  </div>
                  <div className="flex items-center m-4">
                    <input
                      type="radio"
                      value="yes"
                      onChange={() => onChange(false)}
                      checked={value === false}
                      className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="worked-last-year-option-2"
                      className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Non
                    </label>
                  </div>
                </fieldset>
              )}
            />
            <p>
              Avez-vous vendu des actions, des obligations, des fonds communs,
              de l&apos;immobilier ou d&apos;autres biens cette année?
            </p>
            <Controller
              control={control}
              name="investmentIncome.investmentIncome"
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
                    <label
                      htmlFor="worked-last-year-option-1"
                      className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Oui
                    </label>
                  </div>
                  <div className="flex items-center m-4">
                    <input
                      type="radio"
                      value="yes"
                      onChange={() => onChange(false)}
                      checked={value === false}
                      className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="worked-last-year-option-2"
                      className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Non
                    </label>
                  </div>
                </fieldset>
              )}
            />
            <hr className="py-2"></hr>
            <div className="px-8 pb-2">
              <p>Cochez toutes les cases qui s&apos;appliquent.</p>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">
                  J&apos;ai vendu des actions du capital d&apos;un fonds commun,
                  y compris des actions cotées à la bourse
                </Label>
              </div>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">
                  J&apos;ai vendu un bien, un terrain ou des bâtiments de
                  location En savoir plus
                </Label>
              </div>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">
                  J&apos;ai vendu des obligations, des débentures, des billets à
                  ordre, des bons du Trésor En savoir plus
                </Label>
              </div>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">
                  J&apos;ai vendu une automobile, un véhicule récréatif, un
                  véhicule tout-terrain, un bateau, un chalet ou de
                  l&apos;ameublement (biens à usage personnel)
                </Label>
              </div>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">
                  J&apos;ai vendu des bijoux, des oeuvres d&apos;art ou des
                  objets de collection comme des timbres, des pièces de monnaie,
                  des livres précieux, des manuscrits rares (biens meubles
                  déterminés)
                </Label>
              </div>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">
                  J&apos;ai vendu ma part d&apos;une société privée sous
                  contrôle canadien (actions admissibles de petite entreprise)
                </Label>
              </div>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">
                  J&apos;ai vendu ma part d&apos;une entreprise agricole ou de
                  pêche au Canada (bien agricole admissible ou bien de pêche
                  admissible)
                </Label>
              </div>
            </div>

            <p>
              Avez-vous acheté ou vendu de la cryptomonnaie, des jetons
              numériques ou d&apos;autres monnaies virtuelles?
            </p>
            <Controller
              control={control}
              name="investmentIncome.investmentIncome"
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
                    <label
                      htmlFor="worked-last-year-option-1"
                      className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Oui
                    </label>
                  </div>
                  <div className="flex items-center m-4">
                    <input
                      type="radio"
                      value="yes"
                      onChange={() => onChange(false)}
                      checked={value === false}
                      className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="worked-last-year-option-2"
                      className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Non
                    </label>
                  </div>
                </fieldset>
              )}
            />
            <hr className="py-2"></hr>
            <div className="px-8 pb-2">
              <p>Cochez toutes les cases qui s&apos;appliquent.</p>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">
                  J&apos;ai acheté des monnaies virtuelles
                </Label>
              </div>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">
                  J&apos;ai vendu des monnaies virtuelles
                </Label>
              </div>
            </div>
          </div>
        )}
        <p>
          Avez-vous un revenu de travailleur autonome, de location ou
          d&apos;autres revenus?
        </p>
        <Controller
          control={control}
          name="selfEmploymentRentalOtherIncome.selfEmploymentRentalOtherIncome"
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
                <label className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Oui
                </label>
              </div>
              <div className="flex items-center m-4">
                <input
                  type="radio"
                  value="yes"
                  onChange={() => onChange(false)}
                  checked={value === false}
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Non
                </label>
              </div>
            </fieldset>
          )}
        />

        {watchSelfEmploymentRentalOtherIncome === true && (
          <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg w-full">
            <div className="flex items-center gap-2 py-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">
                J&apos;étais un travailleur autonome
              </Label>
            </div>
            <hr className="py-2"></hr>
            <div className="px-8 pb-2">
              <p>Cochez toutes les cases qui s&apos;appliquent.</p>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Profession libérale</Label>
              </div>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Commission</Label>
              </div>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Agriculture</Label>
              </div>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Pêche</Label>
              </div>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Autre</Label>
              </div>
            </div>
            <div className="flex items-center gap-2 py-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">
                J&apos;ai un bien locatif qui génère des revenus ou des dépenses
              </Label>
            </div>
            <div className="flex items-center gap-2 py-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">
                J&apos;ai retiré de l&apos;argent d&apos;un REER ou d&apos;un
                FERR
              </Label>
            </div>
            <hr className="py-2"></hr>
            <div className="px-8 pb-2">
              <p>Cochez toutes les cases qui s&apos;appliquent.</p>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">
                  J&apos;ai participé au régime d&apos;accession à la propriété
                </Label>
              </div>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">
                  J&apos;ai participé au régime d&apos;encouragement à
                  l&apos;éducation permanente
                </Label>
              </div>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">
                  J&apos;ai reçu un T4RSP / Relevé 2
                </Label>
              </div>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">
                  J&apos;ai reçu un T4RIF / Relevé 2
                </Label>
              </div>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">
                  J&apos;ai retiré de l&apos;argent d&apos;un FERR de conjoint
                </Label>
              </div>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">
                  J&apos;ai retiré des cotisations au REER ou au FERR non
                  déclarées pour lesquelles je pourrais avoir droit à une
                  déduction (formulaire T746)
                </Label>
              </div>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">
                  J&apos;ai retiré de l&apos;argent d&apos;un REER de conjoint
                </Label>
              </div>
            </div>
            <div className="flex items-center gap-2 py-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">J&apos;ai un revenu scolaire</Label>
            </div>
            <hr className="py-2"></hr>
            <div className="px-8 pb-2">
              <p>Cochez toutes les cases qui s&apos;appliquent.</p>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">
                  T4A / Relevé 2 / Relevé 1 - Pension, retraite, rente et autres
                  revenus (y compris bourses d&apos;études et d&apos;entretien)
                </Label>
              </div>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">
                  T4E / Relevé 6 - Prestations d&apos;assurance-emploi
                </Label>
              </div>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">
                  T4RSP / Relevé 2 - Revenus d&apos;un régime enregistré
                  d&apos;épargne-retraite
                </Label>
              </div>
            </div>
            <div className="flex items-center gap-2 py-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">
                J&apos;ai reçu de l&apos;aide sociale
              </Label>
            </div>
            <hr className="py-2"></hr>
            <div className="px-8 pb-2">
              <p>Cochez toutes les cases qui s&apos;appliquent.</p>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">
                  T5007 / Relevé 5 - Prestations d&apos;assistance sociale ou de
                  la CAT, supplément pour personnes âgées
                </Label>
              </div>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">
                  Relevé 19 - Versements anticipés
                </Label>
              </div>
            </div>
            <div className="flex items-center gap-2 py-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">
                J&apos;ai reçu des prestations d&apos;invalidité ou des
                prestations de décès
              </Label>
            </div>
            <hr className="py-2"></hr>
            <div className="px-8 pb-2">
              <p>Cochez toutes les cases qui s&apos;appliquent.</p>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">
                  T4A(P) / Relevé 2 - Prestations du Régime de pensions du
                  Canada ou du Régime de rentes du Québec
                </Label>
              </div>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">
                  T4A / Relevé 2 / Relevé 1 - Pension, retraite, rente et autres
                  revenus
                </Label>
              </div>
            </div>
            <div className="flex items-center gap-2 py-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">
                J&apos;ai reçu des versements de pension alimentaire au profit
                de l&apos;époux ou conjoint ou de pension alimentaire pour
                enfants
              </Label>
            </div>
            <div className="flex items-center gap-2 py-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">
                J&apos;ai reçu des versements anticipés de la prestation fiscale
                pour le revenu de travail
              </Label>
            </div>
            <hr className="py-2"></hr>
            <div className="px-8 pb-2">
              <p>Cochez toutes les cases qui s&apos;appliquent.</p>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">
                  RC210 - Versements anticipés de la prestation fiscale pour le
                  revenu de travail
                </Label>
              </div>
              <div className="flex items-center gap-2 py-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">
                  Relevé 19 - Versements anticipés
                </Label>
              </div>
            </div>
            <div className="flex items-center gap-2 py-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">
                J&apos;ai reçu d&apos;autres revenus qui ne sont pas inclus
                ailleurs
              </Label>
            </div>
          </div>
        )}
        <p>
          Possédiez-vous ou déteniez-vous des biens étrangers déterminés, dont
          le coût total, à un moment donné durant l&apos;année 2021, s&apos;est
          élevé à plus de 100 000 $ CA?
        </p>
        <fieldset className="flex flex-row m-4">
          <div className="flex items-center">
            <input
              type="radio"
              value="no"
              id="field-worked-last-year-yes"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="worked-last-year-option-1"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Oui
            </label>
          </div>
          <div className="flex items-center m-4">
            <input
              type="radio"
              value="yes"
              id="field-worked-last-year-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="worked-last-year-option-2"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Non
            </label>
          </div>
        </fieldset>
        <p>
          Étiez-vous aux études en 2021 ou avez-vous reporté des dépenses liées
          à vos études des années antérieures?
        </p>
        <fieldset className="flex flex-row m-4">
          <div className="flex items-center">
            <input
              type="radio"
              value="no"
              id="field-worked-last-year-yes"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="worked-last-year-option-1"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Oui
            </label>
          </div>
          <div className="flex items-center m-4">
            <input
              type="radio"
              value="yes"
              id="field-worked-last-year-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="worked-last-year-option-2"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Non
            </label>
          </div>
        </fieldset>
        <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg w-full">
          <p>Cochez toutes les cases qui s&apos;appliquent.</p>
          <div className="flex items-center gap-2 py-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">
              J&apos;avais des frais de scolarité figurant sur un feuillet
              T2202, un relevé 8 ou un feuillet TL11
            </Label>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">
              J&apos;avais d&apos;autres frais de scolarité
            </Label>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">
              J&apos;ai acheté des manuels et des fournitures
            </Label>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">
              J&apos;avais des frais de scolarité dans une année précédente
            </Label>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">
              J&apos;ai reçu une bourse d&apos;études, une subvention ou une
              bourse d&apos;entretien
            </Label>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">
              J&apos;ai ou j&apos;avais un prêt étudiant
            </Label>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">
              J&apos;ai retiré de l&apos;argent d&apos;un REER
            </Label>
          </div>

          <div className="flex items-center gap-2 py-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">
              J&apos;avais des revenus provenant d&apos;un REEE
            </Label>
          </div>
        </div>

        <p>
          Avez-vous des renseignements au sujet d&apos;un REER, d&apos;un RPAC,
          d&apos;un autre régime de pension, du régime d&apos;accession à la
          propriété (RAP), du régime d&apos;encouragement à l&apos;éducation
          permanente ou du SCRT à entrer ?
        </p>
        <fieldset className="flex flex-row m-4">
          <div className="flex items-center">
            <input
              type="radio"
              value="no"
              id="field-dead-person-yes"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Oui
            </label>
          </div>
          <div className="flex items-center m-4">
            <input
              type="radio"
              value="yes"
              id="field-dead-person-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Non
            </label>
          </div>
        </fieldset>
        <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg">
          <p>
            Avez-vous versé des cotisations à un régime de pension comme un
            REER, un RPAC, un régime de pension agréé ou le régime de pension
            déterminé ?
          </p>
          <fieldset className="flex flex-row mx-4">
            <div className="flex items-center">
              <input
                type="radio"
                value="no"
                id="field-dead-person-yes"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Oui
              </label>
            </div>
            <div className="flex items-center m-4">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Non
              </label>
            </div>
          </fieldset>
          <hr className="py-2"></hr>
          <div className="px-8 pb-2">
            <p>Cochez toutes les cases qui s&apos;appliquent.</p>
            <div className="flex items-center gap-2 py-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">
                J&apos;ai versé des cotisations au REER entre mars 2021 et
                février 2022
              </Label>
            </div>
            <div className="flex items-center gap-2 py-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">
                J&apos;ai des cotisations versées à un REER ou des cotisations
                au régime de pension déterminé que j&apos;ai déclarées, mais qui
                sont inutilisées.
              </Label>
            </div>
            <div className="flex items-center gap-2 py-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">
                J&apos;ai versé des cotisations au REER avant mars 2021 et je ne
                les ai pas indiquées dans une déclaration de revenus
              </Label>
            </div>
            <div className="flex items-center gap-2 py-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">
                Je veux reporter mes REER. (Des hésitations? Ne vous inquiétez
                pas. Ce que vous choisissez ici n&apos;est pas définitif.
                S&apos;il n&apos;est pas nécessaire que vous déduisiez tout le
                montant versé à vos REER, TurboImpôt vous en avertira plus
                tard.) En savoir plus
              </Label>
            </div>
            <div className="flex items-center gap-2 py-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">
                J&apos;ai versé ou mon employeur a versé des cotisations au RPAC
                en mon nom, entre janvier 2021 et mars 2022
              </Label>
            </div>
            <div className="flex items-center gap-2 py-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">
                J&apos;ai versé des cotisations à un régime de pension agréé
                (RPA) pour des services courants ou passés
              </Label>
            </div>
            <div className="flex items-center gap-2 py-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">
                J&apos;ai versé des revenus dans une fiducie au profit
                d&apos;athlètes amateurs (FPAA)
              </Label>
            </div>
            <div className="flex items-center gap-2 py-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">
                J&apos;ai versé des cotisations au Régime de pension de la
                Saskatchewan (SPP)
              </Label>
            </div>
          </div>

          <p>
            Avez-vous participé au régime d&apos;encouragement à
            l&apos;éducation permanente (REEP) ou au régime d&apos;accession à
            la propriété (RAP) dans le passé ?
          </p>
          <fieldset className="flex flex-row mx-4">
            <div className="flex items-center">
              <input
                type="radio"
                value="no"
                id="field-dead-person-yes"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Oui
              </label>
            </div>
            <div className="flex items-center m-4">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Non
              </label>
            </div>
          </fieldset>
          <hr className="py-2"></hr>
          <div className="px-8 pb-2">
            <p>Devez-vous verser un remboursement au REEP ou au RAP?</p>
            <fieldset className="flex flex-row mx-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  value="no"
                  id="field-dead-person-yes"
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="country-option-4"
                  className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Oui
                </label>
              </div>
              <div className="flex items-center m-4">
                <input
                  type="radio"
                  value="yes"
                  id="field-dead-person-no"
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="country-option-4"
                  className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Non
                </label>
              </div>
            </fieldset>
            <hr className="py-2"></hr>
            <p>Cochez toutes les cases qui s&apos;appliquent.</p>
            <div className="flex items-center gap-2 py-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">
                J&apos;ai versé un remboursement au RAP
              </Label>
            </div>
            <div className="flex items-center gap-2 py-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">
                J&apos;ai versé un remboursement au REEP
              </Label>
            </div>
            <p className="mt-2">
              Avez-vous retiré de l&apos;argent d&apos;un REER ou d&apos;un
              FERR?
            </p>
            <fieldset className="flex flex-row mx-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  value="no"
                  id="field-dead-person-yes"
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="country-option-4"
                  className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Oui
                </label>
              </div>
              <div className="flex items-center m-4">
                <input
                  type="radio"
                  value="yes"
                  id="field-dead-person-no"
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="country-option-4"
                  className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Non
                </label>
              </div>
            </fieldset>
            <hr className="py-2"></hr>
            <p>Cochez toutes les cases qui s&apos;appliquent.</p>
            <div className="flex items-center gap-2 py-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">
                J&apos;ai reçu un T4RSP / Relevé 2
              </Label>
            </div>
            <div className="flex items-center gap-2 py-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">
                J&apos;ai reçu un T4RIF / Relevé 2
              </Label>
            </div>
          </div>
          <p>
            Avez-vous fait des placements dans une société à capital de risque
            de travailleurs (SCRT)?
          </p>

          <fieldset className="flex flex-row mx-4">
            <div className="flex items-center">
              <input
                type="radio"
                value="no"
                id="field-dead-person-yes"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Oui
              </label>
            </div>
            <div className="flex items-center m-4">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Non
              </label>
            </div>
          </fieldset>
          <hr className="py-2"></hr>
          <div className="px-8">
            <div className="flex items-center gap-2 py-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">
                J&apos;ai reçu un T4RIF / Relevé 2
              </Label>
            </div>
          </div>
          <p>
            Avez-vous versé des cotisations à un régime de retraite des É.-U. ou
            d&apos;un pays étranger offert par un employeur ou à un régime de
            retraite des É.-U. par un frontalier du Canada?
          </p>
          <fieldset className="flex flex-row mx-4">
            <div className="flex items-center">
              <input
                type="radio"
                value="no"
                id="field-dead-person-yes"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Oui
              </label>
            </div>
            <div className="flex items-center m-4">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Non
              </label>
            </div>
          </fieldset>
        </div>
        <p>
          Avez-vous fait des dons à un organisme de bienfaisance ou à un parti
          politique ?
        </p>
        <fieldset className="flex flex-row m-4">
          <div className="flex items-center">
            <input
              type="radio"
              value="no"
              id="field-dead-person-yes"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Oui
            </label>
          </div>
          <div className="flex items-center m-4">
            <input
              type="radio"
              value="yes"
              id="field-dead-person-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Non
            </label>
          </div>
        </fieldset>
        <div className="px-8 py-4 mb-4 w-full bg-gray-100 rounded-lg">
          <p>Cochez toutes les cases qui s&apos;appliquent.</p>
          <div className="flex items-center gap-2 py-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">
              J&apos;ai fait des dons de bienfaisance
            </Label>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">
              J&apos;ai fait des contributions politiques
            </Label>
          </div>
        </div>
        <p>
          Avez-vous engagé des frais de déménagement? Dans l&apos;incertitude,
          répondez Oui. Nous verrons plus tard si vous êtes admissible.
        </p>
        <fieldset className="flex flex-row m-4">
          <div className="flex items-center">
            <input
              type="radio"
              value="no"
              id="field-dead-person-yes"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Oui
            </label>
          </div>
          <div className="flex items-center m-4">
            <input
              type="radio"
              value="yes"
              id="field-dead-person-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Non
            </label>
          </div>
        </fieldset>
        <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg">
          <p>
            Avez-vous engagé des frais de déménagement cette année pour vos
            études ou votre travail ?
          </p>
          <fieldset className="flex flex-row mx-4">
            <div className="flex items-center">
              <input
                type="radio"
                value="no"
                id="field-dead-person-yes"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Oui
              </label>
            </div>
            <div className="flex items-center m-4">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Non
              </label>
            </div>
          </fieldset>
          <p>
            Avez-vous engagé des frais de déménagement que vous n&apos;avez pas
            demandés et que vous reportez d&apos;une année précédente?
          </p>
          <fieldset className="flex flex-row mx-4">
            <div className="flex items-center">
              <input
                type="radio"
                value="no"
                id="field-dead-person-yes"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Oui
              </label>
            </div>
            <div className="flex items-center m-4">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Non
              </label>
            </div>
          </fieldset>
        </div>
        <p>
          Avez-vous engagé des frais médicaux pour vous-même, votre conjoint ou
          des personnes à charge?
        </p>
        <fieldset className="flex flex-row m-4">
          <div className="flex items-center">
            <input
              type="radio"
              value="no"
              id="field-dead-person-yes"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Oui
            </label>
          </div>
          <div className="flex items-center m-4">
            <input
              type="radio"
              value="yes"
              id="field-dead-person-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Non
            </label>
          </div>
        </fieldset>
        <p>
          Avez-vous acheté une maison, un condo, un appartement ou une maison
          mobile cette année? Sélectionnez Oui pour déterminer si vous êtes
          admissible au montant pour l&apos;achat d&apos;une première habitation
          ?
        </p>
        <fieldset className="flex flex-row m-4">
          <div className="flex items-center">
            <input
              type="radio"
              value="no"
              id="field-dead-person-yes"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Oui
            </label>
          </div>
          <div className="flex items-center m-4">
            <input
              type="radio"
              value="yes"
              id="field-dead-person-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Non
            </label>
          </div>
        </fieldset>
        <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg w-full">
          <p>Avez-vous acheté ou vendu un domicile en 2022? </p>
          <fieldset className="flex flex-row m-4">
            <div className="flex items-center">
              <input
                type="radio"
                value="no"
                id="field-dead-person-yes"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Oui
              </label>
            </div>
            <div className="flex items-center m-4">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Non
              </label>
            </div>
          </fieldset>
        </div>
        <p>
          Avez-vous disposé d&apos;une propriété en 2022 qui était votre
          résidence principale pendant la période où vous en étiez propriétaire
          ?
        </p>
        <fieldset className="flex flex-row m-4">
          <div className="flex items-center">
            <input
              type="radio"
              value="no"
              id="field-dead-person-yes"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Oui
            </label>
          </div>
          <div className="flex items-center m-4">
            <input
              type="radio"
              value="yes"
              id="field-dead-person-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Non
            </label>
          </div>
        </fieldset>
        <p>
          Avez-vous engagé des dépenses admissibles vous donnant droit au crédit
          d&apos;impôt pour l&apos;accessibilité domiciliaire?
        </p>
        <fieldset className="flex flex-row m-4">
          <div className="flex items-center">
            <input
              type="radio"
              value="no"
              id="field-dead-person-yes"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Oui
            </label>
          </div>
          <div className="flex items-center m-4">
            <input
              type="radio"
              value="yes"
              id="field-dead-person-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Non
            </label>
          </div>
        </fieldset>
        <p>
          Avez-vous des pertes de cette année ou d&apos;une année précédente à
          déclarer? Vous devez avoir conclu une vente ou être réputé avoir vendu
          pour pouvoir déduire cette perte. Une perte dans un REER n&apos;est
          pas admissible ?
        </p>
        <fieldset className="flex flex-row m-4">
          <div className="flex items-center">
            <input
              type="radio"
              value="no"
              id="field-dead-person-yes"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Oui
            </label>
          </div>
          <div className="flex items-center m-4">
            <input
              type="radio"
              value="yes"
              id="field-dead-person-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Non
            </label>
          </div>
        </fieldset>
        <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg">
          <p>
            Aviez-vous une perte déductible au titre d&apos;un placement
            d&apos;entreprise? Il s&apos;agit généralement d&apos;une perte qui
            se produit quand vous disposez d&apos;une quote-part dans une
            société exploitant une petite entreprise.
          </p>
          <fieldset className="flex flex-row m-4">
            <div className="flex items-center">
              <input
                type="radio"
                value="no"
                id="field-dead-person-yes"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Oui
              </label>
            </div>
            <div className="flex items-center m-4">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Non
              </label>
            </div>
          </fieldset>
          <p>
            Avez-vous des pertes d&apos;années précédentes que vous voulez
            reporter à cette année ou déduire de vos gains cette année?
          </p>
          <fieldset className="flex flex-row m-4">
            <div className="flex items-center">
              <input
                type="radio"
                value="no"
                id="field-dead-person-yes"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Oui
              </label>
            </div>
            <div className="flex items-center m-4">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Non
              </label>
            </div>
          </fieldset>
          <p>
            Avez-vous subi des pertes cette année que vous voulez déduire de
            gains réalisés pendant une année précédente?
          </p>
          <fieldset className="flex flex-row m-4">
            <div className="flex items-center">
              <input
                type="radio"
                value="no"
                id="field-dead-person-yes"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Oui
              </label>
            </div>
            <div className="flex items-center m-4">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Non
              </label>
            </div>
          </fieldset>
        </div>
        <p>
          Étiez-vous pompier volontaire, volontaire en recherche et sauvetage ou
          volontaire à titre de premier répondant de services médicaux
          d&apos;urgence?
        </p>
        <fieldset className="flex flex-row m-4">
          <div className="flex items-center">
            <input
              type="radio"
              value="no"
              id="field-dead-person-yes"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Oui
            </label>
          </div>
          <div className="flex items-center m-4">
            <input
              type="radio"
              value="yes"
              id="field-dead-person-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Non
            </label>
          </div>
        </fieldset>
        <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg">
          <p>
            Avez-vous effectué 200 heures de services admissibles à titre de
            pompier volontaire auprès d&apos;un ou de plusieurs services
            d&apos;incendie au cours de l&apos;année?
          </p>
          <fieldset className="flex flex-row m-4">
            <div className="flex items-center">
              <input
                type="radio"
                value="no"
                id="field-dead-person-yes"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Oui
              </label>
            </div>
            <div className="flex items-center m-4">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Non
              </label>
            </div>
          </fieldset>
          <p>
            Avez-vous effectué 200 heures de services admissibles à titre de
            volontaire en recherche et sauvetage dans l&apos;année?
          </p>
          <fieldset className="flex flex-row m-4">
            <div className="flex items-center">
              <input
                type="radio"
                value="no"
                id="field-dead-person-yes"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Oui
              </label>
            </div>
            <div className="flex items-center m-4">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Non
              </label>
            </div>
          </fieldset>
          <p>
            Entrez le nombre d&apos;heures travaillées en tant que pompier
            volontaire ou bénévole en recherche et sauvetage
          </p>
          <div className="relative z-0 mt-4 mb-6 group w-full">
            <input
              type="number"
              name="floating_canadian_incomes"
              id="floating__canadian_incomes"
              className="block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating__canadian_incomes"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Nombre d&apos;heures
            </label>
          </div>
          <p>
            Note : Vous pouvez combiner les heures de bénévolat en recherche et
            sauvetage et de pompier volontaire pour demander un crédit ou
            l&apos;autre.
          </p>
        </div>
        <p>
          Voulez-vous demander d&apos;autres déductions (abonnement à des
          services de nouvelles numériques, laissez-passer de transport en
          commun, cotisations syndicales ou professionnelles, pension
          alimentaire payée ou remboursement des prestations liées à la
          COVID-19)?
        </p>
        <fieldset className="flex flex-row m-4">
          <div className="flex items-center">
            <input
              type="radio"
              value="no"
              id="field-dead-person-yes"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Oui
            </label>
          </div>
          <div className="flex items-center m-4">
            <input
              type="radio"
              value="yes"
              id="field-dead-person-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Non
            </label>
          </div>
        </fieldset>
        <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg">
          <p>Cochez TOUTES les cases qui s&apos;appliquent. </p>
          <fieldset className="flex flex-col m-4">
            <div className="flex items-center mb-2">
              <input
                type="radio"
                value="no"
                id="field-dead-person-yes"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-4 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                J&apos;ai acheté un abonnement à des services de nouvelles
                numériques
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-4 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                NOUVEAU! J&apos;ai remboursé des prestations liées à la COVID-19
                avant le 1er janvier 2023
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-4 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Je suis un enseignant ou un éducateur de la petite enfance
                admissible et j&apos;ai acheté des fournitures scolaires
                admissibles au cours de l&apos;année
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-4 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                J&apos;ai payé des cotisations syndicales ou professionnelles
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-4 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                J&apos;ai payé une pension alimentaire pour conjoint ou enfants
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-4 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Mon conjoint a des crédits qu&apos;il n&apos;utilisera pas et
                qui peuvent m&apos;être transférés
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-4 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                J&apos;ai payé de l&apos;impôt à un pays étranger
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-4 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Je vis dans une région désignée et je suis admissible à la
                déduction pour les habitants de régions éloignées
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-4 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                J&apos;ai payé de l&apos;impôt sur les opérations forestières
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-4 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Je reporte des paiements d&apos;impôt minimum de remplacement
                d&apos;années passées
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-4 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Je veux réviser mon impôt minimum de remplacement (IMR) pour
                2021. Si vous ne cochez pas cette case et que l&apos;IMR vous
                concerne, nous vous inviterons à réviser votre déclaration plus
                tard.
              </label>
            </div>{' '}
            <div className="flex items-center mb-2">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-4 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                J&apos;avais d&apos;autres déductions non incluses ci-dessus
              </label>
            </div>{' '}
            <div className="flex items-center mb-2">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-4 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Aucun de ces choix
              </label>
            </div>
          </fieldset>
        </div>
        <p>Avez-vous versé des acomptes provisionnels en 2022?</p>
        <fieldset className="flex flex-row m-4">
          <div className="flex items-center">
            <input
              type="radio"
              value="no"
              id="field-dead-person-yes"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Oui
            </label>
          </div>
          <div className="flex items-center m-4">
            <input
              type="radio"
              value="yes"
              id="field-dead-person-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Non
            </label>
          </div>
        </fieldset>
        <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg">
          <p>
            Entrez les accomptes provisionnels trimestriels que vous avez versés
            à l&apos;ARC en 2022. N&apos;incluez pas les paiments de votre impôt
            de 2021.
          </p>
          <div className="relative z-0 mt-4 mb-6 group w-full">
            <input
              type="number"
              name="floating_canadian_incomes"
              id="floating__canadian_incomes"
              className="block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating__canadian_incomes"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Montant
            </label>
          </div>
        </div>
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
    </section>
  );
}
