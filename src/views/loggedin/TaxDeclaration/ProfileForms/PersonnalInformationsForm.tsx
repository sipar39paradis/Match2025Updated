import React, { useContext, useEffect, useState } from 'react';

import { TaxDeclarationStep } from '../types/TaxReport/TaxDeclarationStep';
import Datepicker from 'react-tailwindcss-datepicker';
import Fade from 'react-reveal';
import { DateRangeType } from 'react-tailwindcss-datepicker/dist/types';
import { Controller } from 'react-hook-form';
import { ClientTypeEnum } from '../types/Questionnaire/Questionnaire';
import {
  QuestionnaireContext,
  QuestionnaireContextType,
} from '../context/QuestionnaireContext';

import { useParams } from 'react-router-dom';

export function PersonnalInformationsForm() {
  const {
    saveFormAnswers,
    setSearchParams,
    questionnaires,
    formData,
    personalInformationsForm,
    setValue,
  } = useContext(QuestionnaireContext) as QuestionnaireContextType;
  const personnalInformationsFormData = personalInformationsForm.watch();
  const { id } = useParams();
  const [birthDayValue, setBirthDayValue] = useState({
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    personalInformationsForm.reset(
      questionnaires.get(id)?.personalInformations
    );
  }, [questionnaires, id]);

  useEffect(() => {
    const dateRange: DateRangeType = {
      startDate: personnalInformationsFormData?.birthDay || new Date(),
      endDate: personnalInformationsFormData?.birthDay || new Date(),
    };
    setBirthDayValue(dateRange);
  }, [personnalInformationsFormData?.birthDay]);

  const handleBirthDayValueChange = (newValue: DateRangeType) => {
    personalInformationsForm.setValue('birthDay', newValue?.startDate);
    setBirthDayValue(newValue);
  };

  function onSubmitButton() {
    const currentQuestionnaire = questionnaires.get(id);
    setValue('personalInformations', personnalInformationsFormData);
    saveFormAnswers({
      ...currentQuestionnaire,
      personalInformations: personnalInformationsFormData,
    });
    if (formData.clientType === ClientTypeEnum.MAIN_CLIENT) {
      setSearchParams({ step: TaxDeclarationStep.CIVIL_STATUS });
    } else {
      setSearchParams({ step: TaxDeclarationStep.CIVIL_STATUS_CHANGE });
    }
  }

  return (
    <Fade>
      <section className="flex flex-col align-baseline items-start w-full">
        {formData.clientType === ClientTypeEnum.PARTNER ? (
          <h1>Renseignements personnels du conjoint</h1>
        ) : (
          <h1>Renseignements personnels</h1>
        )}
        <form
          onSubmit={personalInformationsForm.handleSubmit(onSubmitButton)}
          className="flex flex-col items-start mt-4 w-full"
        >
          <div className="relative z-0 w-full my-4 group">
            <input
              {...personalInformationsForm.register('email')}
              type="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
              placeholder=" "
              disabled={true}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Courriel
            </label>
            {personalInformationsForm.errors?.email && (
              <span className="text-red-500 ml-1">
                {personalInformationsForm.errors.email?.message}
              </span>
            )}
          </div>

          <div className="grid md:grid-cols-2 md:gap-6 my-4 w-full">
            <div className="relative z-0 w-full mb-6 group">
              <input
                {...personalInformationsForm.register('firstName', {
                  required: true,
                })}
                type="text"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
                placeholder=" "
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Prénom
              </label>
              {personalInformationsForm.errors?.firstName && (
                <span className="text-red-500 ml-1">
                  {personalInformationsForm.errors.firstName?.message}
                </span>
              )}
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                {...personalInformationsForm.register('lastName')}
                type="text"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
                placeholder=" "
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Nom de famille
              </label>
              {personalInformationsForm.errors?.lastName && (
                <span className="text-red-500 ml-1">
                  {personalInformationsForm.errors.lastName?.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6 my-4 w-full">
            <div className="relative z-0 w-full mb-6 group">
              <input
                {...personalInformationsForm.register('socialInsuranceNumber')}
                type="text"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
                placeholder=" "
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Numéro d&apos;assurance sociale (Optionnel)
              </label>
              {personalInformationsForm.errors?.socialInsuranceNumber && (
                <span className="text-red-500 ml-1">
                  {
                    personalInformationsForm.errors.socialInsuranceNumber
                      ?.message
                  }
                </span>
              )}
            </div>
            <div>
              <Datepicker
                i18n={'fr'}
                primaryColor={'orange'}
                containerClassName="h-fit"
                useRange={false}
                asSingle={true}
                value={birthDayValue}
                onChange={handleBirthDayValueChange}
                placeholder={'Date de naissance (JJ/MM/AAAA)'}
              />
              {personalInformationsForm.errors?.birthDay && (
                <span className="text-red-500 ml-1">
                  {personalInformationsForm.errors.birthDay?.message}
                </span>
              )}
            </div>
          </div>
          <h2 className="mb-0">Autres renseignements personnels </h2>
          <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
          <p className="font-semibold">
            Avez-vous fait faillite en {new Date().getFullYear() - 2} ou{' '}
            {new Date().getFullYear() - 1}, ou êtes-vous en faillite selon les
            dossiers de l&apos;Agence du revenu du Canada (ARC)?
          </p>
          <Controller
            control={personalInformationsForm.control}
            name="bankruptcy"
            render={({ field: { onChange, value } }) => (
              <fieldset className="flex flex-row mx-4">
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
          <p className="font-semibold">Êtes-vous une personne handicapée?</p>
          <Controller
            control={personalInformationsForm.control}
            name="disabled"
            render={({ field: { onChange, value } }) => (
              <fieldset className="flex flex-row mx-4">
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
          <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
          <div className="w-full flex justify-between mt-4 flex-row-reverse">
            <input
              type="submit"
              value="Suivant"
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            />
          </div>
        </form>
      </section>
    </Fade>
  );
}
