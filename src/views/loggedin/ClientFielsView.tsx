import React, { useContext } from 'react';
import { AppContext, AppContextType } from '../../context/AppContext'
import { getStorage, uploadBytes, ref, getBlob } from 'firebase/storage'
import {
  collection,
  doc,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  where
} from 'firebase/firestore'
import { StringFormat } from 'firebase/storage';
import { useCollectionData } from  'react-firebase-hooks/firestore'
import { getAuth } from 'firebase/auth';
import { FileListConverter } from '../../interfaces/Files'
import { uuidv4 } from '@firebase/util';

const FIRESTORE_REQUIRED_FILES_COLLECTION = 'UserRequiredFiles';
const FIRESTORE_EXISTING_FILES_COLLECTIONS = 'UserExistingFiles';
const STORAGE_BASE_FOLDER = 'customerdata/';
const firestore = getFirestore();
const storage = getStorage();


interface FileListProps{
  files: any 
  listName: string
}

function FileList(props: FileListProps){
  return (
    <div>
    <label>{(props.listName) ? props.listName : ''}</label>
    <ul className="list-disc">
    {(props.files == undefined || 
      props == undefined || 
      props.files.length == 0) ? (<></>) : props.files[0].files.map((item: string) => <li key={item} className='transition-all duration-900 opacity-100'>{item}</li>)}
    </ul>
    </div>
  )
} 

export default function ClientFilesView () {
  const { user, loading, errors } = useContext(AppContext) as AppContextType;
  const requiredFilesRef = collection(firestore, FIRESTORE_REQUIRED_FILES_COLLECTION); 
  const existingFilesRef = collection(firestore, FIRESTORE_EXISTING_FILES_COLLECTIONS);

  if(user == null || user == undefined){
    return (<></>)
  }

  const requiredFilesQuery = query(requiredFilesRef, where('userId', '==', user.uid)).withConverter(FileListConverter)
  const existingFilesQuery = query(existingFilesRef, where('userId', '==', user.uid)).withConverter(FileListConverter)

  const userRequiredFiles = useCollectionData(requiredFilesQuery)
  const userExistingFiles = useCollectionData(existingFilesQuery)
  return (
    <div className="flex flex-wrap gap-20 justify-center items-center xs:display-0 h-screen">
    <FileList files={userRequiredFiles[0]} listName='Required Files' />
    <FileList files={userExistingFiles[0]} listName='Uploaded Files'/>
    </div>
  )
}
