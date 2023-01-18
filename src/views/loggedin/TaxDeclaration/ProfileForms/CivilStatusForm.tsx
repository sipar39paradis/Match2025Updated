import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TaxDeclarationStep } from '../types/TaxDeclarationStep';

type profileData = {
  civilStatus: string;
  together: boolean;
  deadPerson: boolean;
};

export function CivilStatusForm() {
  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm<profileData>();
  const navigate = useNavigate();

  function onSubmitButton(data) {
    console.log(data);
    navigate(
      `/platform/tax-declaration?step=${TaxDeclarationStep.PERSONAL_INFORMATIONS}`
    );
  }

  return (
    <section className="flex flex-col items-start">
      <h1>Quel est votre état civil</h1>
      <h2>Le 31 décembre 2022 vous étiez : </h2>
      <form
        onSubmit={handleSubmit(onSubmitButton)}
        className="flex flex-col items-start"
      >
        <fieldset className="m-4">
          <legend className="sr-only">État civil</legend>

          <div className="flex items-center mb-4">
            <input
              {...register('civilStatus')}
              type="radio"
              value="married"
              id="field-married"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-1"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Marié(e)
            </label>
          </div>

          <div className="flex items-center mb-4">
            <input
              {...register('civilStatus')}
              type="radio"
              value="common-law"
              id="field-common-law"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-2"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Conjoint(e) de fait
            </label>
          </div>

          <div className="flex items-center mb-4">
            <input
              {...register('civilStatus')}
              type="radio"
              value="widow"
              id="field-widow"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-3"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Veuf(ve)
            </label>
          </div>

          <div className="flex items-center mb-4">
            <input
              {...register('civilStatus')}
              type="radio"
              value="divorced"
              id="field-divorced"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Divorcé(e)
            </label>
          </div>

          <div className="flex items-center mb-4">
            <input
              {...register('civilStatus')}
              type="radio"
              value="separated"
              id="field-separated"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Séparé(e)
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              {...register('civilStatus')}
              type="radio"
              value="single"
              id="field-single"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Célibataire
            </label>
          </div>
        </fieldset>
        <h1 className="font-bold">
          Comment voulez-vous préparer vos déclarations?
        </h1>
        <h2>
          En préparant vos déclarations ensemble, nous pouvons optimiser les
          crédits et les déductions auxquels vous et votre époux ou conjoint
          avez droit.
        </h2>
        <h2>
          Nous vous suggérons de préparer vos déclarations ensemble parce que le
          résultat sera soit le même ou plus avantageux que si vous prépariez
          vos déclarations séparément.
        </h2>
        <h2>Voulez-vous préparer vos déclarations ensemble?</h2>
        <fieldset className="flex flex-row">
          <div className="flex items-center m-4">
            <input
              {...register('together')}
              type="radio"
              value="no"
              id="field-together-yes"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Oui
            </label>
          </div>
          <div className="flex items-center m-4">
            <input
              {...register('together')}
              type="radio"
              value="yes"
              id="field-together-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Non
            </label>
          </div>
        </fieldset>
        <h2>
          Préparez-vous l&apos;une de ces déclarations ou les deux pour une
          personne qui est décédée durant ou après l&apos;année
          d&apos;imposition?
        </h2>
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
        <fieldset className="flex flex-row">
          <div className="flex items-center m-4">
            <input
              {...register('together')}
              type="radio"
              value="no"
              id="field-dead-person-yes"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Oui
            </label>
          </div>
          <div className="flex items-center m-4">
            <input
              {...register('together')}
              type="radio"
              value="yes"
              id="field-dead-person-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Non
            </label>
          </div>
        </fieldset>
        <input
          type="submit"
          value="Continuez"
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded cursor-pointer self-end"
        />
      </form>
    </section>
  );
}
