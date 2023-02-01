import { Checkbox } from 'flowbite-react';
import React from 'react';
import { Controller } from 'react-hook-form';
import { TaxProfileFormProps } from '../types/TaxProfileFormProps';

export function LossesForm(props: TaxProfileFormProps) {
  const { control, formData } = props;

  return (
    <>
      <p>
        Avez-vous des pertes de cette année ou d&apos;une année précédente à
        déclarer? Vous devez avoir conclu une vente ou être réputé avoir vendu
        pour pouvoir déduire cette perte. Une perte dans un REER n&apos;est pas
        admissible ?
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
        <p>
          Aviez-vous une perte déductible au titre d&apos;un placement
          d&apos;entreprise? Il s&apos;agit généralement d&apos;une perte qui se
          produit quand vous disposez d&apos;une quote-part dans une société
          exploitant une petite entreprise.
        </p>
        <fieldset className="flex flex-row m-2">
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
        <p>
          Avez-vous des pertes d&apos;années précédentes que vous voulez
          reporter à cette année ou déduire de vos gains cette année?
        </p>
        <fieldset className="flex flex-row m-2">
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
        <hr className="py-2"></hr>
        <div className="mx-8 mb-4">
          <p>Cochez toutes les cases qui s&apos;appliquent.</p>
          <div className="flex items-center gap-2 py-2">
            <Checkbox />
            <p>
              Pertes liées à l&apos;emploi ou à une entreprise subies dans une
              année précédente
            </p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox />
            <p>Pertes d&apos;agriculture ou de pêche</p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox />
            <p>
              Pertes de biens personnels comme des objets d&apos;art, des
              bijoux, des pièces de monnaie, etc.
            </p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox />
            <p>obligations, des fonds communs, des biens immobiliers, etc.</p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox />
            <p>
              Pertes d&apos;une société de personnes dans laquelle vous
              n&apos;êtes pas un associé actif ou un commanditaire
            </p>
          </div>
        </div>
        <p>
          Avez-vous subi des pertes cette année que vous voulez déduire de gains
          réalisés pendant une année précédente?
        </p>
        <fieldset className="flex flex-row m-2">
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
      </div>
    </>
  );
}
