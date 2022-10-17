import React from 'react';
import './App.css';
import { Header } from './components/header/Header'
import { About } from './views/About';
import { Home } from './views/Home';
import {
  BrowserRouter as Router,
  Route,
  Routes 
} from 'react-router-dom';
import { Contact } from './views/Contact';
import { Prices } from './views/Prices';

function App() {
  
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes >
          <Route path="/" element={ <Home />}/>
          <Route path="/about"  element={ <About />}/>
          <Route path="/contact"  element={ <Contact />}/>
          <Route path="/prices"  element={ <Prices />}/>
        </Routes >
      </Router>
    </div>
  );
}

export default App;
