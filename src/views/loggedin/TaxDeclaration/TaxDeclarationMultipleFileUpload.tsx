import { t } from 'i18next'
import { title } from 'process'
import React, { useCallback } from 'react'
import Dropzone from 'react-dropzone'
import { TaxReport } from './types/TaxReport/TaxReport'
import mapAllowedMultipleFiles, { getPDFTaxReport } from '../../../utils/FileMapper';
import { uploadFileToStorage, removeRequiredfile, appendExistingFiles } from '../../../client/firebaseClient'
import { Questionnaire } from './types/Questionnaire/Questionnaire'
import { useParams } from 'react-router-dom'

interface MultipleFileDropBoxProps{
    fileNames: string,
    formData: Questionnaire
}

function MultipleFileDropBox(multipleFileDropBoxProps: MultipleFileDropBoxProps){
    const {fileNames, formData} = multipleFileDropBoxProps;
    const { id } = useParams();

    const handleFileUpload = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        uploadFileToStorage(
          fileNames + '_' + file?.name,
          acceptedFiles[0],
          formData?.personalInformations
        ).then((res) => {
          removeRequiredfile(fileNames, id);
          appendExistingFiles(fileNames, id);
        });
      }, []);

    return (
        <>
        <h1>{fileNames}</h1>
        <div className="flex items-center justify-center w-full">
            <Dropzone onDrop={handleFileUpload}>
                {({ getRootProps, getInputProps }) => (
                    <section className="w-full">
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <label>
                                <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <svg
                                        aria-hidden="true"
                                        className="w-10 h-10 mb-3 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                        ></path>
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">{title}</span>
                                    </p>
                                </div>
                            </label>
                        </div>
                    </section>
                )}
            </Dropzone>
        </div>
        </>
    )
}

export default function TaxDeclarationAllowedMultipleFileUpload(formData: Questionnaire) {
    const { id } = useParams();
    const filesArr = mapAllowedMultipleFiles(formData?.taxReport);


    return (<>
            {
                filesArr?.map((file) => <MultipleFileDropBox fileNames={file} formData={formData} />)
            }
    </>)
}