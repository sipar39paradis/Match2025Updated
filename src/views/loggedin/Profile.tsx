import '../../i18n/config';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext, AppContextType } from '../../context/AppContext';
import { Alert } from 'flowbite-react';
import {
  getAllQuestionnaires,
  getUserProfile,
} from '../../client/firebaseClient';
import { CustomCard } from '../../components/common/CustomCard';
import { UserProfile } from '../../interfaces/User';
import { ReactComponent as UserCircle } from '../../icons/UserCircle.svg';
import { ReactComponent as ClipboardDocument } from '../../icons/ClipboardDocument.svg';
import { ReactComponent as DocumentArrowDown } from '../../icons/DocumentArrowDown.svg';

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useParams } from 'react-router';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { useNavigate } from 'react-router-dom';
import { BreadcrumbWrapper } from '../../components/profile/BreadcrumbWrapper';

export function Profile() {
  const { id } = useParams();
  const { user, addQuestionnaire } = useContext(AppContext) as AppContextType;
  const [tempProfile, setTempProfile] = useState<UserProfile>(null);
  const [madeQuestionaire, setMadeQuestionaire] = useState(true);
  const { width } = useWindowDimensions();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(id, 'id');
    console.log(user, 'user');
    ('BR5shBSMwPSxBTd91Ly5zjjhfiH2');
    getAllQuestionnaires(user.uid).then((res) => {
      console.log(res, 'res');
      if (res.length === 0) {
        setMadeQuestionaire(false);
      }
    });

    getUserProfile(id ? id : user.uid).then((res) => {
      console.log(res, 'res');
      res.experiece.sort(
        (a, b) => (a.startDateObj.getTime() - b.startDateObj.getTime()) * -1
      );
      res.schooling.sort(
        (a, b) =>
          (a.graduationDateObj.getTime() - b.graduationDateObj.getTime()) * -1
      );
      initializeProfile(res);
    });
  }, []);

  interface GroupInfo {
    header: string;
    text: string;
    endpoint: string;
    icon: string;
  }

  const iconMap = {
    foyer: <UserCircle className="h-24"></UserCircle>,
    questionnaire: <ClipboardDocument className="h-24"></ClipboardDocument>,
    documents: <DocumentArrowDown className="h-24"></DocumentArrowDown>,
  };

  const groupsKeys = ['foyer', 'questionnaire', 'files'];

  const groups: Record<string, GroupInfo> = {
    foyer: {
      header: 'Mon Foyer',
      text: 'Vous trouverez ici le portrait de votre foyer',
      endpoint: 'foyer',
      icon: 'foyer',
    },
    questionnaire: {
      header: 'Mes Questionnaires',
      text: 'Vous pouvez consulter ici vos questionnaires terminés ou en cours',
      endpoint: 'viewQuestionnaire',
      icon: 'questionnaire',
    },
    files: {
      header: 'Mes Documents',
      text: ' Vous pouvez déposer les documents nécéssaire à la préparation de votre déclaration ici',
      endpoint: 'documents',
      icon: 'documents',
    },
  };

  const initializeProfile = (profile: UserProfile) => {
    setTempProfile(structuredClone(profile));
  };

  const makeLink = (
    header: string,
    text: string,
    endpoint: string,
    icon: string
  ) => {
    return (
      <div
        className="w-[380px] px-12 cursor-pointer"
        onClick={() => navigate(`/${endpoint}`)}
      >
        <div className="group mx-auto w-[380px] text-center px-12">
          <div className="mx-auto mb-6 flex h-[150px] w-[150px] items-center justify-center rounded-full bg-orange-500 bg-opacity-5 text-orange-500 transition group-hover:bg-orange-500 group-hover:bg-opacity-100 group-hover:text-white dark:bg-white dark:bg-opacity-5 dark:text-white dark:group-hover:bg-primary dark:group-hover:bg-opacity-100]">
            {/* <UserCircle className="h-16"></UserCircle> */}
            {iconMap[icon]}
          </div>
          <div>
            <h3 className="mb-3 font-heading text-xl font-medium text-dark dark:text-white sm:text-2xl md:mb-5">
              {header}
            </h3>
            <p className="text-base text-dark-text">{text}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main>
      <div className="flex justify-start flex-col w-screen p-10 sm:px-30 lg:px-40">
        <BreadcrumbWrapper
          breadcrumbEndpoint={['profile']}
          breadcrumbName={['Mon compte']}
        >
          <div className={width > 540 ? 'flex flex-row justify-center' : ''}>
            <div className={width > 540 ? 'max-w-xs pr-64' : ''}>
              <div
                className={
                  width > 540
                    ? 'sticky position-webstick top-38'
                    : 'flex flex-row justify-center'
                }
              >
                {width > 540 ? (
                  <CustomCard user={user} profile={tempProfile} />
                ) : (
                  <img
                    className="mb-3 h-32 w-32 rounded-full shadow-lg"
                    src={user.photoURL}
                  />
                )}
              </div>
            </div>
            <div className="flow flow-col">
              {!madeQuestionaire ? (
                <div className="mb-6">
                  <a
                    className=" text-orange-400 cursor-pointer font-bold"
                    onClick={() => addQuestionnaire()}
                  >
                    <Alert color="info">
                      <p>
                        {
                          'Bonjour, la première étape une fois connecté est de remplir votre questionnaire qui établira votre profil fiscal.'
                        }
                      </p>
                      <p>
                        {
                          'Cliquez ici pour être rediriger vers le questionnaire.'
                        }
                      </p>
                    </Alert>
                  </a>
                </div>
              ) : null}
              <div className="flex flex-wrap justify-center max-w-[1140px]">
                <>
                  {groupsKeys.map((groupKey) => {
                    const group = groups[groupKey];
                    return makeLink(
                      group.header,
                      group.text,
                      group.endpoint,
                      group.icon
                    );
                  })}
                </>
              </div>
            </div>
          </div>
        </BreadcrumbWrapper>
      </div>
    </main>
  );
}
