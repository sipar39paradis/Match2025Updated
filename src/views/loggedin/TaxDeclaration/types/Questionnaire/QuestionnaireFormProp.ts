import { User } from 'firebase/auth';
import { Control, UseFormHandleSubmit, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { URLSearchParamsInit, NavigateOptions } from 'react-router-dom';
import { TaxDeclarationStep } from '../TaxReport/TaxDeclarationStep';
import { ClientTypeEnum, Questionnaire } from './Questionnaire';

export interface RespondentFormProps {
  control?: Control<Questionnaire>;
  formData?: Questionnaire;
  register?: UseFormRegister<Questionnaire>
  handleSubmit?: UseFormHandleSubmit<Questionnaire>
  saveFormAnswers?: () => void
  setValue?: UseFormSetValue<Questionnaire>
  resetForm?: () => void
  setSearchParams?: (nextInit?: URLSearchParamsInit | ((prev: URLSearchParams) => URLSearchParamsInit), navigateOpts?: NavigateOptions) => void
  addQuestionnaire?: (clientType: ClientTypeEnum, questionnaire: Questionnaire, stepToRedirect?: TaxDeclarationStep) => void
  questionnaires?: Map<string, Questionnaire>
  user?: User;
}