import React, { useState } from 'react';
import { TaxReportFormProps } from '../types/TaxReport/TaxReportFormProps';

export function BoughtHomeForm(props: TaxReportFormProps) {
  const { register } = props;
  const [showBoughtHome, setShowBoughtHome] = useState(false);
  const [showBoughtHomeLastYear, setShowBoughtHomeLastYear] = useState(false);
  const [showDifferentHome, setShowDifferentHome] = useState(false);
  const [showBoughForDisabled, setShowBoughForDisabled] = useState(false);

  return (
    <>
      <p>
        Avez-vous acheté une maison, un condo, un appartement ou une maison
        mobile cette année? Sélectionnez Oui pour déterminer si vous êtes
        admissible au montant pour l&apos;achat d&apos;une première habitation ?
      </p>
      <fieldset className="flex flex-row m-4">
        <div className="flex items-center">
          <input
            type="radio"
            onChange={() => setShowBoughtHome(true)}
            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            checked={showBoughtHome}
          />
          <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
            Oui
          </p>
        </div>
        <div className="flex items-center m-4">
          <input
            type="radio"
            onChange={() => setShowBoughtHome(false)}
            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            checked={!showBoughtHome}
          />
          <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
            Non
          </p>
        </div>
      </fieldset>
      {showBoughtHome === true && (
        <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg w-full">
          <p>Avez-vous acheté ou vendu un domicile en 2022? </p>
          <fieldset className="flex flex-row m-2">
            <div className="flex items-center">
              <input
                type="radio"
                onChange={() => setShowBoughtHomeLastYear(true)}
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                checked={showBoughtHomeLastYear}
              />
              <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
                Oui
              </p>
            </div>
            <div className="flex items-center m-4">
              <input
                type="radio"
                onChange={() => setShowBoughtHomeLastYear(false)}
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                checked={!showBoughtHomeLastYear}
              />
              <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
                Non
              </p>
            </div>
          </fieldset>
          {showBoughtHomeLastYear === true && (
            <>
              <hr className="py-2"></hr>
              <p>
                Possédiez-vous et viviez-vous dans un autre domicile entre le
                1er janvier 2018 et le 31 décembre 2022?
              </p>
              <fieldset className="flex flex-row m-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    onChange={() => setShowDifferentHome(true)}
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                    checked={showDifferentHome}
                  />
                  <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
                    Oui
                  </p>
                </div>
                <div className="flex items-center m-4">
                  <input
                    type="radio"
                    onChange={() => setShowDifferentHome(false)}
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                    checked={!showDifferentHome}
                  />
                  <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
                    Non
                  </p>
                </div>
              </fieldset>
              {showDifferentHome === true && (
                <>
                  <hr className="py-2"></hr>
                  <p>
                    Ce domicile a-t-il été acheté pour être une habitation plus
                    accessible pour une personne handicapée?
                  </p>
                  <fieldset className="flex flex-row m-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
                        Oui
                      </p>
                    </div>
                    <div className="flex items-center m-4">
                      <input
                        type="radio"
                        className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
                        Non
                      </p>
                    </div>
                  </fieldset>
                </>
              )}

              <hr className="py-2"></hr>
              <p>
                S&apos;agit-il d&apos;une habitation admissible et est-ce
                qu&apos;elle sera la résidence principale moins d&apos;un an
                après la date de transfert de la propriété?
              </p>
              <fieldset className="flex flex-row m-2">
                <div className="flex items-center">
                  <input
                    {...register('homeAccessibilityTaxCredit')}
                    type="radio"
                    onClick={() => setShowBoughForDisabled(true)}
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
                    Oui
                  </p>
                </div>
                <div className="flex items-center m-4">
                  <input
                    {...register('homeAccessibilityTaxCredit')}
                    type="radio"
                    onClick={() => setShowBoughForDisabled(false)}
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
                    Non
                  </p>
                </div>
              </fieldset>
            </>
          )}

          <hr className="py-2"></hr>
          <p className="opacity-100">
            Vous n&apos;avez pas droit au crédit d&apos;impôt pour l&apos;achat
            d&apos;une habitation.
          </p>
        </div>
      )}
    </>
  );
}
