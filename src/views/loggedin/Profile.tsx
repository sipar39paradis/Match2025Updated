import '../../i18n/config';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext, AppContextType } from '../../context/AppContext';
import { Alert, Button } from 'flowbite-react';
import {
  getAllQuestionnaires,
  getUserProfile,
  upsertUserProfile,
} from '../../client/firebaseClient';
import { CustomCard } from '../../components/common/CustomCard';
import { UserProfile } from '../../interfaces/User';
import { ReactComponent as UserCircle } from '../../icons/UserCircle.svg';
import { ReactComponent as ClipboardDocument } from '../../icons/ClipboardDocument.svg';
import { ReactComponent as DocumentArrowDown } from '../../icons/DocumentArrowDown.svg';

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { ExperienceTimeline } from '../../components/profile/ExperienceTimeline';
import { EducationTimeline } from '../../components/profile/EducationTimeline';
import { useTranslation } from 'react-i18next';
import { ProfileAbout } from '../../components/profile/ProfileAbout';
import { Skeleton } from '../../components/common/Skeleton';
import { useParams } from 'react-router';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { EditButton } from '../../components/common/EditButtons';
import { useNavigate } from 'react-router-dom';
import { BreadcrumbWrapper } from '../../components/profile/BreadcrumbWrapper';

export function Profile() {
  const { id } = useParams();
  const { user, addQuestionnaire } = useContext(AppContext) as AppContextType;
  const [profile, setProfile] = useState<UserProfile>(null);
  const [tempProfile, setTempProfile] = useState<UserProfile>(null);
  const [edit, setEdit] = useState(false);
  const [madeQuestionaire, setMadeQuestionaire] = useState(true);
  const [loading, setLoading] = useState(true);
  const [inErr, setInErr] = useState({});
  const { width } = useWindowDimensions();
  const navigate = useNavigate();

  let ownProfile = false;
  ownProfile = profile && profile.email === user.email;

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



  interface GroupInfo{
    header: string
    text: string
    endpoint: string,
    icon: string
  }

  const iconMap = {
    foyer: <UserCircle className="h-24"></UserCircle>,
    questionnaire: <ClipboardDocument className="h-24"></ClipboardDocument>,
    documents: <DocumentArrowDown className="h-24"></DocumentArrowDown>
  }

  const groupsKeys = ['foyer', 'questionnaire', 'files']

  const groups: Record<string, GroupInfo> = {
    'foyer': {
      header: 'Mon Foyer',
      text: 'Vous trouverez ici le portrait de votre foyer',
      endpoint: 'foyer',
      icon: 'foyer'
    },
    'questionnaire': {
      header: 'Mes Questionnaires',
      text: 'Vous pouvez consulter ici vos questionnaires terminés ou en cours',
      endpoint: 'viewQuestionnaire',
      icon: 'questionnaire'
    },
    'files' : {
      header: 'Mes Documents',
      text: ' Vous pouvez déposer les documents nécéssaire à la préparation de votre déclaration ici',
      endpoint: 'documents',
      icon: 'documents'
    }
  }

  const updateProfile = async (id: string, profile: UserProfile) => {
    await upsertUserProfile(id, profile);
    initializeProfile(profile);
  };

  const initializeProfile = (profile: UserProfile) => {
    setProfile(structuredClone(profile));
    setTempProfile(structuredClone(profile));
    setLoading(false);
  };

  const box = (endpoint: string, text: string) => {
    return (
      <div
        className="h-[200px] w-[200px] border-solid border-2 border-orange-400 rounded-lg m-4 flex justify-center items-center"
        onClick={() => navigate(`/${endpoint}`)}
      >
        <p>{text}</p>
      </div>
    );
  };

  const makeLink = (header: string, text: string, endpoint: string, icon: string) => {
    return (
      <div className="w-[380px] px-12"
      onClick={() => navigate(`/${endpoint}`)}>
      <div className="group mx-auto w-[380px] text-center px-12">
        <div className="mx-auto mb-6 flex h-[150px] w-[150px] items-center justify-center rounded-full bg-orange-500 bg-opacity-5 text-orange-500 transition group-hover:bg-orange-500 group-hover:bg-opacity-100 group-hover:text-white dark:bg-white dark:bg-opacity-5 dark:text-white dark:group-hover:bg-primary dark:group-hover:bg-opacity-100]">
          {/* <UserCircle className="h-16"></UserCircle> */}
          {iconMap[icon]}
          
        </div>
        <div>
          <h3 className="mb-3 font-heading text-xl font-medium text-dark dark:text-white sm:text-2xl md:mb-5">
            {header}
          </h3>
          <p className="text-base text-dark-text">
            {text}
          </p>
        </div>
      </div>
    </div>
    )
  }

  return (
    <main>
      <div className="flex justify-start flex-col w-screen p-10 sm:px-30 lg:px-40">
        <BreadcrumbWrapper
          breadcrumbEndpoint={['profile']}
          breadcrumbName={['profil']}
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
                <EditButton
                  user={user}
                  profile={tempProfile}
                  edit={edit}
                  ownProfile={ownProfile}
                  inErr={inErr}
                  setEdit={setEdit}
                  setInErr={setInErr}
                  updateProfile={updateProfile}
                  setTempProfile={setTempProfile}
                />
              </div>
            </div>
            <div className="flow flow-col">
              {!madeQuestionaire ? (
                <a
                  className=" text-orange-400 cursor-pointer font-bold"
                  onClick={() => addQuestionnaire()}
                >
                  <Alert color="info">
                    <p>
                      {
                        "Bonjour, il semblerait que vous n'ayez pas rempli votre déclaration d'impôts pour cette année."
                      }
                    </p>
                    <p>
                      {'Cliquez ici pour être rediriger vers le questionnaire'}
                    </p>
                  </Alert>
                </a>
              ) : null}
{/* max-w-[700px] */}
              <div className="flex flex-wrap justify-center max-w-[1140px]">
              {/* <div className="w-full px-4 md:w-1/2 lg:w-1/5">
              <div className="group mx-auto max-w-[380px] text-center md:">
                <div className="mx-auto mb-6 flex h-[70px] w-[70px] items-center justify-center rounded-full bg-orange-500 bg-opacity-5 text-orange-500 transition group-hover:bg-orange-500 group-hover:bg-opacity-100 group-hover:text-white dark:bg-white dark:bg-opacity-5 dark:text-white dark:group-hover:bg-primary dark:group-hover:bg-opacity-100 md:mb-9 md:h-[90px] md:w-[90px]">
                  <UserCircle className="h-16"></UserCircle>
                </div>
                <div>
                  <h3 className="mb-3 font-heading text-xl font-medium text-dark dark:text-white sm:text-2xl md:mb-5">
                    Créer votre compte
                  </h3>
                  <p className="text-base text-dark-text">
                    Aller via l’option ‘’s’inscrire’’ pour créer votre compte
                    Impôts Match
                  </p>
                </div>
              </div>
            </div> */}
            <>
                {groupsKeys.map((groupKey) => {
                  const group = groups[groupKey]
                  return makeLink(group.header, group.text, group.endpoint, group.icon)
                })}
                </>
                {/* {makeLink('Créer votre compte', 'Aller via l\’option \‘\’s\’inscrire\’\’ pour créer votre compte \nImpôts Match', 'foyer', 'userCircle' )} */}
                {/* {Object.entries(boxes).map((entry) => {
                  console.log('hi', 'test');
                  return box(entry[0], entry[1]);
                })} */}
              </div>
            </div>
          </div>
        </BreadcrumbWrapper>
      </div>
    </main>
  );
}
