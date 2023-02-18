import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { TaxDeclarationStep } from '../types/TaxReport/TaxDeclarationStep';
import Datepicker from 'react-tailwindcss-datepicker';
import Fade from 'react-reveal';
import { RespondentFormProps } from '../types/Respondent/RespondentFormProps';
import { DateRangeType } from 'react-tailwindcss-datepicker/dist/types';

export function PersonnalInformationsForm(props: RespondentFormProps) {
  const { register, handleSubmit, saveFormAnswers, setValue, formData } = props;

  const navigate = useNavigate();

  const [birthDayValue, setBirthDayValue] = useState({
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    setBirthDayValue({
      startDate: formData?.personalInformations?.birthDay,
      endDate: formData?.personalInformations?.birthDay,
    });
  }, [formData]);

  const handleBirthDayValueChange = (newValue: DateRangeType) => {
    setValue('personalInformations.birthDay', newValue.startDate);
    setBirthDayValue(newValue);
  };

  function onSubmitButton() {
    saveFormAnswers();
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
              {...register('personalInformations.email', { required: true })}
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
                {...register('personalInformations.firstName', {
                  required: true,
                })}
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
                {...register('personalInformations.lastName', {
                  required: true,
                })}
                type="text"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
                placeholder=" "
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Nom de famille
              </label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6 my-4 w-full">
            <div className="relative z-0 w-full mb-6 group">
              <input
                {...register('personalInformations.socialSecurityNumber', {
                  required: true,
                })}
                type="text"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
                placeholder=" "
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Numéro d&apos;assurance sociale
              </label>
            </div>
            <Datepicker
              containerClassName="h-fit"
              useRange={false}
              asSingle={true}
              value={birthDayValue}
              onChange={handleBirthDayValueChange}
              placeholder={'Date de naissance (JJ/MM/AAAA)'}
            />
          </div>
          <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
          <div className="w-full flex justify-between mt-4 flex-row-reverse">
            <input
              type="submit"
              value="Continuez"
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            />
            <input
              type="submit"
              value="Precedant"
              onClick={() => {
                saveFormAnswers();
                navigate(
                  `/platform/questionnaire?step=${TaxDeclarationStep.CIVIL_STATUS}`
                );
              }}
              className="bg-[#222C40] hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded cursor-pointer"
            />
          </div>
        </form>
      </section>
    </Fade>
  );
}
