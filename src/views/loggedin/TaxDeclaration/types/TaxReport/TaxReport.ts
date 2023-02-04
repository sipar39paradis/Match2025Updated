export interface TaxReport {
  workIncomes: WorkIncomes
  retirementIncomes: RetirementIncomes
  investmentIncomes: InvestmentIncomes
  selfEmploymentRentalOtherIncomes?: SelfEmploymentRentalOtherIncomes
  foreignAssets?: boolean
  studentExpenses: StudentExpenses
  taxDeductions: TaxDeductions
  donations: Donations
  movingExpenses: MovingExpenses
  medicalExpenses: boolean
  eligibleHomeBuyerTaxCredit: boolean
  homeAccessibilityTaxCredit: boolean
  losses: Losses
  firefighterOrSearchAndRescueVolunteer: number
  otherDeductions: OtherDeductions
  instalmentPayments: number
}

export interface Losses {
  deductibleBusinessInvestmentLoss?: boolean
  workOrBusinessLosses?: boolean
  fishingOrAgricultureLosses?: boolean
  personnalPropertyLosees?: boolean
  capitalAssetsLosses?: boolean
  partnershipLosses?: boolean
  deductLossesFromPreviousYearGains: boolean
}

export interface OtherDeductions {
  digitalNewServicesSubscription?: boolean
  covid19BenefitsReimbursement?: boolean
  boughtEligibleSchoolSupplies?: boolean
  paidUnionOrProfessionalDues?: boolean
  paidSpousalOrChildSupport?: boolean
  unusedSpousalCredits?: boolean
  paidForeignTaxes?: boolean
  northernResidentsDeduction?: boolean
  paidForestryOperationsTaxes?: boolean
  carryingForwardalternativeMinimumTaxPayments?: boolean
  alternativeMinimumTaxRevision?: boolean
  otherDeductions?: boolean
}


export interface MovingExpenses {
  movedForWorkOrSchool: boolean
  reportedMovingExpenses?: boolean
}

export interface Donations {
  charitableDonations?: boolean
  politicalContributions?: boolean
}

export interface WorkIncomes {
  workedLastYear?: boolean
  employed?: boolean
  employmentIncome?: boolean
  employmentProfitSharingPlan?: boolean
  pensionAdjustmentReversal?: boolean
  foreignIncomes?: boolean
  outsideCanadaIncome?: boolean
  multiEmployerInsurancePlanIncome?: boolean
  workerCompensationOrSocialAssistance?: boolean
  employmentInsuranceBenefits?: boolean
  employmentInsuranceOrParentalBenefits?: boolean
  onTheJobTrainingProgram?: boolean
  clergyMember?: boolean
  formT1198RetroactivePayment?: boolean
  wageLossReplacementPlan?: boolean
  optionalCPPorQPPcontributions?: boolean
  stocks?: boolean
  jobRelatedExpenses?: boolean
  taxRefund?: boolean
  mealsAndAccomodation?: boolean
  unionsOrProfessionalDues?: boolean
  remoteWorkExpenses?: boolean
  tipsOrCasualWork?: boolean
  covidInsuranceBenefits?: boolean
  familyOrIntermediateResourceCompensation ?: boolean
}
interface RetirementIncomes {
  retirementIncomes?: boolean
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
  advancePayments?: boolean
  statementOfDistribution?: boolean
}

interface SelfEmploymentRentalOtherIncomes {
  selfEmployed?: SelfEmployedIncomes
  rentalPropertyIncomes?: boolean
  homeOwnershipPlan?: boolean
  continuingEducationIncentivePlan?: boolean 
  schoolIncome?: boolean
  socialAssitance?: boolean
  welfareSeniorSupplement?: boolean
  disabilityOrDeathBenefits?: boolean
  spousalOrChildSupportPayments?: boolean
  advancePaymentsWorkingIncomeTaxBenefit?: boolean
  spousalRRSP?: boolean
  spousalRRIF ?: boolean
  RRSPorRRIFdeductions?: boolean
  canadaPensionPlanOrQuebecPensionPlanBenefits?: boolean
  registeredRetirementSavingsPlanIncome?: boolean
  otherRevenues?: boolean
}

interface SelfEmployedIncomes {
  selfEmployedIncomes?: boolean
  liberalProfession?: boolean
  commission?: boolean
  agriculture?: boolean
  fishing?: boolean
  other?: boolean}

interface StudentExpenses {
  tuitionFees?: boolean
  otherTuitionsFees?: boolean
  boughtFurnitures?: boolean
  tuitionsFeesPreviousYear?: boolean
  scholarshipGrantBursary?: boolean
  studentLoan?: boolean
  RESPincomes?: boolean
  RRSPincomes?: boolean
}

interface InvestmentIncomes {
 declaredInvestmentIncome?: boolean
 trustIncome?: boolean
 securityTransactions?: boolean
 explorationAndShareExpenses?: boolean
 investmentPlanIncome?: boolean
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
 soldSpecificMovableProperty?: boolean
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

export interface TaxDeductions {
  RRSPcontributions?: boolean
  reportedButUnusedRRSPorSPP?: boolean
  unreportedRRSP?: boolean
  deferRRSP?: boolean
  employerPRPP?: boolean
  contributionRPP?: boolean
  amateurAthletesTrust?: boolean
  contributionSPP?: boolean
  refundLLP?: boolean
  refundHOP?: boolean
  T4RSP?: boolean
  T4RIF?: boolean
  labourSponsoredFundTaxCredits?: boolean
  foreignPensionPlan?: boolean
}