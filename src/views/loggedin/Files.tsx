import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BreadcrumbWrapper } from '../../components/profile/BreadcrumbWrapper';
import { useContext } from 'react';
import { AppContext, AppContextType } from '../../context/AppContext';
import {
  deleteObject,
  getBlob,
  getMetadata,
  getStorage,
  ref,
} from 'firebase/storage';
import { uuidv4 } from '@firebase/util';
import MyDropbox from '../../components/MyDropbox';
import { PersonalInformations } from './TaxDeclaration/types/Questionnaire/PersonnalInformations';
import {
  uploadFileToStorage,
  fetchFilesPerUserFromGivenEmail,
  removeExistingfile,
  getUserInfo,
} from '../../client/firebaseClient';
import { useNavigate } from 'react-router-dom';
import { TaxDeclarationStep } from './TaxDeclaration/types/TaxReport/TaxDeclarationStep';
import emailjs from '@emailjs/browser';

const storage = getStorage();

interface FileComponentProps {
  userName: string;
  files: any;
  onSelect: (item: string) => void;
  selected: string | null;
  userEmail: string;
  handleDelete: (filePath: string, userName: string, files: Array<any>) => void;
  appendQuestionnaire: (userName: string, files: Array<string>) => void;
  setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

function FileComponent(props: FileComponentProps) {
  const {
    userName,
    files,
    onSelect,
    selected,
    handleDelete,
    appendQuestionnaire,
    setUpdated,
  } = props;
  const [showDropbox, setShowDropbox] = useState(false);
  const form  = useRef();
  const { user } = useContext(AppContext) as AppContextType;
  const navigate = useNavigate();
  const handleClick = (item: string) => {
    if (selected === item) {
      onSelect(null);
    } else {
      onSelect(item);
    }
  };


  const sendFinishedEmail = (clientName: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    emailjs
      .sendForm(
        'service_6bjauir',
        'template_snejz4r',
        form.current,
        'umJYlsZZcSc4v8_4L'
      )
      .then(() => {
        alert('Courriel envoyé.');
      })
      .catch((err) => {
        alert('There was an issue.');
        console.log(err);
      });
  }

  const handleDownload = async (filePath: string, fileName: string) => {
    const fileRef = ref(storage, filePath);
    const blob = await getBlob(fileRef);
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
    link.click();
    link.remove();
  };

  const handleFileUpload = useCallback((acceptedFiles) => {
    setUpdated(false);
    const info = {
      firstName: userName?.split('_')[0],
      lastName: userName?.split('_')[1],
      email: user?.email,
    } as PersonalInformations;
    const newFiles = [];
    acceptedFiles?.forEach((file) => {
      const fileNameWithPrefix = 'Autre_fichier_' + file?.name;
      uploadFileToStorage(fileNameWithPrefix, acceptedFiles[0], info);
      newFiles.push(
        'customerData/' +
          user?.email +
          '/' +
          userName +
          '/' +
          fileNameWithPrefix
      );
    });
    appendQuestionnaire(userName, newFiles);
    setUpdated(true);
  }, []);

  const handleToggleDropbox = () => {
    setShowDropbox(!showDropbox);
  };

  const handleNavigate = () => {
    const splitUserName = userName.split('_');
    const firstName = splitUserName[0];
    const lastName = splitUserName[1];
    getUserInfo(firstName, lastName, user?.uid)
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.id);
        navigate(
          `/questionnaire/${data}?step=${TaxDeclarationStep.UPLOAD_FILES}`
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="mb-5 w-1/2 ">
      <div className="flex items-center group">
        <p className="text-lg font-bold mr-2">
          Fichiers de :{' '}
          <span className="text-xl font-semibold">
            {userName?.replace('_', ' ')}
          </span>
        </p>
        <button className="bg-orange-500 text-white px-2 py-1 rounded-md" onClick={handleNavigate}>
          <span className="hidden md:inline">...</span>
          <span className="group-hover:inline hidden">
            Cliquez ici pour atteindre vos boites de dépôts
          </span>
        </button>
      </div>

      <ul role="list" className="list-inside">
        {files
          ?.filter(
            (item) =>
              !item.includes('taxReport.pdf') &&
              !item.includes('TaxReportCsv.xlsx')
          )
          ?.map((item) => (
            <li
              key={item}
              className={`${
                selected === item
                  ? 'border border-orange-500 shadow-lg rounded-md bg-gray-100'
                  : 'border border-gray-300 rounded-md'
              } cursor-pointer hover:bg-gray-100 hover:shadow-lg hover:scale-105 p-2`}
              onClick={() => handleClick(item)}
            >
              <span className="text-lg">
                {item?.split('/')[3].replaceAll('_', ' ').split('.')[0]}
              </span>
              {selected === item && (
                <div className="mt-2 flex space-x-2">
                  <button
                    onClick={() => handleDownload(item, item?.split('/')[3])}
                    className="bg-blue-400 hover:bg-blue-500 text-white px-2 py-1 rounded-md transform hover:scale-105"
                  >
                    Télécharger
                  </button>
                  <button
                    onClick={() => handleDelete(item, userName, files)}
                    className="bg-red-400 hover:bg-red-500 text-white px-2 py-1 rounded-md transform hover:scale-105"
                  >
                    Supprimer
                  </button>
                </div>
              )}
            </li>
          ))}
      </ul>
      <div className="border-2 border-gray-500 bg-gray-200 p-4 rounded">
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded"
          onClick={handleToggleDropbox}
        >
          {showDropbox
            ? 'Fini de deposer les fichiers'
            : 'Deposer plus de fichiers'}
        </button>
        {showDropbox && (
          <div className="mt-4">
            <MyDropbox handleFileUpload={handleFileUpload} />
          </div>
        )}
      </div>
      <div className="p-2 rounded">
        <form ref={form}>
        <button
          className="bg-orange-500 text-white py-2 px-4 rounded"
          onClick={(e) => sendFinishedEmail(userName, e)}
        >
         Cliquez ici pour indiquer la fin de votre déclaration
        </button>
        <input type='hidden' name='name' value={userName}></input>
        </form>
      </div>
    </div>
  );
}

export function Files() {
  const { user } = useContext(AppContext) as AppContextType;
  const [questionnaireArr, setQuestionnaireArr] = useState([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null); // added selected state
  const [updated, setUpdated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const indexOfFileInQuestionnaire = (
    arr: Array<any>,
    userName: string
  ): number => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]['key'] == userName) {
        return i;
      }
    }

    return -1;
  };

  const appendQuestionnaire = (userName: string, files: Array<string>) => {
    const index = indexOfFileInQuestionnaire(questionnaireArr, userName);
    const tempArr = questionnaireArr[index]['val'].concat(files);
    const tempQuestionnaireArr = [...questionnaireArr];
    tempQuestionnaireArr[index] = { key: userName, val: tempArr };
    setQuestionnaireArr(tempQuestionnaireArr);
    setSelectedItem(null);
    setUpdated(false);
    setIsMounted(false);
  };

  const handleDelete = (
    filePath: string,
    userName: string,
    files: Array<any>
  ) => {
    const fileRef = ref(storage, filePath);
    getMetadata(fileRef).then((metadata) => {
      if (metadata?.customMetadata) {
        removeExistingfile(
          metadata?.customMetadata?.fileType,
          metadata?.customMetadata?.userId
        );
      }
    });
    setUpdated(false);
    deleteObject(fileRef)
      .then((res) => {
        const index = files?.indexOf(filePath);
        if (index > -1) {
          files?.splice(index, 1);
        }
        const questionnaireIndex = indexOfFileInQuestionnaire(
          questionnaireArr,
          userName
        );
        questionnaireArr[questionnaireIndex] = { key: userName, val: files };
        setQuestionnaireArr(questionnaireArr);
        setSelectedItem(null);
        setUpdated(true);
      })
      .catch(() => alert('Impossible de supprimer le fichier.'));
  };

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      return;
    }

    fetchFilesPerUserFromGivenEmail(user?.email).then((res) => {
      const tempquestionnaireArr = [];
      res?.forEach((v, k) => {
        tempquestionnaireArr.push({ key: k, val: v });
      });
      setQuestionnaireArr(tempquestionnaireArr);
      setUpdated(true);
    });
  }, [isMounted]);

  const filesPresent = (): boolean => {
    if (questionnaireArr?.length === 0) {
      return false;
    }

    let found = false;

    questionnaireArr?.forEach((item) => {
      if (item['val'].length > 0) {
        item['val'].forEach((inner) => {
          if (inner.includes('taxReport.pdf')) {
            found = true;
          }
        });
      }
    });

    return found;
  };

  return (
    <main>
      <div className="flex justify-start flex-col w-screen p-10 sm:px-30 lg:px-40">
        <BreadcrumbWrapper
          breadcrumbEndpoint={['profile', 'documents']}
          breadcrumbName={['Mon Compte', 'Mes Documents']}
        >
          <div>
            {!filesPresent() ? (
              <>
                <h1>{"Vous n'avez pas de fichiers de presents."}</h1>
              </>
            ) : (
              questionnaireArr?.map((v) => (
                <FileComponent
                  key={v + uuidv4()}
                  userName={v['key']}
                  files={v['val']}
                  userEmail={user?.email}
                  onSelect={setSelectedItem}
                  selected={selectedItem}
                  handleDelete={handleDelete}
                  appendQuestionnaire={appendQuestionnaire}
                  setUpdated={setUpdated}
                />
              ))
            )}
          </div>
        </BreadcrumbWrapper>
      </div>
    </main>
  );
}
