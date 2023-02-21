import { Questionnaire } from './types/Questionnaire/Questionnaire';

const EmptyTaxReport = {
  workIncomes: null,
  retirementIncomes: null,
  investmentIncomes: null,
  selfEmploymentRentalOtherIncomes: null,
  foreignAssets: null,
  studentExpenses: null,
  taxDeductions: null,
  donations: null,
  movingExpenses: null,
  medicalExpenses: null,
  eligibleHomeBuyerTaxCredit: null,
  boughHome: null,
  soldHome: null,
  homeAccessibilityTaxCredit: null,
  isFirefighterOrSearchAndRescueVolunteer: null,
  firefighterOrSearchAndRescueVolunteer: null,
  isOtherDeductions: null,
  otherDeductions: null,
  isInstalmentPayments: null,
  instalmentPayments: null
}

export const EmptyQuestionnaire: Questionnaire ={
  mainClient: false,
  year: null,
  civilStatus: {
    civilStatus: null,
    together: null
  },
  personalInformations: {
    firstName: '',
    lastName: '',
    birthDay: null,
    socialSecurityNumber: '',
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
    socialAssistanceBenefitsAmount: null, },
    haveDependents: null,
    dependents: [],
    taxReport: EmptyTaxReport
}

