import React, { useContext } from 'react';
import { Controller } from 'react-hook-form';
import {
  QuestionnaireContext,
  QuestionnaireContextType,
} from '../context/QuestionnaireContext';

export function ForeignAssetsForm() {
  const { control, formData } = useContext(
    QuestionnaireContext
  ) as QuestionnaireContextType;

  return (
    <>
      <p className="font-semibold">
        Possédiez-vous ou déteniez-vous des biens étrangers déterminés, dont le
        coût total, à un moment donné durant l&apos;année{' '}
        {new Date().getFullYear() - 1}, s&apos;est élevé à plus de 100 000 $ CA?
      </p>
      <Controller
        control={control}
        name="taxReport.foreignAssets"
        render={({ field: { onChange, value } }) => (
          <fieldset className="flex flex-row m-4">
            <div className="flex items-center">
              <input
                type="radio"
                onChange={() => onChange(true)}
                checked={value === true}
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
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
      {formData?.taxReport?.foreignAssets && (
        <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg w-full">
          <p>
            Vous avez indiqué que vous possédez ou détenez des biens étrangers
            dont le coût total s&apos;est élevé à plus de 100 000 $ CA. Si ce
            n&apos;est pas déjà fait, vous devez produire le formulaire T1135,
            Bilan de vérification du revenu étranger. Veuillez noter que vous
            devrez payer des pénalités considérables si le formulaire T1135
            n&apos;est pas produit avant la date limite. Si vous avez fourni des
            renseignements inexacts ou incomplets, ou si vous n&apos;avez pas
            produit le formulaire T1135 pour des années antérieures,
            l&apos;Agence du revenu du Canada vous recommande fortement de
            corriger votre situation fiscale par l&apos;intermédiaire du
            Programme des divulgations volontaires (PDV).
          </p>
        </div>
      )}
    </>
  );
}
