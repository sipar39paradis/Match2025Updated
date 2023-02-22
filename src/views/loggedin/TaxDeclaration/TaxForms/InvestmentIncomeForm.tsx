import { Checkbox } from 'flowbite-react';
import React from 'react';
import { Controller } from 'react-hook-form';
import { TooltipWithIcon } from '../../../../components/common/TooltipWithIcon';
import { RespondentFormProps } from '../types/Questionnaire/QuestionnaireFormProp';

export function InvestmentIncomeForm(props: RespondentFormProps) {
  const { register, formData, control } = props;

  return (
    <>
      <p className="font-semibold">
        Avez-vous un revenu provenant de placements? Le revenu de placement peut
        inclure les intérêts gagnés sur les placements, la vente d&apos;actions
        ou d&apos;options d&apos;achat d&apos;actions, les opérations en
        cryptomonnaie la vente de biens immobiliers et les frais de placement
        connexes?
      </p>
      <Controller
        control={control}
        name="taxReport.investmentIncomes.investmentIncomes"
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

      {formData?.taxReport?.investmentIncomes?.investmentIncomes && (
        <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg">
          <p className="font-semibold">
            Avez-vous eu un revenu provenant de placements qui est déclaré sur
            un feuillet (par exemple, un T5, T3, T5008, T5013)?
            <TooltipWithIcon text="Si vous avez des placements hors REER ou CELI, il est fort probable que vous ayez ce type de revenu. Vous pouvez communiquer avec votre conseiller en placements pour avoir votre trousse fiscale que vous pourrez nous transmette afin qu’on traite correctement ce type de revenu. "></TooltipWithIcon>
          </p>
          <Controller
            control={control}
            name="taxReport.investmentIncomes.reportedInvestmentIncome"
            render={({ field: { onChange, value } }) => (
              <fieldset className="flex flex-row mx-4">
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

          {formData?.taxReport?.investmentIncomes?.reportedInvestmentIncome && (
            <>
              <hr className="py-2"></hr>
              <div className="px-8 pb-2">
                <p>Cochez toutes les cases qui s&apos;appliquent.</p>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register(
                      'taxReport.investmentIncomes.declaredInvestmentIncome'
                    )}
                  />
                  <p>T5 / Relevé 3 - Revenus de placements</p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register('taxReport.investmentIncomes.trustIncome')}
                  />
                  <p>
                    T3 / Relevé 16 - État des revenus de fiducie (répartitions
                    et attributions)
                  </p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register(
                      'taxReport.investmentIncomes.securityTransactions'
                    )}
                  />
                  <p>T5008 / Relevé 18 - Opérations sur titres</p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register(
                      'taxReport.investmentIncomes.partnershipIncomes'
                    )}
                  />
                  <p>
                    T5013 / Relevé 15 - Revenus d&apos;une société de personnes
                  </p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register(
                      'taxReport.investmentIncomes.explorationAndShareExpenses'
                    )}
                  />
                  <p>
                    T101 / Relevé 11 - Frais d&apos;exploration et
                    d&apos;actions accréditives
                  </p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register(
                      'taxReport.investmentIncomes.investmentPlanIncome'
                    )}
                  />
                  <p>
                    Relevé 7 - Placements dans un régime d&apos;investissement
                  </p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register(
                      'taxReport.taxDeductions.labourSponsoredFundTaxCredits'
                    )}
                  />
                  <p>
                    Relevé 10 - Crédit d&apos;impôt relatif à un fonds de
                    travailleurs
                  </p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register('taxReport.investmentIncomes.desjardins')}
                  />
                  <p>Relevé 26 - Capital régional et coopératif Desjardins</p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register('taxReport.investmentIncomes.foreignIncomes')}
                  />
                  <p>Étranger - Revenu provenant de sources étrangères</p>
                </div>
              </div>
            </>
          )}
          <p className="font-semibold">
            Avez-vous eu un revenu en intérêts, de dividendes ou d&apos;une
            société de personnes qui n&apos;est PAS déclaré sur un feuillet?
          </p>
          <Controller
            control={control}
            name="taxReport.investmentIncomes.nonDeclaredInterestDividendPartnershipIncome"
            render={({ field: { onChange, value } }) => (
              <fieldset className="flex flex-row mx-4">
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

          {formData?.taxReport?.investmentIncomes
            ?.nonDeclaredInterestDividendPartnershipIncome && (
            <>
              <hr className="py-2"></hr>
              <div className="px-8 pb-2">
                <p>Cochez toutes les cases qui s&apos;appliquent.</p>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register('taxReport.investmentIncomes.interestSlip')}
                  />
                  <p>
                    J&apos;avais un revenu en intérêts n&apos;apparaissant pas
                    sur un feuillet
                  </p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register('taxReport.investmentIncomes.dividendSlip')}
                  />
                  <p>
                    J&apos;avais un revenu de dividendes n&apos;apparaissant pas
                    sur un feuillet
                  </p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register(
                      'taxReport.investmentIncomes.partnershipIncomes'
                    )}
                  />
                  <p>
                    J&apos;avais un revenu ou une perte provenant d&apos;une
                    société de personnes et j&apos;étais soit un commanditaire
                    ou je ne participais pas de manière active dans la société
                    de personnes. Je ne recevrai pas de T5013.
                  </p>
                </div>
              </div>
            </>
          )}
          <p className="font-semibold">
            Avez-vous acheté des actions, des obligations, des fonds communs, de
            l&apos;immobilier ou d&apos;autres biens cette année?
          </p>
          <Controller
            control={control}
            name="taxReport.investmentIncomes.boughtAssets"
            render={({ field: { onChange, value } }) => (
              <fieldset className="flex flex-row mx-4">
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
          <p className="font-semibold">
            Avez-vous vendu des actions, des obligations, des fonds communs, de
            l&apos;immobilier ou d&apos;autres biens cette année?
          </p>
          <Controller
            control={control}
            name="taxReport.investmentIncomes.soldAssets"
            render={({ field: { onChange, value } }) => (
              <fieldset className="flex flex-row mx-4">
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

          {formData?.taxReport?.investmentIncomes?.soldAssets && (
            <>
              <hr className="py-2"></hr>
              <div className="px-8 pb-2">
                <p>Cochez toutes les cases qui s&apos;appliquent.</p>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register('taxReport.investmentIncomes.soldStocks')}
                  />
                  <p>
                    J&apos;ai vendu des actions du capital d&apos;un fonds
                    commun, y compris des actions cotées à la bourse
                  </p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register('taxReport.investmentIncomes.soldRealEstate')}
                  />
                  <p>
                    J&apos;ai vendu un bien, un terrain ou des bâtiments de
                    location En savoir plus
                  </p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register('taxReport.investmentIncomes.soldBonds')}
                  />
                  <p>
                    J&apos;ai vendu des obligations, des débentures, des billets
                    à ordre, des bons du Trésor En savoir plus
                  </p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register(
                      'taxReport.investmentIncomes.soldGoodForPersonalUse'
                    )}
                  />
                  <p>
                    J&apos;ai vendu une automobile, un véhicule récréatif, un
                    véhicule tout-terrain, un bateau, un chalet ou de
                    l&apos;ameublement (biens à usage personnel)
                  </p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register(
                      'taxReport.investmentIncomes.soldSpecificMovableProperty'
                    )}
                  />
                  <p>
                    J&apos;ai vendu des bijoux, des oeuvres d&apos;art ou des
                    objets de collection comme des timbres, des pièces de
                    monnaie, des livres précieux, des manuscrits rares (biens
                    meubles déterminés)
                  </p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register(
                      'taxReport.investmentIncomes.soldEligibleSmallBusinessShares'
                    )}
                  />
                  <p>
                    J&apos;ai vendu ma part d&apos;une société privée sous
                    contrôle canadien (actions admissibles de petite entreprise)
                  </p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register(
                      'taxReport.investmentIncomes.soldFarmFishingProperty'
                    )}
                  />
                  <p>
                    J&apos;ai vendu ma part d&apos;une entreprise agricole ou de
                    pêche au Canada (bien agricole admissible ou bien de pêche
                    admissible)
                  </p>
                </div>
              </div>
            </>
          )}

          <p className="font-semibold">
            Avez-vous acheté ou vendu de la cryptomonnaie, des jetons numériques
            ou d&apos;autres monnaies virtuelles?
          </p>
          <Controller
            control={control}
            name="taxReport.investmentIncomes.cryptoCurrency"
            render={({ field: { onChange, value } }) => (
              <fieldset className="flex flex-row mx-4">
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

          {formData?.taxReport?.investmentIncomes?.cryptoCurrency && (
            <>
              <hr className="py-2"></hr>
              <div className="px-8 pb-2">
                <p>Cochez toutes les cases qui s&apos;appliquent.</p>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register('taxReport.investmentIncomes.boughtCrypto')}
                  />
                  <p>J&apos;ai acheté des monnaies virtuelles</p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register('taxReport.investmentIncomes.soldCrypto')}
                  />
                  <p>J&apos;ai vendu des monnaies virtuelles</p>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
