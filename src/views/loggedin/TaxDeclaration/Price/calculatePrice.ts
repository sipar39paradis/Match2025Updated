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
  let totalPrice = clientType === ClientTypeEnum.MAIN_CLIENT ? 60 : 25;
  if (taxReport?.workIncomes?.employed) {
    totalPrice += clientType === ClientTypeEnum.MAIN_CLIENT ? 20 : 20;
  }
  if (
    !taxReport?.workIncomes?.employed &&
    (taxReport?.workIncomes?.insuranceBenefits ||
      taxReport?.workIncomes?.workerCompensationOrSocialAssistance ||
      taxReport?.workIncomes?.employmentInsuranceOrParentalBenefits)
  ) {
    totalPrice += 15;
  }
  if (taxReport?.workIncomes?.jobRelatedExpenses) {
    totalPrice += 40;
  }
  if (taxReport?.retirementIncomes?.pensionRetirementAnnuityIncome) {
    totalPrice += 30;
  }
  
  if (taxReport?.investmentIncomes?.investmentIncomes && (taxReport.investmentIncomes?.trustIncome ||
    taxReport.investmentIncomes?.securityTransactions ||
    taxReport.investmentIncomes?.partnershipIncomes ||
    taxReport.investmentIncomes?.explorationAndShareExpenses ||
    taxReport.investmentIncomes?.investmentPlanIncome ||
    taxReport.investmentIncomes?.labourSponsoredFundTaxCredits ||
    taxReport.investmentIncomes?.desjardins ||
    taxReport.investmentIncomes?.foreignIncomes)) {
    totalPrice += 30;
  }
  if (taxReport?.selfEmploymentIncomes?.selfEmployedIncomes) {
    totalPrice += 105;
  }
  if (taxReport?.rentalPropertyIncomes?.rentalPropertyIncomes) {
    for (
      let i = 0;
      i <= taxReport?.rentalPropertyIncomes?.numberOfRentalPropertyIncomes;
      i++
    ) {
      totalPrice += 70;
    }
  }
  if (taxReport?.otherIncomes?.otherIncomes) {
    totalPrice += 30;
  }
  if (taxReport?.studentExpenses?.studentExpenses) {
    totalPrice += clientType === ClientTypeEnum.MAIN_CLIENT ? 10 : 5;
  }
  if (taxReport?.movingExpenses) {
    totalPrice += 40;
  }
  if (taxReport?.medicalExpenses) {
    totalPrice += clientType === ClientTypeEnum.MAIN_CLIENT ? 10 : 0;
  }
  if (taxReport?.otherDeductions?.otherDeductions) {
    totalPrice += 10;
  }
  return totalPrice;
}

function calculateDependentsPrice(questionnaires: Map<string, Questionnaire>) {
  let price = 0;

  questionnaires.forEach((questionnaire) => {
    if (questionnaire.clientType === ClientTypeEnum.DEPENDENT) {
      price += 35;
    }
  });

  return price;
}