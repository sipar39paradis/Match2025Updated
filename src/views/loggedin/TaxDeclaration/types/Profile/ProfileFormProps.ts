import { Control, UseFormHandleSubmit, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { Profile } from './Profile';

export interface ProfileFormProps {
  control?: Control<Profile>;
  formData?: Profile;
  register: UseFormRegister<Profile>
  handleSubmit?: UseFormHandleSubmit<Profile>
  saveFormAnswers?: () => void
  setValue?: UseFormSetValue<Profile>
}