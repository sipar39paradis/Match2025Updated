import '../../i18n/config'
import React, { useContext } from 'react'
import { AppContext, AppContextType } from '../../context/AppContext'
import { Card, Dropdown, Rating } from 'flowbite-react'

export function Profile() {
  const { user } = useContext(AppContext) as AppContextType

  return (
    <main>
      <div className='flex justify-center flex-col w-screen pt-28 p-10 sm:px-30 lg:px-40'>
        <div className='flex flex-row justify-center'>
          <div className='max-w-xs'>
            <Card>
              <div className='flex justify-end px-4 pt-4'>
                <Dropdown inline={true} label=''>
                  <Dropdown.Item>
                    <a
                      href='#'
                      className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white'
                    >
                      Edit
                    </a>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <a
                      href='#'
                      className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white'
                    >
                      Export Data
                    </a>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <a
                      href='#'
                      className='block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white'
                    >
                      Delete
                    </a>
                  </Dropdown.Item>
                </Dropdown>
              </div>
              <div className='flex flex-col items-center pb-10'>
                <img
                  className='mb-3 h-32 w-32 rounded-full shadow-lg'
                  src={user?.photoURL}
                  alt='Bonnie image'
                />
                <div className='mb-1'>
                  <Rating>
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star filled={false} />
                    <p className='ml-2 text-sm font-medium text-gray-500 dark:text-gray-400'>
                      4.95 out of 5
                    </p>
                  </Rating>
                </div>
                <hr className='mb-1 mx-auto w-48 h-1 bg-gray-200 rounded border-0 md:my-10'></hr>
                <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
                  {user?.displayName}
                </h5>
                <span className='text-sm text-gray-500 dark:text-gray-400'>
                  Accountant
                </span>
                <hr className='my-8 h-px bg-gray-200 border-0 md:my-10'></hr>
                <div className='mt-4 flex space-x-3 lg:mt-6'>
                  <a
                    href='#'
                    className='inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                  >
                    Add friend
                  </a>
                  <a
                    href='#'
                    className='inline-flex items-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700'
                  >
                    Message
                  </a>
                </div>
              </div>
            </Card>
          </div>

          <div className='flex w-8/12 px-20'>
            <div className='flex flex-col justify-start text-left w-full'>
              <h2 className='mb-1 text-2xl font-semibold text-gray-900 dark:text-white'>
                {user?.displayName}
              </h2>
              <span className='text-sm text-gray-500 dark:text-gray-400'>
                Accountant
              </span>

              <h3 className='font-semibold py-8 text-xl'>About</h3>
              <div className='font-medium text-m'>
                <h4>Lives in Montreal, Canada</h4>
                <h4>Speaks English, Español, Français</h4>
              </div>

              <hr className='m-8 flex justify-self-center self-center mb-2 w-10/12 h-0.5 bg-gray-200 rounded border-0 md:my-10'></hr>

              <h3 className='font-semibold py-8 text-xl'>Clients</h3>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
