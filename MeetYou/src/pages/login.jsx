import React from 'react';
import '../css/LoginStyles.css';

export function Login() {
  return (
    <div className='login-container'>
      <nav>
        <img src='./src/assets/meetYou.png' />
      </nav>
      <div className='form-container'>
        <form>
          <div className='container-inputs'>
            <h2>Iniciar Sesion</h2>
            <input type='text' placeholder='Usuario' />
            <input type='password' placeholder='Contraseña' />
          </div>
          <div className='container-buttons'>
            <button id='create'>Crear Cuenta</button>
            <button id='login'>Iniciar Sesion</button>
          </div>
        </form>
      </div>
    </div>
  );
}
