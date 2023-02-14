import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from '../pages/login';
import {LoginCreate} from '../pages/createLogin'
import {Home} from '../pages/home';
import '../css/general.css';

function RoutesF() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/Create" element={<LoginCreate/>}/>
        <Route exact path="/Home" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesF;
