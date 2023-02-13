import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { CivilStatusForm } from './ProfileForms/CivilStatusForm';
import { PersonnalInformationsForm } from './ProfileForms/PersonnalInformationsForm';
import { CivilStatusChangeForm } from './ProfileForms/CivilStatusChangeForm';
import { TaxDeclarationReview } from './TaxDeclarationReview';
import { ContactDetailsForm } from './ProfileForms/ContactDetailsForm';
import { TaxDeclarationStep } from './types/TaxReport/TaxDeclarationStep';
import { DependentsForm } from './ProfileForms/DependentsForm';
import { TaxReportForm } from './TaxForms/TaxReportForm';
import { AppContext, AppContextType } from '../../../context/AppContext';
import { TaxDeclarationFileUpload } from './TaxDeclarationFileUpload';

const TAX_DECLARATION_STEP = 'step';
export function TaxReport() {
  const { firestore, user } = useContext(AppContext) as AppContextType;

  const query = useQuery();

  function renderTaxReportStep(step: string) {
    switch (step) {
      case TaxDeclarationStep.CIVIL_STATUS:
        return (
          <CivilStatusForm firestore={firestore} user={user}></CivilStatusForm>
        );
      case TaxDeclarationStep.PERSONAL_INFORMATIONS:
        return <PersonnalInformationsForm></PersonnalInformationsForm>;
      case TaxDeclarationStep.CIVIL_STATUS_CHANGE:
        return <CivilStatusChangeForm></CivilStatusChangeForm>;
      case TaxDeclarationStep.CONTACT_DETAILS:
        return <ContactDetailsForm></ContactDetailsForm>;
      case TaxDeclarationStep.DEPENDENTS:
        return <DependentsForm></DependentsForm>;
      case TaxDeclarationStep.TAX_PROFILE:
        return <TaxReportForm></TaxReportForm>;
      case TaxDeclarationStep.UPLOAD_FILES:
          return <TaxDeclarationFileUpload></TaxDeclarationFileUpload>
      case TaxDeclarationStep.REVIEW:
        return <TaxDeclarationReview></TaxDeclarationReview>;
      default:
        return (
          <CivilStatusForm firestore={firestore} user={user}></CivilStatusForm>
        );
    }
  }

  return (
    <div className="flex justify-center p-16 bg-orange-50 min-h-screen">
      <div className="w-[800px] bg-white rounded-lg p-8 h-fit">
        {renderTaxReportStep(query.get(TAX_DECLARATION_STEP))}
      </div>
    </div>
  );
}

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
