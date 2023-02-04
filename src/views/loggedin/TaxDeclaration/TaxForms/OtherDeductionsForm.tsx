import { Checkbox } from 'flowbite-react';
import React, { useState } from 'react';
import { TaxProfileFormProps } from '../types/TaxReport/TaxProfileFormProps';

export function OtherDeductionsForm(props: TaxProfileFormProps) {
  const { register } = props;
  const [showOtherDeductionsForm, setShowOtherDeductionsForm] = useState(false);
  const [showInstalmentPayments, setShowInstalmentPayments] = useState(false);
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
            value="yes"
            onChange={() => setShowOtherDeductionsForm(true)}
            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            checked={showOtherDeductionsForm}
          />
          <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
            Oui
          </p>
        </div>
        <div className="flex items-center m-4">
          <input
            type="radio"
            value="yes"
            onChange={() => setShowOtherDeductionsForm(false)}
            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            checked={!showOtherDeductionsForm}
          />
          <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
            Non
          </p>
        </div>
      </fieldset>
      {showOtherDeductionsForm && (
        <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg">
          <p>Cochez TOUTES les cases qui s&apos;appliquent. </p>
          <div className="flex items-center gap-2 py-2">
            <Checkbox
              {...register('otherDeductions.digitalNewServicesSubscription')}
            />
            <p>
              J&apos;ai acheté un abonnement à des services de nouvelles
              numériques
            </p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox
              {...register('otherDeductions.covid19BenefitsReimbursement')}
            />
            <p>
              NOUVEAU! J&apos;ai remboursé des prestations liées à la COVID-19
              avant le 1er janvier 2023
            </p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox
              {...register('otherDeductions.boughtEligibleSchoolSupplies')}
            />
            <p>
              Je suis un enseignant ou un éducateur de la petite enfance
              admissible et j&apos;ai acheté des fournitures scolaires
              admissibles au cours de l&apos;année
            </p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox
              {...register('otherDeductions.paidUnionOrProfessionalDues')}
            />
            <p>J&apos;ai payé des cotisations syndicales ou professionnelles</p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox
              {...register('otherDeductions.paidSpousalOrChildSupport')}
            />
            <p>
              J&apos;ai payé une pension alimentaire pour conjoint ou enfants
            </p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox {...register('otherDeductions.unusedSpousalCredits')} />
            <p>
              Mon conjoint a des crédits qu&apos;il n&apos;utilisera pas et qui
              peuvent m&apos;être transférés
            </p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox {...register('otherDeductions.paidForeignTaxes')} />
            <p>J&apos;ai payé de l&apos;impôt à un pays étranger</p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox
              {...register('otherDeductions.northernResidentsDeduction')}
            />
            <p>
              Je vis dans une région désignée et je suis admissible à la
              déduction pour les habitants de régions éloignées
            </p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox
              {...register('otherDeductions.paidForestryOperationsTaxes')}
            />
            <p>J&apos;ai payé de l&apos;impôt sur les opérations forestières</p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox
              {...register(
                'otherDeductions.carryingForwardalternativeMinimumTaxPayments'
              )}
            />
            <p>
              Je reporte des paiements d&apos;impôt minimum de remplacement
              d&apos;années passées
            </p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox
              {...register('otherDeductions.alternativeMinimumTaxRevision')}
            />
            <p>
              Je veux réviser mon impôt minimum de remplacement (IMR) pour 2022.
              Si vous ne cochez pas cette case et que l&apos;IMR vous concerne,
              nous vous inviterons à réviser votre déclaration plus tard.
            </p>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Checkbox {...register('otherDeductions.otherDeductions')} />
            <p>J&apos;avais d&apos;autres déductions non incluses ci-dessus</p>
          </div>
        </div>
      )}
      <p>Avez-vous versé des acomptes provisionnels en 2022?</p>
      <fieldset className="flex flex-row m-4">
        <div className="flex items-center">
          <input
            type="radio"
            value="yes"
            onChange={() => setShowInstalmentPayments(true)}
            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            checked={showInstalmentPayments}
          />
          <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
            Oui
          </p>
        </div>
        <div className="flex items-center m-4">
          <input
            type="radio"
            value="no"
            onChange={() => setShowInstalmentPayments(false)}
            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            checked={!showInstalmentPayments}
          />
          <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
            Non
          </p>
        </div>
      </fieldset>
      {showInstalmentPayments === true && (
        <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg">
          <p>
            Entrez les accomptes provisionnels trimestriels que vous avez versés
            à l&apos;ARC en 2022. N&apos;incluez pas les paiments de votre impôt
            de 2022.
          </p>
          <div className="relative z-0 mt-4 mb-6 group w-full">
            <input
              {...register('instalmentPayments')}
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
      )}
    </>
  );
}
