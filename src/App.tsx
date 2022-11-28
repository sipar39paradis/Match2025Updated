import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Header } from './components/header/Header'
import { About } from './views/loggedout/About'
import { Home } from './views/loggedout/Home'
import { Contact } from './views/loggedout/Contact'
import { Prices } from './views/loggedout/Prices'
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
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/prices' element={<Prices />} />
            <Route path='/profile/:id' element={<Profile />} />
            <Route path='/profile/' element={<Profile />} />
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
