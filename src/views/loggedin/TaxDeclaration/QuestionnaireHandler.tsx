import React, { useContext, useEffect, useRef, useState } from 'react';
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
import {
  ClientTypeEnum,
  Questionnaire,
  QuestionnaireStateEnum,
} from './types/Questionnaire/Questionnaire';
import { useForm } from 'react-hook-form';
import { DeductionsAndTaxCreditsForm } from './TaxForms/DeductionsAndTaxCreditsForm';
import { EmptyQuestionnaire } from './emptyQuestionnaire';
import { OctopusLoader } from '../../../components/common/OctopusLoader';
import Fade from 'react-reveal';

export const TAX_DECLARATION_STEP = 'step';
const TAX_REPORT_COLLECTION = 'taxReport';
const QUESTIONNAIRE_SUB_COLLECTTION = 'questionnaires';

export function QuestionnaireHandler() {
  const { firestore, user } = useContext(AppContext) as AppContextType;
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  const navigate = useNavigate();
  const newAccount = useRef(true);
  const [loadingQuestionnaires, setLoadingQuestionnaires] = useState(true);

  const {
    register,
    handleSubmit,
    formState: {},
    watch,
    control,
    setValue,
    reset,
  } = useForm<Questionnaire>();
  const formData = watch();
  const [questionnaires, setQuestionnaires] = useState<
    Map<string, Questionnaire>
  >(new Map());
  const [clientTabs, setClientTabs] = useState([]);

  useEffect(() => {
    if (user && id && questionnaires.size) {
      reset(questionnaires.get(id));
      generateTabs();
    }
  }, [id, questionnaires]);

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
      if (!map.size && newAccount.current) {
        newAccount.current = false;
        await addQuestionnaire();
      } else if (!map.get(id)) {
        navigate('/404');
      }
    }
    if (user) {
      fetchQuestionnaires();
      setLoadingQuestionnaires(false);
    }
  }, [user?.uid]);

  async function addQuestionnaire(
    clientType = ClientTypeEnum.MAIN_CLIENT,
    questionnaire = EmptyQuestionnaire,
    stepToRedirect = TaxDeclarationStep.PERSONAL_INFORMATIONS
  ) {
    const defaultValues = {
      ...EmptyQuestionnaire,
      clientType,
      state: QuestionnaireStateEnum.IN_PROGRESS,
      year: new Date().getFullYear(),
      personalInformations: {
        ...EmptyQuestionnaire?.personalInformations,
        email: user.email,
      },
      civilStatus: questionnaire?.civilStatus || null,
      contactDetails: questionnaire?.contactDetails || null,
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
      navigate(`/platform/questionnaire/${docRef.id}?step=${stepToRedirect}`);
    });
  }

  async function saveFormAnswers() {
    console.log('save', formData);
    questionnaires.set(id, formData);
    console.log('questionnaire', questionnaires.get(id));
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
    reset({ ...EmptyQuestionnaire });
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
            questionnaires={questionnaires}
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
            questionnaires={questionnaires}
            user={user}
          ></DeductionsAndTaxCreditsForm>
        );
      case TaxDeclarationStep.UPLOAD_FILES:
        return <TaxDeclarationFileUpload setSearchParams={setSearchParams} />;
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
    questionnaires.forEach((value: Questionnaire, key: string) =>
      tabs.push({ value, key, active: key === id })
    );
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
              <p className="font-semibold">
                {tab?.value?.personalInformations?.firstName || 'Client'}
              </p>
            </div>
          ))}
      </div>
      {loadingQuestionnaires ? (
        <Fade>
          <div className="h-full pt-16">
            <OctopusLoader />
          </div>
        </Fade>
      ) : (
        <Fade>
          <div className="w-[800px] bg-white rounded-md p-8 h-fit">
            {renderTaxReportStep(searchParams.get(TAX_DECLARATION_STEP))}
          </div>
        </Fade>
      )}
    </div>
  );
}
