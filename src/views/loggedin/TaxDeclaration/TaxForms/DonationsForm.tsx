import { Checkbox } from 'flowbite-react';
import React from 'react';
import { Controller } from 'react-hook-form';
import { TaxProfileFormProps } from '../types/TaxProfileFormProps';

export function DonationsForm(props: TaxProfileFormProps) {
  const { control, formData } = props;

  return (
    <>
      <p>
        Avez-vous fait des dons à un organisme de bienfaisance ou à un parti
        politique ?
      </p>
      <Controller
        control={control}
        name="donations.donations"
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
      {formData?.donations?.donations === true && (
        <div className="px-8 py-4 mb-4 w-full bg-gray-100 rounded-lg">
          <p>Cochez toutes les cases qui s&apos;appliquent.</p>
          <div className="flex items-center gap-2 py-2">
            <Checkbox />
            <p>J&apos;ai fait des dons de bienfaisance</p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox />
            <p>J&apos;ai fait des contributions politiques</p>
          </div>
        </div>
      )}
    </>
  );
}
