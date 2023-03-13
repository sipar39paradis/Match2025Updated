import { Checkbox } from 'flowbite-react';
import React, { useContext } from 'react';
import { Controller } from 'react-hook-form';
import {
  QuestionnaireContext,
  QuestionnaireContextType,
} from '../context/QuestionnaireContext';

export function OtherDeductionsForm() {
  const { register, control, formData } = useContext(
    QuestionnaireContext
  ) as QuestionnaireContextType;
  return (
    <>
      <p className="font-semibold">
        Voulez-vous demander d&apos;autres déductions (abonnement à des services
        de nouvelles numériques, laissez-passer de transport en commun,
        cotisations syndicales ou professionnelles ou pension alimentaire
        payée)?
      </p>
      <Controller
        control={control}
        name="taxReport.isOtherDeductions"
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

      {formData?.taxReport?.isOtherDeductions && (
        <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg">
          <p>Cochez TOUTES les cases qui s&apos;appliquent. </p>

          <div className="flex items-center gap-2 py-2">
            <Checkbox
              {...register(
                'taxReport.otherDeductions.paidUnionOrProfessionalDues'
              )}
            />
            <p>J&apos;ai payé des cotisations syndicales ou professionnelles</p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox
              {...register(
                'taxReport.otherDeductions.paidSpousalOrChildSupport'
              )}
            />
            <p>
              J&apos;ai payé une pension alimentaire pour conjoint ou enfants
            </p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox
              {...register('taxReport.otherDeductions.paidForeignTaxes')}
            />
            <p>J&apos;ai payé de l&apos;impôt à un pays étranger</p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox
              {...register(
                'taxReport.otherDeductions.northernResidentsDeduction'
              )}
            />
            <p>
              Je vis dans une région désignée et je suis admissible à la
              déduction pour les habitants de régions éloignées
            </p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox
              {...register('taxReport.otherDeductions.otherDeductions')}
            />
            <p>J&apos;avais d&apos;autres déductions non incluses ci-dessus</p>
          </div>
        </div>
      )}
      <p className="font-semibold">
        Avez-vous versé des acomptes provisionnels en{' '}
        {new Date().getFullYear() - 1}?
      </p>
      <Controller
        control={control}
        name="taxReport.isInstalmentPayments"
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

      {formData?.taxReport?.isInstalmentPayments && (
        <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg">
          <p>
            Entrez les acomptes provisionnels trimestriels que vous avez versés
            à l&apos;ARC en {new Date().getFullYear() - 1}. N&apos;incluez pas
            les paiements de votre impôt de {new Date().getFullYear() - 2}.
          </p>
          <div className="relative z-0 mt-4 mb-6 group w-full">
            <input
              {...register('taxReport.instalmentPayments')}
              type="number"
              className="block py-2.5 px-0  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
              placeholder=" "
            />
            <p className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Montant
            </p>
          </div>
        </div>
      )}
    </>
  );
}
