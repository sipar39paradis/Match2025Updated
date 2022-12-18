/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useContext } from 'react'
import { AppContext, AppContextType } from '../../context/AppContext'
import { AuthModal, AuthModalEnum } from '../auth/AuthModal'

export function Header() {
  const { user } = useContext(AppContext) as AppContextType

  const [showModal, setShowModal] = React.useState(false)
  const [modalToDisplay, setModalToDisplay] =
    React.useState<AuthModalEnum | null>(null)

  function displayModal(modal: AuthModalEnum) {
    setModalToDisplay(modal)
    setShowModal(true)
  }

  return (
    <>
      {showModal && modalToDisplay && (
        <AuthModal
          authModalToDisplay={modalToDisplay}
          closeModal={setShowModal}
          switchModal={setModalToDisplay}
        ></AuthModal>
      )}
      <header className='header sticky top-0 left-0 w-full'>
        <div className='flex w-full flex-wrap px-5 lg:flex-nowrap lg:items-center lg:px-5 xl:px-10 2xl:px-20'>
          <div className='relative z-[99] max-w-[250px] lg:w-full xl:max-w-[350px]'>
            <a href='index.html' className='inline-block'>
              <img
                src={require('../../images/logo/logo-dark.svg').default}
                alt='logo'
                className='hidden h-[50px] dark:block'
              />
              <img
                src={require('../../images/logo/logo-light.svg').default}
                alt='logo'
                className='h-[50px] dark:hidden'
              />
            </a>
          </div>
          <div className='menu-wrapper fixed top-0 left-0 z-50 h-screen w-full justify-center bg-white p-5 dark:bg-dark lg:visible lg:static lg:flex lg:h-auto lg:justify-start lg:bg-transparent lg:p-0 lg:opacity-100 dark:lg:bg-transparent'>
            <div className='w-full self-center'>
              {!user && (
                <nav>
                  <ul className='navbar flex flex-col items-center justify-center space-y-5 text-center lg:flex-row lg:justify-start lg:space-x-10 lg:space-y-0'>
                    <li>
                      <a
                        href='#home'
                        className='menu-scroll inline-flex items-center justify-center text-center font-heading text-base text-dark-text hover:text-primary dark:hover:text-white'
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        href='#features'
                        className='menu-scroll inline-flex items-center justify-center text-center font-heading text-base text-dark-text hover:text-primary dark:hover:text-white'
                      >
                        Features
                      </a>
                    </li>
                    <li>
                      <a
                        href='#about'
                        className='menu-scroll inline-flex items-center justify-center text-center font-heading text-base text-dark-text hover:text-primary dark:hover:text-white'
                      >
                        About
                      </a>
                    </li>
                    <li>
                      <a
                        href='#team'
                        className='menu-scroll inline-flex items-center justify-center text-center font-heading text-base text-dark-text hover:text-primary dark:hover:text-white'
                      >
                        Team
                      </a>
                    </li>
                    <li>
                      <a
                        href='#pricing'
                        className='menu-scroll inline-flex items-center justify-center text-center font-heading text-base text-dark-text hover:text-primary dark:hover:text-white'
                      >
                        Pricing
                      </a>
                    </li>
                    <li>
                      <a
                        href='#support'
                        className='menu-scroll inline-flex items-center justify-center text-center font-heading text-base text-dark-text hover:text-primary dark:hover:text-white'
                      >
                        Support
                      </a>
                    </li>
                  </ul>
                </nav>
              )}
              {user && (
                <nav>
                  <ul className='navbar flex flex-col items-center justify-center space-y-5 text-center lg:flex-row lg:justify-start lg:space-x-10 lg:space-y-0'>
                    <li>
                      <a
                        href='/profile'
                        className='menu-scroll inline-flex items-center justify-center text-center font-heading text-base text-dark-text hover:text-primary dark:hover:text-white'
                      >
                        Profile
                      </a>
                    </li>
                    <li>
                      <a
                        href='/requests'
                        className='menu-scroll inline-flex items-center justify-center text-center font-heading text-base text-dark-text hover:text-primary dark:hover:text-white'
                      >
                        Requests
                      </a>
                    </li>
                    <li>
                      <a
                        href='/messages'
                        className='menu-scroll inline-flex items-center justify-center text-center font-heading text-base text-dark-text hover:text-primary dark:hover:text-white'
                      >
                        Messages
                      </a>
                    </li>
                    <li>
                      <a
                        href='/files'
                        className='menu-scroll inline-flex items-center justify-center text-center font-heading text-base text-dark-text hover:text-primary dark:hover:text-white'
                      >
                        Files
                      </a>
                    </li>
                  </ul>
                </nav>
              )}
            </div>
            <div className='absolute bottom-0 left-0 flex w-full items-center justify-between space-x-5 self-end p-5 lg:static lg:w-auto lg:self-center lg:p-0'>
              <button
                onClick={() => displayModal(AuthModalEnum.SignIn)}
                className='w-full whitespace-nowrap rounded bg-primary py-3 px-6 text-center font-heading text-white hover:bg-opacity-90 lg:w-auto'
              >
                Sign In
              </button>
              <button
                onClick={() => displayModal(AuthModalEnum.SignUp)}
                className='w-full whitespace-nowrap rounded bg-[#222C40] py-3 px-6 text-center font-heading text-white hover:bg-opacity-90 lg:w-auto'
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
