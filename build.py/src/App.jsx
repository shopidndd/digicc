
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SelectPage from './components/SelectPage';
import CardGenerator from './components/CardGenerator';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SelectPage />} />
        <Route path='/generator' element={<CardGenerator />} />
      </Routes>
    </Router>
  );
}
