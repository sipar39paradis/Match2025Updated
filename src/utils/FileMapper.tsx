import { TaxReport } from '../views/loggedin/TaxDeclaration/types/TaxReport/TaxReport';

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