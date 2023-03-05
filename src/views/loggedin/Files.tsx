import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BreadcrumbWrapper } from '../../components/profile/BreadcrumbWrapper'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext, AppContextType } from '../../context/AppContext'
import { getAllQuestionnaires } from '../../client/firebaseClient'


export function Files() {
  const { user, storage } = useContext(AppContext) as AppContextType;
  const [questionnaires, setQuestionnaires] = useState([])



  return (
    <main>
      <div className="flex justify-start flex-col w-screen p-10 sm:px-30 lg:px-40">
        <BreadcrumbWrapper
          breadcrumbEndpoint={['profile', 'documents']}
          breadcrumbName={['Mon Compte', 'Mes Documents']}
        >
      </BreadcrumbWrapper>
      </div>
    </main>
  )
}
