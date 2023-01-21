import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TaxDeclarationStep } from '../types/TaxDeclarationStep';
import { TaxProfile } from '../types/TaxProfile';

export function TaxProfileForm() {
  const {
    handleSubmit,
    formState: {},
    watch,
    control,
  } = useForm<TaxProfile>();
  const navigate = useNavigate();
  const watchWorkedLastYear = watch('workedLastYear.workedLastYear');
  const watchInvestmentIncome = watch('investmentIncome.investmentIncome');

  function onSubmitButton() {
    navigate(`/platform/tax-declaration?step=${TaxDeclarationStep.REVIEW}`);
  }

  return (
    <section className="flex flex-col align-baseline items-start w-full">
      <h1>Qu&apos;est-ce qui a marqué l&apos;année 2022?</h1>
      <form
        onSubmit={handleSubmit(onSubmitButton)}
        className="flex flex-col items-start mt-4 w-full"
      >
        <p>Avez-vous travaillé en 2021?</p>
        <Controller
          control={control}
          name="workedLastYear.workedLastYear"
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
                <label
                  htmlFor="worked-last-year-option-1"
                  className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Oui
                </label>
              </div>
              <div className="flex items-center m-4">
                <input
                  type="radio"
                  value="yes"
                  onChange={() => onChange(false)}
                  checked={value === false}
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="worked-last-year-option-2"
                  className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Non
                </label>
              </div>
            </fieldset>
          )}
        />
        {watchWorkedLastYear !== undefined && (
          <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg">
            {watchWorkedLastYear === true ? (
              <p>
                Il semble que vous n&apos;avez pas travaillé en 2022. Est-ce que
                l&apos;une des situations suivantes vous concerne?
              </p>
            ) : (
              <p>
                Veuillez indiquer quel genre de travail vous faisiez (cochez
                toutes les cases qui s&apos;appliquent)
              </p>
            )}
          </div>
        )}
        <p>
          Avez-vous reçu un revenu de pension ou de retraite ou des prestations
          liées à la COVID-19, ou avez-vous retiré de l&apos;argent d&apos;un
          REER ou d&apos;un FERR? Cela n&apos;inclut pas les cotisations à un
          REER ni à un régime de retraite.
        </p>
        <Controller
          control={control}
          name="workedLastYear.workedLastYear"
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
                <label
                  htmlFor="worked-last-year-option-1"
                  className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Oui
                </label>
              </div>
              <div className="flex items-center m-4">
                <input
                  type="radio"
                  value="yes"
                  onChange={() => onChange(false)}
                  checked={value === false}
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="worked-last-year-option-2"
                  className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Non
                </label>
              </div>
            </fieldset>
          )}
        />
        <p>
          Avez-vous un revenu provenant de placements? Le revenu de placement
          peut inclure les intérêts gagnés sur les placements, la vente
          d&apos;actions ou d&apos;options d&apos;achat d&apos;actions, les
          opérations en cryptomonnaie la vente de biens immobiliers et les frais
          de placement connexes.
        </p>
        <Controller
          control={control}
          name="investmentIncome.investmentIncome"
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
                <label
                  htmlFor="worked-last-year-option-1"
                  className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Oui
                </label>
              </div>
              <div className="flex items-center m-4">
                <input
                  type="radio"
                  value="yes"
                  onChange={() => onChange(false)}
                  checked={value === false}
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="worked-last-year-option-2"
                  className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Non
                </label>
              </div>
            </fieldset>
          )}
        />
        {watchInvestmentIncome !== undefined && (
          <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg">
            {watchInvestmentIncome === true && (
              <p>
                Il semble que vous n&apos;avez pas travaillé en 2022. Est-ce que
                l&apos;une des situations suivantes vous concerne?
              </p>
            )}
          </div>
        )}
        <p>
          Avez-vous un revenu de travailleur autonome, de location ou
          d&apos;autres revenus?
        </p>
        <fieldset className="flex flex-row m-4">
          <div className="flex items-center">
            <input
              type="radio"
              value="no"
              id="field-worked-last-year-yes"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="worked-last-year-option-1"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Oui
            </label>
          </div>
          <div className="flex items-center m-4">
            <input
              type="radio"
              value="yes"
              id="field-worked-last-year-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="worked-last-year-option-2"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Non
            </label>
          </div>
        </fieldset>
        <p>
          Possédiez-vous ou déteniez-vous des biens étrangers déterminés, dont
          le coût total, à un moment donné durant l&apos;année 2021, s&apos;est
          élevé à plus de 100 000 $ CA?
        </p>
        <fieldset className="flex flex-row m-4">
          <div className="flex items-center">
            <input
              type="radio"
              value="no"
              id="field-worked-last-year-yes"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="worked-last-year-option-1"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Oui
            </label>
          </div>
          <div className="flex items-center m-4">
            <input
              type="radio"
              value="yes"
              id="field-worked-last-year-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="worked-last-year-option-2"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Non
            </label>
          </div>
        </fieldset>
        <p>
          Étiez-vous aux études en 2021 ou avez-vous reporté des dépenses liées
          à vos études des années antérieures?
        </p>
        <fieldset className="flex flex-row m-4">
          <div className="flex items-center">
            <input
              type="radio"
              value="no"
              id="field-worked-last-year-yes"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="worked-last-year-option-1"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Oui
            </label>
          </div>
          <div className="flex items-center m-4">
            <input
              type="radio"
              value="yes"
              id="field-worked-last-year-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="worked-last-year-option-2"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Non
            </label>
          </div>
        </fieldset>
        <p>
          Avez-vous des renseignements au sujet d&apos;un REER, d&apos;un RPAC,
          d&apos;un autre régime de pension, du régime d&apos;accession à la
          propriété (RAP), du régime d&apos;encouragement à l&apos;éducation
          permanente ou du SCRT à entrer ?
        </p>
        <fieldset className="flex flex-row m-4">
          <div className="flex items-center">
            <input
              type="radio"
              value="no"
              id="field-dead-person-yes"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Oui
            </label>
          </div>
          <div className="flex items-center m-4">
            <input
              type="radio"
              value="yes"
              id="field-dead-person-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Non
            </label>
          </div>
        </fieldset>
        <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg">
          <p>
            Avez-vous versé des cotisations à un régime de pension comme un
            REER, un RPAC, un régime de pension agréé ou le régime de pension
            déterminé ?
          </p>
          <fieldset className="flex flex-row m-4">
            <div className="flex items-center">
              <input
                type="radio"
                value="no"
                id="field-dead-person-yes"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Oui
              </label>
            </div>
            <div className="flex items-center m-4">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Non
              </label>
            </div>
          </fieldset>
          <p>
            Avez-vous participé au régime d&apos;encouragement à
            l&apos;éducation permanente (REEP) ou au régime d&apos;accession à
            la propriété (RAP) dans le passé ?
          </p>
          <fieldset className="flex flex-row m-4">
            <div className="flex items-center">
              <input
                type="radio"
                value="no"
                id="field-dead-person-yes"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Oui
              </label>
            </div>
            <div className="flex items-center m-4">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Non
              </label>
            </div>
          </fieldset>
          <p>
            Avez-vous fait des placements dans une société à capital de risque
            de travailleurs (SCRT)?
          </p>
          <fieldset className="flex flex-row m-4">
            <div className="flex items-center">
              <input
                type="radio"
                value="no"
                id="field-dead-person-yes"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Oui
              </label>
            </div>
            <div className="flex items-center m-4">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Non
              </label>
            </div>
          </fieldset>
          <p>
            Avez-vous versé des cotisations à un régime de retraite des É.-U. ou
            d&apos;un pays étranger offert par un employeur ou à un régime de
            retraite des É.-U. par un frontalier du Canada?
          </p>
          <fieldset className="flex flex-row m-4">
            <div className="flex items-center">
              <input
                type="radio"
                value="no"
                id="field-dead-person-yes"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Oui
              </label>
            </div>
            <div className="flex items-center m-4">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Non
              </label>
            </div>
          </fieldset>
        </div>
        <p>
          Avez-vous fait des dons à un organisme de bienfaisance ou à un parti
          politique ?
        </p>
        <fieldset className="flex flex-row m-4">
          <div className="flex items-center">
            <input
              type="radio"
              value="no"
              id="field-dead-person-yes"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Oui
            </label>
          </div>
          <div className="flex items-center m-4">
            <input
              type="radio"
              value="yes"
              id="field-dead-person-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Non
            </label>
          </div>
        </fieldset>
        <div className="px-8 py-4 mb-4 w-full bg-gray-100 rounded-lg">
          <p>Cochez toutes les cases qui s&apos;appliquent.</p>
          <fieldset className="flex flex-col m-4">
            <div className="flex items-center mb-2">
              <input
                type="radio"
                value="no"
                id="field-dead-person-yes"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-4 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                J&apos;ai fait des dons de bienfaisance
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-4 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                J&apos;ai fait des contributions politiques
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-4 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Aucun de ces choix
              </label>
            </div>
          </fieldset>
        </div>
        <p>
          Avez-vous engagé des frais de déménagement? Dans l&apos;incertitude,
          répondez Oui. Nous verrons plus tard si vous êtes admissible.
        </p>
        <fieldset className="flex flex-row m-4">
          <div className="flex items-center">
            <input
              type="radio"
              value="no"
              id="field-dead-person-yes"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Oui
            </label>
          </div>
          <div className="flex items-center m-4">
            <input
              type="radio"
              value="yes"
              id="field-dead-person-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Non
            </label>
          </div>
        </fieldset>
        <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg">
          <p>
            Avez-vous engagé des frais de déménagement cette année pour vos
            études ou votre travail ?
          </p>
          <fieldset className="flex flex-row m-4">
            <div className="flex items-center">
              <input
                type="radio"
                value="no"
                id="field-dead-person-yes"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Oui
              </label>
            </div>
            <div className="flex items-center m-4">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Non
              </label>
            </div>
          </fieldset>
          <p>
            Avez-vous engagé des frais de déménagement que vous n&apos;avez pas
            demandés et que vous reportez d&apos;une année précédente?
          </p>
          <fieldset className="flex flex-row m-4">
            <div className="flex items-center">
              <input
                type="radio"
                value="no"
                id="field-dead-person-yes"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Oui
              </label>
            </div>
            <div className="flex items-center m-4">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Non
              </label>
            </div>
          </fieldset>
        </div>
        <p>
          Avez-vous engagé des frais médicaux pour vous-même, votre conjoint ou
          des personnes à charge?
        </p>
        <fieldset className="flex flex-row m-4">
          <div className="flex items-center">
            <input
              type="radio"
              value="no"
              id="field-dead-person-yes"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Oui
            </label>
          </div>
          <div className="flex items-center m-4">
            <input
              type="radio"
              value="yes"
              id="field-dead-person-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Non
            </label>
          </div>
        </fieldset>
        <p>
          Avez-vous acheté une maison, un condo, un appartement ou une maison
          mobile cette année? Sélectionnez Oui pour déterminer si vous êtes
          admissible au montant pour l&apos;achat d&apos;une première habitation
          ?
        </p>
        <fieldset className="flex flex-row m-4">
          <div className="flex items-center">
            <input
              type="radio"
              value="no"
              id="field-dead-person-yes"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Oui
            </label>
          </div>
          <div className="flex items-center m-4">
            <input
              type="radio"
              value="yes"
              id="field-dead-person-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Non
            </label>
          </div>
        </fieldset>
        <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg">
          <p>Avez-vous acheté ou vendu un domicile en 2022? </p>
          <fieldset className="flex flex-row m-4">
            <div className="flex items-center">
              <input
                type="radio"
                value="no"
                id="field-dead-person-yes"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Oui
              </label>
            </div>
            <div className="flex items-center m-4">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Non
              </label>
            </div>
          </fieldset>
        </div>
        <p>
          Avez-vous disposé d&apos;une propriété en 2022 qui était votre
          résidence principale pendant la période où vous en étiez propriétaire
          ?
        </p>
        <fieldset className="flex flex-row m-4">
          <div className="flex items-center">
            <input
              type="radio"
              value="no"
              id="field-dead-person-yes"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Oui
            </label>
          </div>
          <div className="flex items-center m-4">
            <input
              type="radio"
              value="yes"
              id="field-dead-person-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Non
            </label>
          </div>
        </fieldset>
        <p>
          Avez-vous engagé des dépenses admissibles vous donnant droit au crédit
          d&apos;impôt pour l&apos;accessibilité domiciliaire?
        </p>
        <fieldset className="flex flex-row m-4">
          <div className="flex items-center">
            <input
              type="radio"
              value="no"
              id="field-dead-person-yes"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Oui
            </label>
          </div>
          <div className="flex items-center m-4">
            <input
              type="radio"
              value="yes"
              id="field-dead-person-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Non
            </label>
          </div>
        </fieldset>
        <p>
          Avez-vous des pertes de cette année ou d&apos;une année précédente à
          déclarer? Vous devez avoir conclu une vente ou être réputé avoir vendu
          pour pouvoir déduire cette perte. Une perte dans un REER n&apos;est
          pas admissible ?
        </p>
        <fieldset className="flex flex-row m-4">
          <div className="flex items-center">
            <input
              type="radio"
              value="no"
              id="field-dead-person-yes"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Oui
            </label>
          </div>
          <div className="flex items-center m-4">
            <input
              type="radio"
              value="yes"
              id="field-dead-person-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Non
            </label>
          </div>
        </fieldset>
        <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg">
          <p>
            Aviez-vous une perte déductible au titre d&apos;un placement
            d&apos;entreprise? Il s&apos;agit généralement d&apos;une perte qui
            se produit quand vous disposez d&apos;une quote-part dans une
            société exploitant une petite entreprise.
          </p>
          <fieldset className="flex flex-row m-4">
            <div className="flex items-center">
              <input
                type="radio"
                value="no"
                id="field-dead-person-yes"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Oui
              </label>
            </div>
            <div className="flex items-center m-4">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Non
              </label>
            </div>
          </fieldset>
          <p>
            Avez-vous des pertes d&apos;années précédentes que vous voulez
            reporter à cette année ou déduire de vos gains cette année?
          </p>
          <fieldset className="flex flex-row m-4">
            <div className="flex items-center">
              <input
                type="radio"
                value="no"
                id="field-dead-person-yes"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Oui
              </label>
            </div>
            <div className="flex items-center m-4">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Non
              </label>
            </div>
          </fieldset>
          <p>
            Avez-vous subi des pertes cette année que vous voulez déduire de
            gains réalisés pendant une année précédente?
          </p>
          <fieldset className="flex flex-row m-4">
            <div className="flex items-center">
              <input
                type="radio"
                value="no"
                id="field-dead-person-yes"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Oui
              </label>
            </div>
            <div className="flex items-center m-4">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Non
              </label>
            </div>
          </fieldset>
        </div>
        <p>
          Étiez-vous pompier volontaire, volontaire en recherche et sauvetage ou
          volontaire à titre de premier répondant de services médicaux
          d&apos;urgence?
        </p>
        <fieldset className="flex flex-row m-4">
          <div className="flex items-center">
            <input
              type="radio"
              value="no"
              id="field-dead-person-yes"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Oui
            </label>
          </div>
          <div className="flex items-center m-4">
            <input
              type="radio"
              value="yes"
              id="field-dead-person-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Non
            </label>
          </div>
        </fieldset>
        <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg">
          <p>
            Avez-vous effectué 200 heures de services admissibles à titre de
            pompier volontaire auprès d&apos;un ou de plusieurs services
            d&apos;incendie au cours de l&apos;année?
          </p>
          <fieldset className="flex flex-row m-4">
            <div className="flex items-center">
              <input
                type="radio"
                value="no"
                id="field-dead-person-yes"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Oui
              </label>
            </div>
            <div className="flex items-center m-4">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Non
              </label>
            </div>
          </fieldset>
          <p>
            Avez-vous effectué 200 heures de services admissibles à titre de
            volontaire en recherche et sauvetage dans l&apos;année?
          </p>
          <fieldset className="flex flex-row m-4">
            <div className="flex items-center">
              <input
                type="radio"
                value="no"
                id="field-dead-person-yes"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Oui
              </label>
            </div>
            <div className="flex items-center m-4">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Non
              </label>
            </div>
          </fieldset>
          <p>
            Entrez le nombre d&apos;heures travaillées en tant que pompier
            volontaire ou bénévole en recherche et sauvetage
          </p>
          <div className="relative z-0 mt-4 mb-6 group w-full">
            <input
              type="number"
              name="floating_canadian_incomes"
              id="floating__canadian_incomes"
              className="block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating__canadian_incomes"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Nombre d&apos;heures
            </label>
          </div>
          <p>
            Note : Vous pouvez combiner les heures de bénévolat en recherche et
            sauvetage et de pompier volontaire pour demander un crédit ou
            l&apos;autre.
          </p>
        </div>
        <p>
          Voulez-vous demander d&apos;autres déductions (abonnement à des
          services de nouvelles numériques, laissez-passer de transport en
          commun, cotisations syndicales ou professionnelles, pension
          alimentaire payée ou remboursement des prestations liées à la
          COVID-19)?
        </p>
        <fieldset className="flex flex-row m-4">
          <div className="flex items-center">
            <input
              type="radio"
              value="no"
              id="field-dead-person-yes"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Oui
            </label>
          </div>
          <div className="flex items-center m-4">
            <input
              type="radio"
              value="yes"
              id="field-dead-person-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Non
            </label>
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
              <label
                htmlFor="country-option-4"
                className="block ml-4 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                J&apos;ai acheté un abonnement à des services de nouvelles
                numériques
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-4 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                NOUVEAU! J&apos;ai remboursé des prestations liées à la COVID-19
                avant le 1er janvier 2023
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-4 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Je suis un enseignant ou un éducateur de la petite enfance
                admissible et j&apos;ai acheté des fournitures scolaires
                admissibles au cours de l&apos;année
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-4 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                J&apos;ai payé des cotisations syndicales ou professionnelles
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-4 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                J&apos;ai payé une pension alimentaire pour conjoint ou enfants
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-4 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Mon conjoint a des crédits qu&apos;il n&apos;utilisera pas et
                qui peuvent m&apos;être transférés
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-4 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                J&apos;ai payé de l&apos;impôt à un pays étranger
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-4 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Je vis dans une région désignée et je suis admissible à la
                déduction pour les habitants de régions éloignées
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-4 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                J&apos;ai payé de l&apos;impôt sur les opérations forestières
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-4 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Je reporte des paiements d&apos;impôt minimum de remplacement
                d&apos;années passées
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-4 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Je veux réviser mon impôt minimum de remplacement (IMR) pour
                2021. Si vous ne cochez pas cette case et que l&apos;IMR vous
                concerne, nous vous inviterons à réviser votre déclaration plus
                tard.
              </label>
            </div>{' '}
            <div className="flex items-center mb-2">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-4 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                J&apos;avais d&apos;autres déductions non incluses ci-dessus
              </label>
            </div>{' '}
            <div className="flex items-center mb-2">
              <input
                type="radio"
                value="yes"
                id="field-dead-person-no"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="country-option-4"
                className="block ml-4 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Aucun de ces choix
              </label>
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
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Oui
            </label>
          </div>
          <div className="flex items-center m-4">
            <input
              type="radio"
              value="yes"
              id="field-dead-person-no"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="country-option-4"
              className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Non
            </label>
          </div>
        </fieldset>
        <div className="px-8 py-4 mb-4 bg-gray-100 rounded-lg">
          <p>
            Entrez les accomptes provisionnels trimestriels que vous avez versés
            à l&apos;ARC en 2022. N&apos;incluez pas les paiments de votre impôt
            de 2021.
          </p>
          <div className="relative z-0 mt-4 mb-6 group w-full">
            <input
              type="number"
              name="floating_canadian_incomes"
              id="floating__canadian_incomes"
              className="block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating__canadian_incomes"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Montant
            </label>
          </div>
        </div>
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
        <div className="w-full flex justify-between mt-4">
          <input
            type="submit"
            value="Precedant"
            onClick={() =>
              navigate(
                `/platform/tax-declaration?step=${TaxDeclarationStep.DEPENDENTS}`
              )
            }
            className="bg-[#222C40] hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded cursor-pointer"
          />
          <input
            type="submit"
            value="Continuez"
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          />
        </div>
      </form>
    </section>
  );
}
