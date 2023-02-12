import React from 'react';
import '../css/home.css';
import { TweetList } from '../components/TweetList';
import { dataContext } from '../context/DataContext';
import { useState, useContext } from 'react';

export function Home() {
  let Data = JSON.parse(localStorage.getItem('Sesion'));
  const [tweet, setTweet] = useState('');
  const { CreateTweet, Log_Out } = useContext(dataContext);

  const agregar = (e) => {
    e.preventDefault();
    let Sesion = JSON.parse(localStorage.getItem('Sesion'));
    CreateTweet(tweet, Sesion.icon, Sesion.username);
    setTweet('');
  };

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
            <img id='img-nav-icon' src={Data.icon} />
            <div className='nav-text'>
              <h3>{Data.username}</h3>
              <button>Mis Publicaciones</button>
            </div>
          </div>
          <button id='log-out' onClick={Log_Out}>
            <img id='svg' src='./src/assets/Untitled.svg'></img>
          </button>
        </div>
      </nav>
      <div className='Form-Tweet'>
        <img id='Img-Tweet' src={Data.icon} />
        <div className='form-tweet-container'>
          <form onSubmit={agregar}>
            <input
              onChange={(e) => {
                setTweet(e.target.value);
              }}
              id='tweet-input'
              type='text'
              placeholder='Escribe algo'
              value={tweet}
            />
            <button id='publicar-button'>PUBLICAR</button>
          </form>
        </div>
      </div>
      <div className='TweetList'>
        <TweetList />
      </div>
    </div>
  );
}
