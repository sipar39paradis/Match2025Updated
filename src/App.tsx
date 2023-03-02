import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from './components/header/Header';

import { AppContextProvider } from './context/AppContext';

import { CustomFooter } from './components/header/CustomFooter';

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
