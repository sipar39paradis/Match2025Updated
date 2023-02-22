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
import { userInfo } from 'os';

interface FamillyProps {
  switchTab: any;
}

export function Profile() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { user } = useContext(AppContext) as AppContextType;
  const [profile, setProfile] = useState<UserProfile>(null);
  const [tempProfile, setTempProfile] = useState<UserProfile>(null);
  const [edit, setEdit] = useState(false);
  const [madeQuestionaire, setMadeQuestionaire] = useState(true);
  const [loading, setLoading] = useState(true);
  const [inErr, setInErr] = useState({});
  const { width, height } = useWindowDimensions();
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

  const boxes = {
    viewQuestionnaire: 'Mes Questionnaires',
    questionaire: 'Questionaire',
    declaration: 'Ma Declaration',
    progression: 'Progression',
    documents: 'Mes Documents',
    customerService: 'Service Clientelle',
  };

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
                  onClick={() => navigate('/platform/questionnaire')}
                >
                  <Alert color="info">
                    <p>
                      {
                        "Bonjour, il semblerait que vous n'ayez pas rempli votre déclaration d'impôts pour cette année."
                      }
                    </p>
                    <p>{'Cliquez ici pour être rediriger vers le questionnaire'}</p>
                  </Alert>
                </a>
              ) : null}

              <div className="flex flex-wrap max-w-[700px] justify-center">
                {Object.entries(boxes).map((entry) => {
                  console.log('hi', 'test');
                  return box(entry[0], entry[1]);
                })}
              </div>
            </div>
          </div>
        </BreadcrumbWrapper>
      </div>
    </main>
  );
}
