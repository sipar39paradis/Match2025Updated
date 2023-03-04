import { ClientTypeEnum, Questionnaire, QuestionnaireStateEnum } from './types/Questionnaire/Questionnaire';

const EmptyTaxReport = {
  workIncomes: null,
  retirementIncomes: null,
  investmentIncomes: null,
  selfEmploymentIncomes: null,
  rentalPropertyIncomes: null,
  otherIncomes: null,
  foreignAssets: null,
  studentExpenses: null,
  taxDeductions: null,
  donations: null,
  movingExpenses: null,
  medicalExpenses: null,
  healthAndDrugInsurance: null,
  eligibleHomeBuyerTaxCredit: null,
  boughHome: null,
  soldHome: null,
  homeAccessibilityTaxCredit: null,
  isFirefighterOrSearchAndRescueVolunteer: null,
  firefighterOrSearchAndRescueVolunteer: null,
  isOtherDeductions: null,
  otherDeductions: null,
  isInstalmentPayments: null,
  instalmentPayments: null,
  userFreeText: ''

}

export const EmptyQuestionnaire: Questionnaire ={
  clientType: ClientTypeEnum.MAIN_CLIENT,
  year: null,
  state: QuestionnaireStateEnum.NEW,
  civilStatus: {
    civilStatus: null,
    together: null
  },
  personalInformations: {
    firstName: '',
    lastName: '',
    birthDay: null,
    socialInsuranceNumber: '',
    email: '',
    bankruptcy: null,
    disabled: null},
  contactDetails: {
    address: '',
    appartment: null,
    street: '',
    city: '',
    postal: '',
    movedFromOtherProvince: null,
    sameAddress: null,
    isDifferentProvince: null,
    differentProvince: null,
    phoneNumber: '',
    canadianRedisentStatusChange: null
  },
  civilStatusChange: {
    civiStatusChange: null,
    lastYearCivilStatus: null,
    civilStatusChangeDate: null,
    civilStatusChangeToSingleDate: null,
    socialAssistanceBenefitsAmount: null, 
  },
    hasDependents: null,
    hasDependentsWithPartner: null,
    dependents: [],
    taxReport: EmptyTaxReport,
}

