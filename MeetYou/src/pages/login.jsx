import React from 'react';
import '../css/LoginStyles.css';
import { dataContext } from '../context/DataContext';
import { useState, useContext } from 'react';

export function Login() {
  const { VerifyUser, SesionActually } = useContext(dataContext);
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');

  const verify = (e) => {
    e.preventDefault();
    VerifyUser(user, pwd);
    setUser('');
    setPwd('');
    console.log(SesionActually);
  };

  return (
    <>
      <nav id='nav-login'>
        <img id='Imgnav' src='./src/assets/meetYou.png' />
      </nav>
      <div className='form-container'>
        <form onSubmit={verify}>
          <div className='container-inputs'>
            <h2>Iniciar Sesion</h2>
            <input
              onChange={(e) => {
                setUser(e.target.value);
              }}
              type='text'
              placeholder='Usuario'
              value={user}
              id='input-f'
              maxLength='18'
              required
            />
            <input
              onChange={(e) => {
                setPwd(e.target.value);
              }}
              type='password'
              placeholder='Contraseña'
              value={pwd}
              id='input-f'
              required
            />
          </div>
          <div className='container-buttons'>
            <a href='/Create' id='create' className='d-block'>
              Crear Cuenta
            </a>
            <button id='login' className='d-block'>Iniciar Sesion</button>
          </div>
        </form>
      </div>
    </>
  );
}
