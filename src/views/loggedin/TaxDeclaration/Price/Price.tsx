import React, { useContext } from 'react';
import {
  QuestionnaireContext,
  QuestionnaireContextType,
} from '../context/QuestionnaireContext';
import { TaxDeclarationStep } from '../types/TaxReport/TaxDeclarationStep';
import CountUp from 'react-countup';
import {
  uploadFileToStorage,
  uploadTaxReportPdfToStorage,
} from '../../../../client/firebaseClient';
import { getPDFTaxReport } from '../../../../utils/FileMapper';
import { calculatePrice } from './calculatePrice';
import { personalInformationAsExcel } from '../../../../components/ExcelExport';
import { Questionnaire } from '../types/Questionnaire/Questionnaire';

export function Price() {
  const { questionnaires, setSearchParams } = useContext(
    QuestionnaireContext
  ) as QuestionnaireContextType;

  const handleExportToExcel = async (individualFormData: Questionnaire) => {
    const totalPrice = calculatePrice(questionnaires);
    const excelData = await personalInformationAsExcel(
      individualFormData,
      totalPrice
    );
    await uploadFileToStorage(
      'TaxReportCsv.xlsx',
      excelData,
      individualFormData?.personalInformations
    );
  };

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
      <div className="w-full flex justify-between mt-4 flex-wrap gap-2">
        <input
          type="submit"
          value="Retour aux questionnaires"
          onClick={() => {
            setSearchParams({
              step: TaxDeclarationStep.DEDUCTIONS_AND_TAX_CREDIT,
            });
          }}
          className="bg-[#222C40] hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded cursor-pointer w-full text-sm md:w-fit md:text-base"
        />
        <input
          type="submit"
          value="Accepter et déposer les fichiers"
          onClick={() => {
            questionnaires?.forEach((value) => {
              uploadTaxReportPdfToStorage(
                getPDFTaxReport(value?.taxReport, value?.personalInformations),
                value?.personalInformations
              );
              handleExportToExcel(value);
            });
            setSearchParams({
              step: TaxDeclarationStep.UPLOAD_FILES,
            });
          }}
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded cursor-pointer w-full text-sm md:w-fit md:text-base"
        />
      </div>
    </section>
  );
}
