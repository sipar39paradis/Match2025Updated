import React, { MutableRefObject, useRef } from 'react'
import { Files } from './Files'
import { Messages } from './Messages'
import { Profile } from './Profile'
import { Requests } from './Requests'

enum PlatformTabEnum {
  FILE = 'file',
  MESSAGES = 'messages',
  PROFILE = 'profile',
  REQUEST = 'request',
}

export function Platform() {
  const [activeSubTab, setActiveSubTab] = React.useState(
    PlatformTabEnum.PROFILE
  )
  const profileTabRef = useRef(null)
  const messageTabRef = useRef(null)
  const requestTabRef = useRef(null)
  const fileTabRef = useRef(null)

  function renderTab(tab: PlatformTabEnum) {
    switch (tab) {
      case PlatformTabEnum.MESSAGES:
        return <Messages></Messages>
      case PlatformTabEnum.REQUEST:
        return <Requests></Requests>
      case PlatformTabEnum.FILE:
        return <Files></Files>
      default:
        return <Profile></Profile>
    }
  }

  function switchTab(tab: PlatformTabEnum, ref: MutableRefObject<HTMLElement>) {
    const tabRefs = [profileTabRef, messageTabRef, requestTabRef, fileTabRef]

    tabRefs.forEach((tabRef) => {
      if (tabRef === ref) {
        ref.current.className += ' active'
      } else {
        const style = tabRef.current.className.replace(' active', ' ')
        tabRef.current.className = style
      }
    })
    setActiveSubTab(tab)
  }

  return (
    <>
      <nav className='pt-28'>
        <ul className='navbar flex flex-col items-center justify-center space-y-5 text-center lg:flex-row lg:space-x-10 lg:space-y-0'>
          <li>
            <span
              onClick={() => switchTab(PlatformTabEnum.PROFILE, profileTabRef)}
              ref={profileTabRef}
              className='menu-scroll inline-flex items-center justify-center text-center font-heading text-base hover:cursor-pointer text-dark-text hover:text-orange-400 dark:hover:text-white [&.active]:text-orange-400 active'
            >
              Profile
            </span>
          </li>
          <li>
            <span
              onClick={() => switchTab(PlatformTabEnum.REQUEST, requestTabRef)}
              ref={requestTabRef}
              className='menu-scroll inline-flex items-center justify-center text-center font-heading text-base hover:cursor-pointer text-dark-text hover:text-orange-400 dark:hover:text-white [&.active]:text-orange-400'
            >
              Requests
            </span>
          </li>
          <li>
            <span
              onClick={() => switchTab(PlatformTabEnum.MESSAGES, messageTabRef)}
              ref={messageTabRef}
              className='menu-scroll inline-flex items-center justify-center text-center font-heading text-base hover:cursor-pointer text-dark-text hover:text-orange-400 dark:hover:text-white [&.active]:text-orange-400'
            >
              Messages
            </span>
          </li>
          <li>
            <span
              onClick={() => switchTab(PlatformTabEnum.FILE, fileTabRef)}
              ref={fileTabRef}
              className='menu-scroll inline-flex items-center justify-center text-center font-heading text-base hover:cursor-pointer text-dark-text hover:text-orange-400 dark:hover:text-white [&.active]:text-orange-400'
            >
              Files
            </span>
          </li>
        </ul>
      </nav>
      {renderTab(activeSubTab)}
    </>
  )
}
