import React, { useContext, useState } from 'react'
import { Disclosure } from '@headlessui/react'
import {
  Bars3Icon,
  BellIcon,
  ChatBubbleLeftIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LanguageDropdown } from './LanguageDropdown'
import { ProfileDropdown } from './ProfileDropdown'
import { classNames } from '../../utils/utils'
import { AppContext, AppContextType } from '../../context/AppContext'
import { AuthModal, AuthModalEnum } from '../auth/AuthModal'

export function Header() {
  const { user } = useContext(AppContext) as AppContextType
  const { t } = useTranslation()
  const [selectedTabIndex, setSelectedTabIndex] = useState(0)
  const [showModal, setShowModal] = React.useState(false)
  const [modalToDisplay, setModalToDisplay] =
    React.useState<AuthModalEnum | null>(null)

  const navigation = [
    { name: t('Home.title'), url: '/' },
    { name: t('Prices.title'), url: '/prices' },
    { name: t('About.title'), url: '/about' },
    { name: t('Contact.title'), url: '/contact' },
  ]

  function switchTab(tabIndex: number) {
    setSelectedTabIndex(tabIndex)
  }

  function displayModal(modal: AuthModalEnum) {
    setModalToDisplay(modal)
    setShowModal(true)
  }

  return (
    <div className='min-h-full'>
      <Disclosure as='nav' className='bg-gray-800'>
        {({ open }: { open: boolean }) => (
          <>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
              <div className='flex h-16 items-center justify-between'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0'>
                    <img
                      className='h-8 w-8'
                      src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
                      alt='Your Company'
                    />
                  </div>
                  <span className='ml-3 text-white'>Impot Match</span>
                  <div className='hidden md:block'>
                    <div className='ml-10 flex items-baseline space-x-4'>
                      {navigation.map((item, index) => (
                        <Link
                          key={index}
                          to={item.url}
                          className={classNames(
                            index === selectedTabIndex
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium'
                          )}
                          onClick={() => switchTab(index)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className='hidden md:block'>
                  <div className='flex items-center'>
                    {showModal && modalToDisplay && (
                      <AuthModal
                        authModalToDisplay={modalToDisplay}
                        closeModal={setShowModal}
                        switchModal={setModalToDisplay}
                      ></AuthModal>
                    )}
                    <>
                      <LanguageDropdown />
                      {user && (
                        <>
                          <ChatBubbleLeftIcon className='stroke-gray-300 cursor-pointer h-5 px-2' />

                          <BellIcon className='stroke-gray-300 cursor-pointer h-5 px-2'></BellIcon>
                          <ProfileDropdown user={user} />
                        </>
                      )}
                      {!user && (
                        <div>
                          <button
                            onClick={() => displayModal(AuthModalEnum.SignIn)}
                            className='inline-flex w-full justify-center items-center rounded-full border border-transparent px-4 py-2 text-lg font-semibold text-white shadow-sm hover:bg-gray-700 sm:ml-3 sm:w-auto sm:text-sm'
                          >
                            Sign in
                          </button>
                          <button
                            onClick={() => displayModal(AuthModalEnum.SignUp)}
                            className='mt-3 inline-flex w-full justify-center items-center rounded-full border border-gray-300 bg-white px-2 py-2 text-lg font-semibold text-gray-700 shadow-sm hover:bg-gray-100 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                          >
                            Sign Up
                          </button>
                        </div>
                      )}
                    </>
                  </div>
                </div>
                <div className='-mr-2 flex md:hidden'>
                  {/* Mobile menu button */}
                  <Disclosure.Button className='inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                    <span className='sr-only'>Open main menu</span>
                    {open ? (
                      <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                    ) : (
                      <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>
    </div>
  )
}
