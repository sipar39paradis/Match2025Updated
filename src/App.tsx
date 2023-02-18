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
import { Questionnaire } from './views/loggedin/TaxDeclaration/Questionnaire';
import { Preparator } from './views/loggedout/Preparator';
import { Familly } from './views/loggedin/boxes/familly';
import { Declaration } from './views/loggedin/boxes/declaration';
import { Progression } from './views/loggedin/boxes/progression';
import { CustomerService } from './views/loggedin/boxes/CustomerService';
import { Questionaire } from './views/loggedin/boxes/questionaire';
import { CustomFooter } from './components/header/CustomFooter';
import { UserConditions } from './views/loggedout/UserConditions';

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
                path="/platform/questionnaire"
                element={<Questionnaire />}
              />
              <Route path="/preparator" element={<Preparator />} />
              <Route path="/familly" element={<Familly />} />
              <Route path="/questionaire" element={<Questionaire />} />
              <Route path="/declaration" element={<Declaration />} />
              <Route path="/progression" element={<Progression />} />
              <Route path="/customerService" element={<CustomerService />} />
              <Route path="/documents" element={<Files />} />
              <Route path="/userConditions" element={<UserConditions />} />
            </Routes>
          </div>
          <CustomFooter />
        </AppContextProvider>
      </Router>
    </div>
  );
}

export default App;
