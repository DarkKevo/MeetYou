import React from 'react';
import { TweetList } from '../components/TweetList';
import { dataContext } from '../context/DataContext';
import { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faStar, faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import '../css/home.css';

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
      <div className='sesion-verify'>
        <h2>No tienes una sesión activa</h2>
      </div>
    );
  } else {
    let Data = JSON.parse(localStorage.getItem('Sesion'));
    return (
      <div className='Home-Container'>
        <div className='logo'>
          <div className='container-logo'>
            <img className='Img-home' src='./src/assets/meetYou.png' />
          </div>
        </div>
        <div className='navbar'>
          <div className='logo'>
            <div className='container-logo'>
              <img className='Img-home' src='./src/assets/meetYou.png' />
            </div>
          </div>
          <nav className='nav-home'>
            <ul className='nav-items'>
              <li>
                <button className='nav-button' onClick={Default_Render}>
                  <FontAwesomeIcon icon={faHome} />
                  <span>Inicio</span>
                </button>
              </li>
              <li>
                <button className='nav-button' onClick={Favorite_Render}>
                  <FontAwesomeIcon icon={faStar} />
                  <span>Favoritos</span>
                </button>
              </li>
              <li>
                <input type="checkbox" id="log-check"/>
                <label htmlFor="log-check" className='log-label'>
                  <img className='img-tweet' src={Data.icon} />
                </label>
                <div className='user-log'>
                  <img id='img-nav-icon' src={Data.icon} />
                  <div className='nav-text'>
                    <p>{Data.username}</p>
                    <button onClick={MyRender}>Mis Publicaciones</button>
                  </div>
                  <button id='log-out' onClick={Log_Out}>
                    <FontAwesomeIcon icon={faRightFromBracket} />
                  </button>
                </div>
              </li>
            </ul>
          </nav>
        </div>
        <form onSubmit={agregar} className='tweet-container new'>
          <div className='tweet-input-group'>
            <img className='img-tweet' src={Data.icon} />
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
          </div>
          <button id='publicar-button'>Publicar</button>
        </form>
        <div className='tweet-container'>
          <TweetList />
        </div>
      </div>
    );
  }
}
