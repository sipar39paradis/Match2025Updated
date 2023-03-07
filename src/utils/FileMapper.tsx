import { TaxReport } from '../views/loggedin/TaxDeclaration/types/TaxReport/TaxReport';
import { jsPDF } from 'jspdf';
import { PersonalInformations } from '../views/loggedin/TaxDeclaration/types/Questionnaire/PersonnalInformations';

type TextData = [string, string];


function generatePDFContent(
  taxReport: any,
  getText: (taxReport: any) => TextData[],
  doc: jsPDF,
  x: number,
  y: number,
  title: string
): void {
  doc.setFontSize(14);
  doc.text(title, x, y);
  doc.setFontSize(10);
  const textData = getText(taxReport);
  let currentIndex = y + 10;
  if (textData.length > 0) {
    textData.forEach((innerArray, index) => {
      currentIndex += 10;
      addToDoc(doc, innerArray[0], fromVal(innerArray[1]), currentIndex);
    });
    doc.addPage();
  }
}

const MANDATORY_FILES = ['Avis de Cotisation - QC', 'Avis de cotisation - Fed'];
const DEPENSES_EMPLOIS = 'Dépenses liées à votre emploi';
const REMBOURSEMENTS_TPS_TVH = 'Remboursement de la TPS/TVH'
const FRAIS_REPAS_LOGEMENTS = 'Frais de repas et de logement'
const REVENU_EN_INTERETS_NON_DECLARE = 'revenu en intérêts'
const REVENU_EN_DIVIDENDES_NON_DECLARE = 'revenu en dividendes'
const REVENU_DE_SOCIETE_NON_DECLARE = 'revenu de societe'
const REER_DE_CONJOINT = 'REER de conjoint'
const FERR_DE_CONJOINT = 'FERR DE CONJOINT'
const RRSP_OR_RRIP_DEDUCTIONS = 'Formulaire T746'
const OTHER_TUITION_FEETS = 'Autres frais de scolarité'
const COTISATIONS_REER = 'Cotisations au REER'
const CHARITABLE_DONATIONS = 'Dons de bienfaisance'
const POLTIICAL_DONATIONS = 'Contributions Politiques'
const MEDICAL_FEES = 'Frais médicaux'
const COTISATIONS_SYNDICALES = 'Cotisations Syndicales'
const PENSION_ALIMENTAIRE = 'Pension Alimentaire'
const IMPOT_PAYS_ETRANGER = 'Impot à un pays étranger'
const REGION_ELOIGNEE = 'Région éloignée'
const FOREIGN_INCOME = 'Revenu de sources étrangères'

export function mapAllowedMultipleFiles(taxReport: TaxReport): Array<string> {
  const filesArr = []

  const studentExpenses = taxReport?.studentExpenses;
  const investmentIncomes = taxReport?.investmentIncomes;


  if (taxReport?.medicalExpenses) {
    filesArr.push(MEDICAL_FEES)
  }

  if (taxReport?.otherDeductions?.paidUnionOrProfessionalDues) {
    filesArr.push(COTISATIONS_SYNDICALES)
  }

  if (taxReport?.otherDeductions?.paidSpousalOrChildSupport) {
    filesArr.push(PENSION_ALIMENTAIRE)
  }

  if (taxReport?.otherDeductions?.paidForeignTaxes) {
    filesArr.push(IMPOT_PAYS_ETRANGER)
  }

  if (taxReport?.otherDeductions?.northernResidentsDeduction) {
    filesArr.push(REGION_ELOIGNEE)
  }

  if (investmentIncomes?.foreignIncomes) {
    filesArr.push(FOREIGN_INCOME);
  }

  if (studentExpenses?.otherTuitionsFees) {
    filesArr.push(OTHER_TUITION_FEETS)
  }

  if (taxReport?.workIncomes?.jobRelatedExpenses) {
    filesArr.push(DEPENSES_EMPLOIS)
  }

  if (taxReport?.workIncomes?.taxRefund) {
    filesArr.push(REMBOURSEMENTS_TPS_TVH)
  }

  if (taxReport?.workIncomes?.mealsAndAccomodation) {
    filesArr.push(FRAIS_REPAS_LOGEMENTS)
  }

  if (taxReport?.workIncomes?.unionsOrProfessionalDues) {
    filesArr.push(COTISATIONS_SYNDICALES)
  }

  if (taxReport?.investmentIncomes?.nonDeclaredInterestDividendPartnershipIncome) {
    if (taxReport?.investmentIncomes?.interestSlip) {
      filesArr.push(REVENU_EN_INTERETS_NON_DECLARE)
    }

    if (taxReport?.investmentIncomes?.dividendSlip) {
      filesArr.push(REVENU_EN_DIVIDENDES_NON_DECLARE)
    }

    if (taxReport?.investmentIncomes?.partnershipIncomes) {
      filesArr.push(REVENU_DE_SOCIETE_NON_DECLARE)
    }
  }

  if (taxReport?.otherIncomes?.RRSPorRRIFincome) {
    if (taxReport?.otherIncomes?.spousalRRSP) {
      filesArr.push(REER_DE_CONJOINT);
    }

    if (taxReport?.otherIncomes?.spousalRRIF) {
      filesArr.push(FERR_DE_CONJOINT);
    }

    if (taxReport?.otherIncomes?.RRSPorRRIFdeductions) {
      filesArr.push(RRSP_OR_RRIP_DEDUCTIONS);
    }
  }

  if (taxReport?.taxDeductions?.pensionPLan) {
    if (taxReport?.taxDeductions?.RRSPcontributions) {
      filesArr.push(COTISATIONS_REER)
    }
  }

  if (taxReport?.donations?.charitableDonations) {
    filesArr.push(CHARITABLE_DONATIONS)
  }

  if (taxReport?.donations?.politicalContributions) {
    filesArr.push(POLTIICAL_DONATIONS)
  }

  return filesArr;
}

export default function mapFiles(taxReport: TaxReport): Array<string> {
  const filesArr = [];

  const investmentIncomes = taxReport?.investmentIncomes;
  const studentExpenses = taxReport?.studentExpenses;
  const retirementIncomes = taxReport?.retirementIncomes;
  const otherIncomes = taxReport?.otherIncomes;
  const workIncomes = taxReport?.workIncomes;

  const taxDeductions = taxReport?.taxDeductions;

  // investment income
  if (investmentIncomes?.reportedInvestmentIncome) {
    if (investmentIncomes?.declaredInvestmentIncome) {
      filesArr.push('T5_Relevé 3');
    }

    if (investmentIncomes?.trustIncome) {
      filesArr.push('T3_Relevé 16');
    }

    if (investmentIncomes?.securityTransactions) {
      filesArr.push('T5008_Relevé 18');
    }

    if (investmentIncomes?.partnershipIncomes) {
      filesArr.push('T5013_Relevé 15');
    }

    if (investmentIncomes?.explorationAndShareExpenses) {
      filesArr.push('T101_Relevé 11');
    }

    if (investmentIncomes?.investmentPlanIncome) {
      filesArr.push('Relevé 7');
    }

    if (taxDeductions?.labourSponsoredFundTaxCredits) {
      filesArr.push('Relevé 10');
    }

    if (investmentIncomes?.desjardins) {
      filesArr.push('Relevé 26');
    }
  }
  // Student expenses
  if (studentExpenses?.tuitionFees) {
    filesArr.push('T2022_Relevé_8_TL11');
  }

  // Retirement Incomes
  if (retirementIncomes?.oldAgeSecurity) {
    filesArr.push('T4A(OAS)');
  }
  if (retirementIncomes?.canadaPensionPlanOrQuebecPensionPlanBenefits) {
    filesArr.push('T4A(P)_Relevé 2');
  }
  if (retirementIncomes?.welfareSeniorSupplement) {
    filesArr.push('T5007_Relevé 5');
  }
  if (retirementIncomes?.pensionRetirementAnnuityIncome) {
    filesArr.push('T4A_Relevé 2_Relevé 1');
  }
  if (retirementIncomes?.statementOfDistribution) {
    filesArr.push('T4A-RCA');
  }
  if (retirementIncomes?.registeredRetirementsavingsPlan) {
    filesArr.push('T4RSP_Relevé 2');
  }
  if (retirementIncomes?.registeredRetirementIncomeFund) {
    filesArr.push('T4RIF_Relevé 2');
  }
  if (retirementIncomes?.advancePayments) {
    filesArr.push('Relevé 19');
  }

  // Other incomes
  if (otherIncomes?.disabilityOrDeathBenefits) {
    if (otherIncomes?.registeredRetirementSavingsPlanIncome) {
      filesArr.push('T4A_Relevé 2_Relevé 1');
    }
    if (otherIncomes?.canadaPensionPlanOrQuebecPensionPlanBenefits) {
      filesArr.push('T4A(P)_Relevé 2');
    }
  }
  if (otherIncomes?.schoolIncome) {
    if (retirementIncomes?.pensionRetirementAnnuityIncome) {
      filesArr.push('T4A_Relevé 2_Relevé 1');
    }
    if (otherIncomes?.registeredRetirementSavingsPlanIncome) {
      filesArr.push('T4RSP_Relevé 2');
    }
  }
  if (otherIncomes?.socialAssitance) {
    if (retirementIncomes?.welfareSeniorSupplement) {
      filesArr.push('T5007_Relevé 5');
    }
    if (retirementIncomes?.advancePayments) {
      filesArr.push('Relevé 19');
    }
  }
  if (otherIncomes?.advancePaymentsWorkingIncomeTaxBenefit) {
    if (otherIncomes.advancePaymentsWorkingIncomeTaxBenefit) {
      filesArr.push('RC210');
    }
    if (retirementIncomes?.advancePayments) {
      filesArr.push('Relevé 19');
    }
  }

  // Work incomes
  if (workIncomes?.employed && workIncomes?.workedLastYear) {
    if (workIncomes?.employmentIncome) {
      filesArr.push('T4_Relevé 1');
    }
    if (retirementIncomes?.pensionRetirementAnnuityIncome) {
      filesArr.push('T4A_Relevé 2_Relevé 1');
    }
    if (retirementIncomes?.statementOfDistribution) {
      filesArr.push('T4A-RCA');
    }
    if (workIncomes?.employmentProfitSharingPlan) {
      filesArr.push('T4PS_Relevé 25');
    }
    if (workIncomes?.pensionAdjustmentReversal) {
      filesArr.push('T10');
    }
    if (workIncomes?.foreignIncomes) {
      filesArr.push('Foreign_income');
    }
    if (workIncomes?.outsideCanadaIncome) {
      filesArr.push('Relevé 17');
    }
    if (workIncomes?.multiEmployerInsurancePlanIncome) {
      filesArr.push('Relevé 22');
    }

    if (workIncomes?.employmentInsuranceOrParentalBenefits) {
      if (workIncomes?.insuranceBenefits) {
        filesArr.push('T4E_Relevé 6');
      }
      if (retirementIncomes?.pensionRetirementAnnuityIncome) {
        filesArr.push('T4A_Relevé 2_Relevé 1');
      }
    }
  } else if (workIncomes?.employed && !workIncomes?.workedLastYear) {
    if (workIncomes?.workerCompensationOrSocialAssistance) {
      if (retirementIncomes?.welfareSeniorSupplement) {
        filesArr.push('T5007_Relevé 5');
      }
    }
    if (workIncomes?.employmentInsuranceOrParentalBenefits) {
      if (workIncomes?.employmentInsuranceBenefits) {
        filesArr.push('T4E_Relevé 6');
      }
      if (retirementIncomes?.pensionRetirementAnnuityIncome) {
        filesArr.push('T4A_Relevé 2_Relevé 1');
      }
    }
  }

  MANDATORY_FILES?.forEach((file) => {
    filesArr.push(file);
  });

  return filesArr;
}

export function getPDFTaxReport(
  taxReport: TaxReport,
  personalInformation: PersonalInformations
) {
  console.log(personalInformation?.email);
  const doc = new jsPDF();
  doc.setFontSize(25);
  doc.text(
    `Rapport d'impots pour ${personalInformation?.firstName} ${personalInformation?.lastName}`,
    10,
    10
  );
  const x = 15;
  const y = 30;
  generatePDFContent(
    taxReport,
    getWorkIncomesText,
    doc,
    x,
    y,
    'Revenus de travail'
  );
  generatePDFContent(
    taxReport,
    getBoughtHomeText,
    doc,
    x,
    y,
    "Achat d'une maison"
  );
  generatePDFContent(taxReport, getLossesText, doc, x, y, 'Pertes');
  generatePDFContent(
    taxReport,
    getOtherDeductionsText,
    doc,
    x,
    y,
    'Autres déductions'
  );
  generatePDFContent(taxReport, getDonationsText, doc, x, y, 'Dons');
  generatePDFContent(
    taxReport,
    getRetirementIncomesText,
    doc,
    x,
    y,
    'Revenus de retraite'
  );
  generatePDFContent(
    taxReport,
    getSelfEmploymentIncomesText,
    doc,
    x,
    y,
    'Revenus de travail autonome'
  );
  generatePDFContent(
    taxReport,
    getRentalPropertyIncomesText,
    doc,
    x,
    y,
    'Revenus de travail locatifs'
  );
  generatePDFContent(
    taxReport,
    getOtherIncomesText,
    doc,
    x,
    y,
    'Revenus autres'
  );
  generatePDFContent(
    taxReport,
    getSelfEmployedIncomesText,
    doc,
    x,
    y,
    'Revenus de travail autonome'
  );
  generatePDFContent(
    taxReport,
    getStudentExpensesText,
    doc,
    x,
    y,
    "Dépenses d'études"
  );
  generatePDFContent(
    taxReport,
    getInvestmentIncomesText,
    doc,
    x,
    y,
    'Revenus de placements'
  );
  generatePDFContent(
    taxReport,
    getTaxDeductionsText,
    doc,
    x,
    y,
    'Déductions fiscales'
  );
  return doc.output('arraybuffer');
}

function addToDoc(doc: jsPDF, text: string, value: any, yAxis: number) {
  const width = doc.getTextWidth(text);
  doc.text(`${text}:`, 10, yAxis);
  doc.setFont('helvetica', 'bold');
  doc.text(`${fromVal(value)}`, width + 15, yAxis);
  doc.setFont('helvetica', 'normal');
}

function fromVal(givenVal: any) {
  if (givenVal === 'Oui' || givenVal === 'Non') {
    return givenVal;
  }
  if (givenVal == undefined || !givenVal) {
    return 'Non'
  }

  return 'Oui'
}

function getWorkIncomesText(taxReport: TaxReport): Array<TextData> {
  const workIncomes = taxReport?.workIncomes;
  return [
    ["A travaillé l'an dernier", fromVal(workIncomes?.workedLastYear)],
    ['Employé', fromVal(workIncomes?.employed)],
    ["Revenu d'emploi", fromVal(workIncomes?.employmentIncome)],
    [
      "Plan de participation aux bénéfices lié à l'emploi",
      fromVal(workIncomes?.employmentProfitSharingPlan),
    ],
    [
      'Régularisation des droits à pension',
      fromVal(workIncomes?.pensionAdjustmentReversal),
    ],
    ['Revenus étrangers', fromVal(workIncomes?.foreignIncomes)],
    [
      "Revenus à l'extérieur du Canada",
      fromVal(workIncomes?.outsideCanadaIncome),
    ],
    [
      "Revenus d'un régime d'assurance multi-employeurs",
      fromVal(workIncomes?.multiEmployerInsurancePlanIncome),
    ],
    [
      "Indemnités de travailleur ou d'assistance sociale",
      fromVal(workIncomes?.workerCompensationOrSocialAssistance),
    ],
    [
      "Prestations d'assurance-emploi",
      fromVal(workIncomes?.employmentInsuranceBenefits),
    ],
    [
      "Prestations d'assurance-emploi ou parentales",
      fromVal(workIncomes?.employmentInsuranceOrParentalBenefits),
    ],
    [
      'Paiement rétroactif (T1198)',
      fromVal(workIncomes?.formT1198RetroactivePayment),
    ],
    [
      'Plan de remplacement du revenu de travail',
      fromVal(workIncomes?.wageLossReplacementPlan),
    ],
    [
      "Frais de travail liés à l'emploi",
      fromVal(workIncomes?.jobRelatedExpenses),
    ],
    ["Remboursement d'impôt", fromVal(workIncomes?.taxRefund)],
    ['Repas et hébergement', fromVal(workIncomes?.mealsAndAccomodation)],
    [
      'Syndicats ou cotisations professionnelles',
      fromVal(workIncomes?.unionsOrProfessionalDues),
    ],
    ['Frais de travail à distance', fromVal(workIncomes?.remoteWorkExpenses)],
    [
      'Pourboires ou travail occasionnel',
      fromVal(workIncomes?.tipsOrCasualWork),
    ],
    ["Prestations d'assurance", fromVal(workIncomes?.insuranceBenefits)],
  ];
}

function getBoughtHomeText(taxReport: TaxReport): Array<TextData> {
  const boughtHome = taxReport?.boughHome;
  return [
    ['Acheté une maison', fromVal(boughtHome?.boughHome)],
    [
      "Acheter une maison l'an dernier",
      fromVal(boughtHome?.boughtHomeLastYear),
    ],
    ['Maison différente', fromVal(boughtHome?.differentHome)],
    ['Acheter pour handicapé', fromVal(boughtHome?.boughtForDisabled)],
    [
      "Crédit d'impôt pour l'accessibilité domiciliaire",
      fromVal(boughtHome?.homeAccessibilityTaxCredit),
    ],
  ];
}

function getLossesText(taxReport: TaxReport): Array<TextData> {
  const losses = taxReport?.losses;
  return [
    ['Pertes', fromVal(losses?.losses)],
    ['Années précédentes perdues', fromVal(losses?.previousYearsLost)],
    [
      "Perte déductible d'investissement commercial",
      fromVal(losses?.deductibleBusinessInvestmentLoss),
    ],
    [
      "Pertes de travail ou d'entreprise",
      fromVal(losses?.workOrBusinessLosses),
    ],
    ['Pertes de biens personnels', fromVal(losses?.personnalPropertyLosees)],
    ["Pertes d'actifs en capital", fromVal(losses?.capitalAssetsLosses)],
    ['Pertes de partenariat', fromVal(losses?.partnershipLosses)],
    [
      'Déduire les pertes des gains des années précédentes',
      fromVal(losses?.deductLossesFromPreviousYearGains),
    ],
  ];
}

function getOtherDeductionsText(taxReport: TaxReport): Array<TextData> {
  const otherDeductions = taxReport?.otherDeductions;
  return [
    [
      'Cotisations syndicales ou professionnelles payées',
      fromVal(otherDeductions?.paidUnionOrProfessionalDues),
    ],
    [
      'Pension alimentaire versée à un conjoint ou à un enfant',
      fromVal(otherDeductions?.paidSpousalOrChildSupport),
    ],
    ['Impôts étrangers payés', fromVal(otherDeductions?.paidForeignTaxes)],
    [
      'Déduction pour résidents du Nord',
      fromVal(otherDeductions?.northernResidentsDeduction),
    ],
    ['Autres déductions', fromVal(otherDeductions?.otherDeductions)],
  ];
}

function getDonationsText(taxReport: TaxReport): Array<TextData> {
  const donations = taxReport?.donations;
  return [
    ['Faites-vous des dons ?', fromVal(donations?.donations)],
    ['Dons de bienfaisance', fromVal(donations?.charitableDonations)],
    ['Contributions politiques', fromVal(donations?.politicalContributions)],
  ];
}

function getRetirementIncomesText(taxReport: TaxReport): Array<TextData> {
  const retirementIncomes = taxReport?.retirementIncomes;
  return [
    [
      'Avez-vous des revenus de retraite ?',
      fromVal(retirementIncomes?.retirementIncomes),
    ],
    ['Sécurité de la vieillesse', fromVal(retirementIncomes?.oldAgeSecurity)],
    [
      'Régime de compensation pour la retraite',
      fromVal(retirementIncomes?.retirementCompensationArrangement),
    ],
    [
      'Supplément de revenu garanti',
      fromVal(retirementIncomes?.welfareSeniorSupplement),
    ],
    [
      'Pension ou rente de retraite',
      fromVal(retirementIncomes?.pensionRetirementAnnuityIncome),
    ],
    [
      "Régime enregistré d'épargne-retraite",
      fromVal(retirementIncomes?.registeredRetirementsavingsPlan),
    ],
    [
      'Fonds enregistré de revenu de retraite',
      fromVal(retirementIncomes?.registeredRetirementIncomeFund),
    ],
    ['Revenu étranger', fromVal(retirementIncomes?.foreignIncome)],
    [
      'Prestations du Régime de pensions du Canada ou du Régime de rentes du Québec',
      fromVal(retirementIncomes?.canadaPensionPlanOrQuebecPensionPlanBenefits),
    ],
    ['Ajustement de crédit', fromVal(retirementIncomes?.creditAdjustment)],
    [
      'Fractionnement du revenu de pension',
      fromVal(retirementIncomes?.splitPensionIncome),
    ],
    ['Paiements anticipés', fromVal(retirementIncomes?.advancePayments)],
    [
      'État de distribution',
      fromVal(retirementIncomes?.statementOfDistribution),
    ],
  ];
}

function getSelfEmploymentIncomesText(taxReport: TaxReport): Array<TextData> {
  const selfEmploymentRentalOtherIncomes = taxReport?.selfEmploymentIncomes;
  return [
    [
      'Avez-vous des revenus de travailleur autonome?',
      fromVal(selfEmploymentRentalOtherIncomes?.selfEmployedIncomes),
    ],
  ];
}

function getRentalPropertyIncomesText(taxReport: TaxReport): Array<TextData> {
  const rentalPropertyIncomes = taxReport?.rentalPropertyIncomes;
  return [['Revenus de location de biens', fromVal(rentalPropertyIncomes)]];
}

function getOtherIncomesText(taxReport: TaxReport): Array<TextData> {
  const otherIncomes = taxReport?.otherIncomes;
  return [
    [
      "Programme d'encouragement à l'éducation permanente",
      fromVal(otherIncomes?.continuingEducationIncentivePlan),
    ],
    ['Revenus scolaires', fromVal(otherIncomes?.schoolIncome)],
    ['Aide sociale', fromVal(otherIncomes?.socialAssitance)],
    [
      'Supplément de revenu de la Sécurité de la vieillesse',
      fromVal(otherIncomes?.welfareSeniorSupplement),
    ],
    [
      "Prestations d'invalidité ou de décès",
      fromVal(otherIncomes?.disabilityOrDeathBenefits),
    ],
    [
      'Paiements de soutien pour conjoint ou enfants',
      fromVal(otherIncomes?.spousalOrChildSupportPayments),
    ],
    [
      'Paiements anticipés du revenu de travail et de la prestation fiscale pour le revenu de travail',
      fromVal(otherIncomes?.advancePaymentsWorkingIncomeTaxBenefitIncome),
    ],
    [
      'Paiements anticipés de la prestation fiscale pour le revenu de travail',
      fromVal(otherIncomes?.advancePaymentsWorkingIncomeTaxBenefit),
    ],
    ['Cotisations à un REER de conjoint', fromVal(otherIncomes?.spousalRRSP)],
    ['REER de conjoint', fromVal(otherIncomes?.spousalRRIF)],
    ["Revenus d'un REER ou d'un FERR", fromVal(otherIncomes?.RRSPorRRIFincome)],
    [
      'Déductions pour REER ou FERR',
      fromVal(otherIncomes?.RRSPorRRIFdeductions),
    ],
    [
      'Prestations du Régime de pensions du Canada ou du Régime des rentes du Québec',
      fromVal(otherIncomes?.canadaPensionPlanOrQuebecPensionPlanBenefits),
    ],
    [
      "Revenus d'un REER",
      fromVal(otherIncomes?.registeredRetirementSavingsPlanIncome),
    ],
    ['Autres revenus', fromVal(otherIncomes?.otherIncomesNonIncluded)],
  ];
}

function getSelfEmployedIncomesText(taxReport: TaxReport): Array<TextData> {
  const selfEmployed = taxReport?.selfEmploymentIncomes;
  return [
    ["Revenus d'entreprise?", fromVal(selfEmployed?.selfEmployedIncomes)],
    ['Profession libérale?', fromVal(selfEmployed?.liberalProfession)],
    ['Commission?', fromVal(selfEmployed?.commission)],
    ['Autre?', fromVal(selfEmployed?.other)],
  ];
}

function getStudentExpensesText(taxReport: TaxReport): Array<TextData> {
  const studentExpenses = taxReport?.studentExpenses;
  return [
    ["Dépenses d'études?", fromVal(studentExpenses?.studentExpenses)],
    ['Frais de scolarité?', fromVal(studentExpenses?.tuitionFees)],
    ['Autres frais de scolarité?', fromVal(studentExpenses?.otherTuitionsFees)],
    ['Achats de meubles?', fromVal(studentExpenses?.boughtFurnitures)],
    [
      "Frais de scolarité de l'année précédente?",
      fromVal(studentExpenses?.tuitionsFeesPreviousYear),
    ],
    ["Bourse d'études?", fromVal(studentExpenses?.scholarshipGrantBursary)],
    ['Prêt étudiant?', fromVal(studentExpenses?.studentLoan)],
    ["Revenus d'un REEE?", fromVal(studentExpenses?.RESPincomes)],
    ["Revenus d'un REER?", fromVal(studentExpenses?.RRSPincomes)],
  ];
}

function getInvestmentIncomesText(taxReport: TaxReport): Array<TextData> {
  const investmentIncome = taxReport?.investmentIncomes;
  return [
    [
      'Avez-vous des revenus de placement?',
      fromVal(investmentIncome?.investmentIncomes),
    ],
    [
      'Revenus de placement déclarés?',
      fromVal(investmentIncome?.reportedInvestmentIncome),
    ],
    [
      'Revenus de placement non déclarés?',
      fromVal(investmentIncome?.declaredInvestmentIncome),
    ],
    ['Revenus de fiducie?', fromVal(investmentIncome?.trustIncome)],
    [
      'Transactions de titres?',
      fromVal(investmentIncome?.securityTransactions),
    ],
    [
      'Exploration et partage des dépenses?',
      fromVal(investmentIncome?.explorationAndShareExpenses),
    ],
    [
      'Revenus de plan de placement?',
      fromVal(investmentIncome?.investmentPlanIncome),
    ],
    ['Desjardins?', fromVal(investmentIncome?.desjardins)],
    [
      'Revenus de partenariat non déclarés pour intérêts/dividendes?',
      fromVal(investmentIncome?.nonDeclaredInterestDividendPartnershipIncome),
    ],
    ["Reçus d'intérêts?", fromVal(investmentIncome?.interestSlip)],
    ['Reçus de dividendes?', fromVal(investmentIncome?.dividendSlip)],
    ['Revenus de partenariat?', fromVal(investmentIncome?.partnershipIncomes)],
    ["Achats d'actifs?", fromVal(investmentIncome?.boughtAssets)],
    ["Ventes d'actifs?", fromVal(investmentIncome?.soldAssets)],
    ["Ventes d'actions?", fromVal(investmentIncome?.soldStocks)],
    ['Ventes de biens immobiliers?', fromVal(investmentIncome?.soldRealEstate)],
    ['Saisies hypothécaires?', fromVal(investmentIncome?.repossessedMortgage)],
    [
      'Ventes de biens personnels?',
      fromVal(investmentIncome?.soldGoodForPersonalUse),
    ],
    [
      'Ventes de biens meubles spécifiques?',
      fromVal(investmentIncome?.soldSpecificMovableProperty),
    ],
    [
      "Ventes d'actions de petites entreprises admissibles?",
      fromVal(investmentIncome?.soldEligibleSmallBusinessShares),
    ],
    [
      'Ventes de biens de ferme/pêche?',
      fromVal(investmentIncome?.soldFarmFishingProperty),
    ],
    ["Ventes d'obligations?", fromVal(investmentIncome?.soldBonds)],
    ['Cryptomonnaie?', fromVal(investmentIncome?.cryptoCurrency)],
    ['Ventes de cryptomonnaie?', fromVal(investmentIncome?.soldCrypto)],
    ['Achats de cryptomonnaie?', fromVal(investmentIncome?.boughtCrypto)],
    ['Revenus étrangers?', fromVal(investmentIncome?.foreignIncomes)],
    ['Frais financiers?', fromVal(investmentIncome?.financeCharges)],
    ['Intérêts déductibles?', fromVal(investmentIncome?.interestExpenses)],
    ['Réclamations de déduction?', fromVal(investmentIncome?.deductionClaim)],
    [
      'Pertes de placement cumulatives?',
      fromVal(investmentIncome?.cumulativeInvestmentLoss),
    ],
  ];
}

function getTaxDeductionsText(taxReport: TaxReport): Array<TextData> {
  const taxDeductions = taxReport?.taxDeductions;
  return [
    [
      'Faites-vous des déductions fiscales ?',
      fromVal(taxDeductions?.taxDeductions),
    ],
    [
      'Cotisation à un régime de pension agréé',
      fromVal(taxDeductions?.pensionPLan),
    ],
    ['Contribution REER', fromVal(taxDeductions?.RRSPcontributions)],
    [
      'REER/SCEE non utilisés rapportés',
      fromVal(taxDeductions?.reportedButUnusedRRSPorSPP),
    ],
    ['REER non déclarés', fromVal(taxDeductions?.unreportedRRSP)],
    ['Reportez-vous la déduction REER ?', fromVal(taxDeductions?.deferRRSP)],
    [
      "Régime volontaire d'épargne-retraite de l'employeur",
      fromVal(taxDeductions?.employerPRPP),
    ],
    ['Contribution régime de pension', fromVal(taxDeductions?.contributionRPP)],
    [
      "Remboursement REER pour achat d'une propriété",
      fromVal(taxDeductions?.refundLLP),
    ],
    [
      'Remboursement REER pour construction/rénovation',
      fromVal(taxDeductions?.refundHOP),
    ],
    ['Remboursement REER ou RAP/ARR', fromVal(taxDeductions?.LLPorHBP)],
    [
      'Avez-vous remboursé un RAP/ARR en 2021 ou janvier 2022 ?',
      fromVal(taxDeductions?.LLPorHBPrepayment),
    ],
    ['Reçu T4 pour REER', fromVal(taxDeductions?.T4RSP)],
    ['Reçu T4 pour FERR', fromVal(taxDeductions?.T4RIF)],
    [
      "Crédit d'impôt pour fonds de travailleurs",
      fromVal(taxDeductions?.labourSponsoredFundTaxCredits),
    ],
    ['Régime de pension étranger', fromVal(taxDeductions?.foreignPensionPlan)],
    [
      "Avez-vous retiré de l'argent de votre REER ou FERR ?",
      fromVal(taxDeductions?.RRSPorRRIFmoneyWithdrawn),
    ],
  ];
}
