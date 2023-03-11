import React, { useContext } from 'react';
import {
  QuestionnaireContext,
  QuestionnaireContextType,
} from '../context/QuestionnaireContext';
import {
  ClientTypeEnum,
  Questionnaire,
} from '../types/Questionnaire/Questionnaire';
import { TaxDeclarationStep } from '../types/TaxReport/TaxDeclarationStep';
import { TaxReport } from '../types/TaxReport/TaxReport';
import CountUp from 'react-countup';
import { writeRequiredFiles } from '../../../../client/firebaseClient';
import mapFiles from '../../../../utils/FileMapper';

export function Price() {
  const { questionnaires, setSearchParams } = useContext(
    QuestionnaireContext
  ) as QuestionnaireContextType;
  function calculateTotalPrice() {
    console.log('questionnaires', questionnaires);
    let mainClientQuestionnaire = null;
    let partnerQuestionnaire = null;

    // search mainClient
    questionnaires.forEach((questionnaire) => {
      if (questionnaire.clientType === ClientTypeEnum.MAIN_CLIENT) {
        mainClientQuestionnaire = questionnaire;
      }
    });

    questionnaires.forEach((questionnaire) => {
      if (questionnaire.clientType === ClientTypeEnum.PARTNER) {
        partnerQuestionnaire = questionnaire;
      }
    });

    const mainClientPrice = calculateMainClientPrice(mainClientQuestionnaire);
    const partnerPrice = partnerQuestionnaire
      ? calculatePartnerPrice(partnerQuestionnaire)
      : 0;
    const dependentsPrice = calculateDependentsPrice();
    console.log('mainClientPrice:', mainClientPrice);
    console.log('partnerPrice:', partnerPrice);
    console.log('dependentsPrice:', dependentsPrice);
    return mainClientPrice + partnerPrice + dependentsPrice;
  }

  function calculateMainClientPrice(questionnaire: Questionnaire) {
    let price = 55;

    price += calculatePrice(
      questionnaire?.taxReport,
      ClientTypeEnum.MAIN_CLIENT
    );
    return price;
  }

  function calculatePartnerPrice(questionnaire: Questionnaire) {
    let price = 30;

    if (questionnaire?.taxReport?.workIncomes?.employed) {
      price += calculatePrice(questionnaire?.taxReport, ClientTypeEnum.PARTNER);
    }
    return price;
  }

  function calculatePrice(taxReport: TaxReport, clientType: ClientTypeEnum) {
    let totalPrice = 0;
    if (taxReport?.workIncomes?.employed) {
      totalPrice += clientType === ClientTypeEnum.MAIN_CLIENT ? 20 : 15;
    }
    if (
      !taxReport?.workIncomes?.employed &&
      (taxReport.workIncomes?.insuranceBenefits ||
        taxReport.workIncomes?.workerCompensationOrSocialAssistance ||
        taxReport?.workIncomes?.employmentInsuranceOrParentalBenefits)
    ) {
      totalPrice += clientType === ClientTypeEnum.MAIN_CLIENT ? 20 : 15;
    }
    if (taxReport?.workIncomes?.jobRelatedExpenses) {
      totalPrice += clientType === ClientTypeEnum.MAIN_CLIENT ? 30 : 20;
    }
    if (taxReport?.retirementIncomes?.pensionRetirementAnnuityIncome) {
      totalPrice += 30;
    }
    if (taxReport?.investmentIncomes?.investmentIncomes) {
      totalPrice += clientType === ClientTypeEnum.MAIN_CLIENT ? 15 : 10;
    }
    if (taxReport?.selfEmploymentIncomes?.selfEmployedIncomes) {
      totalPrice += 75;
    }
    if (taxReport?.rentalPropertyIncomes?.rentalPropertyIncomes) {
      for (
        let i = 0;
        i <= taxReport?.rentalPropertyIncomes?.numberOfRentalPropertyIncomes;
        i++
      ) {
        totalPrice += 25;
      }
    }
    if (taxReport?.otherIncomes?.otherIncomes) {
      totalPrice += clientType === ClientTypeEnum.MAIN_CLIENT ? 20 : 15;
    }
    if (taxReport?.studentExpenses?.studentExpenses) {
      totalPrice += clientType === ClientTypeEnum.MAIN_CLIENT ? 10 : 5;
    }
    if (taxReport?.movingExpenses) {
      totalPrice += 30;
    }
    if (taxReport?.medicalExpenses) {
      totalPrice += clientType === ClientTypeEnum.MAIN_CLIENT ? 15 : 10;
    }
    if (taxReport?.otherDeductions) {
      totalPrice += 5;
    }
    return totalPrice;
  }

  function calculateDependentsPrice() {
    let price = 0;

    questionnaires.forEach((questionnaire) => {
      if (questionnaire.clientType === ClientTypeEnum.DEPENDENT) {
        price += 30;
      }
    });

    return price;
  }
  return (
    <section className="flex flex-col align-baseline items-start w-full h-fit">
      <h1>Merci d’avoir rempli notre questionnaire. </h1>
      <p className="a font-semibold">
        Voici votre prix 100% adapté à votre situation :
      </p>
      <div className="h-48 w-full flex items-center">
        <h1 className="text-center w-full text-8xl">
          <CountUp end={calculateTotalPrice()} />$
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
              writeRequiredFiles(mapFiles(value?.taxReport), key)
            })
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
