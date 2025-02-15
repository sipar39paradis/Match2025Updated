import React, { useContext } from 'react';

import { Routes, Route } from 'react-router-dom';
import { AppContext, AppContextType } from './context/AppContext';
import { Declaration } from './views/loggedin/boxes/declaration';
import { Foyer } from './views/loggedin/boxes/foyer';
import { ViewQuestionnaire } from './views/loggedin/boxes/Questionnaire';
import { Files } from './views/loggedin/Files';
import { Profile } from './views/loggedin/Profile';
import { QuestionnaireWrapper } from './views/loggedin/TaxDeclaration/QuestionnaireWrapper';
import { LandingPage } from './views/loggedout/LandingPage';
import { Preparator } from './views/loggedout/Preparator';
import { PrivacyPolicy } from './views/loggedout/PrivacyPolicy';
import { UserConditions } from './views/loggedout/UserConditions';
import { NotFound } from './views/NotFound';
import { LandingPageSim } from './views/loggedout/LandingPageSim';

export function AppRoutes() {
  const { user } = useContext(AppContext) as AppContextType;

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/profile" element={user ? <Profile /> : <LandingPage />} />
      <Route
        path="/questionnaire/:id"
        element={user ? <QuestionnaireWrapper /> : <LandingPage />}
      />
      <Route path="/preparator" element={<Preparator />} />
      <Route
        path="/viewQuestionnaire"
        element={user ? <ViewQuestionnaire /> : <LandingPage />}
      />
      <Route path="/declaration" element={<Declaration />} />
      <Route path="/foyer" element={user ? <Foyer /> : <LandingPage />} />
      <Route path="/documents" element={<Files />} />
      <Route path="/userConditions" element={<UserConditions />} />
      <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="/landing" element={<LandingPageSim />} />
    </Routes>
  );
}
