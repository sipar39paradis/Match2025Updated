import { Checkbox } from 'flowbite-react';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { TaxProfileFormProps } from '../types/TaxReport/TaxProfileFormProps';

export function RetirementIncomesForm(props: TaxProfileFormProps) {
  const { control, register } = props;

  const [showRetirementIncomes, setShowRetirementIncomes] = useState(false);

  return (
    <>
      <p>
        Avez-vous reçu un revenu de pension ou de retraite ou des prestations
        liées à la COVID-19, ou avez-vous retiré de l&apos;argent d&apos;un REER
        ou d&apos;un FERR? Cela n&apos;inclut pas les cotisations à un REER ni à
        un régime de retraite.
      </p>

      <fieldset className="flex flex-row m-4">
        <div className="flex items-center">
          <input
            type="radio"
            value="no"
            onChange={() => setShowRetirementIncomes(true)}
            checked={showRetirementIncomes === true}
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
            onChange={() => setShowRetirementIncomes(false)}
            checked={showRetirementIncomes === false}
            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
          />
          <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
            Non
          </p>
        </div>
      </fieldset>

      {showRetirementIncomes === true && (
        <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg w-full">
          <p>Cochez toutes les cases qui s&apos;appliquent. </p>
          <div className="flex items-center gap-2 py-2">
            <Checkbox {...register('retirementIncomes.oldAgeSecurity')} />
            <p>T4A (OAS) - Sécurité de la vieillesse</p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox
              {...register(
                'retirementIncomes.canadaPensionPlanOrQuebecPensionPlanBenefits'
              )}
            />
            <p>
              T4A(P) / Relevé 2 - Prestations du Régime de pensions du Canada ou
              du Régime de rentes du Québec
            </p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox
              {...register('retirementIncomes.welfareSeniorSupplement')}
            />
            <p>
              T5007 / Relevé 5 - Prestations d&apos;assistance sociale ou de la
              CAT, supplément pour personnes âgées
            </p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox
              {...register('retirementIncomes.pensionRetirementAnnuityIncome')}
            />
            <p>
              T4A / Relevé 2 / Relevé 1 - Pension, retraite, rente, prestations
              liées à la COVID-19 reçues ou remboursées et autres revenus
            </p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox
              {...register('retirementIncomes.statementOfDistribution')}
            />
            <p>
              T4A-RCA - État des montants distribués d&apos;une convention de
              retraite
            </p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox
              {...register('retirementIncomes.registeredRetirementsavingsPlan')}
            />
            <p>
              T4RSP / Relevé 2 - Revenus d&apos;un régime enregistré
              d&apos;épargne-retraite
            </p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox
              {...register('retirementIncomes.registeredRetirementIncomeFund')}
            />
            <p>T4RIF / Relevé 2 - Fonds enregistré de revenu de retraite</p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox {...register('retirementIncomes.foreignIncome')} />
            <p>Étranger - Revenu provenant de sources étrangères</p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox {...register('retirementIncomes.advancePayments')} />
            <p>Relevé 19 - Versements anticipés</p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox {...register('retirementIncomes.creditAdjustment')} />
            <p>
              Je dois rajuster mon crédit pour revenu de pension parce que
              j&apos;avais un revenu de pension étranger ou un excédent
              provenant d&apos;un Fonds enregistré de revenu de retraite (FERR)
              ou d&apos;un régime de pension agréé collectif (RPAC)
            </p>
          </div>
          <p className="mt-4">
            Voulez-vous fractionner votre revenu de pension admissible avec
            votre époux ou conjoint de fait (s&apos;il y a lieu)?
          </p>
          <Controller
            control={control}
            name="retirementIncomes.splitPensionIncome"
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
        </div>
      )}
    </>
  );
}
