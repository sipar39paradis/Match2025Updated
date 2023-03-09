import React, { useContext, useState } from 'react';
import { AppContext, AppContextType } from '../../context/AppContext'
import { getStorage, uploadBytes, ref } from 'firebase/storage'
import {
  collection,
  doc,
  getFirestore,
  query,
  setDoc,
  where
} from 'firebase/firestore'
import { useCollectionData } from  'react-firebase-hooks/firestore'
import { FileListConverter } from '../../interfaces/Files'
import { writeExistingFiles, writeRequiredFiles } from '../../client/firebaseClient'

const FIRESTORE_REQUIRED_FILES_COLLECTION = 'UserRequiredFiles';
const FIRESTORE_EXISTING_FILES_COLLECTIONS = 'UserExistingFiles';
const STORAGE_BASE_FOLDER = 'customerdata/';
const firestore = getFirestore();
const storage = getStorage();

interface FileListProps{
  files: any 
  listName: string
}

interface FileUploadProps{
    fileToUpload: string
    userId: string
    existingFiles: Array<string>
    requiredFiles: Array<string>
    requiredFileToUpload: any
}

function FileUpload(props: FileUploadProps){
  const { fileToUpload, userId, existingFiles, requiredFiles, requiredFileToUpload } = props; 

  const handleFileUpload = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if(fileToUpload == '' || fileToUpload == undefined){
      alert('There are no more files required.')
      return
    }

    if(existingFiles.includes(fileToUpload)){
      alert('The uploaded file already exists.')
      return
    }

    const file = e.target[0]?.files[0]
    const fileRef = ref(storage, STORAGE_BASE_FOLDER + userId + '/' + fileToUpload + '__'+ e.target[0]?.files[0].name)
    uploadBytes(fileRef, file).then((snapshot) => {
      existingFiles.push(fileToUpload)
      writeRequiredFiles(requiredFiles?.filter(fl => fl != fileToUpload), userId);
      writeExistingFiles(existingFiles, userId);

      const uploadedFileInfo = {
          fileName: snapshot.metadata.name,
          filePath: snapshot.metadata.fullPath,
          createdAt: snapshot.metadata.timeCreated,
          updatedAt: snapshot.metadata.updated,
          downloadable: true,
          isCustomerFile: true,
          userId: userId,
          accountantId: null,
      }

      setDoc(doc(firestore, 'userFiles', userId + uploadedFileInfo.fileName), uploadedFileInfo)

      requiredFileToUpload('')
    });
  }

  return (

    <div className='flex flex-wrap flex-col gap-5 justify-center items-center'>
    <form onSubmit={handleFileUpload}>
      <input type="file" className='flex flex-wrap flex-col justify-center items-center'/>
      <button type='submit' className='m-5 ml-20 p-2 outline outline-offset-2 outline-blue-500 rounded strong'>Upload File</button>
    </form>
    </div>
  )
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
  const [requiredFileToUpload, setRequiredFileToUpload] = useState('');

  if(user == null || user == undefined){
    return (<></>)
  }

  const requiredFilesQuery = query(requiredFilesRef, where('userId', '==', user.uid)).withConverter(FileListConverter)
  const existingFilesQuery = query(existingFilesRef, where('userId', '==', user.uid)).withConverter(FileListConverter)

  console.log(user)

  const userRequiredFiles = useCollectionData(requiredFilesQuery)
  const userExistingFiles = useCollectionData(existingFilesQuery)

  if(requiredFileToUpload == '' && userRequiredFiles[0] != undefined){
    setRequiredFileToUpload(userRequiredFiles[0][0].files[0])
  }

  return (
    <div className="flex flex-wrap flex-col gap-5 justify-center items-center xs:display-0 h-screen">
    <div className="flex flex-wrap flex-row gap-20">
    <FileList files={userRequiredFiles[0]} listName='Required Files'/>
    <FileList files={userExistingFiles[0]} listName='Uploaded Files'/>
    </div>
    <div className='flex flex-wrap flex-row gap-5 justify-center items-center'>
    <label>Select file to Upload</label>
    <select name="files" onChange={event => setRequiredFileToUpload(event.target.value)}>
    {(userRequiredFiles != null && userRequiredFiles[0] != null) ? userRequiredFiles[0][0].files.map(file => 
      <option value={file} key={file}>{file}</option>): <></> }
    </select>
    </div>{
      (userRequiredFiles[0] != undefined && userExistingFiles[0] != undefined) ?
        <FileUpload fileToUpload={requiredFileToUpload}
                    userId={user.uid}
                    requiredFiles={userRequiredFiles[0][0].files}
                    existingFiles={userExistingFiles[0][0].files}
                    requiredFileToUpload={setRequiredFileToUpload}
                    /> : <></>}

      </div>
  )
}
