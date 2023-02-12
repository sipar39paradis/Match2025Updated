import { Checkbox } from 'flowbite-react';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { TaxReportFormProps } from '../types/TaxReport/TaxReportFormProps';

export function TaxDeductionsForm(props: TaxReportFormProps) {
  const { register, control } = props;
  const [showTaxDeduction, setShowTaxDeduction] = useState(false);
  const [showPensionPlan, setShowPensionPlan] = useState(false);
  const [showLLPorHBP, setShowLLPorHBP] = useState(false);
  const [showLLPorHBPrepayment, setShowLLPorHBPrepayment] = useState(false);
  const [showRRSPorRRIFmoneyWithdrawn, setShowRRSPorRRIFmoneyWithdrawn] =
    useState(false);
  const [
    showLabourSponsoredFundTaxCredits,
    setShowLabourSponsoredFundTaxCredits,
  ] = useState(false);
  return (
    <>
      <p>
        Avez-vous des renseignements au sujet d&apos;un REER, d&apos;un RPAC,
        d&apos;un autre régime de pension, du régime d&apos;accession à la
        propriété (RAP), du régime d&apos;encouragement à l&apos;éducation
        permanente ou du SCRT à entrer ?
      </p>
      <fieldset className="flex flex-row mx-4">
        <div className="flex items-center">
          <input
            type="radio"
            value="yes"
            onChange={() => setShowTaxDeduction(true)}
            checked={showTaxDeduction}
            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
          />
          <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
            Oui
          </p>
        </div>
        <div className="flex items-center m-4">
          <input
            type="radio"
            value="no"
            onChange={() => setShowTaxDeduction(false)}
            checked={!showTaxDeduction}
            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
          />
          <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
            Non
          </p>
        </div>
      </fieldset>
      {showTaxDeduction === true && (
        <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg">
          <p>
            Avez-vous versé des cotisations à un régime de pension comme un
            REER, un RPAC, un régime de pension agréé ou le régime de pension
            déterminé ?
          </p>
          <fieldset className="flex flex-row mx-4">
            <div className="flex items-center">
              <input
                type="radio"
                value="yes"
                onChange={() => setShowPensionPlan(true)}
                checked={showPensionPlan}
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
                Oui
              </p>
            </div>
            <div className="flex items-center m-4">
              <input
                type="radio"
                value="no"
                onChange={() => setShowPensionPlan(false)}
                checked={!showPensionPlan}
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
                Non
              </p>
            </div>
          </fieldset>
          {showPensionPlan && (
            <>
              <hr className="py-2"></hr>
              <div className="px-8 pb-2">
                <p>Cochez toutes les cases qui s&apos;appliquent.</p>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox {...register('taxDeductions.RRSPcontributions')} />
                  <p>
                    J&apos;ai versé des cotisations au REER entre mars 2022 et
                    février 2022
                  </p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register('taxDeductions.reportedButUnusedRRSPorSPP')}
                  />
                  <p>
                    J&apos;ai des cotisations versées à un REER ou des
                    cotisations au régime de pension déterminé que j&apos;ai
                    déclarées, mais qui sont inutilisées.
                  </p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox {...register('taxDeductions.unreportedRRSP')} />
                  <p>
                    J&apos;ai versé des cotisations au REER avant mars 2022 et
                    je ne les ai pas indiquées dans une déclaration de revenus
                  </p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox {...register('taxDeductions.deferRRSP')} />
                  <p>
                    Je veux reporter mes REER. (Des hésitations? Ne vous
                    inquiétez pas. Ce que vous choisissez ici n&apos;est pas
                    définitif. S&apos;il n&apos;est pas nécessaire que vous
                    déduisiez tout le montant versé à vos REER, TurboImpôt vous
                    en avertira plus tard.) En savoir plus
                  </p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox {...register('taxDeductions.employerPRPP')} />
                  <p>
                    J&apos;ai versé ou mon employeur a versé des cotisations au
                    RPAC en mon nom, entre janvier 2022 et mars 2022
                  </p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox {...register('taxDeductions.contributionRPP')} />
                  <p>
                    J&apos;ai versé des cotisations à un régime de pension agréé
                    (RPA) pour des services courants ou passés
                  </p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register('taxDeductions.amateurAthletesTrust')}
                  />
                  <p>
                    J&apos;ai versé des revenus dans une fiducie au profit
                    d&apos;athlètes amateurs (FPAA)
                  </p>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Checkbox {...register('taxDeductions.contributionSPP')} />
                  <p>
                    J&apos;ai versé des cotisations au Régime de pension de la
                    Saskatchewan (SPP)
                  </p>
                </div>
              </div>
            </>
          )}

          <p>
            Avez-vous participé au régime d&apos;encouragement à
            l&apos;éducation permanente (REEP) ou au régime d&apos;accession à
            la propriété (RAP) dans le passé ?
          </p>
          <fieldset className="flex flex-row mx-4">
            <div className="flex items-center">
              <input
                type="radio"
                value="yes"
                onChange={() => setShowLLPorHBP(true)}
                checked={showLLPorHBP}
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
                Oui
              </p>
            </div>
            <div className="flex items-center m-4">
              <input
                type="radio"
                value="no"
                onChange={() => setShowLLPorHBP(false)}
                checked={!showLLPorHBP}
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
                Non
              </p>
            </div>
          </fieldset>
          {showLLPorHBP && (
            <>
              <hr className="py-2"></hr>
              <div className="px-8 pb-2">
                <p>Devez-vous verser un remboursement au REEP ou au RAP?</p>
                <fieldset className="flex flex-row mx-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      value="yes"
                      onChange={() => setShowLLPorHBPrepayment(true)}
                      checked={showLLPorHBPrepayment}
                      className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
                      Oui
                    </p>
                  </div>
                  <div className="flex items-center m-4">
                    <input
                      type="radio"
                      value="no"
                      onChange={() => setShowLLPorHBPrepayment(false)}
                      checked={!showLLPorHBPrepayment}
                      className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
                      Non
                    </p>
                  </div>
                </fieldset>
                {showLLPorHBPrepayment && (
                  <>
                    <hr className="py-2"></hr>
                    <p>Cochez toutes les cases qui s&apos;appliquent.</p>
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox {...register('taxDeductions.refundLLP')} />
                      <p>J&apos;ai versé un remboursement au RAP</p>
                    </div>
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox {...register('taxDeductions.refundHOP')} />
                      <p>J&apos;ai versé un remboursement au REEP</p>
                    </div>
                    <p className="mt-2">
                      Avez-vous retiré de l&apos;argent d&apos;un REER ou
                      d&apos;un FERR?
                    </p>
                  </>
                )}

                <fieldset className="flex flex-row mx-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      value="yes"
                      onChange={() => setShowRRSPorRRIFmoneyWithdrawn(true)}
                      checked={showRRSPorRRIFmoneyWithdrawn}
                      className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
                      Oui
                    </p>
                  </div>
                  <div className="flex items-center m-4">
                    <input
                      type="radio"
                      value="no"
                      onChange={() => setShowRRSPorRRIFmoneyWithdrawn(false)}
                      checked={!showRRSPorRRIFmoneyWithdrawn}
                      className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
                      Non
                    </p>
                  </div>
                </fieldset>
                {showRRSPorRRIFmoneyWithdrawn && (
                  <>
                    <hr className="py-2"></hr>
                    <p>Cochez toutes les cases qui s&apos;appliquent.</p>
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox {...register('taxDeductions.T4RSP')} />
                      <p>J&apos;ai reçu un T4RSP / Relevé 2</p>
                    </div>
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox {...register('taxDeductions.T4RIF')} />
                      <p>J&apos;ai reçu un T4RIF / Relevé 2</p>
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          <p>
            Avez-vous fait des placements dans une société à capital de risque
            de travailleurs (SCRT)?
          </p>
          <fieldset className="flex flex-row mx-4">
            <div className="flex items-center">
              <input
                type="radio"
                value="yes"
                onChange={() => setShowLabourSponsoredFundTaxCredits(true)}
                checked={showLabourSponsoredFundTaxCredits}
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
                Oui
              </p>
            </div>
            <div className="flex items-center m-4">
              <input
                type="radio"
                value="no"
                onChange={() => setShowRRSPorRRIFmoneyWithdrawn(false)}
                checked={!showLabourSponsoredFundTaxCredits}
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <p className="block ml-2  font-medium text-gray-900 dark:text-gray-300">
                Non
              </p>
            </div>
          </fieldset>
          {showLabourSponsoredFundTaxCredits && (
            <>
              <hr className="py-2"></hr>
              <div className="px-8">
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    {...register('taxDeductions.labourSponsoredFundTaxCredits')}
                  />
                  <p>J&apos;ai reçu un T4RIF / Relevé 2</p>
                </div>
              </div>
            </>
          )}

          <p>
            Avez-vous versé des cotisations à un régime de retraite des É.-U. ou
            d&apos;un pays étranger offert par un employeur ou à un régime de
            retraite des É.-U. par un frontalier du Canada?
          </p>
          <Controller
            control={control}
            name="taxDeductions.foreignPensionPlan"
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
                  <p className="block ml-2 font-medium text-gray-900 dark:text-gray-300">
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
        </div>
      )}
    </>
  );
}
