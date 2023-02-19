import { collection, Firestore, query, where } from 'firebase/firestore';
import { FirebaseStorage, ref, uploadBytes } from 'firebase/storage';
import React, { useCallback, useContext, useState } from 'react';
import { appendExistingFiles, getExistingFiles, getRequiredFiles, removeExistingfile, removeRequiredfile, writeRequiredFiles } from '../../../client/firebaseClient';
import { AppContext, AppContextType } from '../../../context/AppContext';
import { ReactComponent as CheckMark } from '../../../icons/CheckMark.svg'
import { useCollectionData } from  'react-firebase-hooks/firestore'
import Dropzone from 'react-dropzone'
import { FileListConverter } from '../../../interfaces/Files';

const FIRESTORE_REQUIRED_FILES_COLLECTION = 'UserRequiredFiles';
const FIRESTORE_EXISTING_FILES_COLLECTIONS = 'UserExistingFiles';
const STORAGE_BASE_FOLDER = 'customerdata/';

interface FileUploadProps{
    fileName: string
    firestore: Firestore
    storage: FirebaseStorage
    userId: string
    requiredFiles: Array<string>
    userEmail: string
    setReqFiles: (reqFiles: Array<string>) => void;
}

interface FileNameComponentProps{
    fileName: string;
    hidden: boolean;
    requiredFiles: Array<string>;
    setReqFiles: (reqFiles: Array<string>) => void;
    userId: string;
    setHidden: (hidden: boolean) => void;
}



function FileNameComponent(props: FileNameComponentProps){
    const { fileName,  hidden, requiredFiles, setReqFiles, userId, setHidden } = props;

    const onClickHandle = () => {
        if(confirm('Are you sure you wish to delete this file?')){
            requiredFiles.push(fileName)
            removeExistingfile(fileName, userId)
            writeRequiredFiles(requiredFiles, userId)
            setReqFiles(requiredFiles)
            setHidden(false)
        }else {
        }
    }

    return (
        <h2>{fileName}{ (hidden) ? <><button onClick={onClickHandle} type="button" className="m-1 px-3 py-2 text-xs font-medium text-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Remove File</button>
        </> : <></>}</h2>
    )
}

function IndividualFileUpload(props: FileUploadProps){
    const { storage, userId, fileName, setReqFiles, requiredFiles } = props
    const [hidden, setHidden] = useState(false)
    
    const handleFileUpload = useCallback( (acceptedFiles) => {
        const constructedFileName = userId + '/' + fileName + '_' + acceptedFiles[0]?.name
        const fileRef = ref(storage, STORAGE_BASE_FOLDER + constructedFileName)
        const file = acceptedFiles[0]
        uploadBytes(fileRef, file).then((snapshot) => {
            removeRequiredfile(fileName, userId)
            appendExistingFiles(fileName, userId)
            setHidden(!hidden)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <>
           <FileNameComponent 
            fileName={fileName} 
            setReqFiles={setReqFiles} 
            hidden={hidden}
            requiredFiles={requiredFiles} 
            userId={userId} 
            setHidden={setHidden}
            />
           { (!hidden)? <div className="flex items-center justify-center w-full" >
                <Dropzone onDrop={handleFileUpload}>
                {({getRootProps, getInputProps}) => (
                    <section className="w-full">
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <label >
                                <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                </div>
                        </label>
                        </div>
                    </section>
                )}
                </Dropzone>
            </div> : <></> }
        </>
    )
}

export function TaxDeclarationFileUpload (){
    const { firestore, storage, user } = useContext(AppContext) as AppContextType
    const [ reqFiles, setReqFiles ] = useState([]);
    const [ existingFiles, setExistingFiles ] = useState([]);
    const [fetchedReqFiles, setFetchedReqFiles] = useState(false);
    const [fetchedExFiles, setFetchedExFiles ] = useState(false);

    if(!fetchedReqFiles && reqFiles.length == 0){
        getRequiredFiles(user?.uid).then((res) => {
            setReqFiles(res?.files);
            setFetchedReqFiles(true);
        })
    }

    if(!fetchedExFiles && existingFiles?.length == 0){
        getExistingFiles(user?.uid).then((res) => {
            setExistingFiles(res?.files);
            setFetchedExFiles(true);
        })
    }

    return <>
        {
            reqFiles?.map(item => 
            <IndividualFileUpload 
                requiredFiles={reqFiles} 
                userId={user?.uid} 
                userEmail={user?.email} 
                fileName={item} 
                firestore={firestore} 
                storage={storage} 
                key={item}
                setReqFiles={setReqFiles}
                />)
        }
        {/* { user?.uid &&
         userRequiredFiles[0] &&
          userRequiredFiles[0][0] &&
           userRequiredFiles[0][0]?.files &&
            userRequiredFiles[0][0]?.files?.map(item => <IndividualFileUpload requiredFiles={userRequiredFiles[0][0]?.files} userId={user?.uid} fileName={item} firestore={firestore} storage={storage} key={item}></IndividualFileUpload>)}
        <label>Already uploaded files:</label>
        {userExistingFiles[0] &&
          userExistingFiles[0][0] &&
          userExistingFiles[0][0]?.files &&
          userExistingFiles[0][0]?.files.map(item => <ExistingFile userId={user?.uid} fileName={item} key={item}/>)
          } */}
    </>
}