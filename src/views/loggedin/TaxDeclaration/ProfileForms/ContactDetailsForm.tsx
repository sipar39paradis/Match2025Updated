import { Select } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import Datepicker from 'react-tailwindcss-datepicker';
import { DateRangeType } from 'react-tailwindcss-datepicker/dist/types';
import { TaxDeclarationStep } from '../types/TaxReport/TaxDeclarationStep';
import { TooltipWithIcon } from '../../../../components/common/TooltipWithIcon';
import {
  QuestionnaireContext,
  QuestionnaireContextType,
} from '../context/QuestionnaireContext';
import { useParams } from 'react-router-dom';

export function ContactDetailsForm() {
  const {
    saveFormAnswers,
    setSearchParams,
    contactDetailsForm,
    questionnaires,
    setValue,
  } = useContext(QuestionnaireContext) as QuestionnaireContextType;
  const contactDetailsFormData = contactDetailsForm.watch();
  const { id } = useParams();

  function onSubmitButton() {
    saveContactDetails();
    setSearchParams({ step: TaxDeclarationStep.DEPENDENTS });
  }

  function saveContactDetails() {
    const currentQuestionnaire = questionnaires.get(id);
    setValue('contactDetails', contactDetailsFormData);
    saveFormAnswers({
      ...currentQuestionnaire,
      contactDetails: contactDetailsFormData,
    });
  }

  useEffect(() => {
    contactDetailsForm.reset(questionnaires.get(id)?.contactDetails);
  }, [questionnaires]);

  useEffect(() => {
    setMovedFromOtherProvince({
      startDate: contactDetailsFormData?.movedFromOtherProvince,
      endDate: contactDetailsFormData?.movedFromOtherProvince,
    });
  }, [contactDetailsFormData?.movedFromOtherProvince]);

  const [movedFromOtherProvince, setMovedFromOtherProvince] = useState({
    startDate: null,
    endDate: null,
  });

  const handleMovedFromOtherProvinceChange = (newValue: DateRangeType) => {
    contactDetailsForm.setValue('movedFromOtherProvince', newValue.startDate);
    setMovedFromOtherProvince(newValue);
  };

  return (
    <div>
      <section className="flex flex-col align-baseline items-start w-full">
        <h1>Vos coordonnées</h1>

        <form
          onSubmit={contactDetailsForm.handleSubmit(onSubmitButton)}
          className="flex flex-col items-start mt-4 w-full"
        >
          <h2 className="mb-0">Adresse postale </h2>
          <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
          <div className="grid md:grid-cols-2 md:gap-6 my-4 w-full">
            <div className="relative z-0 w-full mb-6 group">
              <input
                {...contactDetailsForm.register('address')}
                type="text"
                className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-500 peer"
                placeholder=" "
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Adresse/Adresse municipale
              </label>
              {contactDetailsForm.errors?.address && (
                <span className="text-red-500 ml-1">
                  {contactDetailsForm.errors.address?.message}
                </span>
              )}
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                {...contactDetailsForm.register('appartment')}
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
                {...contactDetailsForm.register('city')}
                type="text"
                className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
                placeholder=" "
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Ville
              </label>
              {contactDetailsForm.errors?.city && (
                <span className="text-red-500 ml-1">
                  {contactDetailsForm.errors.city?.message}
                </span>
              )}
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                {...contactDetailsForm.register('postal')}
                type="postal"
                className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
                placeholder=" "
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Code postal
              </label>
              {contactDetailsForm.errors?.postal && (
                <span className="text-red-500 ml-1">
                  {contactDetailsForm.errors.postal?.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6 my-4 w-full">
            <div className="relative z-0 w-full mb-6 group">
              <input
                {...contactDetailsForm.register('phoneNumber')}
                type="tel"
                className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
                placeholder=" "
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Numéro de téléphone principale
              </label>
              {contactDetailsForm.errors?.phoneNumber && (
                <span className="text-red-500 ml-1">
                  {contactDetailsForm.errors.phoneNumber?.message}
                </span>
              )}
            </div>
          </div>
          <p className="font-semibold">Êtes-vous locataire?</p>
          <Controller
            control={contactDetailsForm.control}
            name="tenant"
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
          {contactDetailsFormData?.tenant && (
            <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg w-full">
              <p className="font-semibold">
                Vous pourrez déposer votre Relevé 31 dans une boite de dépôt
              </p>
            </div>
          )}

          <p className="font-semibold">
            Avez-vous déménagé d&apos;une autre province ou d&apos;un autre
            territoire en {new Date().getFullYear() - 1}?
          </p>
          <Controller
            control={contactDetailsForm.control}
            name="isDifferentProvince"
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
          {contactDetailsFormData?.isDifferentProvince && (
            <>
              <p>Veuillez sélectionner la date à laquelle vous avez déménagé</p>
              <Datepicker
                i18n={'fr'}
                primaryColor={'orange'}
                containerClassName="h-fit w-96 my-8"
                useRange={false}
                asSingle={true}
                value={movedFromOtherProvince}
                onChange={handleMovedFromOtherProvinceChange}
                placeholder={'JJ/MM/AAAA'}
              />
              <p>
                Votre adresse domiciliaire est-elle identique à votre adresse
                postale?
              </p>
              <Controller
                control={contactDetailsForm.control}
                name="sameAddress"
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
                <Select {...contactDetailsForm.register('differentProvince')}>
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
            </>
          )}

          <h2 className="mb-0">Résidences </h2>
          <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
          <p className="font-semibold">
            Est-ce que votre statut de résident canadien a changé en 
            {new Date().getFullYear() - 1}?
            <TooltipWithIcon
              text={`Si vous n’êtes pas certain de votre statut de résident canadien au
              31 décembre ${
                new Date().getFullYear() - 1
              }, veuillez cocher «oui» à cette question et votre
              préparateur entrera en contact avec vous.`}
            ></TooltipWithIcon>
          </p>
          <Controller
            control={contactDetailsForm.control}
            name="canadianRedisentStatusChange"
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
          {contactDetailsFormData?.canadianRedisentStatusChange === true && (
            <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg w-full">
              <p className="font-semibold">
                Votre préparateur entrera en contact avec vous pour obtenir plus
                de renseignements.
              </p>
            </div>
          )}

          <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
          <div className="w-full flex justify-between mt-4">
            <input
              type="submit"
              value="Précédent"
              onClick={() => {
                saveContactDetails();
                setSearchParams({
                  step: TaxDeclarationStep.CIVIL_STATUS_CHANGE,
                });
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
    </div>
  );
}
