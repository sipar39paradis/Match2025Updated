import { Menu, Transition } from '@headlessui/react'
import React, { Fragment, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext, AppContextType } from '../../context/AppContext'
import { classNames } from '../../utils/utils'

interface ProfileDropdownProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any
}

export function ProfileDropdown(props: ProfileDropdownProps) {
  const { signOut } = useContext(AppContext) as AppContextType
  const { user } = props
  const navigate = useNavigate()

  return (
    <Menu as='div' className='relative px-2 h-fit'>
      <div>
        <Menu.Button className='flex max-w-xs items-center rounded-full bg-gray-800 text-sm'>
          <span className='sr-only'>Open user menu</span>
          <img className='h-8 w-8 rounded-full' src={user?.photoURL} alt='' />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <Menu.Item>
            {({ active }: { active: boolean }) => (
              <span
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700 hover:cursor-pointer'
                )}
                onClick={() => navigate('/platform')}
              >
                Profile
              </span>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }: { active: boolean }) => (
              <span
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700 hover:cursor-pointer'
                )}
                onClick={() => signOut()}
              >
                Sign out
              </span>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
