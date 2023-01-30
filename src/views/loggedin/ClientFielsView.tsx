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
}

function FileList(props: FileListProps){
  return (
    <>
    {(props.files == undefined) ? (<></>) : props.files[0].files.map((item: string) => <li key={item}>{item}</li>)}
    </>
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
    <>
    <FileList files={userRequiredFiles[0]} />
    <FileList files={userExistingFiles[0]} />
    </>
  )
}
