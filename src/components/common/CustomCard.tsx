import { Badge, Card, Dropdown, Rating } from 'flowbite-react'
import React, { ReactNode, useEffect, useRef } from 'react'
import { AccountantProfile } from '../../interfaces/User'
import '../../i18n/config';
import { useTranslation } from 'react-i18next';

interface CardProps {
  user: any
  profile?: AccountantProfile
}

export function CustomCard({ user, profile }: CardProps) {
  const { t } = useTranslation();

  const renderStars = (ammount: number) => {
    const floor = Math.floor(ammount)
    const arr = []

    for (let index = 0; index < 5; index++) {
      arr.push(index > floor ? <Rating.Star/> : <Rating.Star filled={false}/>)
    }
  }

  const langToColor = {'English': 'info', 'Français': 'failure', 'Español':'success'}

  return (
    <Card>
    <div className='flex flex-col items-center justify-evenly divide-y-2 divide-gray-200'>
      <div className='flex items-center flex-col pb-2'>
        <img
          className='mb-3 h-32 w-32 rounded-full shadow-lg'
          src={user.photoURL}
          alt='Bonnie image'
        />

          {profile ? (
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
          ): null}

      </div>
      <div className='flow-root pt-2'>
      {/* <hr className='mb-1 mx-auto w-48 h-1 bg-gray-200 rounded border-0 md:my-10'></hr> */}
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
    </div>
  </Card>
  )
}
