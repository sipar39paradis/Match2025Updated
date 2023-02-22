import { Checkbox } from 'flowbite-react';
import React from 'react';
import { Controller } from 'react-hook-form';
import { TooltipWithIcon } from '../../../../components/common/TooltipWithIcon';
import { RespondentFormProps } from '../types/Questionnaire/QuestionnaireFormProp';

export function StudentLastYearForm(props: RespondentFormProps) {
  const { register, control, formData } = props;

  return (
    <>
      <p className="font-semibold">
        Étiez-vous aux études en 2022 ou avez-vous reporté des dépenses liées à
        vos études des années antérieures?
      </p>
      <Controller
        control={control}
        name="taxReport.studentExpenses.studentExpenses"
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

      {formData?.taxReport?.studentExpenses?.studentExpenses && (
        <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg w-full">
          <p>Cochez toutes les cases qui s&apos;appliquent.</p>
          <div className="flex items-center gap-2 py-2">
            <Checkbox {...register('taxReport.studentExpenses.tuitionFees')} />
            <p>
              J&apos;avais des frais de scolarité figurant sur un feuillet
              T2202, un relevé 8 ou un feuillet TL11
            </p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox
              {...register('taxReport.studentExpenses.otherTuitionsFees')}
            />
            <p>J&apos;avais d&apos;autres frais de scolarité</p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox
              {...register('taxReport.studentExpenses.boughtFurnitures')}
            />
            <p>J&apos;ai acheté des manuels et des fournitures</p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox
              {...register(
                'taxReport.studentExpenses.tuitionsFeesPreviousYear'
              )}
            />
            <p>J&apos;avais des frais de scolarité dans une année précédente</p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox
              {...register('taxReport.studentExpenses.scholarshipGrantBursary')}
            />
            <p>
              J&apos;ai reçu une bourse d&apos;études, une subvention ou une
              bourse d&apos;entretien
            </p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox {...register('taxReport.studentExpenses.studentLoan')} />
            <p>J&apos;ai ou j&apos;avais un prêt étudiant</p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox {...register('taxReport.studentExpenses.RESPincomes')} />
            <p>
              J&apos;ai retiré de l&apos;argent d&apos;un REER
              <TooltipWithIcon text="Sachez que pour l’année 2022 aucun prêt étudiant n’a eu d’intérêt payable, alors, cochez oui uniquement si vous voulez déduire des intérêts reportables de 2021 ou avant"></TooltipWithIcon>
            </p>
          </div>

          <div className="flex items-center gap-2 py-2">
            <Checkbox {...register('taxReport.studentExpenses.RRSPincomes')} />
            <p>J&apos;avais des revenus provenant d&apos;un REEE</p>
          </div>
        </div>
      )}
    </>
  );
}
