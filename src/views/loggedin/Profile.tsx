import '../../i18n/config'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext, AppContextType } from '../../context/AppContext'
import { Button, Card, Dropdown, Label, Rating, Select, Textarea, TextInput, Timeline, Tooltip } from 'flowbite-react'
import { getProfile } from '../../client/firebaseClient'
import { CustomCard } from '../../components/common/CustomCard'
import { AccountantProfile, Experience, Schooling } from '../../interfaces/User'
import Check from './../../icons/Check.svg'
import { HiPlusSm, HiMail } from 'react-icons/hi';
import { DateRange, DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { ExperienceTimeline } from '../../components/common/ExperienceTimeline'
import { EducationTimeline } from '../../components/common/EducationTimeline'
import { useTranslation } from 'react-i18next'

export function Profile() {
  const { t } = useTranslation();
  const { user } = useContext(AppContext) as AppContextType
  const [profile, setProfile] = useState<AccountantProfile>(null)
  const [tempProfile, setTempProfile] = useState<AccountantProfile>(null)
  const [edit, setEdit] = useState(false)
  const [expCalState, setExpCalState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);
  const [inErr, setInErr] = useState({})


  const createEmptySchool = (): Schooling => {
    return {
      blurb:'', 
      degree:'',
      graduationDate:{seconds:0, nanoseconds:0}, 
      graduationDateObj: new Date(0), 
      school:'',
      verified:false}
  }
  const defaultValueInvalid = (key: string) => {
    inErr[key] =  true
    setInErr({...inErr})
  }

  let ownProfile = false

  let alreadySetDropDown: Array<string> = []

  ownProfile = (profile && profile.email === user.email)

  useEffect((() => {
    getProfile('test').then(res => {
      res.experiece.sort((a,b) => (a.startDateObj.getTime() - b.startDateObj.getTime()) * (-1))
      res.schooling.sort((a,b) => (a.graduationDateObj.getTime() - b.graduationDateObj.getTime()) * (-1))
      setProfile(structuredClone(res))
      setTempProfile(structuredClone(res))
    })
  }), [])

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const suppportedLanguages = ['-', 'English', 'Français', 'Español']

  const addColor = (isErr: boolean) => {
    return((isErr)? {color:'failure'}: {})
  }

  return (
    <main>
      <div className='flex justify-center flex-col w-screen p-10 sm:px-30 lg:px-40'>
        <div className='flex flex-row justify-center'>
          <div className='max-w-xs'>
            <div className='sticky position-webstick top-10'>
              <CustomCard
                user={user}
                profile={tempProfile}
              />
              {ownProfile?
                !edit ?
                (
                  <Button
                    outline={true}
                    gradientDuoTone="purpleToPink"
                    className='m-auto mt-2'
                    onClick={() => {setEdit(true)}}
                  >
                  {t('Profile.edit')}
                  </Button>
                ):
                (
                  <div className='flex flex-row'>
                    <Button
                      gradientMonochrome="success"
                      className='m-auto mt-2'
                      disabled={Object.values(inErr).includes(true)}
                      onClick={() => {setEdit(false)}}
                    >
                      {t('Profile.confirm')}
                    </Button>
                    <Button
                      gradientMonochrome="failure"
                      className='m-auto mt-2'
                      onClick={() => {
                        setEdit(false)
                        setTempProfile(structuredClone(profile))
                        setInErr({})
                      }}
                    >
                      {t('Profile.cancel')}
                    </Button>
                  </div>
                ):null}

            </div>
          </div>

          <div className='flex w-8/12 px-20'>
            <div className='flex flex-col justify-start text-left w-full'>
              <h2 className='sticky mb-1 text-2xl font-semibold text-gray-900 dark:text-white'>
                {(tempProfile) ? (`${tempProfile.firstName} ${tempProfile.lastName}`): null}
              </h2>
              <span className='text-sm text-gray-500 dark:text-gray-400'>
                {t('Profile.accountant')}
              </span>


              <h3 className='font-semibold py-8 text-xl'>{t('Profile.about')}</h3>
              <div className='font-medium text-m'>
                <h4>{t('Profile.livesIn')} {tempProfile?.location}</h4>
                {!edit?
                  <h4>{t('Profile.speaks')} {tempProfile?.languages.map((lang,i) => 
                  <span key={lang}>
                    {`${lang}${i != tempProfile.languages.length-1 ? ', ':''}`}
                  </span>)}</h4>:
                    <div className='flex flex-row'>
                    {tempProfile?.languages.map(lang => {
                      alreadySetDropDown.push(lang)
                      return(
                        <Select
                        id="countries"
                        required={true}
                        key={lang} 
                        className=''
                        
                        >
                          <>
                          {suppportedLanguages.map(currentSupportedLang => {
                            return (currentSupportedLang === '-')?
                              <option 
                                selected={(lang === '')}
                                onClick={() => {
                                  alreadySetDropDown = alreadySetDropDown.filter((el) => el != lang)
                                  console.log(alreadySetDropDown)
                                  const clone = structuredClone(tempProfile)
                                  clone.languages = clone.languages.filter((el) => el != lang)
                                  setTempProfile(clone)
                                }}>
                                -
                              </option>
                            :
                              <option 
                              selected={(lang === currentSupportedLang)}
                              disabled={(tempProfile.languages.includes(currentSupportedLang))}
                              onClick={() => {
                                alreadySetDropDown = alreadySetDropDown.filter((el) => el != lang)
                                const clone = structuredClone(tempProfile)
                                clone.languages[clone.languages.indexOf(lang)] = currentSupportedLang
                                setTempProfile(clone)
                              }}
                              >
                                {currentSupportedLang}
                              </option>
                            
                          })}
                          </>
                      </Select>
                  
                    )})}
                    <Button
                      outline={true}
                      pill={true}
                      className='ml-2 w-18 h-18 self-center'
                      onClick={() => {
                        const clone = structuredClone(tempProfile)
                        clone.languages = [...clone.languages, '']
                        setTempProfile(clone)
                      }}
                    >
                      <HiPlusSm className="h-3 w-3" />
                    </Button>
                    </div>
                }
                

              <blockquote className="p-4 my-4 bg-gray-50 border-l-2 border-gray-300 dark:border-gray-500 dark:bg-gray-800">
                {!edit? 
                
                <p className="text-xl italic font-medium leading-relaxed text-gray-900 dark:text-white">
                  {tempProfile?.blurb}
                </p>:
                <Textarea
                  id="comment"
                  placeholder={tempProfile?.blurb}
                  required={true}
                  rows={4}
                  defaultValue={tempProfile?.blurb}
                />
                }
              </blockquote>
              </div>

              <hr className='m-8 flex justify-self-center self-center mb-2 w-10/12 h-0.5 bg-gray-200 rounded border-0 md:my-10'></hr>

              <div className='flex flex-row'>
             

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

              
              </div>
              <h3 className='font-semibold py-8 text-xl'>Clients</h3>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}