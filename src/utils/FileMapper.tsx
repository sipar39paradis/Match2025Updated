import { TaxReport } from '../views/loggedin/TaxDeclaration/types/TaxReport/TaxReport';

const fileMapping = {
    'T5': 'Revenus de placements',
    'T3': 'État des revenus de fiducie (répartitions et attributions)',
    'T5008': 'Opérations sur titres',
    'T5013': 'Revenus d&apos;une société de personnes',
    'T101': 'Frais d&apos;exploration et d&apos;actions accréditives'
}

export default function mapFiles(taxReport: TaxReport): Array<string>{
    const filesArr = []
    const investmentIncomes = taxReport?.investmentIncomes;
    const taxDeductions = taxReport?.taxDeductions;

    if(investmentIncomes?.declaredInvestmentIncome){
        filesArr.push('T5_Releve 3')
    }

    if(investmentIncomes?.trustIncome){
        filesArr.push('T3_Releve 16')
    }

    if(investmentIncomes?.securityTransactions){
        filesArr.push('T5008_Releve 18')
    }

    if(investmentIncomes?.partnershipIncomes){
        filesArr.push('T5013_Releve 15')
    }
    
    if(investmentIncomes?.explorationAndShareExpenses){
        filesArr.push('T101_releve 11')
    }

    if(investmentIncomes?.investmentPlanIncome){
        filesArr.push('Releve 7')
    }

    if(taxDeductions?.labourSponsoredFundTaxCredits){
        filesArr.push('Releve 10')
    }

    if(investmentIncomes?.desjardins){
        filesArr.push('Releve 26')
    }

    return filesArr;
}