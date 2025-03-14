import React, { useContext } from 'react';
import { Controller } from 'react-hook-form';
import { CivilStatusEnum } from '../types/Questionnaire/CivilStatusEnum';
import { TaxDeclarationStep } from '../types/TaxReport/TaxDeclarationStep';
import {
  QuestionnaireContext,
  QuestionnaireContextType,
} from '../context/QuestionnaireContext';

export function CivilStatusForm() {
  const {
    register,
    control,
    formData,
    handleSubmit,
    saveFormAnswers,
    setSearchParams,
  } = useContext(QuestionnaireContext) as QuestionnaireContextType;

  function onSubmitButton() {
    saveFormAnswers();
    setSearchParams({ step: TaxDeclarationStep.CIVIL_STATUS_CHANGE });
  }

  return (
    <div>
      <section className="flex flex-col items-start w-full">
        <h1>Quel est votre état civil</h1>
        <h2>Le 31 décembre {new Date().getFullYear() - 1} vous étiez : </h2>
        <form
          onSubmit={handleSubmit(onSubmitButton)}
          className="flex flex-col items-start w-full"
        >
          <Controller
            control={control}
            name="civilStatus.civilStatus"
            render={() => (
              <fieldset className="flex flex-col m-4">
                <div className="flex items-center my-4">
                  <input
                    {...register('civilStatus.civilStatus', { required: true })}
                    type="radio"
                    value={CivilStatusEnum.MARRIED}
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                  />
                  <label className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Marié(e)
                  </label>
                </div>
                <div className="flex items-center my-4">
                  <input
                    {...register('civilStatus.civilStatus', { required: true })}
                    type="radio"
                    value={CivilStatusEnum.COMMON_LAW_PARTNER}
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                  />
                  <label className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Conjoint(e) de fait
                  </label>
                </div>
                <div className="flex items-center my-4">
                  <input
                    {...register('civilStatus.civilStatus', { required: true })}
                    type="radio"
                    value={CivilStatusEnum.WIDOW}
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Veuf(ve)
                  </label>
                </div>
                <div className="flex items-center my-4">
                  <input
                    {...register('civilStatus.civilStatus', { required: true })}
                    type="radio"
                    value={CivilStatusEnum.DIVORCED}
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Divorcé(e)
                  </label>
                </div>
                <div className="flex items-center my-4">
                  <input
                    {...register('civilStatus.civilStatus', { required: true })}
                    type="radio"
                    value={CivilStatusEnum.SEPARATED}
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Séparé(e)
                  </label>
                </div>
                <div className="flex items-center my-4">
                  <input
                    {...register('civilStatus.civilStatus', { required: true })}
                    type="radio"
                    value={CivilStatusEnum.SINGLE}
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Célibataire
                  </label>
                </div>
              </fieldset>
            )}
          />

          {(formData?.civilStatus?.civilStatus ===
            CivilStatusEnum.COMMON_LAW_PARTNER ||
            formData?.civilStatus?.civilStatus === CivilStatusEnum.MARRIED) && (
            <div>
              <h1 className="font-bold">
                Comment voulez-vous préparer vos déclarations?
              </h1>
              <p className="pb-3">
                En préparant vos déclarations ensemble, nous pouvons optimiser
                les crédits et les déductions auxquels vous et votre époux ou
                conjoint avez droit.
              </p>
              <p className="pb-3">
                Nous vous suggérons de préparer vos déclarations ensemble parce
                que le résultat sera soit le même ou plus avantageux que si vous
                prépariez vos déclarations séparément.
              </p>
              <h2>Voulez-vous préparer vos déclarations ensemble?</h2>
              <Controller
                control={control}
                name="civilStatus.together"
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
              {formData.civilStatus.together && (
                <p className="font-semibold">
                  Le conjoint(e) ou marié(e) aura son propre questionnaire à
                  remplir après celui du client principal
                </p>
              )}
            </div>
          )}
          <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
          <div className="w-full flex justify-between mt-4 flex-row-reverse">
            <input
              type="submit"
              value="Suivant"
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded cursor-pointer self-end"
            />
            <input
              type="submit"
              value="Précédent"
              onClick={() => {
                saveFormAnswers();
                setSearchParams({
                  step: TaxDeclarationStep.PERSONAL_INFORMATIONS,
                });
              }}
              className="bg-[#222C40] hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded cursor-pointer"
            />
          </div>
        </form>
      </section>
    </div>
  );
}
