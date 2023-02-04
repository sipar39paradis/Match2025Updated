import { Control, UseFormRegister } from 'react-hook-form';
import { TaxReport } from './TaxReport';

export interface TaxProfileFormProps {
  control?: Control<TaxReport>;
  formData?: TaxReport;
  register: UseFormRegister<TaxReport>
}