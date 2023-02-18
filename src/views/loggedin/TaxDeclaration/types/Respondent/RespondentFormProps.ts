import { Control, UseFormHandleSubmit, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { Respondent } from './Respondent';

export interface RespondentFormProps {
  control?: Control<Respondent>;
  formData?: Respondent;
  register: UseFormRegister<Respondent>
  handleSubmit?: UseFormHandleSubmit<Respondent>
  saveFormAnswers?: () => void
  setValue?: UseFormSetValue<Respondent>
  resetForm?: () => void
}