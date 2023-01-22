export interface TaxProfile {
  workedLastYear?: WorkedLastYear
  retirementIncome?: RetirementIncome
  investmentIncome?: InvestmentIncome
  selfEmploymentRentalOtherIncome?: SelfEmploymentRentalOtherIncome
  foreignAssets?: boolean
  studentLastYear?: StudentLastYear
}

export interface WorkedLastYear{
  workedLastYear?: boolean
  employmentIncome?: boolean
  pensionRetirementAnnuityIncome?: boolean
  statementOfDistribution?: boolean
  employmentProfitSharingPlan?: boolean
  pensionAdjustmentReversal?: boolean
  foreignIncomes?: boolean
  outsideCanadaIncome?: boolean
  multiEmployerInsurancePlanIncome?: boolean
  workerCompensationOrSocialAssistance?: boolean
  employmentInsuranceBenefits?: boolean
  onTheJobTrainingProgram?: boolean
  employed?: boolean
  clergyMember?: boolean
  formT1198RetroactivePayment?: boolean
  wageLossReplacementPlan?: boolean
  optionalCPPorQPPcontributions?: boolean
  stocks?: boolean
  jobRelatedExpenses?: boolean
  taxRefund?: boolean
  mealsAndAccomodation?: boolean
  unionsOrProfessionalDues?: boolean
  covidJobRelatedExpenses?: boolean
  tipsOrCasualWork?: boolean
  covidInsuranceBenefits?: boolean
  welfareSeniorSupplement?: boolean
}
interface RetirementIncome {
  retirementIncome?: boolean
  oldAgeSecurity?: boolean
  retirementCompensationArrangement?: boolean
  welfareSeniorSupplement?: boolean
  pensionRetirementAnnuityIncome?: boolean
  registeredRetirementsavingsPlan?: boolean
  registeredRetirementIncomeFund?: boolean
  foreignIncome?: boolean
  canadaPensionPlanOrQuebecPensionPlanBenefits?: boolean
  creditAdjustment?: boolean
  splitPensionIncome?: boolean


}
interface SelfEmploymentRentalOtherIncome {
  selfEmploymentRentalOtherIncome?: boolean
  selfEmployed?: SelfEmployed
  rentalPropertyRevenues?: boolean
  RRSPorRRIFrevenues?: boolean
  homeOwnershipPlan?: boolean
  continuingEducationIncentivePlan?: boolean 
  schoolIncome?: boolean
  socialAssitance?: boolean
  welfareSeniorSupplement?: boolean
  disabilityOrDeathBenefits?: boolean
  spousalOrChildSupportPayments?: boolean
  advancePayments?: boolean
  spousalRRSP?: boolean
  spousalRRIF ?: boolean
  RRSPorRRIFdeductions?: boolean
  canadaPensionPlanOrQuebecPensionPlanBenefits?: boolean
  pensionRetirementAnnuityIncome?: boolean
  employmentInsuranceBenefits?:boolean
  registeredRetirementSavingsPlanIncome?: boolean
  otherRevenues?: boolean
}

interface SelfEmployed {
  selfEmployed?: boolean
  liberalProfession?: boolean
  commission?: boolean
  agriculture?: boolean
  fishing?: boolean
  other?: boolean}

interface StudentLastYear {
  tuitionFees?: boolean
  otherTuitionsFees?: boolean
  boughtFurnitures?: boolean
  tuitionsFeesPreviousYear?: boolean
  scholarshipGrantBursary?: boolean
  studentLoan?: boolean
  RESPincomes?: boolean
  RRSPincomes?: boolean
}

interface InvestmentIncome {
 investmentIncome?: boolean
 declaredIncome?: boolean
 trustIncome?: boolean
 securityTransactions?: boolean
 explorationAndShareExpenses?: boolean
 investmentPlan?: boolean
 labourSponsoredFundTaxCredits?: boolean
 desjardins?: boolean
 nonDeclaredInterestDividendPartnershipIncome?: boolean
 interestSlip?: boolean
 dividendSlip?: boolean
 partnershipIncomes?: boolean
 boughtAssets?: boolean
 soldAssets?: boolean
 soldStocks?: boolean
 soldRealEstate?: boolean
 repossessedMortgage?: boolean
 soldGoodForPersonalUse?: boolean
 specifiedPersonalProperty?: boolean
 soldEligibleSmallBusinessShares?: boolean
 soldFarmFishingProperty?: boolean
 soldBonds?: boolean
 cryptoCurrency?: boolean
 soldCrypto?: boolean
 boughtCrypto?: boolean
 foreignIncomes?: boolean
 financeCharges?: boolean
 interestExpenses?: boolean
 deductionClaim?: boolean
 cumulativeInvestmentLoss?: boolean
}