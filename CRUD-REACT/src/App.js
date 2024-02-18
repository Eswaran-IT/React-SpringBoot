

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Components/Register';
import MainPage from './Components/MainPage';
import Options from './Components/Options';
import Add from './Components/Add';
import Delete from './Components/Delete';
import Update from './Components/Update';

function App() {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<MainPage />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/options" element={<Options />} />
        <Route path="/add" element={<Add />} />
        <Route path="/delete" element={<Delete />} />
        <Route path="/update" element={<Update />} />
      </Routes>
    </Router>
   
  );
}

export default App;
