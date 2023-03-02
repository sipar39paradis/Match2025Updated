import React, { useContext, useEffect, useState } from 'react';

import { User } from 'firebase/auth';
import { createContext, ReactNode } from 'react';
import {
  Control,
  UseFormRegister,
  UseFormHandleSubmit,
  UseFormSetValue,
  useForm,
} from 'react-hook-form';
import {
  URLSearchParamsInit,
  NavigateOptions,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { AppContext, AppContextType } from '../../../../context/AppContext';
import {
  Questionnaire,
  ClientTypeEnum,
  QuestionnaireStateEnum,
} from '../types/Questionnaire/Questionnaire';
import { TaxDeclarationStep } from '../types/TaxReport/TaxDeclarationStep';
import { addDoc, collection, setDoc, doc, getDocs } from 'firebase/firestore';
import { EmptyQuestionnaire } from '../emptyQuestionnaire';

export const TAX_DECLARATION_STEP = 'step';
const TAX_REPORT_COLLECTION = 'taxReport';
const QUESTIONNAIRE_SUB_COLLECTTION = 'questionnaires';

export interface QuestionnaireContextType {
  control: Control<Questionnaire>;
  formData: Questionnaire;
  register: UseFormRegister<Questionnaire>;
  handleSubmit: UseFormHandleSubmit<Questionnaire>;
  saveFormAnswers: () => void;
  setValue: UseFormSetValue<Questionnaire>;
  resetForm: (newValues?: Questionnaire) => void;
  searchParams: URLSearchParams;
  setSearchParams: (
    nextInit:
      | URLSearchParamsInit
      | ((prev: URLSearchParams) => URLSearchParamsInit),
    navigateOpts?: NavigateOptions
  ) => void;
  addQuestionnaire: (
    clientType: ClientTypeEnum,
    questionnaire: Questionnaire,
    stepToRedirect: TaxDeclarationStep
  ) => void;
  questionnaires: Map<string, Questionnaire>;
  user: User;
  loadingQuestionnaires: boolean;
}

export const QuestionnaireContext =
  createContext<QuestionnaireContextType | null>(null);

interface QuestionnaireContextProviderProps {
  children: ReactNode;
}

export function QuestionnaireContextProvider({
  children,
}: QuestionnaireContextProviderProps) {
  const { firestore, user } = useContext(AppContext) as AppContextType;
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
  const navigate = useNavigate();
  const { id } = useParams();

  const [loadingQuestionnaires, setLoadingQuestionnaires] = useState(true);
  const [questionnaires, setQuestionnaires] = useState<
    Map<string, Questionnaire>
  >(new Map());
  const [searchParams, setSearchParams] = useSearchParams();

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
      if (!map.get(id)) {
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
      navigate(`/questionnaire/${docRef.id}?step=${stepToRedirect}`);
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
    ).then(() => {
      setQuestionnaires(questionnaires);
    });
  }

  function resetForm(resetValues = EmptyQuestionnaire) {
    reset({ ...resetValues });
  }

  return (
    <QuestionnaireContext.Provider
      value={{
        control,
        formData,
        register,
        handleSubmit,
        saveFormAnswers,
        setValue,
        resetForm,
        searchParams,
        setSearchParams,
        addQuestionnaire,
        questionnaires,
        user,
        loadingQuestionnaires,
      }}
    >
      {children}
    </QuestionnaireContext.Provider>
  );
}
