import React, { useContext, useEffect, useState } from 'react';

import { User } from 'firebase/auth';
import { createContext, ReactNode } from 'react';
import {
  Control,
  UseFormRegister,
  UseFormHandleSubmit,
  UseFormSetValue,
  useForm,
  FieldErrorsImpl,
  UseFormReset,
  UseFormWatch,
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
import { yupResolver } from '@hookform/resolvers/yup';
import { contactDetailsSchema, personalInformationsSchema } from './schema';
import { PersonalInformations } from '../types/Questionnaire/PersonnalInformations';
import { ContactDetails } from '../types/Questionnaire/ContactDetails';

export const TAX_DECLARATION_STEP = 'step';
const TAX_REPORT_COLLECTION = 'taxReport';
const QUESTIONNAIRE_SUB_COLLECTTION = 'questionnaires';

interface PersonalInformationsForm {
  register: UseFormRegister<PersonalInformations>;
  handleSubmit: UseFormHandleSubmit<PersonalInformations>;
  errors: Partial<FieldErrorsImpl<PersonalInformations>>;
  control: Control<PersonalInformations>;
  setValue: UseFormSetValue<PersonalInformations>;
  reset: UseFormReset<PersonalInformations>;
  watch: UseFormWatch<PersonalInformations>;
}

interface ContactDetailsForm {
  register: UseFormRegister<ContactDetails>;
  handleSubmit: UseFormHandleSubmit<ContactDetails>;
  errors: Partial<FieldErrorsImpl<ContactDetails>>;
  control: Control<ContactDetails>;
  setValue: UseFormSetValue<ContactDetails>;
  reset: UseFormReset<ContactDetails>;
  watch: UseFormWatch<ContactDetails>;
}

export interface QuestionnaireContextType {
  control: Control<Questionnaire>;
  formData: Questionnaire;
  register: UseFormRegister<Questionnaire>;
  handleSubmit: UseFormHandleSubmit<Questionnaire>;
  saveFormAnswers: (formAnswers?: Questionnaire) => void;
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
  errors: Partial<FieldErrorsImpl<Questionnaire>>;
  personalInformationsForm: PersonalInformationsForm;
  contactDetailsForm: ContactDetailsForm;
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
    formState: { errors },
    watch,
    control,
    setValue,
    reset,
  } = useForm<Questionnaire>();
  const {
    register: personalInformationsRegister,
    handleSubmit: personalInformationsHandleSubmit,
    formState: { errors: personalInformationsErrors },
    watch: watchPersonalInformations,
    control: personnalInformationsControl,
    setValue: setValuePersonnalInformations,
    reset: resetPersonnalInformations,
  } = useForm<PersonalInformations>({
    resolver: yupResolver(personalInformationsSchema),
  });

  const personalInformationsForm: PersonalInformationsForm = {
    register: personalInformationsRegister,
    handleSubmit: personalInformationsHandleSubmit,
    errors: personalInformationsErrors,
    watch: watchPersonalInformations,
    control: personnalInformationsControl,
    setValue: setValuePersonnalInformations,
    reset: resetPersonnalInformations,
  };

  const {
    register: contaxtDetailsRegister,
    handleSubmit: contaxtDetailsHandleSubmit,
    formState: { errors: contaxtDetailsErrors },
    watch: watchContactDetails,
    control: contactDetailsControl,
    setValue: setValueContactDetails,
    reset: resetContactDetails,
  } = useForm<ContactDetails>({
    resolver: yupResolver(contactDetailsSchema),
  });

  const contactDetailsForm: ContactDetailsForm = {
    register: contaxtDetailsRegister,
    handleSubmit: contaxtDetailsHandleSubmit,
    errors: contaxtDetailsErrors,
    watch: watchContactDetails,
    control: contactDetailsControl,
    setValue: setValueContactDetails,
    reset: resetContactDetails,
  };

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
        ...questionnaire?.personalInformations,
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

  async function saveFormAnswers(formAnswers = formData) {
    questionnaires.set(id, formAnswers);
    await setDoc(
      doc(
        firestore,
        TAX_REPORT_COLLECTION,
        user.uid,
        QUESTIONNAIRE_SUB_COLLECTTION,
        id
      ),
      formAnswers,
      {
        merge: true,
      }
    );
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
        errors,
        personalInformationsForm,
        contactDetailsForm,
      }}
    >
      {children}
    </QuestionnaireContext.Provider>
  );
}
