import React from 'react';
import { useLocation } from 'react-router-dom';
import { CivilStatusForm } from './ProfileForms/CivilStatusForm';
import { PersonnalInformationsForm } from './ProfileForms/PersonnalInformationsForm';
import { CivilStatusChangeForm } from './ProfileForms/CivilStatusChangeForm';
import { TaxDeclarationReview } from './TaxDeclarationReview';
import { ContactDetailsForm } from './ProfileForms/ContactDetailsForm';
import { TaxDeclarationStep } from './types/TaxDeclarationStep';
import { DependentsForm } from './ProfileForms/DependentsForm';
import { TaxProfile } from './TaxForms/TaxProfile';

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
        return <TaxProfile></TaxProfile>;
      case TaxDeclarationStep.REVIEW:
        return <TaxDeclarationReview></TaxDeclarationReview>;
      default:
        return <CivilStatusForm></CivilStatusForm>;
    }
  }

  return (
    <div className="flex justify-center sm:pt-36 lg:pb-[120px]">
      <div className=" w-[1080px]">
        {renderTaxDeclarationStep(query.get(TAX_DECLARATION_STEP))}
      </div>
    </div>
  );
}

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
