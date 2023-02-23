import { Firestore } from 'firebase/firestore';
import { FirebaseStorage, ref, uploadBytes } from 'firebase/storage';
import React, { useCallback, useContext, useState } from 'react';
import { appendExistingFiles, getExistingFiles, getRequiredFiles, removeExistingfile, removeRequiredfile, writeRequiredFiles } from '../../../client/firebaseClient';
import { AppContext, AppContextType } from '../../../context/AppContext';
import Dropzone from 'react-dropzone';
import { NavigateOptions, URLSearchParamsInit } from 'react-router-dom';
import { TaxDeclarationStep } from './types/TaxReport/TaxDeclarationStep';

const STORAGE_BASE_FOLDER = 'customerdata/';

interface TaxDeclarationFileUploadProps{
    setSearchParams?: (nextInit?: URLSearchParamsInit | ((prev: URLSearchParams) => URLSearchParamsInit), navigateOpts?: NavigateOptions) => void
}

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
    userEmail: string;
    setHidden: (hidden: boolean) => void;
}

interface ExistingFileNameComponentProps {
    fileName: string;
    requiredFiles: Array<string>;
    setReqFiles: (reqFiles: Array<string>) => void;
    userId: string;
    userEmail: string;
}

function ExistingFileNameComponent(props: ExistingFileNameComponentProps){
    const { fileName, requiredFiles, setReqFiles, userId, userEmail } = props;

    const onClickHandle = () => {
        if(confirm('Are you sure you wish to delete this file?')){
            requiredFiles.push(fileName)
            removeExistingfile(fileName, userId, userEmail)
            setReqFiles(requiredFiles)
        }else {
        }    
    }

    return (
        <h2>{fileName}{<><button onClick={onClickHandle} type="button" className="m-1 px-3 py-2 text-xs font-medium text-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Supprimer Fichier</button></>}</h2>
    )
}

function FileNameComponent(props: FileNameComponentProps){
    const { fileName,  hidden, requiredFiles, setReqFiles, userId, setHidden, userEmail } = props;

    const onClickHandle = () => {
        if(confirm('Are you sure you wish to delete this file?')){
            requiredFiles.push(fileName)
            removeExistingfile(fileName, userId, userEmail)
            setReqFiles(requiredFiles)
            setHidden(false)
        }else {
        }
    }

    return (
        <h2 className="mt-2 mb-0">{fileName}{ (hidden) ? <><button onClick={onClickHandle} type="button" className="m-1 px-3 py-2 text-xs font-medium text-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Supprimer Fichier</button>
        </> : <></>}</h2>
    )
}

function IndividualFileUpload(props: FileUploadProps){
    const { storage, userId, fileName, setReqFiles, requiredFiles, userEmail } = props
    const [hidden, setHidden] = useState(false)
    
    const handleFileUpload = useCallback( (acceptedFiles) => {
        const constructedFileName = userEmail + '/' + fileName + '_' + acceptedFiles[0]?.name
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
            userEmail={userEmail}
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
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Cliquez pour télécharger</span> ou glissez-déposez</p>
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

export function TaxDeclarationFileUpload (props: TaxDeclarationFileUploadProps){
    const { firestore, storage, user } = useContext(AppContext) as AppContextType
    const { setSearchParams } = props;
    const [ reqFiles, setReqFiles ] = useState([]);
    const [ existingFiles, setExistingFiles ] = useState([]);
    const [fetchedReqFiles, setFetchedReqFiles] = useState(false);
    const [fetchedExFiles, setFetchedExFiles ] = useState(false);

    
    if(!fetchedReqFiles){
        getRequiredFiles(user?.uid).then((res) => {
          console.log(res)
            setReqFiles(res?.files);
            setFetchedReqFiles(true);
        }).catch((err) => console.log(err))
    }

    if(!fetchedExFiles){
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
        {
            existingFiles?.map(item => 
                <ExistingFileNameComponent 
                key={item + user?.uid} 
                fileName={item} 
                requiredFiles={reqFiles} 
                setReqFiles={setReqFiles} 
                userId={user?.uid}
                userEmail={user?.email}
                />
                )
        }
        <div className="w-full flex justify-between mt-4">
            <input
              type="submit"
              value="Précédant"
              onClick={() => {
                setSearchParams({ step: TaxDeclarationStep.DEDUCTIONS_AND_TAX_CREDIT });
              }}
              className="bg-[#222C40] hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded cursor-pointer"
            />
            <input
              type="submit"
              value="Suivant"
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
              onClick={() => {
                if(reqFiles && reqFiles?.length == 0){
                    setSearchParams( {step: TaxDeclarationStep.REVIEW})
                }else{
                    console.log(reqFiles)
                    alert('Assurez-vous de télécharger tous les fichiers requis.')
                }
              }}
            />
          </div>
    </>
  
}