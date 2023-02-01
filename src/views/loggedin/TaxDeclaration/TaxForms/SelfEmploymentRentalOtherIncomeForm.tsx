import { Checkbox } from 'flowbite-react';
import React from 'react';
import { Controller } from 'react-hook-form';
import { TaxProfileFormProps } from '../types/TaxProfileFormProps';

export function SelfEmploymentRentalOtherIncomeForm(
  props: TaxProfileFormProps
) {
  const { control, formData } = props;

  return (
    <>
      <p>
        Avez-vous un revenu de travailleur autonome, de location ou
        d&apos;autres revenus?
      </p>
      <Controller
        control={control}
        name="selfEmploymentRentalOtherIncome.selfEmploymentRentalOtherIncome"
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

      {formData?.selfEmploymentRentalOtherIncome
        ?.selfEmploymentRentalOtherIncome === true && (
        <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg w-full">
          <div className="flex items-center gap-2 py-2">
            <Checkbox />
            <p>J&apos;étais un travailleur autonome</p>
          </div>
          <hr className="py-2"></hr>
          <div className="px-8 pb-2">
            <p>Cochez toutes les cases qui s&apos;appliquent.</p>
            <div className="flex items-center gap-2 py-2">
              <Checkbox />
              <p>Profession libérale</p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <Checkbox />
              <p>Commission</p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <Checkbox />
              <p>Agriculture</p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <Checkbox />
              <p>Pêche</p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <Checkbox />
              <p>Autre</p>
            </div>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox />
            <p>
              J&apos;ai un bien locatif qui génère des revenus ou des dépenses
            </p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox />
            <p>
              J&apos;ai retiré de l&apos;argent d&apos;un REER ou d&apos;un FERR
            </p>
          </div>
          <hr className="py-2"></hr>
          <div className="px-8 pb-2">
            <p>Cochez toutes les cases qui s&apos;appliquent.</p>
            <div className="flex items-center gap-2 py-2">
              <Checkbox />
              <p>
                J&apos;ai participé au régime d&apos;accession à la propriété
              </p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <Checkbox />
              <p>
                J&apos;ai participé au régime d&apos;encouragement à
                l&apos;éducation permanente
              </p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <Checkbox />
              <p>J&apos;ai reçu un T4RSP / Relevé 2</p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <Checkbox />
              <p>J&apos;ai reçu un T4RIF / Relevé 2</p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <Checkbox />
              <p>
                J&apos;ai retiré de l&apos;argent d&apos;un FERR de conjoint
              </p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <Checkbox />
              <p>
                J&apos;ai retiré des cotisations au REER ou au FERR non
                déclarées pour lesquelles je pourrais avoir droit à une
                déduction (formulaire T746)
              </p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <Checkbox />
              <p>
                J&apos;ai retiré de l&apos;argent d&apos;un REER de conjoint
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox />
            <p>J&apos;ai un revenu scolaire</p>
          </div>
          <hr className="py-2"></hr>
          <div className="px-8 pb-2">
            <p>Cochez toutes les cases qui s&apos;appliquent.</p>
            <div className="flex items-center gap-2 py-2">
              <Checkbox />
              <p>
                T4A / Relevé 2 / Relevé 1 - Pension, retraite, rente et autres
                revenus (y compris bourses d&apos;études et d&apos;entretien)
              </p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <Checkbox />
              <p>T4E / Relevé 6 - Prestations d&apos;assurance-emploi</p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <Checkbox />
              <p>
                T4RSP / Relevé 2 - Revenus d&apos;un régime enregistré
                d&apos;épargne-retraite
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox />
            <p>J&apos;ai reçu de l&apos;aide sociale</p>
          </div>
          <hr className="py-2"></hr>
          <div className="px-8 pb-2">
            <p>Cochez toutes les cases qui s&apos;appliquent.</p>
            <div className="flex items-center gap-2 py-2">
              <Checkbox />
              <p>
                T5007 / Relevé 5 - Prestations d&apos;assistance sociale ou de
                la CAT, supplément pour personnes âgées
              </p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <Checkbox />
              <p>Relevé 19 - Versements anticipés</p>
            </div>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox />
            <p>
              J&apos;ai reçu des prestations d&apos;invalidité ou des
              prestations de décès
            </p>
          </div>
          <hr className="py-2"></hr>
          <div className="px-8 pb-2">
            <p>Cochez toutes les cases qui s&apos;appliquent.</p>
            <div className="flex items-center gap-2 py-2">
              <Checkbox />
              <p>
                T4A(P) / Relevé 2 - Prestations du Régime de pensions du Canada
                ou du Régime de rentes du Québec
              </p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <Checkbox />
              <p>
                T4A / Relevé 2 / Relevé 1 - Pension, retraite, rente et autres
                revenus
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox />
            <p>
              J&apos;ai reçu des versements de pension alimentaire au profit de
              l&apos;époux ou conjoint ou de pension alimentaire pour enfants
            </p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox />
            <p>
              J&apos;ai reçu des versements anticipés de la prestation fiscale
              pour le revenu de travail
            </p>
          </div>
          <hr className="py-2"></hr>
          <div className="px-8 pb-2">
            <p>Cochez toutes les cases qui s&apos;appliquent.</p>
            <div className="flex items-center gap-2 py-2">
              <Checkbox />
              <p>
                RC210 - Versements anticipés de la prestation fiscale pour le
                revenu de travail
              </p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <Checkbox />
              <p>Relevé 19 - Versements anticipés</p>
            </div>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox />
            <p>
              J&apos;ai reçu d&apos;autres revenus qui ne sont pas inclus
              ailleurs
            </p>
          </div>
        </div>
      )}
    </>
  );
}
