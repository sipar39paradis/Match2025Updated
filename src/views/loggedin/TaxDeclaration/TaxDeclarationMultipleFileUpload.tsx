import { t } from 'i18next'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import Dropzone from 'react-dropzone'
import { TaxReport } from './types/TaxReport/TaxReport'
import { uploadFileToStorage, removeRequiredfile, appendExistingFiles, getExistingFiles, getRequiredFiles } from '../../../client/firebaseClient'
import { Questionnaire } from './types/Questionnaire/Questionnaire'
import { useParams } from 'react-router-dom'
import { QuestionnaireContext, QuestionnaireContextType } from './context/QuestionnaireContext'

interface MultipleFileDropBoxProps{
    fileNames: string,
    formData: Questionnaire
}

const DEPENSES_EMPLOIS = 'Dépenses liées à votre emploi';
const REMBOURSEMENTS_TPS_TVH = 'Remboursement de la TPS/TVH'
const FRAIS_REPAS_LOGEMENTS = 'Frais de repas et de logement'
const REVENU_EN_INTERETS_NON_DECLARE = 'revenu en intérêts'
const REVENU_EN_DIVIDENDES_NON_DECLARE = 'revenu en dividendes'
const REVENU_DE_SOCIETE_NON_DECLARE = 'revenu de societe'
const REER_DE_CONJOINT = 'REER de conjoint'
const FERR_DE_CONJOINT = 'FERR DE CONJOINT'
const RRSP_OR_RRIP_DEDUCTIONS = 'Formulaire T746'
const OTHER_TUITION_FEETS = 'Autres frais de scolarité'
const COTISATIONS_REER = 'Cotisations au REER'
const CHARITABLE_DONATIONS = 'Dons de bienfaisance'
const POLTIICAL_DONATIONS = 'Contributions Politiques'
const MEDICAL_FEES = 'Frais médicaux'
const COTISATIONS_SYNDICALES = 'Cotisations Syndicales'
const PENSION_ALIMENTAIRE = 'Pension Alimentaire'
const IMPOT_PAYS_ETRANGER = 'Impot à un pays étranger'
const REGION_ELOIGNEE = 'Région éloignée'
const FOREIGN_INCOME = 'Revenu de sources étrangères'

export function mapAllowedMultipleFiles(taxReport: TaxReport): Array<string> {
  const filesArr = []

  const studentExpenses = taxReport?.studentExpenses;
  const investmentIncomes = taxReport?.investmentIncomes;


  if (taxReport?.medicalExpenses) {
    filesArr.push(MEDICAL_FEES)
  }

  if (taxReport?.otherDeductions?.paidUnionOrProfessionalDues) {
    filesArr.push(COTISATIONS_SYNDICALES)
  }

  if (taxReport?.otherDeductions?.paidSpousalOrChildSupport) {
    filesArr.push(PENSION_ALIMENTAIRE)
  }

  if (taxReport?.otherDeductions?.paidForeignTaxes) {
    filesArr.push(IMPOT_PAYS_ETRANGER)
  }

  if (taxReport?.otherDeductions?.northernResidentsDeduction) {
    filesArr.push(REGION_ELOIGNEE)
  }

  if (investmentIncomes?.foreignIncomes) {
    filesArr.push(FOREIGN_INCOME);
  }

  if (studentExpenses?.otherTuitionsFees) {
    filesArr.push(OTHER_TUITION_FEETS)
  }

  if (taxReport?.workIncomes?.jobRelatedExpenses) {
    filesArr.push(DEPENSES_EMPLOIS)
  }

  if (taxReport?.workIncomes?.taxRefund) {
    filesArr.push(REMBOURSEMENTS_TPS_TVH)
  }

  if (taxReport?.workIncomes?.mealsAndAccomodation) {
    filesArr.push(FRAIS_REPAS_LOGEMENTS)
  }

  if (taxReport?.workIncomes?.unionsOrProfessionalDues) {
    filesArr.push(COTISATIONS_SYNDICALES)
  }

  if (taxReport?.investmentIncomes?.nonDeclaredInterestDividendPartnershipIncome) {
    if (taxReport?.investmentIncomes?.interestSlip) {
      filesArr.push(REVENU_EN_INTERETS_NON_DECLARE)
    }

    if (taxReport?.investmentIncomes?.dividendSlip) {
      filesArr.push(REVENU_EN_DIVIDENDES_NON_DECLARE)
    }

    if (taxReport?.investmentIncomes?.partnershipIncomes) {
      filesArr.push(REVENU_DE_SOCIETE_NON_DECLARE)
    }
  }

  if (taxReport?.otherIncomes?.RRSPorRRIFincome) {
    if (taxReport?.otherIncomes?.spousalRRSP) {
      filesArr.push(REER_DE_CONJOINT);
    }

    if (taxReport?.otherIncomes?.spousalRRIF) {
      filesArr.push(FERR_DE_CONJOINT);
    }

    if (taxReport?.otherIncomes?.RRSPorRRIFdeductions) {
      filesArr.push(RRSP_OR_RRIP_DEDUCTIONS);
    }
  }

  if (taxReport?.taxDeductions?.pensionPLan) {
    if (taxReport?.taxDeductions?.RRSPcontributions) {
      filesArr.push(COTISATIONS_REER)
    }
  }

  if (taxReport?.donations?.charitableDonations) {
    filesArr.push(CHARITABLE_DONATIONS)
  }

  if (taxReport?.donations?.politicalContributions) {
    filesArr.push(POLTIICAL_DONATIONS)
  }

  return filesArr;
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
        );
      }, []);

    return (
        <>
        <h2>{fileNames}</h2>
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
                                        <span className="font-semibold">{fileNames}</span>
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

interface QuestionnaireProps {
    questionnaire: Questionnaire;
}

export default function TaxDeclarationAllowedMultipleFileUpload(props: QuestionnaireProps) {
    const { id } = useParams();
    const [filesArr, setFilesArr] = useState([])
    const {
        questionnaires,
      } = useContext(QuestionnaireContext) as QuestionnaireContextType;

    const [isMinimized, setIsMinimized] = useState(false);
  
    useEffect(() => {
        setFilesArr(mapAllowedMultipleFiles(questionnaires?.get(id)?.taxReport));
      }, [id, questionnaires]);
    

    const toggleMinimized = () => {
      setIsMinimized((prevState) => !prevState);
    };
  
    return (
      <div className="bg-gray-200 p-4 rounded-lg">
        <div
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={toggleMinimized}
        >
          <h1 className="text-lg font-medium">Autres Fichiers</h1>
          <button className="focus:outline-none">
            {isMinimized ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8h16M4 16h16"
                />
              </svg>
            )}
          </button>
        </div>
        {!isMinimized && (
          <div>
            {filesArr?.map((file) => (
              <MultipleFileDropBox fileNames={file} key={file} formData={questionnaires?.get(id)} />
            ))}
          </div>
        )}
      </div>
    );
  }