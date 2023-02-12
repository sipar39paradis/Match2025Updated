import { Checkbox } from 'flowbite-react';
import React, { useState } from 'react';
import { TaxReportFormProps } from '../types/TaxReport/TaxReportFormProps';

export function DonationsForm(props: TaxReportFormProps) {
  const { register } = props;
  const [showDonations, setShowDonations] = useState(false);

  return (
    <>
      <p>
        Avez-vous fait des dons à un organisme de bienfaisance ou à un parti
        politique ?
      </p>
      <fieldset className="flex flex-row m-4">
        <div className="flex items-center">
          <input
            type="radio"
            value="yes"
            onChange={() => setShowDonations(true)}
            checked={showDonations === true}
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
            onChange={() => setShowDonations(false)}
            checked={showDonations === false}
            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
          />
          <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
            Non
          </p>
        </div>
      </fieldset>

      {showDonations === true && (
        <div className="px-8 py-4 mb-4 w-full bg-gray-100 rounded-lg">
          <p>Cochez toutes les cases qui s&apos;appliquent.</p>
          <div className="flex items-center gap-2 py-2">
            <Checkbox {...register('donations.charitableDonations')} />
            <p>J&apos;ai fait des dons de bienfaisance</p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox {...register('donations.politicalContributions')} />
            <p>J&apos;ai fait des contributions politiques</p>
          </div>
        </div>
      )}
    </>
  );
}
