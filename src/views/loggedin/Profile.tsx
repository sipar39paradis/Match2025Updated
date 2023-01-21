import '../../i18n/config';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext, AppContextType } from '../../context/AppContext';
import { Button } from 'flowbite-react';
import {
  getAccountantProfile,
  upsertProfile,
} from '../../client/firebaseClient';
import { CustomCard } from '../../components/common/CustomCard';
import { AccountantProfile } from '../../interfaces/User';

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { ExperienceTimeline } from '../../components/profile/ExperienceTimeline';
import { EducationTimeline } from '../../components/profile/EducationTimeline';
import { useTranslation } from 'react-i18next';
import { ProfileAbout } from '../../components/profile/ProfileAbout';
import { Skeleton } from '../../components/common/Skeleton';
import { useNavigate, useParams } from 'react-router';

export function Profile() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AppContext) as AppContextType;
  const [profile, setProfile] = useState<AccountantProfile>(null);
  const [tempProfile, setTempProfile] = useState<AccountantProfile>(null);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [inErr, setInErr] = useState({});

  let ownProfile = false;
  ownProfile = profile && profile.email === user.email;

  useEffect(() => {
    console.log(id, 'id');
    console.log(user, 'user');

    getAccountantProfile(id ? id : user.uid).then((res) => {
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

  const updateProfile = async (id: string, profile: AccountantProfile) => {
    await upsertProfile(id, profile);
    initializeProfile(profile);
  };

  const initializeProfile = (profile: AccountantProfile) => {
    setProfile(structuredClone(profile));
    setTempProfile(structuredClone(profile));
    setLoading(false);
  };

  return (
    <main>
      <div className="flex justify-center flex-col w-screen p-10 sm:px-30 lg:px-40">
        <div className="flex flex-row justify-center">
          <div className="max-w-xs">
            <div className="sticky position-webstick top-10">
              <CustomCard user={user} profile={tempProfile} />
              {ownProfile ? (
                !edit ? (
                  <>
                    <Button
                      outline={true}
                      gradientDuoTone="purpleToPink"
                      className="m-auto mt-2"
                      onClick={() => {
                        setEdit(true);
                      }}
                    >
                      {t('Profile.edit')}
                    </Button>
                    <Button
                      outline={true}
                      gradientDuoTone="purpleToPink"
                      className="m-auto mt-2"
                      onClick={() => {
                        navigate('/platform/tax-declaration?step=civilStatus');
                      }}
                    >
                      Déclaration d&apos;impôt
                    </Button>
                  </>
                ) : (
                  <div className="flex flex-row">
                    <Button
                      gradientMonochrome="success"
                      className="m-auto mt-2"
                      disabled={Object.values(inErr).includes(true)}
                      onClick={() => {
                        setEdit(false);
                        console.log(tempProfile.id, 'id');
                        updateProfile(tempProfile.id, tempProfile);
                      }}
                    >
                      {t('Profile.confirm')}
                    </Button>
                    <Button
                      gradientMonochrome="failure"
                      className="m-auto mt-2"
                      onClick={() => {
                        setEdit(false);
                        setTempProfile(structuredClone(profile));
                        setInErr({});
                      }}
                    >
                      {t('Profile.cancel')}
                    </Button>
                  </div>
                )
              ) : null}
            </div>
          </div>

          <div className="flex w-8/12 px-20">
            <div className="flex flex-col justify-start text-left w-full">
              <ProfileAbout
                profile={tempProfile}
                edit={edit}
                loading={loading}
                setProfile={setTempProfile}
              />
              <hr className="m-8 flex justify-self-center self-center mb-2 w-10/12 h-0.5 bg-gray-200 rounded border-0 md:my-10"></hr>

              <div className="flex flex-row">
                {!loading ? (
                  profile.type === 'accountant' ?? (
                    <>
                      <ExperienceTimeline
                        profile={tempProfile}
                        edit={edit}
                        inErr={inErr}
                        setInErr={setInErr}
                        setProfile={setTempProfile}
                      />
                      <EducationTimeline
                        profile={tempProfile}
                        edit={edit}
                        inErr={inErr}
                        setInErr={setInErr}
                        setProfile={setTempProfile}
                      />
                    </>
                  )
                ) : (
                  <>
                    <Skeleton rows={5} />
                    <Skeleton rows={5} />
                  </>
                )}
              </div>
              <h3 className="font-semibold py-8 text-xl">Clients</h3>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
