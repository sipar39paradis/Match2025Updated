import React, { useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TaxDeclarationStep } from '../types/TaxReport/TaxDeclarationStep';
import Datepicker from 'react-tailwindcss-datepicker';
import { PersonalInformations } from '../types/Profile/PersonnalInformations';
import Fade from 'react-reveal';

export function PersonnalInformationsForm() {
  const {
    register,
    handleSubmit,
    formState: {},
    control,
  } = useForm<PersonalInformations>();
  const navigate = useNavigate();

  const [birthDayValue, setBirthDayValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleBirthDayValueChange = (newValue) => {
    setBirthDayValue(newValue);
  };

  function onSubmitButton() {
    navigate(
      `/platform/questionnaire?step=${TaxDeclarationStep.CONTACT_DETAILS}`
    );
  }

  return (
    <Fade>
      <section className="flex flex-col align-baseline items-start w-full">
        <h1>Renseignements personnels</h1>
        <form
          onSubmit={handleSubmit(onSubmitButton)}
          className="flex flex-col items-start mt-4 w-full"
        >
          <div className="relative z-0 w-full my-4 group">
            <input
              {...register('email', { required: true })}
              type="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
              placeholder=" "
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Courriel
            </label>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6 my-4 w-full">
            <div className="relative z-0 w-full mb-6 group">
              <input
                {...register('firstName', { required: true })}
                type="text"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
                placeholder=" "
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Prénom
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                {...(register('lastName'), { required: true })}
                type="text"
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
                {...(register('socialSecurityNumber'), { required: true })}
                type="text"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
                placeholder=" "
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Numéro d&apos;assurance sociale
              </label>
            </div>
            <Datepicker
              {...(register('birthDay'), { required: true })}
              containerClassName="h-fit"
              useRange={false}
              asSingle={true}
              value={birthDayValue}
              onChange={handleBirthDayValueChange}
              placeholder={'Date de naissance (JJ/MM/AAAA)'}
            />
          </div>
          <p>
            Outre la présente, est-ce que d&apos;autres déclarations seront
            produites au nom du contribuable décédé pour 2022? (P. ex. une
            déclaration distincte relative aux droits et biens au moment du
            décès ou au revenu d&apos;une fiducie testamentaire, d&apos;une
            société de personnes ou d&apos;une entreprise personnelle.
          </p>
          <Controller
            control={control}
            name="otherReport"
            render={({ field: { onChange, value } }) => (
              <fieldset className="flex flex-row m-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    value="yes"
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
                    value="no"
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
                  `/platform/questionnaire?step=${TaxDeclarationStep.CIVIL_STATUS}`
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
    </Fade>
  );
}
