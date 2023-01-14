import '../../i18n/config'
import { useTranslation } from 'react-i18next'
import React from 'react'

export function Requests() {
  const { t } = useTranslation()

  return (
    <main>
      <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>
        <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
          {t('Requests.title')}
        </h1>
      </div>
    </main>
  )
}
