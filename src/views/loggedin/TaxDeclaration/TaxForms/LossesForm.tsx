import { Checkbox } from 'flowbite-react';
import React from 'react';
import { Controller } from 'react-hook-form';
import { RespondentFormProps } from '../types/Respondent/RespondentFormProps';

// We removed this form from the questionnaire for now, keeping it case steph change his mind since it took quite some time to do.
export function LossesForm(props: RespondentFormProps) {
  const { control, register, formData } = props;

  return (
    <>
      <p>
        Avez-vous des pertes de cette année ou d&apos;une année précédente à
        déclarer? Vous devez avoir conclu une vente ou être réputé avoir vendu
        pour pouvoir déduire cette perte. Une perte dans un REER n&apos;est pas
        admissible ?
      </p>
      <Controller
        control={control}
        name="taxReport.losses.losses"
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

      {formData?.taxReport?.losses?.losses && (
        <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg">
          <p>
            Aviez-vous une perte déductible au titre d&apos;un placement
            d&apos;entreprise? Il s&apos;agit généralement d&apos;une perte qui
            se produit quand vous disposez d&apos;une quote-part dans une
            société exploitant une petite entreprise.
          </p>
          <Controller
            control={control}
            name="taxReport.losses.deductibleBusinessInvestmentLoss"
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
          <p>
            Avez-vous des pertes d&apos;années précédentes que vous voulez
            reporter à cette année ou déduire de vos gains cette année?
          </p>
          <Controller
            control={control}
            name="taxReport.losses.deductibleBusinessInvestmentLoss"
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
          <Controller
            control={control}
            name="taxReport.losses.previousYearsLost"
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

          {formData?.taxReport?.losses?.previousYearsLost && (
            <>
              <hr className="py-2"></hr>
              <div className="mx-8 mb-4">
                <p>Cochez toutes les cases qui s&apos;appliquent.</p>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register('taxReport.losses.workOrBusinessLosses')}
                  />
                  <p>
                    Pertes liées à l&apos;emploi ou à une entreprise subies dans
                    une année précédente
                  </p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register('taxReport.losses.personnalPropertyLosees')}
                  />
                  <p>
                    Pertes de biens personnels comme des objets d&apos;art, des
                    bijoux, des pièces de monnaie, etc.
                  </p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register('taxReport.losses.capitalAssetsLosses')}
                  />
                  <p>
                    obligations, des fonds communs, des biens immobiliers, etc.
                  </p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register('taxReport.losses.partnershipLosses')}
                  />
                  <p>
                    Pertes d&apos;une société de personnes dans laquelle vous
                    n&apos;êtes pas un associé actif ou un commanditaire
                  </p>
                </div>
              </div>
            </>
          )}

          <p>
            Avez-vous subi des pertes cette année que vous voulez déduire de
            gains réalisés pendant une année précédente?
          </p>
          <Controller
            control={control}
            name="taxReport.losses.deductLossesFromPreviousYearGains"
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
        </div>
      )}
    </>
  );
}
