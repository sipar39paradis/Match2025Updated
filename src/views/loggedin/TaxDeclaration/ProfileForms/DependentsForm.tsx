import { Checkbox, Select } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Controller, useFieldArray } from 'react-hook-form';
import Datepicker from 'react-tailwindcss-datepicker';
import {
  Dependent,
  DependentRelatationShipEnum,
} from '../types/Respondent/Dependent';
import { RespondentFormProps } from '../types/Respondent/RespondentFormProps';
import { TaxDeclarationStep } from '../types/TaxReport/TaxDeclarationStep';
import Fade from 'react-reveal';
import { DateRangeType } from 'react-tailwindcss-datepicker/dist/types';

export function DependentsForm(props: RespondentFormProps) {
  const {
    register,
    handleSubmit,
    saveFormAnswers,
    control,
    setSearchParams,
    formData,
    setValue,
  } = props;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'dependents',
  });

  const [birthDayValue, setBirthDayValue] = useState([]);

  useEffect(() => {
    const dateList = [];
    formData?.dependents?.forEach((dependent) => {
      dateList.push({
        startDate: dependent.birthDate,
        endDate: dependent.birthDate,
      });
    });
    setBirthDayValue(dateList);
  }, [formData]);

  function onSubmitButton() {
    saveFormAnswers();
    setSearchParams({ step: TaxDeclarationStep.INCOMES });
  }

  return (
    <Fade>
      <section className="flex flex-col align-baseline items-start w-full">
        <h1>Avez-vous des enfants?</h1>
        <form
          onSubmit={handleSubmit(onSubmitButton)}
          className="flex flex-col items-start w-full"
        >
          <Controller
            control={control}
            name="haveDependents"
            render={({ field: { onChange, value } }) => (
              <fieldset className="flex flex-row m-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    onChange={() => {
                      onChange(true);
                      append({
                        firstName: '',
                        lastName: '',
                        birthDate: null,
                        socialSecurityNumber: null,
                        relationship: null,
                        livedWithTaxPayer: null,
                        federalNetIncome: null,
                        provincialNetIncome: null,
                        adjustedNetIncome: null,
                        quebecChildrenSupport: null,
                        claimedOrReceivedAmountForDependent: null,
                      });
                    }}
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
                    onChange={() => {
                      onChange(false);
                      for (let i = 0; i < formData.dependents.length; i++) {
                        remove(i);
                      }
                    }}
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
          {formData.haveDependents &&
            fields.map((dependent: Dependent, index: number) => (
              <div className="w-full" key={index}>
                <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
                <h2 className="mb-6">Formulaire dépendant</h2>
                {formData?.haveDependents && (
                  <>
                    <div className="grid md:grid-cols-2 md:gap-6 my-4 w-full">
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          {...register(`dependents.${index}.firstName`, {
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
                          {...register(`dependents.${index}.lastName`, {
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
                          {...register(
                            `dependents.${index}.socialSecurityNumber`
                          )}
                          type="text"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
                          placeholder=" "
                        />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          Numéro d&apos;assurance sociale
                        </label>
                      </div>
                      <Datepicker
                        i18n={'fr'}
                        primaryColor={'orange'}
                        containerClassName="h-fit"
                        useRange={false}
                        asSingle={true}
                        value={birthDayValue[index]}
                        onChange={(newValue: DateRangeType) => {
                          setValue(
                            `dependents.${index}.birthDate`,
                            newValue.startDate
                          );
                          birthDayValue[index] = newValue;
                          setBirthDayValue(birthDayValue);
                        }}
                        placeholder={'Date de naissance (JJ/MM/AAAA)'}
                      />
                    </div>
                    <div id="select" className="w-48 mb-6 flex flex-col">
                      <p className="pb-2">Lien de parenté</p>
                      <Select {...register(`dependents.${index}.relationship`)}>
                        <option value="" disabled selected>
                          Veuillez sélectionner
                        </option>
                        <option value={DependentRelatationShipEnum.SON}>
                          Fils
                        </option>
                        <option value={DependentRelatationShipEnum.DAUGHTER}>
                          Fille
                        </option>
                        <option value={DependentRelatationShipEnum.GRANDSON}>
                          Petit-fils
                        </option>
                        <option
                          value={DependentRelatationShipEnum.GRANDDAUGHTER}
                        >
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
                        <option
                          value={DependentRelatationShipEnum.GRAND_FATHER}
                        >
                          Grand-père
                        </option>
                        <option
                          value={DependentRelatationShipEnum.GRAND_MOTHER}
                        >
                          Grand-mère
                        </option>
                        <option value={DependentRelatationShipEnum.OTHER}>
                          Autre
                        </option>
                      </Select>
                    </div>
                    <p>Est-ce que l&apos;enfant vivait avec vous en 2022 ?</p>
                    <Controller
                      control={control}
                      name={`dependents.${index}.livedWithTaxPayer`}
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
                    <p>
                      Est-ce que vous voulez faire une déclaration de revenus
                      pour cet enfant?
                    </p>
                    <Controller
                      control={control}
                      name={`dependents.${index}.needTaxReport`}
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
                    {formData?.dependents?.[index]?.needTaxReport && (
                      <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg">
                        <p className="opacity-100">
                          Un questionnaire pour cette enfant est donc nécessaire{' '}
                        </p>
                      </div>
                    )}
                    {formData?.dependents?.[index]?.needTaxReport === false &&
                      formData?.dependents?.[index]?.livedWithTaxPayer && (
                        <>
                          <p>
                            Avez-vous payé quelqu&apos;un pour s&apos;occuper de
                            votre enfant afin de gagner un revenu, étudier ou
                            faire de la recherche en 2022?
                          </p>
                          <Controller
                            control={control}
                            name={`dependents.${index}.childcareToEarnIncome`}
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
                          {formData?.dependents?.[index]
                            ?.childcareToEarnIncome && (
                            <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg">
                              <p className="opacity-100">
                                Vous pourrez déposer tous vos reçus pour frais
                                de garde dans la boite de dépôt à la fin du
                                questionnaire
                              </p>
                            </div>
                          )}
                          <p>
                            En 2021, avez-vous reçu la prestation universelle
                            pour la garde d&apos;enfants (PUGE)? Ce montant
                            figure à la case 10 du feuillet RC62?
                          </p>
                          <Controller
                            control={control}
                            name={`dependents.${index}.universalChildCareBenefit`}
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
                          {formData?.dependents?.[index]
                            ?.universalChildCareBenefit && (
                            <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg">
                              <p className="opacity-100">
                                Vous pourrez déposer tous vos reçus pour frais
                                de garde dans la boite de dépôt à la fin du
                                questionnaire
                              </p>
                            </div>
                          )}
                          <p>
                            Avez-vous reçu des versements anticipés pour les
                            frais de garde d&apos;enfants?
                          </p>
                          <Controller
                            control={control}
                            name={`dependents.${index}.childcareExpensesReceivedForAdvancePayments`}
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
                          <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg">
                            <p>
                              Voulez-vous demander un des crédits suivants pour
                              vos enfants :
                            </p>
                            <div className="flex items-center gap-2 py-2">
                              <Checkbox
                                {...register(
                                  `dependents.${index}.eligibleDependentAmount`
                                )}
                              />
                              <p>
                                Montant pour une personne à charge admissible{' '}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 py-2">
                              <Checkbox
                                {...register(
                                  `dependents.${index}.tuitonsAndEducationAmountsTransferred`
                                )}
                              />
                              <p>
                                Montants pour frais de scolarité et études
                                transférés{' '}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 py-2">
                              <Checkbox
                                {...register(
                                  `dependents.${index}.childrenActivitiesTaxCredit`
                                )}
                              />
                              <p>
                                Crédit d&apos;impôt pour les activités des
                                enfants (résidents du Québec seulement){' '}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 py-2">
                              <Checkbox
                                {...register(
                                  `dependents.${index}.disabilityAmountTransferredFromDependant`
                                )}
                              />
                              <p>
                                Montant pour personnes handicapées transféré
                                d&apos;une personne à charge{' '}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 py-2">
                              <Checkbox
                                {...register(
                                  `dependents.${index}.canadianCaregiverAmount`
                                )}
                              />
                              <p>
                                Montant canadien pour aidant naturel (incluant
                                les montants pour aidants naturels et pour une
                                personne à charge ayant une déficience){' '}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 py-2">
                              <Checkbox
                                {...register(
                                  `dependents.${index}.adoptionFees`
                                )}
                              />
                              <p>Frais d&apos;adoption </p>
                            </div>
                            <div className="flex items-center gap-2 py-2">
                              <Checkbox
                                {...register(
                                  `dependents.${index}.dependentChildAmount`
                                )}
                              />
                              <p>
                                Montant pour enfants à charge (résident du
                                Québec)
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                    {index === formData.dependents.length - 1 && (
                      <>
                        <div className="w-full flex justify-between mt-4 flex-row-reverse">
                          <input
                            type="submit"
                            value="Ajouter un dépendant"
                            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                            onClick={() =>
                              append({
                                firstName: '',
                                lastName: '',
                                birthDate: null,
                                socialSecurityNumber: null,
                                relationship: null,
                                livedWithTaxPayer: null,
                                federalNetIncome: null,
                                provincialNetIncome: null,
                                adjustedNetIncome: null,
                                quebecChildrenSupport: null,
                                claimedOrReceivedAmountForDependent: null,
                              })
                            }
                          />
                          {formData.dependents.length > 1 && (
                            <button
                              type="button"
                              value="Enlever un dépendent"
                              className="bg-[#222C40] hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded cursor-pointer"
                              onClick={() => {
                                remove(fields.length - 1);
                              }}
                            >
                              Enlever un dépendent
                            </button>
                          )}
                        </div>
                        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
                      </>
                    )}
                  </>
                )}
              </div>
            ))}
          <div className="w-full flex justify-between mt-4">
            <input
              type="submit"
              value="Précédant"
              onClick={() =>
                setSearchParams({
                  step: TaxDeclarationStep.CIVIL_STATUS_CHANGE,
                })
              }
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
