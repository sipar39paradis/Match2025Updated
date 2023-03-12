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
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { TaxDeclarationStep } from './types/TaxReport/TaxDeclarationStep';
import {
  ClientTypeEnum,
  Questionnaire,
} from './types/Questionnaire/Questionnaire';
import {
  QuestionnaireContext,
  QuestionnaireContextType,
  TAX_DECLARATION_STEP,
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
      {!hidden ? <MyDropbox handleFileUpload={handleFileUpload} /> : <></>}
    </>
  );
}

export function TaxDeclarationFileUpload(props: TaxDeclarationFileUploadProps) {
  const { firestore, storage, user } = useContext(AppContext) as AppContextType;
  const { setSearchParams, questionnaires, formData } = useContext(
    QuestionnaireContext
  ) as QuestionnaireContextType;
  const [reqFiles, setReqFiles] = useState([]);
  const [existingFiles, setExistingFiles] = useState([]);
  const [fetchedReqFiles, setFetchedReqFiles] = useState(false);
  const [fetchedExFiles, setFetchedExFiles] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const keys = Array.from(questionnaires.keys());

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
  }, [id]);

  function onSubmitButton() {
    const questionnairePosition = keys.findIndex((key) => key === id);

    console.log(keys);
    console.log(id);
    if (idIsLast()) {
      questionnaires?.forEach((value, id) => {
        uploadTaxReportPdfToStorage(
          getPDFTaxReport(formData?.taxReport, value?.personalInformations),
          value?.personalInformations
        );
      });
      setSearchParams({ step: TaxDeclarationStep.REVIEW });
    } else {
      navigate(
        `/questionnaire/${
          keys[questionnairePosition + 1]
        }?step=${searchParams.get(TAX_DECLARATION_STEP)}`
      );
    }
  }

  function idIsLast() {
    const position = idPosition();
    return position === keys.length - 1;
  }

  function idIsFirst() {
    const position = idPosition();
    return position === 0;
  }

  function idPosition() {
    return keys.findIndex((key) => key === id);
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
      <div className="w-full flex justify-between mt-4 flex-row-reverse">
        <input
          type="submit"
          value={idIsLast() ? 'Terminer' : 'Suivant'}
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          onClick={() => {
            onSubmitButton();
          }}
        />
        {!idIsFirst() && (
          <input
            type="submit"
            value="Précédant"
            onClick={() => {
              navigate(
                `/questionnaire/${
                  keys[idPosition() - 1]
                }?step=${searchParams.get(TAX_DECLARATION_STEP)}`
              );
            }}
            className="bg-[#222C40] hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded cursor-pointer"
          />
        )}
      </div>
    </>
  );
}
