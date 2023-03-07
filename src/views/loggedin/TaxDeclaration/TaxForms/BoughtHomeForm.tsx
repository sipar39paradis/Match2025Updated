import React, { useContext } from 'react';
import { Controller } from 'react-hook-form';
import { TooltipWithIcon } from '../../../../components/common/TooltipWithIcon';
import {
  QuestionnaireContext,
  QuestionnaireContextType,
} from '../context/QuestionnaireContext';

export function BoughtHomeForm() {
  const { control, formData } = useContext(
    QuestionnaireContext
  ) as QuestionnaireContextType;

  return (
    <>
      <p className="font-semibold">
        Avez-vous acheté une maison, un condo, un appartement ou une maison
        mobile cette année?
        <TooltipWithIcon text="Sachez que si vous ou votre conjoint (le cas échéant) n’avez jamais possédé une maison, un condo, un appartement ou une maison mobile, vous pourriez vous qualifier pour obtenir le montant pour l’achat d’une habitation qui pourrait représenter un remboursement d’impôts allant jusqu’à 3 000$. Si vous n’êtes pas certain de votre admissibilité, cochez oui et votre préparateur entrera en contact avec vous"></TooltipWithIcon>
      </p>
      <Controller
        control={control}
        name="taxReport.boughHome.boughHome"
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
      {formData?.taxReport?.boughHome?.boughHome && (
        <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg w-full">
          <p className="font-semibold pb-2">
            Votre préparateur entrera en contact avec vous pour obtenir plus de
            renseignements.
          </p>
        </div>
      )}
    </>
  );
}
