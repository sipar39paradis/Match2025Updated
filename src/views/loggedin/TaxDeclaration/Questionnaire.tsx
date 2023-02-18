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
import { TaxDeclarationFileUpload } from './TaxDeclarationFileUpload';
import { AppContext, AppContextType } from '../../../context/AppContext';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { Respondent } from './types/Respondent/Respondent';
import { useForm } from 'react-hook-form';

export const TAX_DECLARATION_STEP = 'step';
const TAX_REPORT_COLLECTION = 'taxReport';
const YEAR_SUB_COLLECTION = 'year';

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
  } = useForm<Respondent>();
  const currentYear = new Date().getFullYear();
  let formData = watch();

  function resetForm() {
    const defaultValues = {
      civilStatus: null,
      personalInformations: null,
      contactDetails: null,
      civilStatusChange: null,
      dependents: null,
      taxReport: null,
    };
    reset({ ...defaultValues });
  }

  useEffect(() => {
    async function fetchUserAnswers() {
      const docSnap = await getDoc(
        doc(
          firestore,
          TAX_REPORT_COLLECTION,
          user.uid,
          YEAR_SUB_COLLECTION,
          currentYear.toString()
        )
      );
      if (docSnap.exists()) {
        formData = docSnap.data() as Respondent;
        reset({
          civilStatus: formData?.civilStatus || null,
          personalInformations: formData?.personalInformations || null,
          contactDetails: formData?.contactDetails || null,
          civilStatusChange: formData?.civilStatusChange || null,
          dependents: formData?.dependents || null,
          taxReport: formData?.taxReport || null,
        });
        console.log('fetch', formData);
      }
    }

    if (user) {
      console.log(user);
      fetchUserAnswers();
    }
  }, [user]);

  async function saveFormAnswers() {
    const taxReports = {
      questionnaires: [formData],
      step: query.get(TAX_DECLARATION_STEP),
    };
    console.log('save', taxReports);

    await setDoc(
      doc(
        firestore,
        TAX_REPORT_COLLECTION,
        user.uid,
        YEAR_SUB_COLLECTION,
        currentYear.toString()
      ),
      taxReports
    );
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
            url={query}
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
            resetForm={resetForm}
          ></DependentsForm>
        );
      case TaxDeclarationStep.TAX_PROFILE:
        return (
          <TaxReportForm
            register={register}
            control={control}
            formData={formData}
          ></TaxReportForm>
        );
      case TaxDeclarationStep.UPLOAD_FILES:
        return <TaxDeclarationFileUpload />;
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
