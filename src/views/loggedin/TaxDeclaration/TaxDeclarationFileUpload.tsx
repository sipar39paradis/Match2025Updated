import { Firestore } from 'firebase/firestore';
import { FirebaseStorage, ref, uploadBytes } from 'firebase/storage';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  appendExistingFiles,
  getExistingFiles,
  getRequiredFiles,
  removeExistingfile,
  removeRequiredfile,
  uploadFileToStorage,
  uploadTaxReportPdfToStorage,
} from '../../../client/firebaseClient';
import { AppContext, AppContextType } from '../../../context/AppContext';
import Dropzone from 'react-dropzone';
import {
  NavigateOptions,
  URLSearchParamsInit,
  useParams,
} from 'react-router-dom';
import { TaxDeclarationStep } from './types/TaxReport/TaxDeclarationStep';
import {
  ClientTypeEnum,
  Questionnaire,
} from './types/Questionnaire/Questionnaire';
import {
  QuestionnaireContext,
  QuestionnaireContextType,
} from './context/QuestionnaireContext';
import mapFiles, { getPDFTaxReport, mapTitle } from '../../../utils/FileMapper';
import { EmptyQuestionnaire } from './emptyQuestionnaire';
import { Dependent } from './types/Questionnaire/Dependent';
import { PersonalInformations } from './types/Questionnaire/PersonnalInformations';
import TaxDeclarationAllowedMultipleFileUpload from './TaxDeclarationMultipleFileUpload';
import MyDropbox from '../../../components/MyDropbox';
import { partnerQuestionnaireExists } from './utils/partnerQuestionnaireExists';

const STORAGE_BASE_FOLDER = 'customerdata/';

interface TaxDeclarationFileUploadProps {
  setSearchParams?: (
    nextInit?:
      | URLSearchParamsInit
      | ((prev: URLSearchParams) => URLSearchParamsInit),
    navigateOpts?: NavigateOptions
  ) => void;
  questionnaires?: Map<string, Questionnaire>;
}

interface FileUploadProps {
  fileName: string;
  firestore: Firestore;
  storage: FirebaseStorage;
  userId: string;
  requiredFiles: Array<string>;
  setReqFiles: (reqFiles: Array<string>) => void;
  personalInformation: PersonalInformations;
}

interface FileNameComponentProps {
  fileName: string;
  hidden: boolean;
  requiredFiles: Array<string>;
  setReqFiles: (reqFiles: Array<string>) => void;
  userId: string;
  setHidden: (hidden: boolean) => void;
  personalInformation: PersonalInformations;
}

interface ExistingFileNameComponentProps {
  fileName: string;
  requiredFiles: Array<string>;
  setReqFiles: (reqFiles: Array<string>) => void;
  userId: string;
  personalInformation: PersonalInformations;
}

function ExistingFileNameComponent(props: ExistingFileNameComponentProps) {
  const { fileName, requiredFiles, setReqFiles, userId, personalInformation } =
    props;

  const onClickHandle = () => {
    if (confirm('Are you sure you wish to delete this file?')) {
      requiredFiles.push(fileName);
      removeExistingfile(fileName, userId, personalInformation);
      setReqFiles(requiredFiles);
    } else {
    }
  };

  return (
    <h2>
      {mapTitle(fileName)}
      {
        <>
          <button
            onClick={onClickHandle}
            type="button"
            className="m-1 px-3 py-2 text-xs font-medium text-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Supprimer Fichier
          </button>
        </>
      }
    </h2>
  );
}

function FileNameComponent(props: FileNameComponentProps) {
  const {
    fileName,
    hidden,
    requiredFiles,
    setReqFiles,
    userId,
    setHidden,
    personalInformation,
  } = props;

  const onClickHandle = () => {
    if (confirm('Are you sure you wish to delete this file?')) {
      requiredFiles.push(fileName);
      removeExistingfile(fileName, userId, personalInformation);
      setReqFiles(requiredFiles);
      setHidden(false);
    } else {
    }
  };

  return (
    <h2 className="mt-2 mb-0">
      {mapTitle(fileName)}
      {hidden ? (
        <>
          <button
            onClick={onClickHandle}
            type="button"
            className="m-1 px-3 py-2 text-xs font-medium text-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Supprimer Fichier
          </button>
        </>
      ) : (
        <></>
      )}
    </h2>
  );
}

function IndividualFileUpload(props: FileUploadProps) {
  const { storage, userId, fileName, setReqFiles, requiredFiles } = props;
  const { formData } = useContext(
    QuestionnaireContext
  ) as QuestionnaireContextType;
  const [hidden, setHidden] = useState(false);

  const handleFileUpload = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    uploadFileToStorage(
      fileName + '_' + file?.name,
      acceptedFiles[0],
      formData?.personalInformations
    ).then((res) => {
      removeRequiredfile(fileName, userId);
      appendExistingFiles(fileName, userId);
      setHidden(!hidden);
    });
  }, []);

  return (
    <>
      <FileNameComponent
        fileName={fileName}
        setReqFiles={setReqFiles}
        hidden={hidden}
        requiredFiles={requiredFiles}
        userId={userId}
        setHidden={setHidden}
        personalInformation={formData?.personalInformations}
      />
      {!hidden ? (
        <MyDropbox handleFileUpload={handleFileUpload} />
      ) : (
        <></>
      )}
    </>
  );
}

export function TaxDeclarationFileUpload(props: TaxDeclarationFileUploadProps) {
  const { firestore, storage, user } = useContext(AppContext) as AppContextType;
  const {
    setSearchParams,
    questionnaires,
    formData,
    addQuestionnaire,
    saveFormAnswers,
  } = useContext(QuestionnaireContext) as QuestionnaireContextType;
  const [reqFiles, setReqFiles] = useState([]);
  const [existingFiles, setExistingFiles] = useState([]);
  const [fetchedReqFiles, setFetchedReqFiles] = useState(false);
  const [fetchedExFiles, setFetchedExFiles] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (user && id && questionnaires?.size) {
      getRequiredFiles(id)
        .then((res) => {
          setReqFiles(res?.files);
          setFetchedReqFiles(true);
        })
        .catch((err) => console.log(err));

      getExistingFiles(id).then((res) => {
        setExistingFiles(res?.files);
        setFetchedExFiles(true);
      });

      setReqFiles(
        reqFiles?.filter((item, index) => {
          return existingFiles?.indexOf(item) === index;
        })
      );
    }
  }, [id, questionnaires]);

  function onSubmitButton() {
    saveFormAnswers();
    const dependent = findDependentWhoNeedsQuestionnaire();
    if (partnerNeedsQuestionnaire()) {
      addQuestionnaire(
        ClientTypeEnum.PARTNER,
        {
          ...EmptyQuestionnaire,
          civilStatus: formData.civilStatus,
          contactDetails: formData.contactDetails,
        },
        TaxDeclarationStep.PERSONAL_INFORMATIONS
      );
    } else if (dependent) {
      addQuestionnaire(
        ClientTypeEnum.DEPENDENT,
        {
          ...EmptyQuestionnaire,
          contactDetails: formData.contactDetails,
          personalInformations: {
            firstName: dependent.firstName,
            lastName: dependent.lastName,
            birthDay: dependent.birthDay,
            socialInsuranceNumber: dependent.socialInsuranceNumber,
            email: null,
            bankruptcy: null,
            disabled: null,
          },
        },
        TaxDeclarationStep.INCOMES
      );
    } else {
      setSearchParams({ step: TaxDeclarationStep.REVIEW });
    }
  }

  function findDependentWhoNeedsQuestionnaire(): Dependent | null {
    let foundDependent = null;
    questionnaires.forEach((questionnaire) => {
      questionnaire.dependents.forEach((dependent) => {
        if (
          dependent.hasTaxReport &&
          !dependentQuestionnaireExists(
            dependent.firstName,
            dependent.lastName,
            dependent.birthDay.toString()
          )
        ) {
          foundDependent = dependent;
        }
      });
    });
    return foundDependent;
  }

  function dependentQuestionnaireExists(
    firstName: string,
    lastName: string,
    birthDay: string
  ) {
    let exist = false;
    questionnaires.forEach((questionnaire) => {
      if (
        questionnaire.clientType === ClientTypeEnum.DEPENDENT &&
        `${questionnaire.personalInformations.firstName}-${questionnaire.personalInformations.lastName}-${questionnaire.personalInformations.birthDay}` ===
          `${firstName}-${lastName}-${birthDay}`
      ) {
        exist = true;
      }
    });
    return exist;
  }

  function partnerNeedsQuestionnaire() {
    return (
      formData?.clientType === ClientTypeEnum.MAIN_CLIENT &&
      formData?.civilStatus?.together &&
      !partnerQuestionnaireExists(questionnaires)
    );
  }

  return (
    <>
      {reqFiles?.map((item) => (
        <IndividualFileUpload
          requiredFiles={reqFiles}
          userId={id}
          fileName={item}
          firestore={firestore}
          storage={storage}
          key={item}
          personalInformation={questionnaires?.get(id)?.personalInformations}
          setReqFiles={setReqFiles}
        />
      ))}
      {existingFiles?.map((item) => (
        <ExistingFileNameComponent
          key={item + id}
          fileName={item}
          requiredFiles={reqFiles}
          setReqFiles={setReqFiles}
          userId={id}
          personalInformation={questionnaires?.get(id)?.personalInformations}
        />
      ))}
      <TaxDeclarationAllowedMultipleFileUpload
        questionnaire={questionnaires?.get(id)}
      />
      <div className="w-full flex justify-between mt-4">
        <input
          type="submit"
          value="Précédant"
          onClick={() => {
            setSearchParams({
              step: TaxDeclarationStep.DEDUCTIONS_AND_TAX_CREDIT,
            });
          }}
          className="bg-[#222C40] hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded cursor-pointer"
        />
        <input
          type="submit"
          value={
            partnerNeedsQuestionnaire() ||
            !!findDependentWhoNeedsQuestionnaire()
              ? 'Prochain questionnaire'
              : 'Suivant'
          }
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          onClick={() => {
            // if (reqFiles && reqFiles?.length == 0) {
            onSubmitButton();
            // } else {
            //   alert('Assurez-vous de télécharger tous les fichiers requis.');
            // }
          }}
        />
      </div>
    </>
  );
}
