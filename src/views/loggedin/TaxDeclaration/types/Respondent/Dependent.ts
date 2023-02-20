import { DateType } from 'react-tailwindcss-datepicker/dist/types'

export interface Dependent {
  firstName: string
  lastName: string
  birthDate: DateType
  socialSecurityNumber: number
  relationship: DependentRelatationShipEnum
  livedWithTaxPayer: boolean
  federalNetIncome: number
  provincialNetIncome: number
  adjustedNetIncome: number
  quebecChildrenSupport: boolean
  claimedOrReceivedAmountForDependent: DateType
  needTaxReport?: boolean
  childcareToEarnIncome?: boolean
  universalChildCareBenefit?: boolean
  childcareExpensesReceivedForAdvancePayments?: boolean
  eligibleDependentAmount?: boolean
  tuitonsAndEducationAmountsTransferred?: boolean
  childrenActivitiesTaxCredit?: boolean
  disabilityAmountTransferredFromDependant?: boolean
  canadianCaregiverAmount?: boolean
  adoptionFees?: boolean
  dependentChildAmount?: boolean
}

export enum DependentRelatationShipEnum {
  SON = 'SON',
  DAUGHTER = 'DAUGHTER',
  GRANDSON='GRANDSON',
  GRANDDAUGHTER='GRANDDAUGHTER',
  NEPHEW='NEPHEW',
  NIECE='NIECE',
  BROTHER = 'BROTHER',
  SISTER = 'SISTER',
  UNCLE = 'UNCLE',
  AUNT='AUNT',
  FATHER='FATHER',
  MOTHER='MOTHER',
  GRAND_FATHER='GRAND_FATHER',
  GRAND_MOTHER='GRAND_MOTHER',
  OTHER='OTHER'
}