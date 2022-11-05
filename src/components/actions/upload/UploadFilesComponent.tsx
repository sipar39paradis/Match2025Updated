import React, { useContext, useState } from 'react';
import { AppContext, AppContextType } from '../../../context/AppContext'
import { getStorage, uploadBytes, ref} from 'firebase/storage'

export function UploadedFileComponent(){
    return (<></>)
}

export function UploadFilesComponent(){
    const [fileList, setFileList] = useState([])
    const storage = getStorage()
    
    const handleUploadFile = async() =>{
        fileList.forEach(item => 
            uploadBytes(item.fileRef, item.file).then((snapshot) => 
            {
                console.log('Uploading file')
            }
        ))
    }

    const handleFileDrop = (file) => { 
        if(file.target.files[0] == undefined){
            return;
        }
        const fileRef = ref(storage, 'customerdata/' + file.target.files[0].name)
        fileList.push({
            'file': file.target.files[0],
            'fileRef': fileRef
        })
        setFileList(fileList)
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
      </div>
      </>
    )
}