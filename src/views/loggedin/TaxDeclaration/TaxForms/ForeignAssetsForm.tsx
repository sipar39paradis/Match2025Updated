import React from 'react';
import { Controller } from 'react-hook-form';
import { TaxProfileFormProps } from '../types/TaxProfileFormProps';

export function ForeignAssetsForm(props: TaxProfileFormProps) {
  const { control, formData } = props;

  return (
    <>
      <p>
        Possédiez-vous ou déteniez-vous des biens étrangers déterminés, dont le
        coût total, à un moment donné durant l&apos;année 2022, s&apos;est élevé
        à plus de 100 000 $ CA?
      </p>
      <Controller
        control={control}
        name="foreignAssets"
        render={({ field: { onChange, value } }) => (
          <fieldset className="flex flex-row m-4">
            <div className="flex items-center">
              <input
                type="radio"
                value="no"
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
                value="yes"
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
      {formData?.foreignAssets === true && (
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
