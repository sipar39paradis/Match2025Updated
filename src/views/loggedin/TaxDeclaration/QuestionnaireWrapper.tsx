import React from 'react';
import { QuestionnaireContextProvider } from './context/QuestionnaireContext';
import { QuestionnaireHandler } from './QuestionnaireHandler';

export function QuestionnaireWrapper() {
  return (
    <QuestionnaireContextProvider>
      <QuestionnaireHandler />
    </QuestionnaireContextProvider>
  );
}
