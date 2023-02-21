import { Checkbox } from 'flowbite-react/lib/esm/components/FormControls';
import React from 'react';
import { Controller } from 'react-hook-form';
import { TooltipWithIcon } from '../../../../components/common/TooltipWithIcon';
import { RespondentFormProps } from '../types/Questionnaire/QuestionnaireFormProp';

export function RetirementIncomesForm(props: RespondentFormProps) {
  const { control, register, formData } = props;

  return (
    <>
      <p className="font-semibold">
        Avez-vous reçu un revenu de pension ou de retraite, ou avez-vous retiré
        de l&apos;argent d&apos;un REER ou d&apos;un FERR?
      </p>

      <Controller
        control={control}
        name="taxReport.retirementIncomes.retirementIncomes"
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

      {formData?.taxReport?.retirementIncomes?.retirementIncomes && (
        <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg w-full">
          <p>Cochez toutes les cases qui s&apos;appliquent. </p>
          <div className="flex items-center gap-2 py-2">
            <Checkbox
              {...register('taxReport.retirementIncomes.oldAgeSecurity')}
            />
            <p>T4A (OAS) - Sécurité de la vieillesse</p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox
              {...register(
                'taxReport.retirementIncomes.canadaPensionPlanOrQuebecPensionPlanBenefits'
              )}
            />
            <p>
              T4A(P) / Relevé 2 - Prestations du Régime de pensions du Canada ou
              du Régime de rentes du Québec
            </p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox
              {...register(
                'taxReport.retirementIncomes.welfareSeniorSupplement'
              )}
            />
            <p>
              T5007 / Relevé 5 - Prestations d&apos;assistance sociale ou de la
              CAT, supplément pour personnes âgées
            </p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox
              {...register(
                'taxReport.retirementIncomes.pensionRetirementAnnuityIncome'
              )}
            />
            <p>
              T4A / Relevé 2 / Relevé 1 - Pension, retraite, rente et autres
              revenus
            </p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox
              {...register(
                'taxReport.retirementIncomes.statementOfDistribution'
              )}
            />
            <p>
              T4A-RCA - État des montants distribués d&apos;une convention de
              retraite
            </p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox
              {...register(
                'taxReport.retirementIncomes.registeredRetirementsavingsPlan'
              )}
            />
            <p>
              T4RSP / Relevé 2 - Revenus d&apos;un régime enregistré
              d&apos;épargne-retraite
            </p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox
              {...register(
                'taxReport.retirementIncomes.registeredRetirementIncomeFund'
              )}
            />
            <p>T4RIF / Relevé 2 - Fonds enregistré de revenu de retraite</p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox
              {...register('taxReport.retirementIncomes.foreignIncome')}
            />
            <p>Étranger - Revenu provenant de sources étrangères</p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox
              {...register('taxReport.retirementIncomes.advancePayments')}
            />
            <p>Relevé 19 - Versements anticipés</p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox
              {...register('taxReport.retirementIncomes.creditAdjustment')}
            />
            <p>
              Je dois rajuster mon crédit pour revenu de pension parce que
              j&apos;avais un revenu de pension étranger ou un excédent
              provenant d&apos;un Fonds enregistré de revenu de retraite (FERR)
              ou d&apos;un régime de pension agréé collectif (RPAC)
            </p>
          </div>
          <p className="mt-4 font-semibold">
            Voulez-vous fractionner votre revenu de pension admissible avec
            votre époux ou conjoint de fait (s&apos;il y a lieu)?
            <TooltipWithIcon text="Si vous êtes marié ou que vous vivez en union de fait, si l’un de vous reçoit un revenu de pensions ou si vous recevez tous les deux un revenu de pension, il est possible pour vous d’optimiser votre déclaration en fractionnant le revenu de façon 'à avoir une économie d’impôts pour le couple"></TooltipWithIcon>
          </p>
          <Controller
            control={control}
            name="taxReport.retirementIncomes.splitPensionIncome"
            render={({ field: { onChange, value } }) => (
              <fieldset className="flex flex-row m-x4">
                <div className="flex items-center">
                  <input
                    type="radio"
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
