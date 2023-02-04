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
import { TaxDeclaration } from './views/loggedin/TaxDeclaration/TaxDeclaration';
import { Preparator } from './views/loggedout/Preparator';

function App() {
  return (
    <div className="App">
      <Router>
        <AppContextProvider>
          <Header />
          <div>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/platform" element={<Platform />} />
              <Route
                path="/platform/questionnaire"
                element={<TaxDeclaration />}
              />
              <Route path="/preparator" element={<Preparator />} />
            </Routes>
          </div>
        </AppContextProvider>
      </Router>
    </div>
  );
}

export default App;
