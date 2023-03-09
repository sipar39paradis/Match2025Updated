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
  writeRequiredFiles,
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
import mapFiles, { getPDFTaxReport } from '../../../utils/FileMapper';
import { EmptyQuestionnaire } from './emptyQuestionnaire';
import { Dependent } from './types/Questionnaire/Dependent';
import { PersonalInformations } from './types/Questionnaire/PersonnalInformations';
import TaxDeclarationAllowedMultipleFileUpload from './TaxDeclarationMultipleFileUpload';

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
  personalInformation: PersonalInformations
}

interface FileNameComponentProps {
  fileName: string;
  hidden: boolean;
  requiredFiles: Array<string>;
  setReqFiles: (reqFiles: Array<string>) => void;
  userId: string;
  setHidden: (hidden: boolean) => void;
  personalInformation: PersonalInformations
}

interface ExistingFileNameComponentProps {
  fileName: string;
  requiredFiles: Array<string>;
  setReqFiles: (reqFiles: Array<string>) => void;
  userId: string;
  personalInformation: PersonalInformations
}

function ExistingFileNameComponent(props: ExistingFileNameComponentProps) {
  const { fileName, requiredFiles, setReqFiles, userId, personalInformation } = props;

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
      {fileName}
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
    personalInformation
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
      {fileName}
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
  const { storage, userId, fileName, setReqFiles, requiredFiles } =
    props;
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
        <div className="flex items-center justify-center w-full">
          <Dropzone onDrop={handleFileUpload}>
            {({ getRootProps, getInputProps }) => (
              <section className="w-full">
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <label>
                    <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <svg
                        aria-hidden="true"
                        className="w-10 h-10 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">
                          Cliquez pour télécharger
                        </span>{' '}
                        ou glissez-déposez
                      </p>
                    </div>
                  </label>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
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
        reqFiles.filter((item, index) => {
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
      questionnaires?.forEach((value, id) => {
        uploadTaxReportPdfToStorage(
          getPDFTaxReport(formData?.taxReport, value?.personalInformations),
          value?.personalInformations
        );
      });
      setSearchParams({ step: TaxDeclarationStep.REVIEW });
    }
  }

  function findDependentWhoNeedsQuestionnaire(): Dependent | null {
    let foundDependent = null;
    questionnaires.forEach((questionnaire) => {
      questionnaire.dependents.forEach((dependent) => {
        if (
          dependent.hasTaxReport &&
          !dependentQuestionnaireAlreadyExist(
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

  function dependentQuestionnaireAlreadyExist(
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
      !partnerQuestionnaireAlreadyExists()
    );
  }

  function partnerQuestionnaireAlreadyExists() {
    let exist = false;
    questionnaires.forEach((questionnaire) => {
      if (questionnaire.clientType === ClientTypeEnum.PARTNER) {
        exist = true;
      }
    });
    return exist;
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
      <TaxDeclarationAllowedMultipleFileUpload questionnaire={questionnaires?.get(id)}/>
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
