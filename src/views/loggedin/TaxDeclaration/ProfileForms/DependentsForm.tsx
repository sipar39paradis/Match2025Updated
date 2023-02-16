import { Select } from 'flowbite-react';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Datepicker from 'react-tailwindcss-datepicker';
import { DependentRelatationShipEnum } from '../types/Profile/Dependent';
import { ProfileFormProps } from '../types/Profile/ProfileFormProps';
import { TaxDeclarationStep } from '../types/TaxReport/TaxDeclarationStep';
import Fade from 'react-reveal';

export function DependentsForm(props: ProfileFormProps) {
  const { register, handleSubmit, saveFormAnswers, control, clientType } =
    props;

  const navigate = useNavigate();
  const [showDependentForm, setShowDependentForm] = useState(false);

  const [birthDayValue, setBirthDayValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleBirthDayValueChange = (newValue) => {
    setBirthDayValue(newValue);
  };

  function onSubmitButton() {
    saveFormAnswers();
    navigate(
      `/platform/questionnaire?step=${TaxDeclarationStep.TAX_PROFILE}&clientType=${clientType}`
    );
  }

  return (
    <Fade>
      <section className="flex flex-col align-baseline items-start w-full">
        <h1>Avez-vous des enfants</h1>
        <p className="my-4">
          Vos enfants valent leur pesant d&apos;or. Nous allons essayer
          d&apos;obtenir un crédit d&apos;impôt pour chaque enfant que vous
          soutenez
        </p>

        <form
          onSubmit={handleSubmit(onSubmitButton)}
          className="flex flex-col items-start w-full"
        >
          <fieldset className="flex flex-row mx-4">
            <div className="flex items-center">
              <input
                type="radio"
                value="yes"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                onChange={() => setShowDependentForm(true)}
                checked={showDependentForm}
              />
              <label className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Oui, j&apos;ai des enfants
              </label>
            </div>
            <div className="flex items-center m-4">
              <input
                type="radio"
                value="no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                onChange={() => setShowDependentForm(false)}
                checked={!showDependentForm}
              />
              <label className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Non, ce n&apos;est pas le cas.
              </label>
            </div>
          </fieldset>
          <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
          {showDependentForm && (
            <>
              <div className="grid md:grid-cols-2 md:gap-6 my-4 w-full">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    {...register('dependents.firstName', { required: true })}
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
                    {...(register('dependents.lastName'), { required: true })}
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
                    {...(register('dependents.socialSecurityNumber'),
                    { required: true })}
                    type="text"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
                    placeholder=" "
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Numéro d&apos;assurance sociale
                  </label>
                </div>
                <Datepicker
                  {...(register('dependents.birthDate'), { required: true })}
                  containerClassName="h-fit"
                  useRange={false}
                  asSingle={true}
                  value={birthDayValue}
                  onChange={handleBirthDayValueChange}
                  placeholder={'Date de naissance (JJ/MM/AAAA)'}
                />
              </div>
              <div id="select" className="w-80 my-4">
                <p className="pb-2">Lien de parenté</p>
                <Select {...register('dependents.relationship')}>
                  <option value="" disabled selected>
                    Veuillez sélectionner
                  </option>
                  <option value={DependentRelatationShipEnum.SON}>Fils</option>
                  <option value={DependentRelatationShipEnum.DAUGHTER}>
                    Fille
                  </option>
                  <option value={DependentRelatationShipEnum.GRANDSON}>
                    Petit-fils
                  </option>
                  <option value={DependentRelatationShipEnum.GRANDDAUGHTER}>
                    Petite-fille
                  </option>
                  <option value={DependentRelatationShipEnum.NEPHEW}>
                    Neveu
                  </option>
                  <option value={DependentRelatationShipEnum.NIECE}>
                    Nièce
                  </option>
                  <option value={DependentRelatationShipEnum.BROTHER}>
                    Frère
                  </option>
                  <option value={DependentRelatationShipEnum.SISTER}>
                    Soeur
                  </option>
                  <option value={DependentRelatationShipEnum.UNCLE}>
                    Oncle
                  </option>
                  <option value={DependentRelatationShipEnum.AUNT}>
                    Tante
                  </option>
                  <option value={DependentRelatationShipEnum.FATHER}>
                    Père
                  </option>
                  <option value={DependentRelatationShipEnum.MOTHER}>
                    Mère
                  </option>
                  <option value={DependentRelatationShipEnum.GRAND_FATHER}>
                    Grand-père
                  </option>
                  <option value={DependentRelatationShipEnum.GRAND_MOTHER}>
                    Grand-mère
                  </option>
                  <option value={DependentRelatationShipEnum.OTHER}>
                    Autre
                  </option>
                </Select>
              </div>
              <div className="my-4">
                <p>Vivait avec le contribuable en 2022</p>
                <Controller
                  control={control}
                  name="dependents.livedWithTaxPayer"
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
              </div>

              <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
            </>
          )}
          <div className="w-full flex justify-between mt-4">
            <input
              type="submit"
              value="Precedant"
              onClick={() =>
                navigate(
                  `/platform/questionnaire?step=${TaxDeclarationStep.CIVIL_STATUS_CHANGE}&clientType=${clientType}`
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
