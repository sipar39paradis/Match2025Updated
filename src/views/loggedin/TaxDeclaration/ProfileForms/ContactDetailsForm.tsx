import { Select } from 'flowbite-react/lib/esm/components/FormControls';
import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Datepicker from 'react-tailwindcss-datepicker';
import { DateRangeType } from 'react-tailwindcss-datepicker/dist/types';
import { ProfileFormProps } from '../types/Profile/ProfileFormProps';
import { TaxDeclarationStep } from '../types/TaxReport/TaxDeclarationStep';

export function ContactDetailsForm(props: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    saveFormAnswers,
    formData,
    control,
    setValue,
  } = props;

  const navigate = useNavigate();

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
    });
  }, []);

  function onSubmitButton() {
    saveFormAnswers();
    navigate(
      `/platform/questionnaire?step=${TaxDeclarationStep.CIVIL_STATUS_CHANGE}`
    );
  }

  useEffect(() => {
    setMovedFromOtherProvince({
      startDate: formData?.contactDetails?.movedFromOtherProvince,
      endDate: formData?.contactDetails?.movedFromOtherProvince,
    });
  }, [formData]);

  const [movedFromOtherProvince, setMovedFromOtherProvince] = useState({
    startDate: null,
    endDate: null,
  });

  const handleMovedFromOtherProvinceChange = (newValue: DateRangeType) => {
    setValue('contactDetails.movedFromOtherProvince', newValue.startDate);
    setMovedFromOtherProvince(newValue);
  };

  return (
    <section className="flex flex-col align-baseline items-start w-full">
      <h1>Coordonnées</h1>

      <form
        onSubmit={handleSubmit(onSubmitButton)}
        className="flex flex-col items-start mt-4 w-full"
      >
        <h2 className="mb-0">Adresse postale </h2>
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
        <div className="grid md:grid-cols-2 md:gap-6 my-4 w-full">
          <div className="relative z-0 w-full mb-6 group">
            <input
              {...register('contactDetails.address', { required: true })}
              type="text"
              className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-500 peer"
              placeholder=" "
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Adresse/Adresse municipale
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              {...register('contactDetails.appartment')}
              type="text"
              className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
              placeholder=" "
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              No d&apos;appartement
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6 my-4 w-full">
          <div className="relative z-0 w-full mb-6 group">
            <input
              {...register('contactDetails.city', { required: true })}
              type="text"
              className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
              placeholder=" "
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Ville
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              {...register('contactDetails.postal', { required: true })}
              type="postal"
              className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
              placeholder=" "
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Code postal
            </label>
          </div>
        </div>
        <p>
          Si vous avez déménagé d&apos;une autre province ou d&apos;un autre
          territoire en 2022, entrez la date de votre déménagement
        </p>
        <Datepicker
          containerClassName="h-fit w-96 my-8"
          useRange={false}
          asSingle={true}
          value={movedFromOtherProvince}
          onChange={handleMovedFromOtherProvinceChange}
          placeholder={'JJ/MM/AAAA'}
        />
        <p>
          Votre adresse domiciliaire est-elle identique à votre adresse postale
          ?
        </p>
        <Controller
          control={control}
          name="contactDetails.sameAddress"
          render={({ field: { onChange, value } }) => (
            <fieldset className="flex flex-row m-4">
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
        <p>
          Si la province ou le territoire où vous résidez présentement
          n&apos;est pas la(le) même que dans votre adresse postale
        </p>

        <div id="select" className="my-4 w-80">
          <Select {...register('contactDetails.differentProvince')}>
            <option>Je réside dans la même province</option>
            <option>Alberta</option>
            <option>Colombie-Britanique</option>
            <option>Manitoba</option>
            <option>Nouveau-Brunswick</option>
            <option>Terre-Neuve-et-Labrador</option>
            <option>Nouvelle Écosse</option>
            <option>Ontario</option>
            <option>Manitoba</option>
            <option>Île-du-Prince-Édouard</option>
            <option>Territoire du Nord-Ouest</option>
            <option>Yukon</option>
            <option>Nunavut</option>
          </Select>
        </div>

        <h2 className="mb-0 mt-4">Téléphones </h2>
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full" />

        <div className="relative z-0 w-full my-4 group">
          <input
            {...register('contactDetails.phoneNumber', { required: true })}
            type="tel"
            className="block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
            placeholder=" "
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Numéro de téléphone principale
          </label>
        </div>

        <h2 className="mb-0">Autres renseignements personnels </h2>
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
        <p>
          Avez-vous fait faillite en 2021 ou 2022, ou êtes-vous en faillite
          selon les dossiers de l&apos;Agence du revenu du Canada (ARC)?
        </p>
        <Controller
          control={control}
          name="contactDetails.bankruptcy"
          render={({ field: { onChange, value } }) => (
            <fieldset className="flex flex-row m-4">
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
        <p>Êtes-vous une personne handicapée?</p>
        <Controller
          control={control}
          name="contactDetails.disabled"
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

        <h2 className="mb-0">Résidences </h2>
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
        <p>Est-ce que votre statut de résident canadien a changé en 2022?</p>
        <Controller
          control={control}
          name="contactDetails.canadianRedisentStatusChange"
          render={({ field: { onChange, value } }) => (
            <fieldset className="flex flex-row m-4">
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
        {formData?.contactDetails?.canadianRedisentStatusChange === true && (
          <p>Votre préparateur va entrer en contact avec vous.</p>
        )}

        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
        <div className="w-full flex justify-between mt-4">
          <input
            type="submit"
            value="Precedant"
            onClick={() => {
              saveFormAnswers();
              navigate(
                `/platform/questionnaire?step=${TaxDeclarationStep.PERSONAL_INFORMATIONS}`
              );
            }}
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
