import React, { useContext } from 'react';
import {
  QuestionnaireContext,
  QuestionnaireContextType,
} from '../context/QuestionnaireContext';
import { TaxDeclarationStep } from '../types/TaxReport/TaxDeclarationStep';
import CountUp from 'react-countup';
import { writeRequiredFiles } from '../../../../client/firebaseClient';
import mapFiles from '../../../../utils/FileMapper';
import { calculatePrice } from './calculatePrice';

export function Price() {
  const { questionnaires, setSearchParams } = useContext(
    QuestionnaireContext
  ) as QuestionnaireContextType;

  return (
    <section className="flex flex-col align-baseline items-start w-full">
      <h1>Merci d’avoir rempli notre questionnaire. </h1>
      <p className="a font-semibold">
        Voici votre prix 100% adapté à votre situation :
      </p>
      <div className="h-48 w-full flex items-center">
        <h1 className="text-center w-full text-8xl">
          <CountUp end={calculatePrice(questionnaires)} />$
        </h1>
      </div>

      <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
      <div className="w-full flex justify-between mt-4">
        <input
          type="submit"
          value="Retour aux questionnaires"
          onClick={() => {
            setSearchParams({
              step: TaxDeclarationStep.DEDUCTIONS_AND_TAX_CREDIT,
            });
          }}
          className="bg-[#222C40] hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded cursor-pointer"
        />
        <input
          type="submit"
          value="Accepter et déposer les fichiers"
          onClick={() => {
            questionnaires?.forEach((value, key) => {
              writeRequiredFiles(mapFiles(value?.taxReport), key);
            });
            setSearchParams({
              step: TaxDeclarationStep.UPLOAD_FILES,
            });
          }}
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        />
      </div>
    </section>
  );
}
