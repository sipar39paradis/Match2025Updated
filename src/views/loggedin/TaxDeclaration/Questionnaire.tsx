import React, { useContext, useEffect } from 'react';
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
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { Profile } from './types/Profile/Profile';
import { useForm } from 'react-hook-form';

const TAX_DECLARATION_STEP = 'step';
const PROFILE_TABLE = 'profile';

export function Questionnaire() {
  const { firestore, user } = useContext(AppContext) as AppContextType;
  const query = useQuery();
  const {
    register,
    handleSubmit,
    formState: {},
    watch,
    control,
    setValue,
    reset,
  } = useForm<Profile>();
  let formData = watch();

  useEffect(() => {
    const defaultValues = {
      civilStatus: null,
      personalInformations: null,
      contactDetails: null,
      civilStatusChange: null,
      dependents: null,
    };
    reset({ ...defaultValues });
  }, []);

  useEffect(() => {
    async function fetchUserAnswers() {
      const docSnap = await getDoc(doc(firestore, PROFILE_TABLE, user.uid));
      if (docSnap.exists()) {
        formData = docSnap.data() as Profile;
        if (formData.civilStatus) setValue('civilStatus', formData.civilStatus);
        if (formData.personalInformations)
          setValue('personalInformations', formData.personalInformations);
        if (formData.contactDetails)
          setValue('contactDetails', formData.contactDetails);
        if (formData.civilStatusChange)
          setValue('civilStatusChange', formData.civilStatusChange);
        if (formData.dependents) setValue('dependents', formData.dependents);
        console.log(formData);
      }
    }
    if (user) {
      fetchUserAnswers();
    }
  }, [user]);

  async function saveFormAnswers() {
    console.log(formData);
    await setDoc(doc(firestore, 'profile', user.uid), formData);
  }

  function renderTaxReportStep(step: string) {
    switch (step) {
      case TaxDeclarationStep.CIVIL_STATUS:
        return (
          <CivilStatusForm
            register={register}
            control={control}
            formData={formData}
            handleSubmit={handleSubmit}
            saveFormAnswers={saveFormAnswers}
          ></CivilStatusForm>
        );
      case TaxDeclarationStep.PERSONAL_INFORMATIONS:
        return (
          <PersonnalInformationsForm
            register={register}
            control={control}
            formData={formData}
            handleSubmit={handleSubmit}
            saveFormAnswers={saveFormAnswers}
            setValue={setValue}
          ></PersonnalInformationsForm>
        );
      case TaxDeclarationStep.CIVIL_STATUS_CHANGE:
        return (
          <CivilStatusChangeForm
            register={register}
            control={control}
            formData={formData}
            handleSubmit={handleSubmit}
            saveFormAnswers={saveFormAnswers}
          ></CivilStatusChangeForm>
        );
      case TaxDeclarationStep.CONTACT_DETAILS:
        return (
          <ContactDetailsForm
            register={register}
            control={control}
            formData={formData}
            handleSubmit={handleSubmit}
            saveFormAnswers={saveFormAnswers}
            setValue={setValue}
          ></ContactDetailsForm>
        );
      case TaxDeclarationStep.DEPENDENTS:
        return (
          <DependentsForm
            register={register}
            control={control}
            formData={formData}
            handleSubmit={handleSubmit}
            saveFormAnswers={saveFormAnswers}
          ></DependentsForm>
        );
      case TaxDeclarationStep.TAX_PROFILE:
        return (
          <TaxReportForm firestore={firestore} user={user}></TaxReportForm>
        );
      case TaxDeclarationStep.REVIEW:
        return <TaxDeclarationReview></TaxDeclarationReview>;
      default:
        return (
          <CivilStatusForm
            register={register}
            control={control}
            formData={formData}
            handleSubmit={handleSubmit}
          ></CivilStatusForm>
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
