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

const FIRESTORE_REQUIRED_FILES_COLLECTION = 'UserRequiredFiles';
const FIRESTORE_EXISTING_FILES_COLLECTIONS = 'UserExistingFiles';
const STORAGE_BASE_FOLDER = 'customerdata/';
const firestore = getFirestore();
const storage = getStorage();

interface FileInfo{
  userId: string
  fileName: string
  fullPath: string
}

export default function ClientFilesView () {
  const { user } = useContext(AppContext) as AppContextType;
  const user2 = getAuth().currentUser; 
  const requiredFilesRef = collection(firestore, FIRESTORE_REQUIRED_FILES_COLLECTION); 
  const existingFilesRef = collection(firestore, FIRESTORE_EXISTING_FILES_COLLECTIONS);

  console.log(user)

  const requiredFilesQuery = query(requiredFilesRef, where('userId', '==', user.uid))
  const existingFilesQuery = query(existingFilesRef, where('userId', '==', user.uid))

  const [userRequiredFiles] = useCollectionData(requiredFilesQuery)
  const [userExistingFiles] = useCollectionData(existingFilesQuery)
  return (
    <>
      {userRequiredFiles && userRequiredFiles.map((item) => {console.log(item.requiredFiles)})}
      {userExistingFiles && userExistingFiles.map((item) => {console.log(item.existingFiles)})}
    </>
  )
}
