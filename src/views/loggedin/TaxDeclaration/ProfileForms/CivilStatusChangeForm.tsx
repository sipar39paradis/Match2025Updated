import { Select } from 'flowbite-react/lib/esm/components/FormControls';
import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import Datepicker from 'react-tailwindcss-datepicker';
import { DateRangeType } from 'react-tailwindcss-datepicker/dist/types';
import { RespondentFormProps } from '../types/Questionnaire/QuestionnaireFormProp';
import { TaxDeclarationStep } from '../types/TaxReport/TaxDeclarationStep';
import Fade from 'react-reveal';

export function CivilStatusChangeForm(props: RespondentFormProps) {
  const {
    register,
    handleSubmit,
    saveFormAnswers,
    formData,
    control,
    setSearchParams,
  } = props;

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
    });
  }, []);

  function onSubmitButton() {
    saveFormAnswers();
    setSearchParams({ step: TaxDeclarationStep.CONTACT_DETAILS });
  }

  useEffect(() => {
    setCivilStatusChangeDate({
      startDate: formData?.contactDetails?.movedFromOtherProvince,
      endDate: formData?.contactDetails?.movedFromOtherProvince,
    });
  }, [formData]);

  const [civilStatusChangeDate, setCivilStatusChangeDate] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue: DateRangeType) => {
    setCivilStatusChangeDate(newValue);
  };

  return (
    <Fade>
      <section className="flex flex-col align-baseline items-start w-full">
        <h1>Changements d&apos;état civil depuis le 31 décembre 2022</h1>
        <p className="my-4">
          Depuis le 31 décembre 2022, vous êtes-vous marié, avez-vous commencé à
          vivre en union de fait, vous êtes-vous divorcé ou séparé de votre
          époux ou conjoint de fait, ou êtes-vous devenu(e) veuf(ve)?
        </p>
        <p className="my-4 font-semibold">
          Un changement d&apos;état civil peut avoir un impact significatif sur
          votre situation fiscale; il est donc très important de répondre
          correctement à ces questions.
        </p>
        <form
          onSubmit={handleSubmit(onSubmitButton)}
          className="flex flex-col items-start mt-4 w-full"
        >
          <Controller
            control={control}
            name="civilStatusChange.civiStatusChange"
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
          {formData?.civilStatusChange?.civiStatusChange === true && (
            <>
              <h1>Changements d&apos;état civil </h1>
              <p>Quel était votre état civil au 31 décembre 2022?</p>
              <div id="select" className="my-4 w-96">
                <Select
                  {...register('civilStatusChange.lastYearCivilStatus')}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Veuillez sélectionner
                  </option>
                  <option>Marié(e)</option>
                  <option>Conjoint(e) de fait</option>
                  <option>Veuf(ve)</option>
                  <option>Divorcé(e)</option>
                  <option>Séparé(e)</option>
                  <option>Célibataire</option>
                </Select>
              </div>
              <p>Date de changement de votre état civil en 2022</p>
              <Datepicker
                i18n={'fr'}
                primaryColor={'orange'}
                containerClassName="h-fit w-96 my-8"
                useRange={false}
                asSingle={true}
                value={civilStatusChangeDate}
                onChange={handleValueChange}
                placeholder={'JJ/MM/AAAA'}
              />
              <h2 className="mb-0">
                Renseignement sur le changement de votre état civil en 2022{' '}
              </h2>
              <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
              <p>Date de changement de votre état civil à célibataire </p>
              <Datepicker
                i18n={'fr'}
                primaryColor={'orange'}
                containerClassName="h-fit w-96 my-4"
                useRange={false}
                asSingle={true}
                value={civilStatusChangeDate}
                onChange={handleValueChange}
                placeholder={'JJ/MM/AAAA'}
              />
              <p>
                Entrez le montant des prestations d&apos;assistance sociale que
                vous avez reçues du 1er janvier 2022 jusqu&apos;à la date de
                changement de votre état civil sans inclure cette date
              </p>
              <div className="relative z-0 w-96 my-6 group">
                <input
                  type="number"
                  className="block py-2.5 w-96 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
                  placeholder=" "
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Montant de prestation d&apos;assitance social
                </label>
              </div>
              <h2 className="mb-0 mt-6">
                Renseignement sur le changement de votre état civil en 2022
                (s&apos;il y a lieu)
              </h2>
              <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
              <p>Date de changement de votre état civil</p>
              <Datepicker
                i18n={'fr'}
                primaryColor={'orange'}
                containerClassName="h-fit w-96 my-4"
                useRange={false}
                asSingle={true}
                value={civilStatusChangeDate}
                onChange={handleValueChange}
                placeholder={'JJ/MM/AAAA'}
              />
              <p>Nouvel état civil</p>
              <div className="my-4 w-96">
                <Select defaultValue="">
                  <option value="" disabled>
                    Veuillez sélectionner
                  </option>
                  <option>Marié(e)</option>
                  <option>Conjoint(e) de fait</option>
                  <option>Veuf(ve)</option>
                  <option>Divorcé(e)</option>
                  <option>Séparé(e)</option>
                  <option>Célibataire</option>
                </Select>
              </div>
            </>
          )}

          <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
          <div className="w-full flex justify-between mt-4">
            <input
              type="submit"
              value="Précédant"
              onClick={() => {
                saveFormAnswers;
                if (formData.mainClient) {
                  setSearchParams({ step: TaxDeclarationStep.CIVIL_STATUS });
                } else {
                  setSearchParams({
                    step: TaxDeclarationStep.PERSONAL_INFORMATIONS,
                  });
                }
              }}
              className="bg-[#222C40] hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded cursor-pointer"
            />
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
