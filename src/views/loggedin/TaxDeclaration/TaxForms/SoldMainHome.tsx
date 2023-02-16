import React, { useState } from 'react';

export function SoldMainHomeForm() {
  const [showSoldMainHomeForm, setSoldMainHomeForm] = useState(false);

  return (
    <>
      <p>
        Avez-vous disposé d&apos;une propriété en 2022 qui était votre résidence
        principale pendant la période où vous en étiez propriétaire ?
      </p>
      <fieldset className="flex flex-row m-4">
        <div className="flex items-center">
          <input
            type="radio"
            value="yes"
            onChange={() => setSoldMainHomeForm(true)}
            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            checked={showSoldMainHomeForm}
          />
          <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
            Oui
          </p>
        </div>
        <div className="flex items-center m-4">
          <input
            type="radio"
            value="no"
            onChange={() => setSoldMainHomeForm(false)}
            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            checked={!showSoldMainHomeForm}
          />
          <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
            Non
          </p>
        </div>
      </fieldset>
      {showSoldMainHomeForm && (
        <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg w-full">
          <p className="opacity-100 pb-2">
            Votre préparateur va entre en contact avec vous pour avoir plus de
            renseignements.
          </p>
        </div>
      )}
    </>
  );
}
