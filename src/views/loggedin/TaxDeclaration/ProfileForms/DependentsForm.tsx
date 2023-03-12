import { Checkbox, Select } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react';
import { Controller, useFieldArray } from 'react-hook-form';
import Datepicker from 'react-tailwindcss-datepicker';
import {
  Dependent,
  DependentRelatationShipEnum,
} from '../types/Questionnaire/Dependent';
import { TaxDeclarationStep } from '../types/TaxReport/TaxDeclarationStep';
import Fade from 'react-reveal';
import { DateRangeType } from 'react-tailwindcss-datepicker/dist/types';
import {
  ClientTypeEnum,
  Questionnaire,
} from '../types/Questionnaire/Questionnaire';
import {
  QuestionnaireContext,
  QuestionnaireContextType,
} from '../context/QuestionnaireContext';

export function DependentsForm() {
  const {
    register,
    handleSubmit,
    saveFormAnswers,
    control,
    setSearchParams,
    formData,
    setValue,
    questionnaires,
  } = useContext(QuestionnaireContext) as QuestionnaireContextType;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'dependents',
  });

  const [birthDayValue, setBirthDayValue] = useState([]);

  useEffect(() => {
    const dateList = [];
    formData?.dependents?.forEach((dependent) => {
      dateList.push({
        startDate: dependent.birthDay,
        endDate: dependent.birthDay,
      });
    });
    setBirthDayValue(dateList);
  }, [formData]);

  function onSubmitButton() {
    saveFormAnswers();
    setSearchParams({ step: TaxDeclarationStep.INCOMES });
  }

  //TODO: finish this
  function kidIsAtLeast14YearsOld(birthDate: Date) {
    const date = new Date('2008-01-01').getFullYear();
    return Math.abs(birthDate.getFullYear() - date) >= 14;
  }

  function findMainClientName() {
    let mainClientName = '';
    questionnaires?.forEach((questionnaire) => {
      if (questionnaire?.clientType === ClientTypeEnum.MAIN_CLIENT) {
        mainClientName = questionnaire?.personalInformations?.firstName;
      }
    });
    return mainClientName;
  }

  function fillDependentsForm() {
    let mainClientDependents: Dependent[] = [];
    questionnaires.forEach((questionnaire) => {
      if (questionnaire?.clientType === ClientTypeEnum.MAIN_CLIENT) {
        mainClientDependents = questionnaire?.dependents;
      }
    });
    setValue('dependents', mainClientDependents);
    setValue('hasDependents', true);
  }

  function mainClientHaveDependent(): boolean {
    let mainClient: Questionnaire = null;
    questionnaires.forEach((entry) => {
      if (entry.clientType === ClientTypeEnum.MAIN_CLIENT) {
        mainClient = entry;
      }
    });
    return mainClient?.dependents?.length > 0;
  }

  return (
    <Fade>
      <section className="flex flex-col align-baseline items-start w-full">
        <h1>Avez-vous des enfants à votre charge?</h1>
        <form
          onSubmit={handleSubmit(onSubmitButton)}
          className="flex flex-col items-start w-full"
        >
          {formData.clientType === ClientTypeEnum.PARTNER &&
            mainClientHaveDependent() && (
              <>
                <p className="font-semibold">
                  Avez-vous des enfants avec {findMainClientName()}?
                </p>
                <Controller
                  control={control}
                  name="hasDependentsWithPartner"
                  render={({ field: { onChange, value } }) => (
                    <fieldset className="flex flex-row mx-4">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          onChange={() => {
                            onChange(true);
                            fillDependentsForm();
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
                            for (
                              let i = 0;
                              i <= formData.dependents.length;
                              i++
                            ) {
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
              </>
            )}
          <p className="font-semibold">Avez-vous des enfants?</p>
          <Controller
            control={control}
            name="hasDependents"
            render={({ field: { onChange, value } }) => (
              <fieldset className="flex flex-row mx-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    onChange={() => {
                      onChange(true);
                      append({
                        firstName: '',
                        lastName: '',
                        birthDay: null,
                        socialInsuranceNumber: null,
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
                    Oui, j’ai des enfants à ma charge nés avant le 31 décembre
                    2022
                  </p>
                </div>
                <div className="flex items-center m-4">
                  <input
                    type="radio"
                    onChange={() => {
                      onChange(false);
                      for (let i = 0; i <= formData.dependents.length; i++) {
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

          {(formData?.hasDependents || formData?.hasDependentsWithPartner) &&
            fields.map((dependent: Dependent, index: number) => (
              <div className="w-full" key={index}>
                <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
                <h2 className="mb-6">Formulaire enfant {index + 1}</h2>
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
                          `dependents.${index}.socialInsuranceNumber`
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
                          `dependents.${index}.birthDay`,
                          newValue.startDate
                        );
                        birthDayValue[index] = newValue;
                        setBirthDayValue(birthDayValue);
                      }}
                      placeholder={'Date de naissance (JJ/MM/AAAA)'}
                      maxDate={new Date('2022-12-31')}
                    />
                  </div>
                  <div id="select" className="w-48 mb-6 flex flex-col">
                    <p className="pb-2 font-semibold">Lien de parenté</p>
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
                    </Select>
                  </div>
                  <p className="font-semibold">
                    Est-ce que l&apos;enfant vivait avec vous en 2022 ?
                  </p>
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
                  {formData?.dependents?.[index]?.birthDay &&
                    new Date(
                      formData?.dependents?.[index]?.birthDay
                    ).getFullYear() < new Date('2009-01-01').getFullYear() && (
                      <>
                        <p className="font-semibold">
                          Est-ce que vous voulez faire une déclaration de
                          revenus pour cet enfant?
                        </p>
                        <Controller
                          control={control}
                          name={`dependents.${index}.hasTaxReport`}
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
                      </>
                    )}

                  {formData?.dependents?.[index]?.hasTaxReport && (
                    <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg">
                      <p className="font-semibold">
                        Un questionnaire pour cette enfant est donc nécessaire{' '}
                      </p>
                    </div>
                  )}
                  {formData?.dependents?.[index]?.livedWithTaxPayer &&
                    new Date(
                      formData?.dependents?.[index]?.birthDay
                    ).getFullYear() < new Date('2009-01-01').getFullYear() && (
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
                            <p className="font-semibold">
                              Vous pourrez déposer tous vos reçus pour frais de
                              garde dans la boite de dépôt à la fin du
                              questionnaire
                            </p>
                          </div>
                        )}
                        <p>
                          En 2021, avez-vous reçu la prestation universelle pour
                          la garde d&apos;enfants (PUGE)? Ce montant figure à la
                          case 10 du feuillet RC62?
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
                            <p className="font-semibold">
                              Vous pourrez déposer tous vos reçus pour frais de
                              garde dans la boite de dépôt à la fin du
                              questionnaire
                            </p>
                          </div>
                        )}
                        <p>
                          Avez-vous reçu des versements anticipés pour les frais
                          de garde d&apos;enfants?
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
                              Crédit d&apos;impôt pour les activités des enfants
                              (résidents du Québec seulement){' '}
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
                              Montant canadien pour aidant naturel (incluant les
                              montants pour aidants naturels et pour une
                              personne à charge ayant une déficience){' '}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 py-2">
                            <Checkbox
                              {...register(`dependents.${index}.adoptionFees`)}
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
                              Montant pour enfants à charge (résident du Québec)
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
                          value="Ajouter un enfant"
                          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                          onClick={() =>
                            append({
                              firstName: '',
                              lastName: '',
                              birthDay: null,
                              socialInsuranceNumber: null,
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
                            Enlever un enfant
                          </button>
                        )}
                      </div>
                      <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
                    </>
                  )}
                </>
              </div>
            ))}
          <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
          <div className="w-full flex justify-between mt-4">
            <input
              type="submit"
              value="Précédant"
              onClick={() =>
                setSearchParams({
                  step: TaxDeclarationStep.CONTACT_DETAILS,
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
