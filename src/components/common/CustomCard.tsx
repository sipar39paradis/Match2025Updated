import { Badge, Card, Dropdown, Rating } from 'flowbite-react'
import React, { ReactNode, useEffect, useRef } from 'react'
import { AccountantProfile } from '../../interfaces/User'
import '../../i18n/config';
import { useTranslation } from 'react-i18next';
import { Skeleton } from './Skeleton';

interface CardProps {
  user: any
  profile?: AccountantProfile
}

export function CustomCard({ user, profile }: CardProps) {
  const { t } = useTranslation();

  const langToColor = {'English': 'info', 'Français': 'failure', 'Español':'success'}

  return (
    <Card>
      <div className='flex flex-col items-center justify-evenly divide-y-2 divide-gray-200'>
        <div className='flex items-center flex-col pb-2'>
          {profile?
          <>
            <img
              className='mb-3 h-32 w-32 rounded-full shadow-lg'
              src={user.photoURL}
              alt='Bonnie image'
            />
            <div className='mb-1 flow-root'>
              <>
                <Rating>
                  <>
                    {[...Array(5)].map ((x, i )=> {
                      return i < Math.floor(profile.rating) ? <Rating.Star/> : <Rating.Star filled={false}/>
                    })}
                  </>
                  <p className='ml-2 text-sm font-medium text-gray-500 dark:text-gray-400'>
                    <span className='font-semibold text-black'>{profile.rating}</span>
                  </p>
                </Rating>
                <p className='ml-2 text-sm font-medium text-gray-500 dark:text-gray-400'>
                <span className='text-black font-semibold'>{profile.casesCompleted} </span> 
                  {t('Card.casesCompleted')}
                </p>
                <p className='ml-2 text-sm font-medium text-gray-500 dark:text-gray-400'>
                  <span className='font-semibold text-black'>{Math.floor(profile.experiece.reduce((prev, current) => prev + current.durationYears + ((1 /12) * current.durationMonths) , 0))} </span> 
                  {t('Card.yearsOfExperience')}
                </p>
                <p className='ml-2 text-sm font-medium text-gray-500 dark:text-gray-400'>
                  {[profile.schooling.sort((a,b) => (a.graduationDateObj.getTime() - b.graduationDateObj.getTime()) * (-1))
                    .at(0)].map(firstProfile => {
                      return `${firstProfile.degree} from ${firstProfile.school}`
                    })}
                </p>
              </>
            </div>
            </>
          :
            <>
              <svg className="mb-3 w-32 h-32 shadow-lg text-gray-200 dark:text-gray-700" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path></svg>
              <Skeleton
                rows={4}
              />
            </> 
          }
        </div>
        {profile?
          <div className='flow-root pt-2'>
            <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
              {user.displayName}
            </h5>
            <span className='text-sm text-gray-500 dark:text-gray-400'>
              {t('Card.accountant')}
            </span>
            <p className='ml-2 text-sm font-medium text-gray-500 dark:text-gray-400'>
              {(profile)?profile.location:null}
            </p>
            <div className='flex flex-row pt-1 justify-center'>
              {profile?
              profile.languages.map(lang => 
                <Badge 
                  color={langToColor[lang]}
                  key={lang}>
                  {lang}
                </Badge>
              ):null}
            </div>
          </div>
          :
          <Skeleton
            rows={4}
          />
        }
      </div>
    </Card>
  )
}
