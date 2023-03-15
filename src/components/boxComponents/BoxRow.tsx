/* eslint-disable @typescript-eslint/no-var-requires */

import React from 'react';
import { ReactComponent as ClipboardDocument } from '../../icons/ClipboardDocument.svg';

import { BoxElement } from './BoxElement';
import { Info } from './BoxBody';
import man from '../../images/depositphotos_356807506-stock-illustration-anonymous-female-face-avatar-incognito.png';
import { QuestionnaireStateEnum } from '../../views/loggedin/TaxDeclaration/types/Questionnaire/Questionnaire';

interface BoxRowProps {
  respondent: Info;
  onClick?: any;
  last?: boolean;
  noQuestionaire?: boolean;
}

export function BoxRow({
  respondent,
  onClick,
  last = false,
  noQuestionaire = false,
}: BoxRowProps) {
  const justify = noQuestionaire ? 'justify-start' : 'justify-between';

  const className = !respondent.questionnaire
    ? `flex flex-row w-full ${justify} items-center rounded-lg `
    : `flex flex-row w-full ${justify} items-center rounded-lg cursor-pointer `;

  return (
    <div className="w-full flex flex-col justify-center items-center p-1">
      <div
        className={className}
        onClick={respondent.questionnaire ? onClick : null}
      >
        <img src={man} className="w-20 h-20" alt="Logo" />
        <BoxElement
          text={`${!noQuestionaire ? 'Questionaire de: ' : ''}${
            respondent.firstName
          } ${respondent.lastName}`}
        />
        {!noQuestionaire ? (
          respondent.questionnaire.questionnaire.state ===
          QuestionnaireStateEnum.COMPLETED ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 m-2 text-green-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          ) : (
            <div className="group max-w-[200px] text-center flex justify-center items-center">
              <div className="mx-auto flex h-[30px] w-[30px] items-center justify-center rounded-full bg-orange-500 bg-opacity-5 text-orange-500 transition group-hover:bg-orange-500 group-hover:bg-opacity-100 group-hover:text-white dark:bg-white dark:bg-opacity-5 dark:text-white dark:group-hover:bg-primary dark:group-hover:bg-opacity-100 md:h-[45px] md:w-[45px]">
                <ClipboardDocument className="h-10"></ClipboardDocument>
              </div>
              <div></div>
            </div>
          )
        ) : null}

        {/* <div className="group justify-self-end max-w-[200px] text-center flex justify-center items-center">
              <div className="mx-auto flex h-[30px] w-[30px] items-center justify-center rounded-full border-orange-500 border-4 bg-orange-500 bg-opacity-5 text-orange-500 md:h-[45px] md:w-[45px]">
                <ClipboardDocument className="h-10"></ClipboardDocument>
                <div className="h-1 w-[30px] md:w-[45px] bg-orange-500 rounded-lg absolute -rotate-45"></div>
              </div>
              <div></div>
            </div> */}
      </div>
      {last ? null : (
        <div className="h-0.5 w-full bg-gray-300 rounded-lg"></div>
      )}
    </div>
  );
}
