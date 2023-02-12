import React from 'react';
import { dataContext } from '../context/DataContext';
import { TweetCard } from '../components/TweetCard';
import { useContext } from 'react';
import '../css/home.css'

export function TweetList() {
  const { dataTweets } = useContext(dataContext);
  let a = JSON.parse(localStorage.getItem('DataTweet'))

  if (localStorage.getItem('DataTweet') === null || a.length === 0) {
    return <h2 id="NoTweets">No Hay Tweets</h2>;
  }

  return (
    <div className='container-cards'>
      {dataTweets.map((t) => (
        <TweetCard key={t.id} tweet={t} />
      ))}
    </div>
  );
}
