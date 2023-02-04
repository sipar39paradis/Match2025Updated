import { Checkbox } from 'flowbite-react';
import React from 'react';
import { Controller } from 'react-hook-form';
import { TaxProfileFormProps } from '../types/TaxProfileFormProps';

export function OtherDeductionsForm(props: TaxProfileFormProps) {
  const { control, formData } = props;

  return (
    <>
      <p>
        Voulez-vous demander d&apos;autres déductions (abonnement à des services
        de nouvelles numériques, laissez-passer de transport en commun,
        cotisations syndicales ou professionnelles, pension alimentaire payée ou
        remboursement des prestations liées à la COVID-19)?
      </p>
      <fieldset className="flex flex-row m-4">
        <div className="flex items-center">
          <input
            type="radio"
            value="no"
            id="field-dead-person-yes"
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
            id="field-dead-person-no"
            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
          />
          <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
            Non
          </p>
        </div>
      </fieldset>
      <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg">
        <p>Cochez TOUTES les cases qui s&apos;appliquent. </p>
        <fieldset className="flex flex-col m-4">
          <div className="flex items-center mb-2">
            <input
              type="radio"
              value="no"
              id="field-dead-person-yes"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <p className="block ml-4  font-medium text-gray-900 dark:text-gray-300">
              J&apos;ai acheté un abonnement à des services de nouvelles
              numériques
            </p>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              value="yes"
              id="field-dead-person-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <p className="block ml-4  font-medium text-gray-900 dark:text-gray-300">
              NOUVEAU! J&apos;ai remboursé des prestations liées à la COVID-19
              avant le 1er janvier 2023
            </p>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              value="yes"
              id="field-dead-person-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <p className="block ml-4  font-medium text-gray-900 dark:text-gray-300">
              Je suis un enseignant ou un éducateur de la petite enfance
              admissible et j&apos;ai acheté des fournitures scolaires
              admissibles au cours de l&apos;année
            </p>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              value="yes"
              id="field-dead-person-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <p className="block ml-4  font-medium text-gray-900 dark:text-gray-300">
              J&apos;ai payé des cotisations syndicales ou professionnelles
            </p>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              value="yes"
              id="field-dead-person-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <p className="block ml-4  font-medium text-gray-900 dark:text-gray-300">
              J&apos;ai payé une pension alimentaire pour conjoint ou enfants
            </p>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              value="yes"
              id="field-dead-person-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <p className="block ml-4  font-medium text-gray-900 dark:text-gray-300">
              Mon conjoint a des crédits qu&apos;il n&apos;utilisera pas et qui
              peuvent m&apos;être transférés
            </p>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              value="yes"
              id="field-dead-person-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <p className="block ml-4  font-medium text-gray-900 dark:text-gray-300">
              J&apos;ai payé de l&apos;impôt à un pays étranger
            </p>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              value="yes"
              id="field-dead-person-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <p className="block ml-4  font-medium text-gray-900 dark:text-gray-300">
              Je vis dans une région désignée et je suis admissible à la
              déduction pour les habitants de régions éloignées
            </p>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              value="yes"
              id="field-dead-person-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <p className="block ml-4  font-medium text-gray-900 dark:text-gray-300">
              J&apos;ai payé de l&apos;impôt sur les opérations forestières
            </p>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              value="yes"
              id="field-dead-person-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <p className="block ml-4  font-medium text-gray-900 dark:text-gray-300">
              Je reporte des paiements d&apos;impôt minimum de remplacement
              d&apos;années passées
            </p>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              value="yes"
              id="field-dead-person-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <p className="block ml-4  font-medium text-gray-900 dark:text-gray-300">
              Je veux réviser mon impôt minimum de remplacement (IMR) pour 2022.
              Si vous ne cochez pas cette case et que l&apos;IMR vous concerne,
              nous vous inviterons à réviser votre déclaration plus tard.
            </p>
          </div>{' '}
          <div className="flex items-center mb-2">
            <input
              type="radio"
              value="yes"
              id="field-dead-person-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <p className="block ml-4  font-medium text-gray-900 dark:text-gray-300">
              J&apos;avais d&apos;autres déductions non incluses ci-dessus
            </p>
          </div>{' '}
          <div className="flex items-center mb-2">
            <input
              type="radio"
              value="yes"
              id="field-dead-person-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <p className="block ml-4  font-medium text-gray-900 dark:text-gray-300">
              Aucun de ces choix
            </p>
          </div>
        </fieldset>
      </div>
      <p>Avez-vous versé des acomptes provisionnels en 2022?</p>
      <fieldset className="flex flex-row m-4">
        <div className="flex items-center">
          <input
            type="radio"
            value="no"
            id="field-dead-person-yes"
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
            id="field-dead-person-no"
            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
          />
          <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
            Non
          </p>
        </div>
      </fieldset>
      <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg">
        <p>
          Entrez les accomptes provisionnels trimestriels que vous avez versés à
          l&apos;ARC en 2022. N&apos;incluez pas les paiments de votre impôt de
          2022.
        </p>
        <div className="relative z-0 mt-4 mb-6 group w-full">
          <input
            type="number"
            name="floating_canadian_incomes"
            id="floating__canadian_incomes"
            className="block py-2.5 px-0  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
            placeholder=" "
          />
          <p className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Montant
          </p>
        </div>
      </div>
    </>
  );
}
