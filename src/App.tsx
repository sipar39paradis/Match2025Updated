import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Header } from './components/header/Header'
import { LandingPage } from './views/loggedout/LandingPage'
import { Profile } from './views/loggedin/Profile'
import { Requests } from './views/loggedin/Requests'
import { Messages } from './views/loggedin/Messages'
import { Files } from './views/loggedin/Files'
import { AppContextProvider } from './context/AppContext'

function App() {
  return (
    <div className='App'>
      <Router>
        <AppContextProvider>
          <Header />
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/requests' element={<Requests />} />
            <Route path='/messages' element={<Messages />} />
            <Route path='/files' element={<Files />} />
          </Routes>
        </AppContextProvider>
      </Router>
    </div>
  )
}

export default App
