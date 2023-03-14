import React, { MutableRefObject, useRef } from 'react';
import { Files } from './Files';
import { Messages } from './Messages';
import { Profile } from './Profile';
import { Requests } from './Requests';

enum PlatformTabEnum {
  FILE = 'file',
  MESSAGES = 'messages',
  PROFILE = 'profile',
  REQUEST = 'request',
  FAMILLY = 'familly',
}

export function Platform() {
  const [activeSubTab, setActiveSubTab] = React.useState(
    PlatformTabEnum.PROFILE
  );
  const profileTabRef = useRef(null);
  const messageTabRef = useRef(null);
  const requestTabRef = useRef(null);
  const fileTabRef = useRef(null);

  function renderTab(tab: PlatformTabEnum) {
    switch (tab) {
      case PlatformTabEnum.MESSAGES:
        return <Messages></Messages>;
      case PlatformTabEnum.REQUEST:
        return <Requests></Requests>;
      case PlatformTabEnum.FILE:
        return <Files></Files>;
      // case PlatformTabEnum.FAMILLY:
      //   return <Familly/>
      default:
        return <Profile></Profile>;
    }
  }

  function switchTab(tab: PlatformTabEnum, ref: MutableRefObject<HTMLElement>) {
    const tabRefs = [profileTabRef, messageTabRef, requestTabRef, fileTabRef];

    tabRefs.forEach((tabRef) => {
      if (tabRef === ref) {
        ref.current.className += ' active';
      } else {
        const style = tabRef.current.className.replace(' active', ' ');
        tabRef.current.className = style;
      }
    });
    setActiveSubTab(tab);
  }

  return <>{renderTab(activeSubTab)}</>;
}
