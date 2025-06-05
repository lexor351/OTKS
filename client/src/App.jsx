import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contacts from './pages/Contacts';
import Instructions from './pages/Instructions';
import Links from './pages/Links';
import Admin from './pages/Admin';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/links" element={<Links />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;