import { TaxReport } from '../TaxReport/TaxReport';
import { CivilStatus } from './CivilStatus';
import { CivilStatusChange } from './CivilStatusChange';
import { ContactDetails } from './ContactDetails';
import { Dependent } from './Dependent';
import { PersonalInformations } from './PersonnalInformations';

export interface Respondent {
  id: string
  mainClient: boolean
  year: number
  civilStatus?: CivilStatus
  personalInformations: PersonalInformations
  contactDetails: ContactDetails
  civilStatusChange?: CivilStatusChange
  dependents?: Dependent
  taxReport: TaxReport
}