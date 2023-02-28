import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './components/header/Header';
import { LandingPage } from './views/loggedout/LandingPage';
import { Profile } from './views/loggedin/Profile';
import { Requests } from './views/loggedin/Requests';
import { Messages } from './views/loggedin/Messages';
import { Files } from './views/loggedin/Files';
import { AppContextProvider } from './context/AppContext';
import { Platform } from './views/loggedin/Platform';
import { QuestionnaireHandler } from './views/loggedin/TaxDeclaration/QuestionnaireHandler';
import { Preparator } from './views/loggedout/Preparator';
import { ViewQuestionnaire } from './views/loggedin/boxes/Questionnaire';
import { Declaration } from './views/loggedin/boxes/declaration';
import { CustomerService } from './views/loggedin/boxes/CustomerService';
import { CustomFooter } from './components/header/CustomFooter';
import { UserConditions } from './views/loggedout/UserConditions';
import { PrivacyPolicy } from './views/loggedout/PrivacyPolicy';
import { NotFound } from './views/NotFound';
import { Foyer } from './views/loggedin/boxes/foyer';

function App() {
  return (
    <div className="App">
      <Router>
        <AppContextProvider>
          <Header />
          <div className=" min-h-[84vh]">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/platform" element={<Platform />} />
              <Route
                path="/platform/questionnaire/:id"
                element={<QuestionnaireHandler />}
              />{' '}
              <Route path="/preparator" element={<Preparator />} />
              <Route
                path="/viewQuestionnaire"
                element={<ViewQuestionnaire />}
              />
              <Route path="/declaration" element={<Declaration />} />
              <Route path="/foyer" element={<Foyer />} />
              <Route path="/customerService" element={<CustomerService />} />
              <Route path="/documents" element={<Files />} />
              <Route path="/userConditions" element={<UserConditions />} />
              <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/404" element={<NotFound />} />
            </Routes>
          </div>
          <CustomFooter />
        </AppContextProvider>
      </Router>
    </div>
  );
}

export default App;
