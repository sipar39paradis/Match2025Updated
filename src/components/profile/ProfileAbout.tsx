import { Button, Select, TextInput, Textarea } from 'flowbite-react';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { HiPlusSm } from 'react-icons/hi';
import { AccountantProfile } from '../../interfaces/User';
import { Skeleton } from '../common/Skeleton';

interface ProfileAboutProps {
  profile?: AccountantProfile;
  edit: boolean;
  loading: boolean
  setProfile(profile: AccountantProfile);
}

export const ProfileAbout = ({
  profile,
  edit,
  loading,
  setProfile,
}: ProfileAboutProps): ReactElement => {
  const { t } = useTranslation();

  let alreadySetDropDown: Array<string> = [];

  const suppportedLanguages = ['-', 'English', 'Français', 'Español'];

  return (
    <>
      {!loading?
      <>
        <h2 className='mb-1 text-2xl font-semibold text-gray-900 dark:text-white'>
          {(profile) ? (`${profile.firstName} ${profile.lastName}`): null}
        </h2>
        <span className='text-sm text-gray-500 dark:text-gray-400'>
          {profile.type === 'accountant'? t('Profile.accountant'):  t('Profile.client')}
        </span>
        <h3 className="font-semibold py-8 text-xl">{t('Profile.about')}</h3>
      </>
      :
      <Skeleton
        rows={2}
      />
      }
      <div className="font-medium text-m">
          {!loading?
          <>
            {!edit ? 
            <h4>
              {t('Profile.livesIn')} {profile?.location}
            </h4>:
            <TextInput
            id={'Lives in'}
            type="text"
            className="w-full py-1"
            placeholder="City, Country"
            required={true}
            defaultValue={profile.location}
            value={profile.location}
            sizing="sm"
            onChange={(e) => {
              const location = e.target.value;
              profile.location = location;
              setProfile({ ...profile });
            }}
          />
            }
            {!edit ? (
              <h4>
                {`${t('Profile.speaks')} `}
                {profile?.languages.map((lang, i) => (
                  <span key={lang}>
                    <>
                      {/* {profile} */}
                      {`${lang}${i != profile.languages.length - 1 ? ', ' : ''}`}
                    </>
                  </span>
                ))}
              </h4>
            ) : (
              <div className="flex flex-row">
                {profile?.languages.map((lang) => {
                  alreadySetDropDown.push(lang);
                  return (
                    <Select sizing={'sm'} id="countries" required={true} key={lang} className="pr-1">
                      <>
                        {suppportedLanguages.map((currentSupportedLang) => {
                          return currentSupportedLang === '-' ? (
                            <option
                              selected={lang === ''}
                              onClick={() => {
                                alreadySetDropDown = alreadySetDropDown.filter(
                                  (el) => el != lang
                                );
                                const clone = structuredClone(profile);
                                clone.languages = clone.languages.filter(
                                  (el) => el != lang
                                );
                                setProfile(clone);
                              }}
                            >
                              -
                            </option>
                          ) : (
                            <option
                              selected={lang === currentSupportedLang}
                              disabled={profile.languages.includes(
                                currentSupportedLang
                              )}
                              onClick={() => {
                                alreadySetDropDown = alreadySetDropDown.filter(
                                  (el) => el != lang
                                );
                                const clone = structuredClone(profile);
                                clone.languages[clone.languages.indexOf(lang)] =
                                  currentSupportedLang;
                                setProfile(clone);
                              }}
                            >
                              {currentSupportedLang}
                            </option>
                          );
                        })}
                      </>
                    </Select>
                  );
                })}
                <Button
                  outline={true}
                  pill={true}
                  className="ml-2 w-18 h-18 self-center"
                  onClick={() => {
                    const clone = structuredClone(profile);
                    clone.languages = [...clone.languages, ''];
                    setProfile(clone);
                  }}
                >
                  <HiPlusSm className="h-3 w-3" />
                </Button>
              </div>
              
            )}
            </>
            :
            <Skeleton
              rows={3}
            />
          }
          
        

        <blockquote className="p-4 my-4 bg-gray-50 border-l-2 border-gray-300 dark:border-gray-500 dark:bg-gray-800">
          {!loading ? (
            !edit ? (
              <p className="text-xl italic font-medium leading-relaxed text-gray-900 dark:text-white">
                {profile?.blurb}

              </p>
            ) : (
              <Textarea
                id="comment"
                placeholder={profile?.blurb}
                required={true}
                rows={4}
                defaultValue={profile?.blurb}
                onChange={(e) => {
                  const blurb = e.target.value;
                  profile.blurb = blurb;
                  setProfile({ ...profile });
                }}
              />
            )
          ) : (
            <Skeleton
              rows={5}
            />
          )
          }
        </blockquote>
      </div>
    </>
  );
};