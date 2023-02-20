import React from 'react';
import { Controller } from 'react-hook-form';
import { RespondentFormProps } from '../types/Respondent/RespondentFormProps';

export function SoldMainHomeForm(props: RespondentFormProps) {
  const { control, formData } = props;

  return (
    <>
      <p>
        Avez-vous disposé d&apos;une propriété en 2022 qui était votre résidence
        principale pendant la période où vous en étiez propriétaire ?
      </p>
      <Controller
        control={control}
        name="taxReport.soldHome"
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

      {formData?.taxReport?.soldHome && (
        <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg w-full">
          <p className="opacity-100 pb-2">
            Votre préparateur entrera en contact avec vous pour obtenir plus de
            renseignements.
          </p>
        </div>
      )}
    </>
  );
}
