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

const T5_Releve_3 = ['T5_Relevé 3', 'Revenus de placements'];
const T3_Releve_16 = [
  'T3_Relevé 16',
  'État des revenus de fiducie (répartition et attribution)',
];
const T5008_Releve_18 = ['T5008_Relevé 18', 'Opérations sur titres'];
const T5013_Releve_15 = [
  'T5013_Relevé 15',
  "Revenus d'une société de personnes",
];
const T101_Releve_11 = [
  'T101_Relevé 11',
  "Frais d'exploration et d'actions accréditives",
];
const Releve_7 = ['Relevé 7', "Placements dans un régime d'investissement"];
const Releve_10 = [
  'Relevé 10',
  "Crédit d'impôt relatif à un fonds de travailleurs",
];
const Releve_26 = ['Relevé 26', 'Capital régional et coopératif Desjardins'];
const T2202_Releve_8_TL11 = [
  'T2202_Relevé_8_TL11',
  'Frais de scolarité figurant sur un feuillet T2202',
];
const T4A_OAS = ['T4A(OAS)', 'Sécurité de la vieillesse'];
const T4A_P_Releve_2 = [
  'T4A(P)_Relevé 2',
  'Prestations du Régime de pensions du Canada ou du Régime de rentes du Québec',
];
const T5007_Releve_5 = [
  'T5007_Relevé 5',
  "Prestations d'assistance sociale ou de la CAT, supplément pour personnes âgées",
];
const T4A_Releve_2_Releve_1 = [
  'T4A_Relevé 2_Relevé 1',
  'Pension, retraite, rente et autres revenus',
];
const T4RSP_Releve_2 = [
  'T4RSP_Relevé 2',
  "Revenus d'un régime enregistré d'épargne-retraite",
];
const T4RIF_Releve_2 = [
  'T4RIF_Relevé 2',
  'Fonds enregistré de revenu de retraite',
];
const Releve_19 = ['Relevé 19', 'Versements anticipés'];
const RC210 = ['RC210', ''];
const T4_Releve_1 = ['T4_Relevé 1', "Revenus d'emploi"];
const T4PS_Releve_25 = [
  'T4PS_Relevé_25',
  'Régime de participation des employés aux bénéfices',
];
const T10 = ['T10', "Facteur d'équivalence rectifié (FER)"];
const Foreign_income = ['Foreign_income', 'Revenu étranger'];
const Releve_17 = [
  'Relevé 17',
  "Rémunération provenant d'un emploi à l'extérieur du Canada",
];
const Releve_22 = [
  'Relevé 22',
  "Revenu d'emploi lié à un régime d'assurance interentreprises",
];
const T4E_Releve_6 = ['T4E_Relevé 6', "Prestations d'assurance-emploi"];
const T4A_RCA = [
  'T4A-RCA',
  "Montant reçu pour des régimes d'accumulation de capital (RAC)",
];

export function mapTitle(title: string): string {
  switch (title) {
    case T5_Releve_3[0]:
      return `${T5_Releve_3[0].replaceAll('_', ' ')}: ${T5_Releve_3[1]}`;
    case T3_Releve_16[0]:
      return `${T3_Releve_16[0].replaceAll('_', ' ')}: ${T3_Releve_16[1]}`;
    case T5008_Releve_18[0]:
      return `${T5008_Releve_18[0].replaceAll('_', ' ')}: ${
        T5008_Releve_18[1]
      }`;
    case T5013_Releve_15[0]:
      return `${T5013_Releve_15[0].replaceAll('_', ' ')}: ${
        T5013_Releve_15[1]
      }`;
    case T101_Releve_11[0]:
      return `${T101_Releve_11[0].replaceAll('_', ' ')}: ${T101_Releve_11[1]}`;
    case Releve_7[0]:
      return `${Releve_7[0].replaceAll('_', ' ')}: ${Releve_7[1]}`;
    case Releve_10[0]:
      return `${Releve_10[0].replaceAll('_', ' ')}: ${Releve_10[1]}`;
    case Releve_26[0]:
      return `${Releve_26[0].replaceAll('_', ' ')}: ${Releve_26[1]}`;
    case T2202_Releve_8_TL11[0]:
      return `${T2202_Releve_8_TL11[0].replaceAll('_', ' ')}: ${
        T2202_Releve_8_TL11[1]
      }`;
    case T4A_OAS[0]:
      return `${T4A_OAS[0].replaceAll('_', ' ')}: ${T4A_OAS[1]}`;
    case T4A_P_Releve_2[0]:
      return `${T4A_P_Releve_2[0].replaceAll('_', ' ')}: ${T4A_P_Releve_2[1]}`;
    case T5007_Releve_5[0]:
      return `${T5007_Releve_5[0].replaceAll('_', ' ')}: ${T5007_Releve_5[1]}`;
    case T4A_Releve_2_Releve_1[0]:
      return `${T4A_Releve_2_Releve_1[0].replaceAll('_', ' ')}: ${
        T4A_Releve_2_Releve_1[1]
      }`;
    case T4RSP_Releve_2[0]:
      return `${T4RSP_Releve_2[0].replaceAll('_', ' ')}: ${T4RSP_Releve_2[1]}`;
    case T4RIF_Releve_2[0]:
      return `${T4RIF_Releve_2[0].replaceAll('_', ' ')}: ${T4RIF_Releve_2[1]}`;
    case Releve_19[0]:
      return `${Releve_19[0].replaceAll('_', ' ')}: ${Releve_19[1]}`;
    case RC210[0]:
      return `${RC210[0].replaceAll('_', ' ')}: ${RC210[1]}`;
    case T4_Releve_1[0]:
      return `${T4_Releve_1[0].replaceAll('_', ' ')}: ${T4_Releve_1[1]}`;
    case T4PS_Releve_25[0]:
      return `${T4PS_Releve_25[0].replaceAll('_', ' ')}: ${T4PS_Releve_25[1]}`;
    case T10[0]:
      return `${T10[0].replaceAll('_', ' ')}: ${T10[1]}`;
    case Foreign_income[0]:
      return `${Foreign_income[0].replaceAll('_', ' ')}: ${Foreign_income[1]}`;
    case Releve_17[0]:
      return `${Releve_17[0].replaceAll('_', ' ')}: ${Releve_17[1]}`;
    case Releve_22[0]:
      return `${Releve_22[0].replaceAll('_', ' ')}: ${Releve_22[1]}`;
    case T4E_Releve_6[0]:
      return `${T4E_Releve_6[0].replaceAll('_', ' ')}: ${T4E_Releve_6[1]}`;
    case T4A_RCA[0]:
      return `${T4A_RCA[0].replaceAll('_', ' ')}: ${T4A_RCA[1]}`;
    default:
      return title.replaceAll('_', ' ');
  }
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
      filesArr.push(T5_Releve_3[0]);
    }

    if (investmentIncomes?.trustIncome) {
      filesArr.push(T3_Releve_16[0]);
    }

    if (investmentIncomes?.securityTransactions) {
      filesArr.push(T5008_Releve_18[0]);
    }

    if (investmentIncomes?.partnershipIncomes) {
      filesArr.push(T5013_Releve_15[0]);
    }

    if (investmentIncomes?.explorationAndShareExpenses) {
      filesArr.push(T101_Releve_11[0]);
    }

    if (investmentIncomes?.investmentPlanIncome) {
      filesArr.push(Releve_7[0]);
    }

    if (taxDeductions?.labourSponsoredFundTaxCredits) {
      filesArr.push(Releve_10[0]);
    }

    if (investmentIncomes?.desjardins) {
      filesArr.push(Releve_26[0]);
    }
  }
  if (studentExpenses?.tuitionFees) {
    filesArr.push(T2202_Releve_8_TL11[0]);
  }

  // Retirement Incomes
  if (retirementIncomes?.oldAgeSecurity) {
    filesArr.push(T4A_OAS[0]);
  }
  if (retirementIncomes?.canadaPensionPlanOrQuebecPensionPlanBenefits) {
    filesArr.push(T4A_P_Releve_2[0]);
  }
  if (retirementIncomes?.welfareSeniorSupplement) {
    filesArr.push(T5007_Releve_5[0]);
  }
  if (retirementIncomes?.pensionRetirementAnnuityIncome) {
    filesArr.push(T4A_Releve_2_Releve_1[0]);
  }
  if (retirementIncomes?.statementOfDistribution) {
    filesArr.push(T4A_RCA[0]);
  }
  if (retirementIncomes?.registeredRetirementsavingsPlan) {
    filesArr.push(T4RSP_Releve_2[0]);
  }
  if (retirementIncomes?.registeredRetirementIncomeFund) {
    filesArr.push(T4RIF_Releve_2[0]);
  }
  if (retirementIncomes?.advancePayments) {
    filesArr.push(Releve_19[0]);
  }
  // Other incomes
  if (otherIncomes?.disabilityOrDeathBenefits) {
    if (otherIncomes?.registeredRetirementSavingsPlanIncome) {
      filesArr.push(T4A_Releve_2_Releve_1[0]);
    }
    if (otherIncomes?.canadaPensionPlanOrQuebecPensionPlanBenefits) {
      filesArr.push(T4A_P_Releve_2[0]);
    }
  }
  if (otherIncomes?.schoolIncome) {
    if (retirementIncomes?.pensionRetirementAnnuityIncome) {
      filesArr.push(T4A_Releve_2_Releve_1[0]);
    }
    if (otherIncomes?.registeredRetirementSavingsPlanIncome) {
      filesArr.push(T4RSP_Releve_2[0]);
    }
  }
  if (otherIncomes?.socialAssitance) {
    if (retirementIncomes?.welfareSeniorSupplement) {
      filesArr.push(T5007_Releve_5[0]);
    }
    if (retirementIncomes?.advancePayments) {
      filesArr.push(Releve_19[0]);
    }
  }
  if (otherIncomes?.advancePaymentsWorkingIncomeTaxBenefit) {
    if (otherIncomes?.advancePaymentsWorkingIncomeTaxBenefit) {
      filesArr.push(RC210[0]);
    }
    if (retirementIncomes?.advancePayments) {
      filesArr.push(Releve_19[0]);
    }
  }

    // Work incomes
    if (workIncomes?.employed && workIncomes?.workedLastYear) {
      if (workIncomes?.employmentIncome) {
        filesArr.push(T4_Releve_1[0]);
      }
      if (retirementIncomes?.pensionRetirementAnnuityIncome) {
        filesArr.push(T4A_Releve_2_Releve_1[0]);
      }
      if (retirementIncomes?.statementOfDistribution) {
        filesArr.push(T4A_RCA[0]);
      }
      if (workIncomes?.employmentProfitSharingPlan) {
        filesArr.push(T4PS_Releve_25[0]);
      }
      if (workIncomes?.pensionAdjustmentReversal) {
        filesArr.push(T10[0]);
      }
      if (workIncomes?.foreignIncomes) {
        filesArr.push(Foreign_income[0]);
      }
      if (workIncomes?.outsideCanadaIncome) {
        filesArr.push(Releve_17[0]);
      }
      if (workIncomes?.multiEmployerInsurancePlanIncome) {
        filesArr.push(Releve_22[0]);
      }
      if (workIncomes?.employmentInsuranceOrParentalBenefits) {
        if (workIncomes?.insuranceBenefits) {
          filesArr.push(T4E_Releve_6[0]);
        }
        if (retirementIncomes?.pensionRetirementAnnuityIncome) {
          filesArr.push(T4A_Releve_2_Releve_1[0]);
        }
      }
    } else if (workIncomes?.employed && !workIncomes?.workedLastYear) {
      if (workIncomes?.workerCompensationOrSocialAssistance) {
        if (retirementIncomes?.welfareSeniorSupplement) {
          filesArr.push(T5007_Releve_5[0]);
        }
      }
      if (workIncomes?.employmentInsuranceOrParentalBenefits) {
        if (workIncomes?.employmentInsuranceBenefits) {
          filesArr.push(T4E_Releve_6[0]);
        }
        if (retirementIncomes?.pensionRetirementAnnuityIncome) {
          filesArr.push(T4A_Releve_2_Releve_1[0]);
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
    return 'Non';
  }

  return 'Oui';
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
    [
      "Avez-vous retiré de l'argent de votre REER ou FERR ?",
      fromVal(taxDeductions?.RRSPorRRIFmoneyWithdrawn),
    ],
  ];
}
