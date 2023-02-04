import { Control } from 'react-hook-form';
import { TaxProfile } from './TaxProfile';

export interface TaxProfileFormProps {
  control: Control<TaxProfile>;
  formData: TaxProfile;
}