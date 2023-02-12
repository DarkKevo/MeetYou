import React from 'react';
import { dataContext } from '../context/DataContext';
import '../css/cards.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';

export function TweetCard({ tweet }) {
  const { Favorite, Delete } = useContext(dataContext);
  let a = JSON.parse(localStorage.getItem('Sesion'));

  if (a.username === tweet.user) {
    return (
      <div id='TweetCard-contain'>
        <div className='icon-name-tweet'>
          <img id='Img-Tweet-card' src={tweet.icon} />
          <div className='icon-name-body'>
            <h3>{tweet.user}</h3>
            <p>{tweet.time}</p>
          </div>
        </div>
        <div className='tweet-body'>{tweet.text}</div>
        <div className='Buttons-Container'>
          <button
            onClick={(e) => {
              Favorite(tweet.id);
            }}
            style={
              tweet.favorite
                ? { color: 'white' }
                : { color: 'rgb(145, 145, 145)' }
            }
          >
            <FontAwesomeIcon id='like' icon={faThumbsUp} />
          </button>
          <button
            onClick={(e) => {
              Delete(tweet.id);
            }}
          >
            <FontAwesomeIcon id='delete' icon={faTrash} />
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div id='TweetCard-contain'>
        <div className='icon-name-tweet'>
          <img id='Img-Tweet-card' src={tweet.icon} />
          <div className='icon-name-body'>
            <h3>{tweet.user}</h3>
            <p>{tweet.time}</p>
          </div>
        </div>
        <div className='tweet-body'>{tweet.text}</div>
        <div className='Buttons-Container'>
        </div>
      </div>
    );
  }
}
