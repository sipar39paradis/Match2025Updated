import React from 'react';
import { useLocation } from 'react-router-dom';
import { CivilStatusForm } from './ProfileForms/CivilStatusForm';
import { PersonnalInformationsForm } from './ProfileForms/PersonnalInformationsForm';
import { CivilStatusChangeForm } from './ProfileForms/CivilStatusChangeForm';
import { TaxDeclarationReview } from './TaxDeclarationReview';
import { ContactDetailsForm } from './ProfileForms/ContactDetailsForm';
import { TaxDeclarationStep } from './types/TaxReport/TaxDeclarationStep';
import { DependentsForm } from './ProfileForms/DependentsForm';
import { TaxReportForm } from './TaxForms/TaxReportForm';

const TAX_DECLARATION_STEP = 'step';
export function TaxDeclaration() {
  const query = useQuery();

  function renderTaxDeclarationStep(step: string) {
    switch (step) {
      case TaxDeclarationStep.CIVIL_STATUS:
        return <CivilStatusForm></CivilStatusForm>;
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
      case TaxDeclarationStep.REVIEW:
        return <TaxDeclarationReview></TaxDeclarationReview>;
      default:
        return <CivilStatusForm></CivilStatusForm>;
    }
  }

  return (
    <div className="flex justify-center p-36 bg-orange-50 min-h-screen">
      <div className="w-[800px] bg-white rounded-lg p-8 h-fit">
        {renderTaxDeclarationStep(query.get(TAX_DECLARATION_STEP))}
      </div>
    </div>
  );
}

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
