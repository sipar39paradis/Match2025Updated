import React, { useState } from 'react';

export function MovingExpensesForm() {
  const [showMovingExpenses, setShowMovingExpenses] = useState(false);

  return (
    <>
      <p>
        Avez-vous engagé des frais de déménagement? Dans l&apos;incertitude,
        répondez Oui. Nous verrons plus tard si vous êtes admissible.
      </p>

      <fieldset className="flex flex-row m-4">
        <div className="flex items-center">
          <input
            type="radio"
            value="yes"
            onChange={() => setShowMovingExpenses(true)}
            checked={showMovingExpenses === true}
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
            onChange={() => setShowMovingExpenses(false)}
            checked={showMovingExpenses === false}
            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
          />
          <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
            Non
          </p>
        </div>
      </fieldset>

      {showMovingExpenses === true && (
        <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg">
          <p>
            Avez-vous engagé des frais de déménagement cette année pour vos
            études ou votre travail ?
          </p>
          <fieldset className="flex flex-row mx-4">
            <div className="flex items-center">
              <input
                type="radio"
                value="yes"
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
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
                Non
              </p>
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
                value="yes"
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
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
                Non
              </p>
            </div>
          </fieldset>
        </div>
      )}
    </>
  );
}
