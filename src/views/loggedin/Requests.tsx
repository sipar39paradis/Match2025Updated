import '../../i18n/config'
import { useTranslation } from 'react-i18next'
import React, { useEffect, useState } from 'react'
import { getAllUserProfiles } from '../../client/firebaseClient'
import { UserProfile } from '../../interfaces/User'

export function Requests() {
  const { t } = useTranslation()
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>(null)

  useEffect(() => {
    const call = async () => {
      setUserProfiles(await getAllUserProfiles())
    }
    call()
  })

  return (
    <main>
      <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>
        <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
          {t('Requests.title')}
        </h1>
        {userProfiles ? 
          userProfiles.map((profile) => 
            <div
            key={profile.id}>
              {profile.firstName} {profile.lastName}
            </div>
          ):null
        }
      </div>
    </main>
  )
}
