import '../../i18n/config'
import { useTranslation } from 'react-i18next';
import React, { useContext, useState } from 'react';
import { AppContext, AppContextType } from '../../context/AppContext'
import { getStorage, uploadBytes, ref, listAll, StorageReference, getDownloadURL, } from 'firebase/storage'
import {ReactComponent as BlankFile} from '../../icons/BlankFile.svg'

const FOLDER_NAME = 'customerdata/'

interface FileInfo{
    url: string;
    fullPath: string;
}

interface ReloadProps{
    shouldReload: boolean;
}

export function FileComponent(props: FileInfo){
    return (<div className='center'>
        <BlankFile className='transition ease-in-out delay-150 hover:-translate-y-1 fill-blue-500 lg:w-1/2 mt-2 mb-2'/>
    </div>
    )

}

export function FilesDisplay(props: ReloadProps){
    const { user } = useContext(AppContext) as AppContextType
    const storage = getStorage()
    const [files, setFiles] = useState([])
    const [filesDisplayed, setFilesDisplayed] = useState(props.shouldReload)

    const displayFiles = () => {
        const folderRef = ref(storage, FOLDER_NAME + user.uid)
        listAll(folderRef).then((res) => {
            res.items.forEach(
                (itemRef) => {
                    getDownloadURL(itemRef).then((res) =>{
                            setFiles( fileDisplay => [...fileDisplay,  <FileComponent url={res} fullPath={itemRef.fullPath} key={res}/>])
                    })
                }
            )
        })
    }

    if(!filesDisplayed){
        displayFiles()
        setFilesDisplayed(true)
    }
    
    return (
    <>
        <div className='grid grid-cols-5 gap-4 place-items-center'>
            {files}
        </div>
    </>
    )
}

export function UploadFilesComponent(){
    const [fileList, setFileList] = useState([])
    const [fileDisplay, setFileDisplay] = useState(<FilesDisplay shouldReload={false}/>)
    const { user } = useContext(AppContext) as AppContextType
    const storage = getStorage()
    

    const handleUploadFile = async() =>{
        fileList.forEach(file => 
            uploadBytes(file.fileRef, file.file).then((snapshot) => 
            {
                console.log('Uploading file')
            }
        ))
        
        setFileDisplay(<FilesDisplay shouldReload={false} />)
    }

    const handleFileDrop = (file) => { 
        if(file.target.files[0] == undefined){
            return;
        }
        const fileRef = ref(storage, FOLDER_NAME + user.uid  + '/' + file.target.files[0].name)
        fileList.push({
            'file': file.target.files[0],
            'fileRef': fileRef
        })
        setFileList(fileList)
    }



    return (
      <>
      <div>
        <div >
            {fileDisplay}
        </div>
        <input type="file" accept='.png .jpg .jpeg .pdf .docx .excel' multiple onChange={handleFileDrop}/> 
        <div >
            <button 
            onClick={handleUploadFile}
            className='inline-flex w-full justify-center items-center rounded-full border border-transparent px-4 py-2 text-lg font-semibold text-white shadow-sm bg-gray-700 hover:bg-gray-500 sm:ml-3 sm:w-auto sm:text-sm'
            >
                Upload files
            </button>
        </div>
      </div>
      </>
    )
}

export function Files(){
    const { t } = useTranslation();

    return (
        <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {t('Files.title')}
            <UploadFilesComponent/>
          </h1>
        </div>
      </main>
    )
}
