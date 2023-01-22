import { Select } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Datepicker from 'react-tailwindcss-datepicker';
import { ContactDetails } from '../types/ContactDetails';
import { TaxDeclarationStep } from '../types/TaxDeclarationStep';

export function ContactDetailsForm() {
  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm<ContactDetails>();
  const navigate = useNavigate();

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
    });
  }, []);

  function onSubmitButton() {
    navigate(
      `/platform/tax-declaration?step=${TaxDeclarationStep.CIVIL_STATUS_CHANGE}`
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
              {...register('address')}
              type="text"
              name="floating_address"
              id="floating_address"
              className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_address"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Adresse/Adresse municipale
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              {...register('appartment')}
              type="text"
              name="floating_appartment"
              id="floating_appartment"
              className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_appartment"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              No d&apos;appartement
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6 my-4 w-full">
          <div className="relative z-0 w-full mb-6 group">
            <input
              {...register('street')}
              type="text"
              name="floating_street"
              id="floating_street"
              className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_street"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Case postale, route rurale
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              {...register('city')}
              type="text"
              name="floating_city"
              id="floating_city"
              className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_city"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Ville
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6 my-4 w-full">
          <div className="relative z-0 w-full mb-6 group">
            <input
              {...register('postal')}
              type="postal"
              name="floating_postal"
              id="floating_postal"
              className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_postal"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Code postal
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              {...register('careOf')}
              type="text"
              name="floating_careOf"
              id="floating_careOf"
              className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_careOf"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Aux soins de
            </label>
          </div>
        </div>
        <p>
          Si vous avez déménagé d&apos;une autre province ou d&apos;un autre
          territoire en 2022, entrez la date de votre déménagement
        </p>
        <Datepicker
          {...register('movedFromOtherProvince')}
          containerClassName="h-fit w-96 my-8"
          useRange={false}
          asSingle={true}
          value={movedFromOtherProvince}
          onChange={handleMovedFromOtherProvinceChange}
          placeholder={'JJ/MM/AAAA'}
        />
        <p>
          Votre adresse domocilaire est-elle identique à votre adresse postale ?
        </p>
        <fieldset className="flex flex-row m-4">
          <div className="flex items-center">
            <input
              {...register('sameAddress')}
              type="radio"
              value="no"
              id="field-same-address-yes"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="same-address-option-1"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Oui
            </label>
          </div>
          <div className="flex items-center m-4">
            <input
              {...register('sameAddress')}
              type="radio"
              value="yes"
              id="field-same-address-yes"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="same-address-option-1"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Non
            </label>
          </div>
        </fieldset>
        <p>
          Si la province ou le territoire où vous résidez présentement
          n&apos;est pas la(le) même que dans votre adresse postale
        </p>

        <div id="select" className="my-4 w-80">
          <Select
            {...register('differentProvince')}
            id="provinces"
            required={true}
          >
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
            {...register('phoneNumber')}
            type="tel"
            name="tel"
            id="tel"
            className="block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
            placeholder=" "
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
          />
          <label
            htmlFor="tel"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Numéro de téléphone à domicile
          </label>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6 my-4">
          <div className="relative z-0 w-full mb-6 group">
            <input
              {...register('workPhoneNumber')}
              type="postal"
              name="floating-work-phone-number"
              id="floating-work-phone-number"
              className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
              placeholder=" "
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            />
            <label
              htmlFor="floating-work-phone-number"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Numéro de téléphone au travail
            </label>
          </div>
          <div className="relative z-0 mb-6 group">
            <input
              {...register('extensionNumber')}
              type="number"
              name="floating-extension-number"
              id="floating-extension-number"
              className="block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating-extension-number"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Poste
            </label>
          </div>
        </div>
        <h2 className="mb-0">Autres renseignements personnels </h2>
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
        <p>
          Avez-vous fait faillite en 2022 ou 2022, ou êtes-vous en faillite
          selon les dossiers de l&apos;Agence du revenu du Canada (ARC)?
        </p>
        <fieldset className="flex flex-row m-4">
          <div className="flex items-center">
            <input
              {...register('bankruptcy')}
              type="radio"
              value="no"
              id="field-bankruptcy-yes"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="bankruptcy-option-1"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Oui
            </label>
          </div>
          <div className="flex items-center m-4">
            <input
              {...register('bankruptcy')}
              type="radio"
              value="yes"
              id="field-bankruptcy-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="bankruptcy-option-2"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Non
            </label>
          </div>
        </fieldset>
        <p>Êtes-vous une personne handicapée?</p>
        <fieldset className="flex flex-row m-4">
          <div className="flex items-center">
            <input
              {...register('disabled')}
              type="radio"
              value="no"
              id="field-disabled-yes"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="disabled-option-1"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Oui
            </label>
          </div>
          <div className="flex items-center m-4">
            <input
              {...register('disabled')}
              type="radio"
              value="yes"
              id="field-disabled-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="disabled-option-2"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Non
            </label>
          </div>
        </fieldset>
        <p>
          Est-ce la première fois que vous produisez une déclaration de revenus
          auprès de l&apos;ARC?
        </p>
        <fieldset className="flex flex-row m-4">
          <div className="flex items-center">
            <input
              {...register('firstTimeARC')}
              type="radio"
              value="no"
              id="field-first-time-arc-yes"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="first-time-arc-option-1"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Oui
            </label>
          </div>
          <div className="flex items-center m-4">
            <input
              {...register('firstTimeARC')}
              type="radio"
              value="yes"
              id="field-first-time-arc-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="first-time-arc-option-2"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Non
            </label>
          </div>
        </fieldset>
        <p>
          Note : Veuillez vérifier votre prénom, deuxième prénom et nom de
          famille afin de vous assurer qu&apos;ils correspondent aux données que
          l&apos;ARC a en dossier. En savoir plus{' '}
        </p>
        <div className="flex flex-row justify-between w-4/6 my-4">
          <div className="relative z-0  my-4 group">
            <input
              type="text"
              name="floating_first_name"
              id="floating_first_name"
              className="block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_first_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Prénom
            </label>
          </div>
          <div className="relative z-0 my-4 group">
            <input
              type="text"
              name="floating_second_first_name"
              id="floatingsecond_first_name"
              className="block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_second_first_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Deuxième prénom
            </label>
          </div>
          <div className="relative z-0 my-4 group">
            <input
              type="text"
              name="floating_last_name"
              id="floating_last_name"
              className="block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
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
        <p>
          Avez-vous été détenu dans une prison ou dans un établissement
          semblable pendant 90 jours ou plus durant l&apos;année?
        </p>
        <fieldset className="flex flex-row m-4">
          <div className="flex items-center">
            <input
              {...register('jailLast30Days')}
              type="radio"
              value="no"
              id="field-jail-last-30-days-yes"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="jail-last-30-days-option-1"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Oui
            </label>
          </div>
          <div className="flex items-center m-4">
            <input
              {...register('jailLast30Days')}
              type="radio"
              value="yes"
              id="field-jail-last-30-days-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="jail-last-30-days-option-2"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Non
            </label>
          </div>
        </fieldset>
        <p>
          En 2022, avez-vous été détenu dans une prison pendant au moins 6 mois?
        </p>
        <fieldset className="flex flex-row m-4">
          <div className="flex items-center">
            <input
              {...register('jailLast6months')}
              type="radio"
              value="no"
              id="field-jail-last-6-months-yes"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="jail-last-6-months-option-1"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Oui
            </label>
          </div>
          <div className="flex items-center m-4">
            <input
              {...register('jailLast6months')}
              type="radio"
              value="yes"
              id="field-jail-last-6-months-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="jail-last-6-months-option-2"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Non
            </label>
          </div>
        </fieldset>
        <h2 className="mb-0">Résidences </h2>
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
        <p>Est-ce que votre statut de résident canadien a changé en 2022?</p>
        <fieldset className="flex flex-row m-4">
          <div className="flex items-center">
            <input
              {...register('canadianRedisentStatusChange')}
              type="radio"
              value="no"
              id="field-canadian-resident-status-change-yes"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="canadian-resident-status-change-option-1"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Oui
            </label>
          </div>
          <div className="flex items-center m-4">
            <input
              {...register('canadianRedisentStatusChange')}
              type="radio"
              value="yes"
              id="field-canadian-resident-status-change-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="canadian-resident-status-change-option-2"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Non
            </label>
          </div>
        </fieldset>
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
          Revenues de sources canadiennes (excluant le revenu de la Parti XIII)
          pour la période de l&apos;année durant laquelle vous n&apos;étiez pas
          un résident du Canada
        </p>
        <div className="relative z-0 my-4 group w-full">
          <input
            {...register('canadianIncomes')}
            type="number"
            name="floating_canadian_incomes"
            id="floating__canadian_incomes"
            className="block w-96 py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating__canadian_incomes"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Revenues de sources canadiennes
          </label>
        </div>
        <p>
          Revenues de sources étrangères, plus le revenu de source canadienne de
          la Parti XIII, pour la période de l&apos;année durant laquelle vous
          n&apos;étiez pas un résident du Canada
        </p>
        <div className="relative z-0 my-4 group w-full">
          <input
            {...register('foreignIncomes')}
            type="number"
            name="floating_foreign_incomes"
            id="floating_foreign_incomes"
            className="block w-96 py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_foreign_incomes"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
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
            {...register('nonResidentRevenues')}
            type="number"
            name="floating_non_resident_incomes"
            id="floating_non_resident_incomes"
            className="block w-96 py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_non_resident_incomes"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Revenues
          </label>
        </div>
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
        <div className="w-full flex justify-between mt-4">
          <input
            type="submit"
            value="Precedant"
            onClick={() =>
              navigate(
                `/platform/tax-declaration?step=${TaxDeclarationStep.PERSONAL_INFORMATIONS}`
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
