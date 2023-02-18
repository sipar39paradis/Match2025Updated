import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
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
import {
  getDoc,
  doc,
  setDoc,
  addDoc,
  collection,
  getDocs,
} from 'firebase/firestore';
import { Respondent } from './types/Respondent/Respondent';
import { useForm } from 'react-hook-form';

export const TAX_DECLARATION_STEP = 'step';
const TAX_REPORT_COLLECTION = 'taxReport';
const QUESTIONNAIRE_SUB_COLLECTTION = 'questionnaires';

export function Questionnaire() {
  const { firestore, user } = useContext(AppContext) as AppContextType;
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: {},
    watch,
    control,
    setValue,
    reset,
  } = useForm<Respondent>();
  let formData = watch();
  const [questionnaires, setQuestionnaires] = useState<Map<string, Respondent>>(
    new Map()
  );

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
          QUESTIONNAIRE_SUB_COLLECTTION,
          id
        )
      );
      if (docSnap.exists()) {
        formData = docSnap.data() as Respondent;
        reset({
          mainClient: formData?.mainClient || null,
          year: formData?.year || null,
          civilStatus: formData?.civilStatus || null,
          personalInformations: formData?.personalInformations || null,
          contactDetails: formData?.contactDetails || null,
          civilStatusChange: formData?.civilStatusChange || null,
          dependents: formData?.dependents || null,
          taxReport: formData?.taxReport || null,
        });
        console.log('fetch', formData);

        const querySnapshot = await getDocs(
          collection(
            firestore,
            TAX_REPORT_COLLECTION,
            user.uid,
            QUESTIONNAIRE_SUB_COLLECTTION
          )
        );
        const map = new Map();
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          map.set(doc.id, doc.data());
        });
        setQuestionnaires(map);
        console.log(questionnaires);
      }
    }
    console.log('search params change');
    if (user && id) {
      fetchUserAnswers();
    } else if (!id) {
      addQuestionnaire();
    }
  }, [user, id]);

  async function addQuestionnaire(mainClient = true) {
    console.log('new');
    await addDoc(
      collection(firestore, 'taxReport', user.uid, 'questionnaires'),
      { mainClient, year: new Date().getFullYear() }
    ).then((docRef) => {
      navigate(
        `/platform/questionnaire/${docRef.id}?step=${TaxDeclarationStep.PERSONAL_INFORMATIONS}`
      );
    });
  }

  async function saveFormAnswers() {
    console.log('save', formData);
    await setDoc(
      doc(
        firestore,
        TAX_REPORT_COLLECTION,
        user.uid,
        QUESTIONNAIRE_SUB_COLLECTTION,
        id
      ),
      formData,
      {
        merge: true,
      }
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
            setSearchParams={setSearchParams}
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
            setSearchParams={setSearchParams}
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
            setSearchParams={setSearchParams}
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
            setSearchParams={setSearchParams}
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
            setSearchParams={setSearchParams}
          ></DependentsForm>
        );
      case TaxDeclarationStep.TAX_PROFILE:
        return (
          <TaxReportForm
            register={register}
            control={control}
            formData={formData}
            handleSubmit={handleSubmit}
            saveFormAnswers={saveFormAnswers}
            setSearchParams={setSearchParams}
            addQuestionnaire={addQuestionnaire}
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

  function generateTabs() {
    const tabs = [];
    questionnaires.forEach((value: Respondent, key: string) =>
      tabs.push({ value, key })
    );
    return tabs;
  }

  return (
    <div className="flex p-8 bg-orange-50 min-h-screen flex-col items-center">
      <div className="w-[800px] flex flex-row">
        {generateTabs().map((tab) => (
          <div
            key={tab.key}
            className="bg-white rounded-t-lg p-2 w-fit cursor-pointer hover:bg-gray-200"
            onClick={() =>
              navigate(
                `/platform/questionnaire/${tab?.key}?step=${searchParams.get(
                  TAX_DECLARATION_STEP
                )}`
              )
            }
          >
            <p className="opacity-100">
              {tab?.value?.personalInformations?.firstName || 'Client'}
            </p>
          </div>
        ))}
      </div>
      <div className="w-[800px] bg-white rounded-md p-8 h-fit">
        {renderTaxReportStep(searchParams.get(TAX_DECLARATION_STEP))}
      </div>
    </div>
  );
}
