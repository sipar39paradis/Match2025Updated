import { Badge, Card } from 'flowbite-react';
import React from 'react';
import { UserProfile } from '../../interfaces/User';
import '../../i18n/config';
import { Skeleton } from './Skeleton';
import { User } from '@firebase/auth';
import man from '../../images/depositphotos_356807506-stock-illustration-anonymous-female-face-avatar-incognito.png';

interface CardProps {
  user: User;
  profile?: UserProfile;
}

export function CustomCard({ user, profile }: CardProps) {
  const langToColor = {
    English: 'info',
    Français: 'failure',
    Español: 'success',
  };

  return (
    <Card className="text-center">
      <div className="flex flex-col items-center justify-evenly divide-y-2 divide-gray-200">
        <div className="flex items-center flex-col pb-2">
          {profile ? (
            <>
              {/* <svg
                className="mb-3 w-32 h-32 text-gray-200 dark:text-gray-700"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clipRule="evenodd"
                ></path>
              </svg> */}
              <img src={man} className="w-32 h-32" alt="Logo" />
            </>
          ) : (
            <>
              <svg
                className="mb-3 w-32 h-32 shadow-lg text-gray-200 dark:text-gray-700"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <Skeleton rows={4} />
            </>
          )}
        </div>
        {profile ? (
          <div className="flow-root pt-2">
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {user?.displayName}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400"></span>
            <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              {profile ? profile.location : null}
            </p>
            <div className="flex flex-row pt-1 justify-center">
              {profile
                ? profile.languages.map((lang) =>
                    lang !== '' ? (
                      <Badge color={langToColor[lang]} key={lang}>
                        {lang}
                      </Badge>
                    ) : null
                  )
                : null}
            </div>
          </div>
        ) : (
          <Skeleton rows={4} />
        )}
      </div>
    </Card>
  );
}
