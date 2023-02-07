import { Select } from 'flowbite-react/lib/esm/components/FormControls';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Datepicker from 'react-tailwindcss-datepicker';
import { ContactDetails } from '../types/Profile/ContactDetails';
import { TaxDeclarationStep } from '../types/TaxReport/TaxDeclarationStep';

export function ContactDetailsForm() {
  const {
    register,
    handleSubmit,
    formState: {},
    control,
    watch,
  } = useForm<ContactDetails>();
  const navigate = useNavigate();
  const formData = watch();
  const [showPrisonQuestions, setShowPrisonQuestions] = useState(false);

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
    });
  }, []);

  function onSubmitButton() {
    navigate(
      `/platform/questionnaire?step=${TaxDeclarationStep.CIVIL_STATUS_CHANGE}`
    );
  }

  const [movedFromOtherProvince, setMovedFromOtherProvince] = useState({
    startDate: null,
    endDate: null,
  });

  const handlelostResidencyDateChange = (newValue) => {
    setLostResidencyDateChange(newValue);
  };

  const [lostResidencyDateChange, setLostResidencyDateChange] = useState({
    startDate: null,
    endDate: null,
  });

  const handleMovedFromOtherProvinceChange = (newValue) => {
    setMovedFromOtherProvince(newValue);
  };

  const [entryCanadaDate, setEntryCanadaDate] = useState({
    startDate: null,
    endDate: null,
  });

  const handleEntryCanadaDateChange = (newValue) => {
    setEntryCanadaDate(newValue);
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
              {...(register('address'), { required: true })}
              type="text"
              className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
              placeholder=" "
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Adresse/Adresse municipale
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              {...(register('appartment'), { required: true })}
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
              {...(register('city'), { required: true })}
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
              {...(register('postal'), { required: true })}
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
          {...(register('movedFromOtherProvince'), { required: true })}
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
          name="sameAddress"
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
        <p>
          Si la province ou le territoire où vous résidez présentement
          n&apos;est pas la(le) même que dans votre adresse postale
        </p>

        <div id="select" className="my-4 w-80">
          <Select {...register('differentProvince')} id="provinces">
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
            type="tel"
            className="block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
            placeholder=" "
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Numéro de téléphone à domicile
          </label>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6 my-4">
          <div className="relative z-0 w-full mb-6 group">
            <input
              {...register('workPhoneNumber')}
              type="postal"
              className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
              placeholder=" "
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Numéro de téléphone au travail
            </label>
          </div>
          <div className="relative z-0 mb-6 group">
            <input
              {...register('extensionNumber')}
              type="number"
              className="block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
              placeholder=" "
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Poste
            </label>
          </div>
        </div>
        <h2 className="mb-0">Autres renseignements personnels </h2>
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
        <p>
          Avez-vous fait faillite en 2021 ou 2022, ou êtes-vous en faillite
          selon les dossiers de l&apos;Agence du revenu du Canada (ARC)?
        </p>
        <Controller
          control={control}
          name="bankruptcy"
          render={({ field: { onChange, value } }) => (
            <fieldset className="flex flex-row m-4">
              <div className="flex items-center">
                <input
                  {...register('bankruptcy', { required: true })}
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
                  {...register('bankruptcy', { required: true })}
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
        <p>Êtes-vous une personne handicapée?</p>
        <Controller
          control={control}
          name="disabled"
          render={({ field: { onChange, value } }) => (
            <fieldset className="flex flex-row m-4">
              <div className="flex items-center">
                <input
                  {...(register('disabled'), { required: true })}
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
                  {...(register('disabled'), { required: true })}
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
        <p>
          Est-ce la première fois que vous produisez une déclaration de revenus
          auprès de l&apos;ARC?
        </p>
        <Controller
          control={control}
          name="firstTimeARC"
          render={({ field: { onChange, value } }) => (
            <fieldset className="flex flex-row m-4">
              <div className="flex items-center">
                <input
                  {...(register('firstTimeARC'), { required: true })}
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
                  {...(register('firstTimeARC'), { required: true })}
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
        <p>
          Avez-vous été détenu dans une prison ou dans un établissement
          semblable durant l&apos;année?
        </p>
        <fieldset className="flex flex-row m-4">
          <div className="flex items-center">
            <input
              type="radio"
              value="no"
              onChange={() => setShowPrisonQuestions(true)}
              checked={showPrisonQuestions === true}
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
              onChange={() => setShowPrisonQuestions(false)}
              checked={showPrisonQuestions === false}
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
              Non
            </p>
          </div>
        </fieldset>
        {showPrisonQuestions === true && (
          <>
            <p>
              Avez-vous été détenu dans une prison ou dans un établissement
              semblable pendant 90 jours ou plus durant l&apos;année?
            </p>
            <Controller
              control={control}
              name="jailLast90Days"
              render={({ field: { onChange, value } }) => (
                <fieldset className="flex flex-row m-4">
                  <div className="flex items-center">
                    <input
                      {...(register('jailLast90Days'), { required: true })}
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
                      {...(register('jailLast90Days'), { required: true })}
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
            <p>
              En 2022, avez-vous été détenu dans une prison pendant au moins 6
              mois?
            </p>
            <Controller
              control={control}
              name="jailLast6months"
              render={({ field: { onChange, value } }) => (
                <fieldset className="flex flex-row m-4">
                  <div className="flex items-center">
                    <input
                      {...(register('jailLast6months'), { required: true })}
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
                      {...(register('jailLast6months'), { required: true })}
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
          </>
        )}

        <h2 className="mb-0">Résidences </h2>
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
        <p>Est-ce que votre statut de résident canadien a changé en 2022?</p>
        <Controller
          control={control}
          name="canadianRedisentStatusChange"
          render={({ field: { onChange, value } }) => (
            <fieldset className="flex flex-row m-4">
              <div className="flex items-center">
                <input
                  {...(register('canadianRedisentStatusChange'),
                  { required: true })}
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
                  {...(register('canadianRedisentStatusChange'),
                  { required: true })}
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
        {formData.canadianRedisentStatusChange === true && (
          <>
            <p>Entrez la date de votre entrée au Canada en 2022</p>
            <Datepicker
              containerClassName="h-fit w-96 my-8"
              useRange={false}
              asSingle={true}
              value={entryCanadaDate}
              onChange={handleEntryCanadaDateChange}
              placeholder={'JJ/MM/AAAA'}
            />
            <p>
              Revenues de sources canadiennes (excluant le revenu de la Parti
              XIII) pour la période de l&apos;année durant laquelle vous
              n&apos;étiez pas un résident du Canada
            </p>
            <div className="relative z-0 my-4 group w-full">
              <input
                {...(register('canadianIncomes'), { required: true })}
                type="number"
                className="block w-96 py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
                placeholder=" "
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Revenues de sources canadiennes
              </label>
            </div>
            <p>
              Revenues de sources étrangères, plus le revenu de source
              canadienne de la Parti XIII, pour la période de l&apos;année
              durant laquelle vous n&apos;étiez pas un résident du Canada
            </p>
            <div className="relative z-0 my-4 group w-full">
              <input
                {...(register('foreignIncomes'), { required: true })}
                type="number"
                className="block w-96 py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
                placeholder=" "
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Revenues de sources étrangères
              </label>
            </div>
            <p>
              Entrez la date à laquelle vous avez cessé d&apos;être résident du
              Canada en 2022
            </p>

            <Datepicker
              {...register('lostResidencyDate')}
              containerClassName="h-fit w-96 my-8"
              useRange={false}
              asSingle={true}
              value={lostResidencyDateChange}
              onChange={handlelostResidencyDateChange}
              placeholder={'JJ/MM/AAAA'}
            />
            <p>Raison de votre arrivé ou de votre départ</p>
            <div id="select" className="my-4 w-80">
              <Select
                {...register('residentStatus')}
                id="canada"
                placeholder="Veuillez sélectionner"
              >
                <option>Nouveau résident du Canada</option>
                <option>Séjour temporaire du Canada</option>
                <option>Travailleur agricole étranger</option>
                <option>Étudiant étranger</option>
                <option>Émigrant</option>
                <option>Séjour temporaire hors du Canada</option>
                <option>Autre situation</option>
              </Select>
            </div>
            <p>
              Entrez le revenu que vous avez gagné pendant la période durant
              laquelle vous n&apos;étiez pas résident du Canada
            </p>
            <div className="relative z-0 my-4 group w-full">
              <input
                {...register('nonResidentRevenues', { required: true })}
                type="number"
                className="block w-96 py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
                placeholder=" "
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Revenues
              </label>
            </div>
          </>
        )}

        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
        <div className="w-full flex justify-between mt-4">
          <input
            type="submit"
            value="Precedant"
            onClick={() =>
              navigate(
                `/platform/questionnaire?step=${TaxDeclarationStep.PERSONAL_INFORMATIONS}`
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
