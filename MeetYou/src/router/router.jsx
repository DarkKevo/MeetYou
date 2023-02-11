import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from '../pages/login';
import {LoginCreate} from '../pages/createLogin'

function RoutesF() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/Create" element={<LoginCreate/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesF;
