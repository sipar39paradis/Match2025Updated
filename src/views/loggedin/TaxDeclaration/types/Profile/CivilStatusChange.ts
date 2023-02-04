import { DateRangeType } from 'react-tailwindcss-datepicker/dist/types'
import { CivilStatusEnum } from './CivilStatusEnum'

export interface CivilStatusChange {
civiStatusChange: boolean
lastYearCivilStatus: CivilStatusEnum
civilStatusChangeDate: DateRangeType
civilStatusChangeToSingleDate: DateRangeType
socialAssistanceBenefitsAmount: number 
}