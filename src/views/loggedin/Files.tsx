import '../../i18n/config'
import { useTranslation } from 'react-i18next';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext, AppContextType } from '../../context/AppContext'
import { getStorage, uploadBytes, ref, listAll, StorageReference, getDownloadURL, } from 'firebase/storage'
import { arrayBuffer } from 'stream/consumers';
const FOLDER_NAME = 'customerdata/'

interface FileUrl{
    url: string;
    fullPath: string;
}

export function FileDisplay(props: FileUrl){

    const isPicture = (itemRef: StorageReference) => {
        return !(itemRef.fullPath.includes('.pdf'))
    }

    return (<>
        <div className="p-2 rounded-lg shadow-xl lg:max-w-fit lg:min-w-fit peer">

        {   (isPicture)
            ?
            <img
                className="object-cover w-full lg:w-40 lg:h-40"
                src={props.url}
                alt="image"
            />
            :
            <object
                className="object-cover w-full lg:w-40 lg:h-40"
                data={props.url}
                type="application/pdf"
            />
        }
        </div>

    </>)
}

export function UploadFilesComponent(){
    const { user } = useContext(AppContext) as AppContextType
    const [fileList, setFileList] = useState([])
    const [fileDisplay, setFileDisplay] = useState([])
    const storage = getStorage()
    

    const handleUploadFile = async() =>{
        fileList.forEach(file => 
            uploadBytes(file.fileRef, file.file).then((snapshot) => 
            {
                console.log('Uploading file')
            }
        ))

        displayFiles()
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

    const displayFiles = () => {
        const folderRef = ref(storage, FOLDER_NAME + user.uid)
        listAll(folderRef).then((res) => {
            res.items.forEach(
                (itemRef) => {
                    getDownloadURL(itemRef).then((res) =>{
                            setFileDisplay( fileDisplay => [...fileDisplay,  <FileDisplay url={res} fullPath={itemRef.fullPath} key={res}/>])
                    })
                }
            )
        })
    }

    return (
      <>
      <div>
        <input type="file" accept='.png .jpg .jpeg .pdf .docx .excel' multiple onChange={handleFileDrop}/> 
        <div>
            <button 
            onClick={handleUploadFile}
            className='inline-flex w-full justify-center items-center rounded-full border border-transparent px-4 py-2 text-lg font-semibold text-white shadow-sm bg-gray-700 hover:bg-gray-500 sm:ml-3 sm:w-auto sm:text-sm'
            >
                Upload files
            </button>
        </div>
        <div>
            {fileDisplay}
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
