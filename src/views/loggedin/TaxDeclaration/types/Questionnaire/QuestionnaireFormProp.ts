import { Control, UseFormHandleSubmit, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { URLSearchParamsInit, NavigateOptions } from 'react-router-dom';
import { CivilStatus } from './CivilStatus';
import { ContactDetails } from './ContactDetails';
import { Questionnaire } from './Questionnaire';

export interface RespondentFormProps {
  control?: Control<Questionnaire>;
  formData?: Questionnaire;
  register?: UseFormRegister<Questionnaire>
  handleSubmit?: UseFormHandleSubmit<Questionnaire>
  saveFormAnswers?: () => void
  setValue?: UseFormSetValue<Questionnaire>
  resetForm?: () => void
  setSearchParams?: (nextInit?: URLSearchParamsInit | ((prev: URLSearchParams) => URLSearchParamsInit), navigateOpts?: NavigateOptions) => void
  addQuestionnaire?: (mainClient: boolean, civilStatus?: CivilStatus, contactDetails?: ContactDetails) => void
  questionnaires?: Map<string, Questionnaire>
}