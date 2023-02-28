import React, { useContext } from 'react';
import { Controller } from 'react-hook-form';
import { TooltipWithIcon } from '../../../../components/common/TooltipWithIcon';
import {
  QuestionnaireContext,
  QuestionnaireContextType,
} from '../context/QuestionnaireContext';

export function BoughtHomeForm() {
  const { control, formData } = useContext(
    QuestionnaireContext
  ) as QuestionnaireContextType;

  return (
    <>
      <p className="font-semibold">
        Avez-vous acheté une maison, un condo, un appartement ou une maison
        mobile cette année?
        <TooltipWithIcon text="Sachez que si vous ou votre conjoint (le cas échéant) n’avez jamais possédé une maison, un condo, un appartement ou une maison mobile, vous pourriez vous qualifier pour obtenir le montant pour l’achat d’une habitation qui pourrait représenter un remboursement d’impôts allant jusqu’à 3 000$. Si vous n’êtes pas certain de votre admissibilité, cochez oui et votre préparateur entrera en contact avec vous"></TooltipWithIcon>
      </p>
      <Controller
        control={control}
        name="taxReport.boughHome.boughHome"
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
      {formData?.taxReport?.boughHome?.boughHome && (
        <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg w-full">
          <p>Avez-vous acheté ou vendu un domicile en 2022? </p>
          <Controller
            control={control}
            name="taxReport.boughHome.boughtHomeLastYear"
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
          {formData?.taxReport?.boughHome?.boughtHomeLastYear && (
            <>
              <hr className="py-2"></hr>
              <p>
                Possédiez-vous et viviez-vous dans un autre domicile entre le
                1er janvier 2018 et le 31 décembre 2022?
              </p>
              <Controller
                control={control}
                name="taxReport.boughHome.differentHome"
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
              {formData?.taxReport?.boughHome?.differentHome && (
                <>
                  <hr className="py-2"></hr>
                  <p>
                    Ce domicile a-t-il été acheté pour être une habitation plus
                    accessible pour une personne handicapée?
                  </p>
                  <Controller
                    control={control}
                    name="taxReport.boughHome.boughtForDisabled"
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
                </>
              )}

              <hr className="py-2"></hr>
              <p>
                S&apos;agit-il d&apos;une habitation admissible et est-ce
                qu&apos;elle sera la résidence principale moins d&apos;un an
                après la date de transfert de la propriété?
              </p>
              <Controller
                control={control}
                name="taxReport.boughHome.homeAccessibilityTaxCredit"
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
