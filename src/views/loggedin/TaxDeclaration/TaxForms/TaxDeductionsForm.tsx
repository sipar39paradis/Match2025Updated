import { Checkbox } from 'flowbite-react';
import React, { useContext } from 'react';
import { Controller } from 'react-hook-form';
import {
  QuestionnaireContext,
  QuestionnaireContextType,
} from '../context/QuestionnaireContext';

export function TaxDeductionsForm() {
  const { register, control, formData } = useContext(
    QuestionnaireContext
  ) as QuestionnaireContextType;

  return (
    <>
      <p className="font-semibold">
        Avez-vous cotisé des montants au niveau d&apos;un REER, d&apos;un RPAC,
        d&apos;un autre régime de pension ou avez-vous profité du régime
        d&apos;accession à la propriété (RAP)?
      </p>
      <Controller
        control={control}
        name="taxReport.taxDeductions.taxDeductions"
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

      {formData?.taxReport?.taxDeductions?.taxDeductions && (
        <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg">
          <p className="font-semibold">
            Avez-vous versé des cotisations à un régime de pension comme un
            REER, un RPAC, un régime de pension agréé ou le régime de pension
            déterminé ?
          </p>
          <Controller
            control={control}
            name="taxReport.taxDeductions.pensionPLan"
            render={({ field: { onChange, value } }) => (
              <fieldset className="flex flex-row mx-4">
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

          {formData?.taxReport?.taxDeductions?.pensionPLan && (
            <>
              <hr className="py-2"></hr>
              <div className="px-8 pb-2">
                <p>Cochez toutes les cases qui s&apos;appliquent.</p>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register('taxReport.taxDeductions.RRSPcontributions')}
                  />
                  <p>
                    J&apos;ai versé des cotisations au REER entre mars 2022 et
                    février 2023
                  </p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register(
                      'taxReport.taxDeductions.reportedButUnusedRRSPorSPP'
                    )}
                  />
                  <p>
                    J&apos;ai des cotisations versées à un REER ou des
                    cotisations au régime de pension déterminé que j&apos;ai
                    déclarées, mais qui sont inutilisées.
                  </p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register('taxReport.taxDeductions.unreportedRRSP')}
                  />
                  <p>
                    J&apos;ai versé des cotisations au REER avant mars 2022 et
                    je ne les ai pas indiquées dans une déclaration de revenus
                  </p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register('taxReport.taxDeductions.deferRRSP')}
                  />
                  <p>Je veux reporter mes REER.</p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register('taxReport.taxDeductions.employerPRPP')}
                  />
                  <p>
                    J&apos;ai versé ou mon employeur a versé des cotisations au
                    RPAC en mon nom, entre janvier 2022 et mars 2023
                  </p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register('taxReport.taxDeductions.contributionRPP')}
                  />
                  <p>
                    J&apos;ai versé des cotisations à un régime de pension agréé
                    (RPA) pour des services courants ou passés
                  </p>
                </div>
              </div>
            </>
          )}

          <p className="font-semibold">
            Avez-vous participé au régime d&apos;encouragement à
            l&apos;éducation permanente (REEP) ou au régime d&apos;accession à
            la propriété (RAP) dans le passé ?
          </p>
          <Controller
            control={control}
            name="taxReport.taxDeductions.LLPorHBP"
            render={({ field: { onChange, value } }) => (
              <fieldset className="flex flex-row mx-4">
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

          {formData?.taxReport?.taxDeductions?.LLPorHBP && (
            <>
              <hr className="py-2"></hr>
              <div className="px-8 pb-2">
                <p>Devez-vous verser un remboursement au REEP ou au RAP?</p>
                <Controller
                  control={control}
                  name="taxReport.taxDeductions.LLPorHBPrepayment"
                  render={({ field: { onChange, value } }) => (
                    <fieldset className="flex flex-row mx-4">
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
                {formData?.taxReport?.taxDeductions?.LLPorHBPrepayment && (
                  <>
                    <hr className="py-2"></hr>
                    <p>Cochez toutes les cases qui s&apos;appliquent.</p>
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox
                        {...register('taxReport.taxDeductions.refundLLP')}
                      />
                      <p>J&apos;ai versé un remboursement au RAP</p>
                    </div>
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox
                        {...register('taxReport.taxDeductions.refundHOP')}
                      />
                      <p>J&apos;ai versé un remboursement au REEP</p>
                    </div>
                    <p className="mt-2">
                      Avez-vous retiré de l&apos;argent d&apos;un REER ou
                      d&apos;un FERR?
                    </p>
                  </>
                )}
                <p>
                  Avez-vous retiré de l&apos;argent d&apos;un REER ou d&apos;un
                  FERR? ?
                </p>
                <Controller
                  control={control}
                  name="taxReport.taxDeductions.RRSPorRRIFmoneyWithdrawn"
                  render={({ field: { onChange, value } }) => (
                    <fieldset className="flex flex-row mx-4">
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

                {formData?.taxReport?.taxDeductions
                  ?.RRSPorRRIFmoneyWithdrawn && (
                  <>
                    <hr className="py-2"></hr>
                    <p>Cochez toutes les cases qui s&apos;appliquent.</p>
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox
                        {...register('taxReport.taxDeductions.T4RSP')}
                      />
                      <p>J&apos;ai reçu un T4RSP / Relevé 2</p>
                    </div>
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox
                        {...register('taxReport.taxDeductions.T4RIF')}
                      />
                      <p>J&apos;ai reçu un T4RIF / Relevé 2</p>
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          <p className="font-semibold">
            Avez-vous fait des placements dans une société à capital de risque
            de travailleurs (SCRT)?
          </p>
          <Controller
            control={control}
            name="taxReport.taxDeductions.labourSponsoredFundTaxCredits"
            render={({ field: { onChange, value } }) => (
              <fieldset className="flex flex-row mx-4">
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
          {/* <div className="px-8">
            <div className="flex items-center gap-2 py-2">
              <Checkbox
                {...register('taxReport.taxDeductions.labourSponsoredFundTaxCredits')}
              />
              <p>J&apos;ai reçu un T4RIF / Relevé 2</p>
            </div>
          </div> */}
        </div>
      )}
    </>
  );
}
