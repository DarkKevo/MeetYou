import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from '../pages/login';

function RoutesF() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesF;
