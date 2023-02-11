import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CivilStatusEnum } from '../types/Profile/CivilStatusEnum';
import { TaxDeclarationStep } from '../types/TaxReport/TaxDeclarationStep';
import Fade from 'react-reveal';
import { doc, Firestore, setDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { Profile } from '../types/Profile/Profile';

export function CivilStatusForm({
  firestore,
  user,
}: {
  firestore: Firestore;
  user: User;
}) {
  const {
    register,
    handleSubmit,
    formState: {},
    watch,
    control,
  } = useForm<Profile>();
  const navigate = useNavigate();
  const formData = watch();

  async function onSubmitButton() {
    // await setDoc(doc(firestore, 'profile', user.uid), {});
    console.log(formData);
    navigate(
      `/platform/questionnaire?step=${TaxDeclarationStep.PERSONAL_INFORMATIONS}`
    );
  }

  return (
    <Fade>
      <section className="flex flex-col items-start w-full">
        <h1>Quel est votre état civil</h1>
        <h2>Le 31 décembre 2022 vous étiez : </h2>
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

          {(formData.civilStatus.civilStatus ===
            CivilStatusEnum.COMMON_LAW_PARTNER ||
            formData.civilStatus.civilStatus === CivilStatusEnum.MARRIED) && (
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
              <fieldset className="flex flex-row">
                <div className="flex items-center m-4">
                  <input
                    {...register('civilStatus.together')}
                    type="radio"
                    value="no"
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Oui
                  </label>
                </div>
                <div className="flex items-center m-4">
                  <input
                    {...register('civilStatus.together')}
                    type="radio"
                    value="yes"
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Non
                  </label>
                </div>
              </fieldset>
            </div>
          )}
          <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
          <input
            type="submit"
            value="Continuez"
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded cursor-pointer self-end"
          />
        </form>
      </section>
    </Fade>
  );
}
