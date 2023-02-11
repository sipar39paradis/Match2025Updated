import React, { useState } from 'react';
import { TaxProfileFormProps } from '../types/TaxReport/TaxProfileFormProps';

export function VolunteerFirefighterForm(props: TaxProfileFormProps) {
  const { register } = props;
  const [showVolunteerFirefighterForm, setVolunteerFirefighterForm] =
    useState(false);

  return (
    <>
      <p>
        Étiez-vous pompier volontaire, volontaire en recherche et sauvetage ou
        volontaire à titre de premier répondant de services médicaux
        d&apos;urgence?
      </p>
      <fieldset className="flex flex-row m-4">
        <div className="flex items-center">
          <input
            type="radio"
            value="yes"
            onClick={() => setVolunteerFirefighterForm(true)}
            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            checked={showVolunteerFirefighterForm}
          />
          <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
            Oui
          </p>
        </div>
        <div className="flex items-center m-4">
          <input
            type="radio"
            value="no"
            onClick={() => setVolunteerFirefighterForm(false)}
            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            checked={!showVolunteerFirefighterForm}
          />
          <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
            Non
          </p>
        </div>
      </fieldset>
      {showVolunteerFirefighterForm && (
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
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
                Non
              </p>
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
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
                Non
              </p>
            </div>
          </fieldset>
          <p>
            Entrez le nombre d&apos;heures travaillées en tant que pompier
            volontaire ou bénévole en recherche et sauvetage
          </p>
          <div className="relative z-0 mt-4 mb-6 group w-full">
            <input
              {...register('firefighterOrSearchAndRescueVolunteer')}
              type="number"
              className="block py-2.5 px-0  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
              placeholder=" "
            />
            <p className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Nombre d&apos;heures
            </p>
          </div>
          <p>
            Note : Vous pouvez combiner les heures de bénévolat en recherche et
            sauvetage et de pompier volontaire pour demander un crédit ou
            l&apos;autre.
          </p>
        </div>
      )}
    </>
  );
}
