import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { CivilStatusForm } from './ProfileForms/CivilStatusForm';
import { PersonnalInformationsForm } from './ProfileForms/PersonnalInformationsForm';
import { CivilStatusChangeForm } from './ProfileForms/CivilStatusChangeForm';
import { TaxDeclarationReview } from './TaxDeclarationReview';
import { ContactDetailsForm } from './ProfileForms/ContactDetailsForm';
import { TaxDeclarationStep } from './types/TaxReport/TaxDeclarationStep';
import { DependentsForm } from './ProfileForms/DependentsForm';
import { IncomesForm } from './TaxForms/IncomesForm';
import { TaxDeclarationFileUpload } from './TaxDeclarationFileUpload';
import { AppContext, AppContextType } from '../../../context/AppContext';
import { doc, setDoc, addDoc, collection, getDocs } from 'firebase/firestore';
import { Respondent } from './types/Respondent/Respondent';
import { useForm } from 'react-hook-form';
import { DeductionsAndTaxCreditsForm } from './TaxForms/DeductionsAndTaxCreditsForm';
import { emptyQuestionnaire } from './emptyQuestionnaire';
import { CivilStatus } from './types/Respondent/CivilStatus';

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
  const formData = watch();
  const [questionnaires, setQuestionnaires] = useState<Map<string, Respondent>>(
    new Map()
  );
  const [clientTabs, setClientTabs] = useState([]);

  useEffect(() => {
    console.log('search params change', questionnaires);
    if (user && id && questionnaires.size) {
      // fetchUserAnswers();
      console.log('Got', questionnaires.get(id));
      reset(questionnaires.get(id));
      generateTabs();
    }
  }, [questionnaires, id]);

  useEffect(() => {
    async function fetchQuestionnaires() {
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
        map.set(doc.id, doc.data());
      });
      setQuestionnaires(map);
      console.log('map', map);
      if (!map.size) {
        await addQuestionnaire();
      }
    }
    if (user) {
      fetchQuestionnaires();
    }
  }, [user, id]);

  async function addQuestionnaire(
    mainClient = true,
    civilStatus?: CivilStatus
  ) {
    const defaultValues = {
      ...emptyQuestionnaire,
      mainClient,
      year: new Date().getFullYear(),
      personalInformations: {
        ...emptyQuestionnaire?.personalInformations,
        email: user.email,
      },
      civilStatus: civilStatus || null,
    };
    await addDoc(
      collection(
        firestore,
        TAX_REPORT_COLLECTION,
        user.uid,
        QUESTIONNAIRE_SUB_COLLECTTION
      ),
      defaultValues
    ).then((docRef) => {
      questionnaires.set(docRef.id, defaultValues);
      setQuestionnaires(questionnaires);
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

  function resetForm() {
    reset({ ...emptyQuestionnaire });
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
            setSearchParams={setSearchParams}
            setValue={setValue}
          ></DependentsForm>
        );
      case TaxDeclarationStep.INCOMES:
        return (
          <IncomesForm
            register={register}
            control={control}
            formData={formData}
            handleSubmit={handleSubmit}
            saveFormAnswers={saveFormAnswers}
            setSearchParams={setSearchParams}
          ></IncomesForm>
        );
      case TaxDeclarationStep.DEDUCTIONS_AND_TAX_CREDIT:
        return (
          <DeductionsAndTaxCreditsForm
            register={register}
            control={control}
            formData={formData}
            handleSubmit={handleSubmit}
            saveFormAnswers={saveFormAnswers}
            setSearchParams={setSearchParams}
            addQuestionnaire={addQuestionnaire}
            resetForm={resetForm}
          ></DeductionsAndTaxCreditsForm>
        );
      case TaxDeclarationStep.UPLOAD_FILES:
        return <TaxDeclarationFileUpload />;
      case TaxDeclarationStep.REVIEW:
        return <TaxDeclarationReview></TaxDeclarationReview>;
      default:
        return (
          <PersonnalInformationsForm
            register={register}
            control={control}
            formData={formData}
            handleSubmit={handleSubmit}
          ></PersonnalInformationsForm>
        );
    }
  }

  function generateTabs() {
    const tabs = [];
    console.log(questionnaires);
    questionnaires.forEach((value: Respondent, key: string) =>
      tabs.push({ value, key, active: key === id })
    );
    console.log(tabs);
    setClientTabs(tabs);
  }

  return (
    <div className="flex p-8 bg-orange-50 min-h-screen flex-col items-center">
      <div className="w-[800px] flex flex-row">
        {clientTabs.length > 1 &&
          clientTabs.map((tab) => (
            <div
              key={tab.key}
              className={` rounded-t-lg p-2 w-fit cursor-pointer hover:bg-gray-200 ${
                tab.active ? 'bg-gray-200' : 'bg-white'
              }`}
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
