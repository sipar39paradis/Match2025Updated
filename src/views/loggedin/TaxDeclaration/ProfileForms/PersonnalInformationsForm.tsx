import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TaxDeclarationStep } from '../types/TaxDeclarationStep';
import Datepicker from 'react-tailwindcss-datepicker';

type provinceData = {
  province: string;
};

export function PersonnalInformationsForm() {
  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm<provinceData>();
  const navigate = useNavigate();

  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue) => {
    console.log('newValue:', newValue);
    setValue(newValue);
  };

  function onSubmitButton(data) {
    console.log(data);
    navigate(
      `/platform/tax-declaration?step=${TaxDeclarationStep.CONTACT_DETAILS}`
    );
  }

  return (
    <section className="flex flex-col align-baseline items-start w-full">
      <h1>Renseignements personnels</h1>
      <form
        onSubmit={handleSubmit(onSubmitButton)}
        className="flex flex-col items-start mt-4 w-full"
      >
        <div className="relative z-0 w-full my-4 group">
          <input
            type="email"
            name="floating_email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Courriel
          </label>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6 my-4 w-full">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_first_name"
              id="floating_first_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_first_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Prénom
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_last_name"
              id="floating_last_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_last_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Nom de famille
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6 my-4 w-full">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="tel"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}"
              name="floating_ssn"
              id="floating_ssn"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_ssn"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Numéro d&apos;assurance sociale
            </label>
          </div>
          <Datepicker
            containerClassName="h-fit"
            useRange={false}
            asSingle={true}
            value={value}
            onChange={handleValueChange}
            placeholder={'Date de naissance (JJ/MM/AAAA)'}
          />
        </div>

        <p>
          Si vous préparez cette déclaration pour une personne qui est décédée
          durant ou après l&apos;année d&apos;imposition, entrez la date du
          décès.
        </p>
        <Datepicker
          containerClassName="h-fit w-96 my-8"
          useRange={false}
          asSingle={true}
          value={value}
          onChange={handleValueChange}
          placeholder={'JJ/MM/AAAA'}
        />
        <p>
          Outre la présente, est-ce que d&apos;autres déclarations seront
          produites au nom du contribuable décédé pour 2021? (P. ex. une
          déclaration distincte relative aux droits et biens au moment du décès
          ou au revenu d&apos;une fiducie testamentaire, d&apos;une société de
          personnes ou d&apos;une entreprise personnelle.
        </p>
        <fieldset className="flex flex-row m-4">
          <div className="flex items-center">
            <input
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
        <p className="opacity-100">
          NOTE : La déclaration fédérale d&apos;une personne décédée doit être
          imprimée et envoyée par la poste. La déclaration du Québec peut être
          produite avec ImpôtNet Québec.
        </p>
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
        <div className="w-full flex justify-between mt-4">
          <input
            type="submit"
            value="Precedant"
            onClick={() =>
              navigate(
                `/platform/tax-declaration?step=${TaxDeclarationStep.CIVIL_STATUS}`
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
