import { Control, UseFormHandleSubmit, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { URLSearchParamsInit, NavigateOptions } from 'react-router-dom';
import { Respondent } from './Respondent';

export interface RespondentFormProps {
  control?: Control<Respondent>;
  formData?: Respondent;
  register: UseFormRegister<Respondent>
  handleSubmit?: UseFormHandleSubmit<Respondent>
  saveFormAnswers?: () => void
  setValue?: UseFormSetValue<Respondent>
  resetForm?: () => void
  setSearchParams?: (nextInit?: URLSearchParamsInit | ((prev: URLSearchParams) => URLSearchParamsInit), navigateOpts?: NavigateOptions) => void
  addQuestionnaire?: (mainClient: boolean) => void
}