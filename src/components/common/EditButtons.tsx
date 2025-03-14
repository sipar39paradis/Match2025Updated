import { Button } from 'flowbite-react';
import React from 'react';
import { UserProfile } from '../../interfaces/User';
import '../../i18n/config';
import { useTranslation } from 'react-i18next';
import { User } from '@firebase/auth';

interface EditButtonsProps {
  user: User;
  profile?: UserProfile;
  edit: boolean;
  ownProfile: boolean;
  inErr: any;
  setEdit: any;
  setInErr: any;
  updateProfile: any;
  setTempProfile: any;
}

export const EditButton = ({
  profile,
  edit,
  ownProfile,
  inErr,
  setEdit,
  setInErr,
  updateProfile,
  setTempProfile,
}: EditButtonsProps) => {
  const { t } = useTranslation();

  return (
    <>
      {ownProfile ? (
        !edit ? (
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
        ) : (
          <div className="flex flex-row">
            <Button
              gradientMonochrome="success"
              className="m-auto mt-2"
              disabled={Object.values(inErr).includes(true)}
              onClick={() => {
                setEdit(false);
                updateProfile(profile.id, profile);
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
    </>
  );
};
