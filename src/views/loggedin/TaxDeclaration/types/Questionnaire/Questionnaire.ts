import { TaxReport } from '../TaxReport/TaxReport';
import { CivilStatus } from './CivilStatus';
import { CivilStatusChange } from './CivilStatusChange';
import { ContactDetails } from './ContactDetails';
import { Dependent } from './Dependent';
import { PersonalInformations } from './PersonnalInformations';

export interface Questionnaire {
  clientType: ClientTypeEnum
  year: number
  state: QuestionnaireStateEnum
  civilStatus?: CivilStatus
  personalInformations: PersonalInformations
  contactDetails: ContactDetails
  civilStatusChange?: CivilStatusChange
  haveDependents: boolean
  parent?: string 
  dependents?: Dependent []
  taxReport: TaxReport
}

export enum QuestionnaireStateEnum {
  NEW = 'new',
  IN_PROGRESS = 'inProgress',
  COMPLETED = 'completed'
}

export enum ClientTypeEnum {
  MAIN_CLIENT = 'mainClient',
  PARTNER = 'partner',
  DEPENDENT = 'dependent'
}