import React from 'react';
import '../css/home.css';
import { TweetList } from '../components/TweetList';
import { dataContext } from '../context/DataContext';
import { useState, useContext } from 'react';

export function Home() {
  const [tweet, setTweet] = useState('');
  const { CreateTweet, Log_Out, Favorite_Render, MyRender, Default_Render } =
    useContext(dataContext);

  window.onbeforeunload = function () {
    Log_Out();
  };

  const agregar = (e) => {
    e.preventDefault();
    let Sesion = JSON.parse(localStorage.getItem('Sesion'));
    CreateTweet(tweet, Sesion.icon, Sesion.username);
    setTweet('');
  };

  if (localStorage.getItem('Sesion') === null) {
    return (
      <div className='Sesion-Verify'>
        <h2>No tienes una sesion activa</h2>
      </div>
    );
  } else {
    let Data = JSON.parse(localStorage.getItem('Sesion'));
    return (
      <div className='Home-Container'>
        <nav id='nav-home'>
          <div className='Nav1'>
            <img id='Img-home' src='./src/assets/meetYou.png' />
            <button className='Nav-button' onClick={Default_Render}>
              Inicio
            </button>
            <button className='Nav-button' onClick={Favorite_Render}>
              Favoritos
            </button>
          </div>
          <div className='Nav2'>
            <div className='Image-User'>
              <img id='img-nav-icon' src={Data.icon} />
              <div className='nav-text'>
                <h3>{Data.username}</h3>
                <button onClick={MyRender}>Mis Publicaciones</button>
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
                required
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
}
