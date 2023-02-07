import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TaxDeclarationStep } from '../types/TaxReport/TaxDeclarationStep';

export function DependentsForm() {
  const {
    handleSubmit,
    formState: {},
  } = useForm();
  const navigate = useNavigate();

  function onSubmitButton(data) {
    navigate(`/platform/questionnaire?step=${TaxDeclarationStep.TAX_PROFILE}`);
  }
  return (
    <section className="flex flex-col align-baseline items-start w-full">
      <h1>Avez-vous des enfants</h1>
      <p className="my-4">
        Vos enfants valent leur pesant d&apos;or. Nous allons essayer
        d&apos;obtenir un crédit d&apos;impôt pour chaque enfant que vous
        soutenez
      </p>

      <form
        onSubmit={handleSubmit(onSubmitButton)}
        className="flex flex-col items-start mt-4 w-full"
      >
        <fieldset className="flex flex-row mx-4">
          <div className="flex items-center">
            <input
              type="radio"
              value="no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Oui, j&apos;ai des enfants
            </label>
          </div>
          <div className="flex items-center m-4">
            <input
              type="radio"
              value="yes"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Non, ce n&apos;est pas le cas.
            </label>
          </div>
        </fieldset>
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
        <div className="w-full flex justify-between mt-4">
          <input
            type="submit"
            value="Precedant"
            onClick={() =>
              navigate(
                `/platform/questionnaire?step=${TaxDeclarationStep.CIVIL_STATUS_CHANGE}`
              )
            }
            className="bg-[#222C40] hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded cursor-pointer"
          />
          <input
            type="submit"
            value="Continuez"
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          />
        </div>
      </form>
    </section>
  );
}
