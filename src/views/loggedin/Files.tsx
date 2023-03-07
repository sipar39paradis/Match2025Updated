import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BreadcrumbWrapper } from '../../components/profile/BreadcrumbWrapper'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext, AppContextType } from '../../context/AppContext'
import { fetchFilesPerUserFromGivenEmail, getAllQuestionnaires } from '../../client/firebaseClient'
import { ReactComponent as BlankFile } from '../../icons/BlankFile.svg'
import { deleteObject, getBlob, getStorage, ref } from 'firebase/storage'
import { PassThrough } from 'stream'
import { uuidv4 } from '@firebase/util'


const storage = getStorage();

interface FileComponentProps {
  userName: string;
  files: any;
  onSelect: (item: string) => void;
  selected: string | null;
}

function FileComponent(props: FileComponentProps) {
  const { userName, files, onSelect, selected } = props;
  console.log(files)

  const handleClick = (item: string) => {
    if (selected === item) {
      onSelect(null);
    } else {
      onSelect(item);
    }
  };
  
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

  const handleDelete = async (filePath: string) => {
    const fileRef = ref(storage, filePath);
    deleteObject(fileRef)
      .catch(() => alert('Couldn\'t delete file.'));
  };
  

  return (
    <div className='mb-5'>
<p className="text-lg font-bold">Fichiers A : <span className="text-xl font-semibold">{userName?.replace('_', ' ')}</span></p>
      <ul role='list' className='list-inside'>
        {files
          ?.filter((item) => !item.includes('taxReport.pdf'))
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
              <span className='text-lg'>
                {item?.split('/')[3].replaceAll('_', ' ').split('.')[0]}
              </span>
              {selected === item && (
                <div className='mt-2 flex space-x-2'>
                  <button 
                  onClick={() => handleDownload(item, item?.split('/')[3] )}
                  className='bg-blue-400 hover:bg-blue-500 text-white px-2 py-1 rounded-md transform hover:scale-105'>
                    Télécharger
                  </button>
                  <button 
                  onClick={() => handleDelete(item)}
                  className='bg-red-400 hover:bg-red-500 text-white px-2 py-1 rounded-md transform hover:scale-105'>
                    Supprimer
                  </button>
                </div>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}

export function Files() {
  const { user } = useContext(AppContext) as AppContextType;
  const [questionnaires, setQuestionnaires] = useState([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null); // added selected state

  useEffect(() => {
    fetchFilesPerUserFromGivenEmail(user?.email).then((res) => {
      const tempQuestionnaires = [];
      res?.forEach((v, k) => {
        tempQuestionnaires.push({ key: k, val: v });
      });
      setQuestionnaires(tempQuestionnaires);
    });
  }, [user]);

  const filesPresent = (): boolean => {
    if(questionnaires.length == 0){
      return false;
    }

    questionnaires?.forEach((item) => {
      if(item['val'].length > 0 ){
        if(item['val'].length == 1 && !item['val'][0].includes('taxReport.pdf')){
          return true;
        }
        return true;
      }
    })

    return false;
  }

  return (
    <main>
      <div className="flex justify-start flex-col w-screen p-10 sm:px-30 lg:px-40">
        <BreadcrumbWrapper
          breadcrumbEndpoint={['profile', 'documents']}
          breadcrumbName={['Mon Compte', 'Mes Documents']}
        >
          <div>
            {(!filesPresent() ) ? <><h1>{'Vous n\'avez pas de fichiers de presents.'}</h1></> : questionnaires?.map((v) => (
              <FileComponent
                key={v + uuidv4()}
                userName={v['key']}
                files={v['val']}
                onSelect={setSelectedItem}
                selected={selectedItem}
              />
            ))}
          </div>
        </BreadcrumbWrapper>
      </div>
    </main>
  );
}