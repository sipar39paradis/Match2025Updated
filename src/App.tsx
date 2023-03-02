import React, { useState } from 'react';
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
import { Preparator } from './views/loggedout/Preparator';
import { ViewQuestionnaire } from './views/loggedin/boxes/Questionnaire';
import { Declaration } from './views/loggedin/boxes/declaration';
import { CustomerService } from './views/loggedin/boxes/CustomerService';
import { CustomFooter } from './components/header/CustomFooter';
import { UserConditions } from './views/loggedout/UserConditions';
import { PrivacyPolicy } from './views/loggedout/PrivacyPolicy';
import { NotFound } from './views/NotFound';
import { Foyer } from './views/loggedin/boxes/foyer';
import { QuestionnaireWrapper } from './views/loggedin/TaxDeclaration/QuestionnaireWrapper';
import { AppRoutes } from './AppRoutes';

function App() {
  return (
    <div className="App">
      <Router>
        <AppContextProvider>
          <Header />
          <div className=" min-h-[84vh]">
            <AppRoutes />
          </div>
          <CustomFooter />
        </AppContextProvider>
      </Router>
    </div>
  );
}

export default App;
