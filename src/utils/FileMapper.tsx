import { TaxReport } from '../views/loggedin/TaxDeclaration/types/TaxReport/TaxReport';
import { jsPDF } from 'jspdf'
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
        addToDoc(doc, innerArray[0], fromVal(innerArray[1]), currentIndex)
      });
    }
    doc.addPage();
  }

const fileMapping = {
    'T5': 'Revenus de placements',
    'T3': 'État des revenus de fiducie (répartitions et attributions)',
    'T5008': 'Opérations sur titres',
    'T5013': 'Revenus d\'une société de personnes',
    'T101': 'Frais d\'exploration et d\'actions accréditives',
    'Relevé 7': 'Placements dans un regime d\'investissement',
    'Relevé 10': 'Crédit d\'impôt relatif à un fonds de travailleurs',
    'Relevé 26': 'Capital régional et coopératif Desjardins',
    'T4A(OAS)': 'Securite de la vieillesse',
    'T4A(P)': ' Prestations du Régime de pensions du Canada ou du Régime de rentes du Québec',
    'T5007': 'Prestations d\'assistance sociale ou de la CAT, supplément pour personnes âgées',
    'T4A': 'Pension, retraite, rente et autres revenus',
    'Relevé 2': 'Pension, retraite, rente et autres revenus',
    'Relevé 1': 'Pension, retraite, rente et autres revenus',
    'T4A-RCA': 'État des montants distribués d\'une convention de retraite',
    'T4RSP': 'Revenus d\'un régime enregistré d\'épargne-retraite',
    'T4RIF': 'Fonds enregistré de revenu de retraite',

}

export default function mapFiles(taxReport: TaxReport): Array<string>{
    const filesArr = []
    
    const investmentIncomes = taxReport?.investmentIncomes;
    const studentExpenses = taxReport?.studentExpenses;
    const retirementIncomes = taxReport?.retirementIncomes;
    const selfEmploymentRentalOtherIncomes = taxReport?.selfEmploymentRentalOtherIncomes;
    const workIncomes = taxReport?.workIncomes;

    const taxDeductions = taxReport?.taxDeductions;

    // investment income
    if(investmentIncomes?.reportedInvestmentIncome){
        if(investmentIncomes?.declaredInvestmentIncome){
            filesArr.push('T5_Relevé 3')
        }

        if(investmentIncomes?.trustIncome){
            filesArr.push('T3_Relevé 16')
        }

        if(investmentIncomes?.securityTransactions){
            filesArr.push('T5008_Relevé 18')
        }

        if(investmentIncomes?.partnershipIncomes){
            filesArr.push('T5013_Relevé 15')
        }
        
        if(investmentIncomes?.explorationAndShareExpenses){
            filesArr.push('T101_Relevé 11')
        }

        if(investmentIncomes?.investmentPlanIncome){
            filesArr.push('Relevé 7')
        }

        if(taxDeductions?.labourSponsoredFundTaxCredits){
            filesArr.push('Relevé 10')
        }

        if(investmentIncomes?.desjardins){
            filesArr.push('Relevé 26')
        }

        if(investmentIncomes?.foreignIncomes){
            filesArr.push('Foreign Income')
        }
    }
    // Student expenses
    if(studentExpenses?.tuitionFees){
        filesArr.push('T2022_Relevé_8_TL11')
    }

    // Retirement Incomes
    if(retirementIncomes?.oldAgeSecurity){
        filesArr.push('T4A(OAS)')
    }
    if(retirementIncomes?.canadaPensionPlanOrQuebecPensionPlanBenefits){
        filesArr.push('T4A(P)_Relevé 2')
    }
    if(retirementIncomes?.welfareSeniorSupplement){
        filesArr.push('T5007_Relevé 5')
    }
    if(retirementIncomes?.pensionRetirementAnnuityIncome){
        filesArr.push('T4A_Relevé 2_Relevé 1')
    }
    if(retirementIncomes?.statementOfDistribution){
        filesArr.push('T4A-RCA')
    }
    if(retirementIncomes?.registeredRetirementsavingsPlan){
        filesArr.push('T4RSP_Relevé 2')
    }
    if(retirementIncomes?.registeredRetirementIncomeFund){
        filesArr.push('T4RIF_Relevé 2')
    }
    if(retirementIncomes?.advancePayments){
        filesArr.push('Relevé 19')
    }

    // Self Employment
    if(selfEmploymentRentalOtherIncomes?.disabilityOrDeathBenefits){
        if(selfEmploymentRentalOtherIncomes?.registeredRetirementSavingsPlanIncome){
            filesArr.push('T4A_Relevé 2_Relevé 1')
        }
        if(selfEmploymentRentalOtherIncomes?.canadaPensionPlanOrQuebecPensionPlanBenefits){
            filesArr.push('T4A(P)_Relevé 2')
        }
    }
    if(selfEmploymentRentalOtherIncomes?.schoolIncome){
        if(retirementIncomes?.pensionRetirementAnnuityIncome){
            filesArr.push('T4A_Relevé 2_Relevé 1')
        }
        if(selfEmploymentRentalOtherIncomes?.registeredRetirementSavingsPlanIncome){
            filesArr.push('T4RSP_Relevé 2')
        }
    }
    if(selfEmploymentRentalOtherIncomes?.socialAssitance){
        if(retirementIncomes?.welfareSeniorSupplement){
            filesArr.push('T5007_Relevé 5')
        }
        if(retirementIncomes?.advancePayments){
            filesArr.push('Relevé 19')
        }
    }
    if(selfEmploymentRentalOtherIncomes?.advancePaymentsWorkingIncomeTaxBenefit){
        if(selfEmploymentRentalOtherIncomes.advancePaymentsWorkingIncomeTaxBenefit){
            filesArr.push('RC210')
        }
        if(retirementIncomes?.advancePayments){
            filesArr.push('Relevé 19')
        }
    }
    
    // Work incomes
    if(workIncomes?.employed && workIncomes?.workedLastYear){
        if(workIncomes?.employmentIncome){
            filesArr.push('T4_Relevé 1')
        }
        if(retirementIncomes?.pensionRetirementAnnuityIncome){
            filesArr.push('T4A_Relevé 2_Relevé 1')
        }
        if(retirementIncomes?.statementOfDistribution){
            filesArr.push('T4A-RCA')
        }
        if(workIncomes?.employmentProfitSharingPlan){
            filesArr.push('T4PS_Relevé 25')
        }
        if(workIncomes?.pensionAdjustmentReversal){
            filesArr.push('T10')
        }
        if(workIncomes?.foreignIncomes){
            filesArr.push('Foreign_income')
        }
        if(workIncomes?.outsideCanadaIncome){
            filesArr.push('Relevé 17')
        }
        if(workIncomes?.multiEmployerInsurancePlanIncome){
            filesArr.push('Relevé 22')
        }
        
        if(workIncomes?.employmentInsuranceOrParentalBenefits){
            if(workIncomes?.insuranceBenefits){
                filesArr.push('T4E_Relevé 6')
            }
            if(retirementIncomes?.pensionRetirementAnnuityIncome){
                filesArr.push('T4A_Relevé 2_Relevé 1')
            }
        }
    }else if(workIncomes?.employed && !workIncomes?.workedLastYear){
        if(workIncomes?.workerCompensationOrSocialAssistance){
            if(retirementIncomes?.welfareSeniorSupplement){
                filesArr.push('T5007_Relevé 5')
            }
        }
        if(workIncomes?.employmentInsuranceOrParentalBenefits){
            if(workIncomes?.employmentInsuranceBenefits){
                filesArr.push('T4E_Relevé 6')
            }
            if(retirementIncomes?.pensionRetirementAnnuityIncome){
                filesArr.push('T4A_Relevé 2_Relevé 1')
            }        }
    }


    return filesArr;
}

export function getPDFTaxReport(taxReport: TaxReport,
     personalInformation: PersonalInformations){
    console.log(personalInformation?.email)
    const doc = new jsPDF();
    doc.setFontSize(25);
    doc.text(`Rapport d'impots pour ${personalInformation?.firstName} ${personalInformation?.lastName}`, 10, 10)
    const x = 15;
    const y = 30;
    generatePDFContent(taxReport, getWorkIncomesText, doc, x, y, 'Revenus de travail');
    generatePDFContent(taxReport, getBoughtHomeText, doc, x, y, 'Achat d\'une maison');
    generatePDFContent(taxReport, getLossesText, doc, x, y, 'Pertes');
    generatePDFContent(taxReport, getOtherDeductionsText, doc, x, y, 'Autres déductions');
    generatePDFContent(taxReport, getDonationsText, doc, x, y, 'Dons');
    generatePDFContent(taxReport, getRetirementIncomesText, doc, x, y, 'Revenus de retraite');
    generatePDFContent(taxReport, getSelfEmploymentRentalOtherIncomesText, doc, x, y, 'Revenus de travail autonome, locatifs et autres');
    generatePDFContent(taxReport, getSelfEmployedIncomesText, doc, x, y, 'Revenus de travail autonome');
    generatePDFContent(taxReport, getStudentExpensesText, doc, x, y, 'Dépenses d\'études');
    generatePDFContent(taxReport, getInvestmentIncomesText, doc, x, y, 'Revenus de placements');
    generatePDFContent(taxReport, getTaxDeductionsText, doc, x, y, 'Déductions fiscales');
    return doc.output('arraybuffer');
}



function addToDoc(doc: jsPDF, text: string, value:any , yAxis: number){
    const width = doc.getTextWidth(text);
    doc.text(`${text}:`, 10, yAxis )
    doc.setFont('helvetica', 'bold')
    doc.text(`${fromVal(value)}`, width + 15, yAxis)
    doc.setFont('helvetica', 'normal');
}

function fromVal(givenVal: any){
    if(givenVal != undefined || givenVal == true){
        return 'Non';
    }

    return 'Oui';
}


function getWorkIncomesText(taxReport: TaxReport): Array<TextData> {
    const workIncomes = taxReport?.workIncomes;
    return [  ['A travaillé l\'an dernier', fromVal(workIncomes?.workedLastYear)],
    ['Employé', fromVal(workIncomes?.employed)],
    ['Revenu d\'emploi', fromVal(workIncomes?.employmentIncome)],
    ['Plan de participation aux bénéfices lié à l\'emploi', fromVal(workIncomes?.employmentProfitSharingPlan)],
    ['Régularisation des droits à pension', fromVal(workIncomes?.pensionAdjustmentReversal)],
    ['Revenus étrangers', fromVal(workIncomes?.foreignIncomes)],
    ['Revenus à l\'extérieur du Canada', fromVal(workIncomes?.outsideCanadaIncome)],
    ['Revenus d\'un régime d\'assurance multi-employeurs', fromVal(workIncomes?.multiEmployerInsurancePlanIncome)],
    ['Indemnités de travailleur ou d\'assistance sociale', fromVal(workIncomes?.workerCompensationOrSocialAssistance)],
    ['Prestations d\'assurance-emploi', fromVal(workIncomes?.employmentInsuranceBenefits)],
    ['Prestations d\'assurance-emploi ou parentales', fromVal(workIncomes?.employmentInsuranceOrParentalBenefits)],
    ['Paiement rétroactif (T1198)', fromVal(workIncomes?.formT1198RetroactivePayment)],
    ['Plan de remplacement du revenu de travail', fromVal(workIncomes?.wageLossReplacementPlan)],
    ['Frais de travail liés à l\'emploi', fromVal(workIncomes?.jobRelatedExpenses)],
    ['Remboursement d\'impôt', fromVal(workIncomes?.taxRefund)],
    ['Repas et hébergement', fromVal(workIncomes?.mealsAndAccomodation)],
    ['Syndicats ou cotisations professionnelles', fromVal(workIncomes?.unionsOrProfessionalDues)],
    ['Frais de travail à distance', fromVal(workIncomes?.remoteWorkExpenses)],
    ['Pourboires ou travail occasionnel', fromVal(workIncomes?.tipsOrCasualWork)],
    ['Prestations d\'assurance', fromVal(workIncomes?.insuranceBenefits)]
  ];

}

function getBoughtHomeText(taxReport: TaxReport): Array<TextData> {
    const boughtHome = taxReport?.boughHome;
        return [  ['Acheté une maison', fromVal(boughtHome?.boughHome)],
    ['Acheter une maison l\'an dernier', fromVal(boughtHome?.boughtHomeLastYear)],
    ['Maison différente', fromVal(boughtHome?.differentHome)],
    ['Acheter pour handicapé', fromVal(boughtHome?.boughtForDisabled)],
    ['Crédit d\'impôt pour l\'accessibilité domiciliaire', fromVal(boughtHome?.homeAccessibilityTaxCredit)],
    ]
}

function getLossesText(taxReport: TaxReport): Array<TextData> {
    const losses = taxReport?.losses;
    return [  ['Pertes', fromVal(losses?.losses)],
  ['Années précédentes perdues', fromVal(losses?.previousYearsLost)],
  ['Perte déductible d\'investissement commercial', fromVal(losses?.deductibleBusinessInvestmentLoss)],
  ['Pertes de travail ou d\'entreprise', fromVal(losses?.workOrBusinessLosses)],
  ['Pertes de biens personnels', fromVal(losses?.personnalPropertyLosees)],
  ['Pertes d\'actifs en capital', fromVal(losses?.capitalAssetsLosses)],
  ['Pertes de partenariat', fromVal(losses?.partnershipLosses)],
  ['Déduire les pertes des gains des années précédentes', fromVal(losses?.deductLossesFromPreviousYearGains)],
]
}

function getOtherDeductionsText(taxReport: TaxReport): Array<TextData> {
    const otherDeductions = taxReport?.otherDeductions;
    return [
        ['Cotisations syndicales ou professionnelles payées', fromVal(otherDeductions?.paidUnionOrProfessionalDues)],
        ['Pension alimentaire versée à un conjoint ou à un enfant', fromVal(otherDeductions?.paidSpousalOrChildSupport)],
        ['Impôts étrangers payés', fromVal(otherDeductions?.paidForeignTaxes)],
        ['Déduction pour résidents du Nord', fromVal(otherDeductions?.northernResidentsDeduction)],
        ['Autres déductions', fromVal(otherDeductions?.otherDeductions)]
      ];
}

function getDonationsText(taxReport: TaxReport): Array<TextData> {
    const donations = taxReport?.donations;
    return [  ['Faites-vous des dons ?', fromVal(donations?.donations)],
    ['Dons de bienfaisance', fromVal(donations?.charitableDonations)],
    ['Contributions politiques', fromVal(donations?.politicalContributions)]
  ]
}

function getRetirementIncomesText(taxReport: TaxReport): Array<TextData> {
    const retirementIncomes = taxReport?.retirementIncomes;
    return [    ['Avez-vous des revenus de retraite ?', fromVal(retirementIncomes?.retirementIncomes)],
      ['Sécurité de la vieillesse', fromVal(retirementIncomes?.oldAgeSecurity)],
      ['Régime de compensation pour la retraite', fromVal(retirementIncomes?.retirementCompensationArrangement)],
      ['Supplément de revenu garanti', fromVal(retirementIncomes?.welfareSeniorSupplement)],
      ['Pension ou rente de retraite', fromVal(retirementIncomes?.pensionRetirementAnnuityIncome)],
      ['Régime enregistré d\'épargne-retraite', fromVal(retirementIncomes?.registeredRetirementsavingsPlan)],
      ['Fonds enregistré de revenu de retraite', fromVal(retirementIncomes?.registeredRetirementIncomeFund)],
      ['Revenu étranger', fromVal(retirementIncomes?.foreignIncome)],
      ['Prestations du Régime de pensions du Canada ou du Régime de rentes du Québec', fromVal(retirementIncomes?.canadaPensionPlanOrQuebecPensionPlanBenefits)],
      ['Ajustement de crédit', fromVal(retirementIncomes?.creditAdjustment)],
      ['Fractionnement du revenu de pension', fromVal(retirementIncomes?.splitPensionIncome)],
      ['Paiements anticipés', fromVal(retirementIncomes?.advancePayments)],
      ['État de distribution', fromVal(retirementIncomes?.statementOfDistribution)]
    ];
  }

  function getSelfEmploymentRentalOtherIncomesText(taxReport: TaxReport): Array<TextData> {
    const selfEmploymentRentalOtherIncomes = taxReport?.selfEmploymentRentalOtherIncomes;
    return [
      ['Avez-vous des revenus de travailleur autonome?', fromVal(selfEmploymentRentalOtherIncomes?.selfEmployed)],
      ['Revenus de location de biens', fromVal(selfEmploymentRentalOtherIncomes?.rentalPropertyIncomes)],
      ['Programme d\'encouragement à l\'éducation permanente', fromVal(selfEmploymentRentalOtherIncomes?.continuingEducationIncentivePlan)],
      ['Revenus scolaires', fromVal(selfEmploymentRentalOtherIncomes?.schoolIncome)],
      ['Aide sociale', fromVal(selfEmploymentRentalOtherIncomes?.socialAssitance)],
      ['Supplément de revenu de la Sécurité de la vieillesse', fromVal(selfEmploymentRentalOtherIncomes?.welfareSeniorSupplement)],
      ['Prestations d\'invalidité ou de décès', fromVal(selfEmploymentRentalOtherIncomes?.disabilityOrDeathBenefits)],
      ['Paiements de soutien pour conjoint ou enfants', fromVal(selfEmploymentRentalOtherIncomes?.spousalOrChildSupportPayments)],
      ['Paiements anticipés du revenu de travail et de la prestation fiscale pour le revenu de travail', fromVal(selfEmploymentRentalOtherIncomes?.advancePaymentsWorkingIncomeTaxBenefitIncome)],
      ['Paiements anticipés de la prestation fiscale pour le revenu de travail', fromVal(selfEmploymentRentalOtherIncomes?.advancePaymentsWorkingIncomeTaxBenefit)],
      ['Cotisations à un REER de conjoint', fromVal(selfEmploymentRentalOtherIncomes?.spousalRRSP)],
      ['REER de conjoint', fromVal(selfEmploymentRentalOtherIncomes?.spousalRRIF)],
      ['Revenus d\'un REER ou d\'un FERR', fromVal(selfEmploymentRentalOtherIncomes?.RRSPorRRIFincome)],
      ['Déductions pour REER ou FERR', fromVal(selfEmploymentRentalOtherIncomes?.RRSPorRRIFdeductions)],
      ['Prestations du Régime de pensions du Canada ou du Régime des rentes du Québec', fromVal(selfEmploymentRentalOtherIncomes?.canadaPensionPlanOrQuebecPensionPlanBenefits)],
      ['Revenus d\'un REER', fromVal(selfEmploymentRentalOtherIncomes?.registeredRetirementSavingsPlanIncome)],
      ['Autres revenus', fromVal(selfEmploymentRentalOtherIncomes?.otherRevenues)]
    ]
  }

  function getSelfEmployedIncomesText(taxReport: TaxReport): Array<TextData> {
    const selfEmployed = taxReport?.selfEmploymentRentalOtherIncomes?.selfEmployed;
    return [
      ['Revenus d\'entreprise?', fromVal(selfEmployed?.selfEmployedIncomes)],
      ['Profession libérale?', fromVal(selfEmployed?.liberalProfession)],
      ['Commission?', fromVal(selfEmployed?.commission)],
      ['Autre?', fromVal(selfEmployed?.other)],
    ];
  }


function getStudentExpensesText(taxReport: TaxReport): Array<TextData> {
    const studentExpenses = taxReport?.studentExpenses;
    return [
      ['Dépenses d\'études?', fromVal(studentExpenses?.studentExpenses)],
      ['Frais de scolarité?', fromVal(studentExpenses?.tuitionFees)],
      ['Autres frais de scolarité?', fromVal(studentExpenses?.otherTuitionsFees)],
      ['Achats de meubles?', fromVal(studentExpenses?.boughtFurnitures)],
      ['Frais de scolarité de l\'année précédente?', fromVal(studentExpenses?.tuitionsFeesPreviousYear)],
      ['Bourse d\'études?', fromVal(studentExpenses?.scholarshipGrantBursary)],
      ['Prêt étudiant?', fromVal(studentExpenses?.studentLoan)],
      ['Revenus d\'un REEE?', fromVal(studentExpenses?.RESPincomes)],
      ['Revenus d\'un REER?', fromVal(studentExpenses?.RRSPincomes)],
    ];
  }


function getInvestmentIncomesText(taxReport: TaxReport): Array<TextData> {
  const investmentIncome = taxReport?.investmentIncomes;
  return [    ['Avez-vous des revenus de placement?', fromVal(investmentIncome?.investmentIncomes)],
    ['Revenus de placement déclarés?', fromVal(investmentIncome?.reportedInvestmentIncome)],
    ['Revenus de placement non déclarés?', fromVal(investmentIncome?.declaredInvestmentIncome)],
    ['Revenus de fiducie?', fromVal(investmentIncome?.trustIncome)],
    ['Transactions de titres?', fromVal(investmentIncome?.securityTransactions)],
    ['Exploration et partage des dépenses?', fromVal(investmentIncome?.explorationAndShareExpenses)],
    ['Revenus de plan de placement?', fromVal(investmentIncome?.investmentPlanIncome)],
    ['Desjardins?', fromVal(investmentIncome?.desjardins)],
    ['Revenus de partenariat non déclarés pour intérêts/dividendes?', fromVal(investmentIncome?.nonDeclaredInterestDividendPartnershipIncome)],
    ['Reçus d\'intérêts?', fromVal(investmentIncome?.interestSlip)],
    ['Reçus de dividendes?', fromVal(investmentIncome?.dividendSlip)],
    ['Revenus de partenariat?', fromVal(investmentIncome?.partnershipIncomes)],
    ['Achats d\'actifs?', fromVal(investmentIncome?.boughtAssets)],
    ['Ventes d\'actifs?', fromVal(investmentIncome?.soldAssets)],
    ['Ventes d\'actions?', fromVal(investmentIncome?.soldStocks)],
    ['Ventes de biens immobiliers?', fromVal(investmentIncome?.soldRealEstate)],
    ['Saisies hypothécaires?', fromVal(investmentIncome?.repossessedMortgage)],
    ['Ventes de biens personnels?', fromVal(investmentIncome?.soldGoodForPersonalUse)],
    ['Ventes de biens meubles spécifiques?', fromVal(investmentIncome?.soldSpecificMovableProperty)],
    ['Ventes d\'actions de petites entreprises admissibles?', fromVal(investmentIncome?.soldEligibleSmallBusinessShares)],
    ['Ventes de biens de ferme/pêche?', fromVal(investmentIncome?.soldFarmFishingProperty)],
    ['Ventes d\'obligations?', fromVal(investmentIncome?.soldBonds)],
    ['Cryptomonnaie?', fromVal(investmentIncome?.cryptoCurrency)],
    ['Ventes de cryptomonnaie?', fromVal(investmentIncome?.soldCrypto)],
    ['Achats de cryptomonnaie?', fromVal(investmentIncome?.boughtCrypto)],
    ['Revenus étrangers?', fromVal(investmentIncome?.foreignIncomes)],
    ['Frais financiers?', fromVal(investmentIncome?.financeCharges)],
    ['Intérêts déductibles?', fromVal(investmentIncome?.interestExpenses)],
    ['Réclamations de déduction?', fromVal(investmentIncome?.deductionClaim)],
    ['Pertes de placement cumulatives?', fromVal(investmentIncome?.cumulativeInvestmentLoss)],
  ];
}

function getTaxDeductionsText(taxReport: TaxReport): Array<TextData> {
    const taxDeductions = taxReport?.taxDeductions;
    return [
      ['Faites-vous des déductions fiscales ?', fromVal(taxDeductions?.taxDeductions)],
      ['Cotisation à un régime de pension agréé', fromVal(taxDeductions?.pensionPLan)],
      ['Contribution REER', fromVal(taxDeductions?.RRSPcontributions)],
      ['REER/SCEE non utilisés rapportés', fromVal(taxDeductions?.reportedButUnusedRRSPorSPP)],
      ['REER non déclarés', fromVal(taxDeductions?.unreportedRRSP)],
      ['Reportez-vous la déduction REER ?', fromVal(taxDeductions?.deferRRSP)],
      ['Régime volontaire d\'épargne-retraite de l\'employeur', fromVal(taxDeductions?.employerPRPP)],
      ['Contribution régime de pension', fromVal(taxDeductions?.contributionRPP)],
      ['Remboursement REER pour achat d\'une propriété', fromVal(taxDeductions?.refundLLP)],
      ['Remboursement REER pour construction/rénovation', fromVal(taxDeductions?.refundHOP)],
      ['Remboursement REER ou RAP/ARR', fromVal(taxDeductions?.LLPorHBP)],
      ['Avez-vous remboursé un RAP/ARR en 2021 ou janvier 2022 ?', fromVal(taxDeductions?.LLPorHBPrepayment)],
      ['Reçu T4 pour REER', fromVal(taxDeductions?.T4RSP)],
      ['Reçu T4 pour FERR', fromVal(taxDeductions?.T4RIF)],
      ['Crédit d\'impôt pour fonds de travailleurs', fromVal(taxDeductions?.labourSponsoredFundTaxCredits)],
      ['Régime de pension étranger', fromVal(taxDeductions?.foreignPensionPlan)],
      ['Avez-vous retiré de l\'argent de votre REER ou FERR ?', fromVal(taxDeductions?.RRSPorRRIFmoneyWithdrawn)]
    ];
  }
