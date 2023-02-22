/* eslint-disable @typescript-eslint/no-var-requires */

import { Breadcrumb } from 'flowbite-react';
import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { BoxElement } from './BoxElement';
import { Info } from './BoxBody';

interface BoxRowProps {
  respondent: Info;
  onClick?: any
}

export function BoxRow({ respondent, onClick }: BoxRowProps) {
  const navigate = useNavigate();

  const className = !(respondent.questionnaire )
  ? 'flex flex-row mt-12 w-2/3 justify-around items-center border-solid border-2 border-orange-400 rounded-lg'
  :'flex flex-row mt-12 w-2/3 justify-around items-center border-solid border-2 border-orange-400 rounded-lg cursor-pointer'


  return (
    <div className={className}
    onClick={respondent.questionnaire ? onClick : null}>
      {/* <img

                src={require('../../images/depositphotos_356807506-stock-illustration-anonymous-female-face-avatar-incognito.png').default}
                alt="logo"
                className="h-[50px] dark:block"
              /> */}
      <svg
        className="w-20 h-20 text-gray-200 dark:text-gray-700"
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
      <BoxElement text={`Questionaire de: ${respondent.firstName} ${respondent.lastName}`} />
      {!(respondent.questionnaire) ? <BoxElement text="Ce client n'a pas commencé de questionnaire" />: null}
    </div>
  );
}
