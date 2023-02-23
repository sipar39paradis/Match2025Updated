/* eslint-disable @typescript-eslint/no-var-requires */

import { Breadcrumb } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { ReactComponent as ClipboardDocument } from '../../icons/ClipboardDocument.svg';

import { useNavigate } from 'react-router-dom';
import { BoxElement } from './BoxElement';
import { Info } from './BoxBody';
import man from '../../images/depositphotos_356807506-stock-illustration-anonymous-female-face-avatar-incognito.png';

interface BoxRowProps {
  respondent: Info;
  onClick?: any;
  last?: boolean
}

export function BoxRow({ respondent, onClick, last = false }: BoxRowProps) {
  const navigate = useNavigate();

  const className = !respondent.questionnaire
    ? 'flex flex-row w-full justify-between items-center rounded-lg '
    : 'flex flex-row w-full justify-between items-center rounded-lg cursor-pointer ';

  return (
    <div className="w-full flex flex-col justify-center items-center p-1">
      <div
        className={className}
        onClick={respondent.questionnaire ? onClick : null}
      >

        <img src={man} className="w-20 h-20" alt="Logo" />
        <BoxElement
          text={`Questionaire de: ${respondent.firstName} ${respondent.lastName}`}
        />
        {!respondent.questionnaire ? (
                    <div className="group max-w-[200px] text-center flex justify-center items-center">
                    <div className="mx-auto flex h-[30px] w-[30px] items-center justify-center rounded-full border-orange-500 border-4 bg-orange-500 bg-opacity-5 text-orange-500 md:h-[45px] md:w-[45px]">
                      <ClipboardDocument className="h-10"></ClipboardDocument>
                      <div className="h-1 w-[30px] md:w-[45px] bg-orange-500 rounded-lg absolute -rotate-45"></div>
                    </div>
                    <div></div>
                  </div>
        ) : (
          <div className="group max-w-[200px] text-center flex justify-center items-center">
          <div className="mx-auto flex h-[30px] w-[30px] items-center justify-center rounded-full bg-orange-500 bg-opacity-5 text-orange-500 transition group-hover:bg-orange-500 group-hover:bg-opacity-100 group-hover:text-white dark:bg-white dark:bg-opacity-5 dark:text-white dark:group-hover:bg-primary dark:group-hover:bg-opacity-100 md:h-[45px] md:w-[45px]">
            <ClipboardDocument className="h-10"></ClipboardDocument>
          </div>
          <div></div>
          </div> 
        )}
      </div>
      {last ? null : <div className="h-0.5 w-full bg-gray-300 rounded-lg"></div>}
      
    </div>
  );
}
