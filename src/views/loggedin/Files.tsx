import '../../i18n/config'
import { useTranslation } from 'react-i18next'
import React, { useContext, useState } from 'react'
import { AppContext, AppContextType } from '../../context/AppContext'
import { getStorage, uploadBytes, ref, getBlob } from 'firebase/storage'
import { ReactComponent as BlankFile } from '../../icons/BlankFile.svg'
import {
  collection,
  doc,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  where,
} from 'firebase/firestore'

const FOLDER_NAME = 'customerdata/'
const firestore = getFirestore()
const storage = getStorage()

interface FileInfo {
  userId: string
  fileName: string
  fullPath: string
}

interface ReloadProps {
  shouldReload: boolean
}

export function FileComponent(props: FileInfo) {
  const downloadFile = async () => {
    const fileRef = ref(storage, props.fullPath)
    const blob = await getBlob(fileRef)
    const blobUrl = URL.createObjectURL(blob)
    window.open(blobUrl, props.fileName)
  }

  return (
    <button
      onClick={downloadFile}
      className='
        truncate
        basis-1/12 
        justify-self-center 
        p-2
        mt-5
        rounded 
        space-x-5 
        transition
        ease-in-out
        hover:scale-110
        hover:outline 
        outline-gray-500 
        hover:bg-gray-200
        duration 500
        sm:text-0
        sm:p-0
        sm:basis-1/2
        md:basis-1/12
        lg:basis-1/12
        xxs:basis-1/2
        fill-gray-500 
        hover:fill-gray-900 
        hover:outline-gray-900
        font-light
        '
    >
      <BlankFile className='mb-2 ml-2 pt-2' />
      <span className='lg:text-sm md:text-sm m-0'>
        {props.fullPath.split('/')[2]}
      </span>
    </button>
  )
}

export function FilesDisplay(props: ReloadProps) {
  const { user } = useContext(AppContext) as AppContextType
  const [files, setFiles] = useState([])
  const [filesDisplayed, setFilesDisplayed] = useState(props.shouldReload)
  const userFiles = collection(firestore, 'userFiles')
  const userFilesQueryByUserId = query(
    userFiles,
    where('userId', '==', user.uid)
  )

  onSnapshot(userFilesQueryByUserId, (querySnapshot) => {
    setFiles(
      querySnapshot.docs.map((file) => (
        <FileComponent
          key={file.data().fileName}
          userId={file.data().userId}
          fullPath={file.data().filePath}
          fileName={file.data().fileName}
        />
      ))
    )
  })

  if (!filesDisplayed) {
    setFilesDisplayed(true)
  }

  return (
    <>
      <div className='flex flex-row'>{files}</div>
    </>
  )
}

export function UploadFilesComponent() {
  const [fileList, setFileList] = useState([])
  const [fileDisplay, setFileDisplay] = useState(
    <FilesDisplay shouldReload={false} />
  )
  const { user } = useContext(AppContext) as AppContextType

  const handleUploadFile = () => {
    fileList.forEach((file) =>
      uploadBytes(file.fileRef, file.file).then(async (snapshot) => {
        const fileInfo = {
          fileName: snapshot.metadata.name,
          filePath: snapshot.metadata.fullPath,
          createdAt: snapshot.metadata.timeCreated,
          updatedAt: snapshot.metadata.updated,
          downloadable: true,
          isCustomerFile: true,
          userId: user.uid,
          accountantId: null,
        }
        console.log(snapshot)
        setDoc(
          doc(firestore, 'userFiles', user.uid + fileInfo.fileName),
          fileInfo
        )
      })
    )

    setFileDisplay(<FilesDisplay shouldReload={true} />)
  }

  const handleFileDrop = (file) => {
    if (file.target.files[0] == undefined) {
      return
    }
    const fileRef = ref(
      storage,
      FOLDER_NAME + user.uid + '/' + file.target.files[0].name
    )
    fileList.push({
      file: file.target.files[0],
      fileRef: fileRef,
    })
    setFileList(fileList)
  }

  return (
    <>
      <div className='flex flex-wrap grid grid-cols-1'>
        <div className='rounded mb-20 bg-gray-100 outline outline-gray-200 outline-offset-2 grid grid-cols-1 place-content-center pb-10 m-20'>
          {fileDisplay}
        </div>
        <div className='rounded outline outline-offset-2 outline-gray-400/50 hover:outline-gray-400 pt-5 pb-5 w-1/2 ml-20'>
          <input
            type='file'
            accept='.png .jpg .jpeg .pdf .docx .excel .avif'
            multiple
            onChange={handleFileDrop}
          />
          <div>
            <button
              onClick={handleUploadFile}
              className='inline-flex w-full justify-center items-center rounded-full border border-transparent px-4 py-2 text-lg font-semibold text-white shadow-sm bg-gray-700 hover:bg-gray-500 sm:ml-3 sm:w-auto sm:text-sm'
            >
              Upload files
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export function Files() {
  const { t } = useTranslation()

  return (
    <main>
      <h1 className='text-3xl font-bold tracking-tight text-gray-900  pt-28'>
        {t('Files.title')}
        <UploadFilesComponent />
      </h1>
    </main>
  )
}
