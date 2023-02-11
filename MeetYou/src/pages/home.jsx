import React from 'react';
import '../css/home.css';

export function Home() {
  return (
    <div className='Home-Container'>
      <nav id='nav-home'>
        <div className='Nav1'>
          <img id='Img-home' src='./src/assets/meetYou.png' />
          <button className='Nav-button'>Inicio</button>
          <button className='Nav-button'>Favoritos</button>
        </div>
        <div className='Nav2'>
          <div className='Image-User'>
            <img
              id='img-nav-icon'
              src='https://cdn-icons-png.flaticon.com/512/1484/1484867.png'
            />
            <div className='nav-text'>
              <h3>El Tittle</h3>
              <button>Mis Publicaciones</button>
            </div>
          </div>
          <button id='log-out'>
            <img id='svg' src='./src/assets/Untitled.svg'></img>
          </button>
        </div>
      </nav>
    </div>
  );
}
