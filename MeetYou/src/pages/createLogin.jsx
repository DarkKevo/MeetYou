import React from 'react';
import '../css/LoginStyles2.css';
import { dataContext } from '../context/DataContext';
import { useState, useContext } from 'react';

export function LoginCreate() {
  const { CreateUser } = useContext(dataContext);
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [icon, setIcon] = useState(
    'https://cdn-icons-png.flaticon.com/512/1484/1484867.png'
  );

  const form = (e) => {
    e.preventDefault();
    CreateUser(user, pwd, icon);
    setUser('');
    setPwd('');
    setIcon('');
    window.location.href = '/';
  };

  let formulario = document.createElement('formCreate');

  formulario.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  return (
    <div className='login-container'>
      <nav id='nav-login'>
        <img id='Imgnav' src='./src/assets/meetYou.png' />
      </nav>
      <div className='form-container'>
        <form id='formCreate' onSubmit={form}>
          <div className='container-inputs'>
            <h2>Crear Cuenta</h2>
            <input
              onChange={function (e) {
                setUser(e.target.value);
              }}
              type='text'
              placeholder='Usuario'
              value={user}
              id="input-f"
            />
            <input
              onChange={function (e) {
                setPwd(e.target.value);
              }}
              type='password'
              placeholder='Contraseña'
              value={pwd}
              id="input-f"
            />
            <input
              onChange={function (e) {
                setIcon(e.target.value);
              }}
              type='text'
              placeholder='Icon URL'
              value={icon}
              id="input-f"
            />
          </div>
          <div className='container-buttons'>
            <button id='create'>Crear Cuenta</button>
            <button id='login'>Iniciar Sesion</button>
          </div>
        </form>
        <div className='visor'>
          <h2>Your Logo Visor</h2>
          <img className='imgIcon' src={icon} />
          <h2 id='tituloImage'>{user}</h2>
        </div>
      </div>
    </div>
  );
}
