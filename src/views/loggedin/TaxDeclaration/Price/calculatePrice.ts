import { ClientTypeEnum, Questionnaire } from '../types/Questionnaire/Questionnaire';
import { TaxReport } from '../types/TaxReport/TaxReport';

export function calculatePrice(questionnaires: Map<string, Questionnaire>) {
  let mainClientQuestionnaire = null;
  let partnerQuestionnaire = null;

  // search mainClient
  questionnaires.forEach((questionnaire) => {
    if (questionnaire.clientType === ClientTypeEnum.MAIN_CLIENT) {
      mainClientQuestionnaire = questionnaire;
    }
  });

  // search partner
  questionnaires.forEach((questionnaire) => {
    if (questionnaire.clientType === ClientTypeEnum.PARTNER) {
      partnerQuestionnaire = questionnaire;
    }
  });

  const mainClientPrice = calculateClientPrice(
    mainClientQuestionnaire.taxReport,
    ClientTypeEnum.MAIN_CLIENT
  );
  const partnerPrice = partnerQuestionnaire
    ? calculateClientPrice(partnerQuestionnaire?.taxReport, ClientTypeEnum.PARTNER)
    : 0;
  const dependentsPrice = calculateDependentsPrice(questionnaires);
  return mainClientPrice + partnerPrice + dependentsPrice;
}

function calculateClientPrice(taxReport: TaxReport, clientType: ClientTypeEnum) {
  let totalPrice = clientType === ClientTypeEnum.MAIN_CLIENT ? 45 : 30;
  if (taxReport?.workIncomes?.employed) {
    totalPrice += clientType === ClientTypeEnum.MAIN_CLIENT ? 15 : 10;
  }
  if (
    !taxReport?.workIncomes?.employed &&
    (taxReport?.workIncomes?.insuranceBenefits ||
      taxReport?.workIncomes?.workerCompensationOrSocialAssistance ||
      taxReport?.workIncomes?.employmentInsuranceOrParentalBenefits)
  ) {
    totalPrice += clientType === ClientTypeEnum.MAIN_CLIENT ? 20 : 15;
  }
  if (taxReport?.workIncomes?.jobRelatedExpenses) {
    totalPrice += clientType === ClientTypeEnum.MAIN_CLIENT ? 20 : 20;
  }
  if (taxReport?.retirementIncomes?.pensionRetirementAnnuityIncome) {
    totalPrice += 20;
  }
  if (taxReport?.investmentIncomes?.investmentIncomes) {
    totalPrice += clientType === ClientTypeEnum.MAIN_CLIENT ? 10 : 10;
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
    totalPrice += clientType === ClientTypeEnum.MAIN_CLIENT ? 15 : 15;
  }
  if (taxReport?.studentExpenses?.studentExpenses) {
    totalPrice += clientType === ClientTypeEnum.MAIN_CLIENT ? 10 : 5;
  }
  if (taxReport?.movingExpenses) {
    totalPrice += 20;
  }
  if (taxReport?.medicalExpenses) {
    totalPrice += clientType === ClientTypeEnum.MAIN_CLIENT ? 15 : 10;
  }
  if (taxReport?.otherDeductions) {
    totalPrice += 5;
  }
  return totalPrice;
}

function calculateDependentsPrice(questionnaires: Map<string, Questionnaire>) {
  let price = 0;

  questionnaires.forEach((questionnaire) => {
    if (questionnaire.clientType === ClientTypeEnum.DEPENDENT) {
      price += 30;
    }
  });

  return price;
}