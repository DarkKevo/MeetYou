import React from 'react';
import { dataContext } from '../context/DataContext';
import '../css/cards.css';

export function TweetCard({ tweet }) {

  return (
    <div id='TweetCard-contain'>
      <div className='icon-name-tweet'>
        <img
          id='Img-Tweet-card'
          src={tweet.icon}
        />
        <div className='icon-name-body'>
          <h3>{tweet.user}</h3>
          <p>{tweet.time}</p>
        </div>
      </div>
      <div className='tweet-body'>
        {tweet.text}
      </div>
      <div className='Buttons-Container'></div>
    </div>
  );
}
