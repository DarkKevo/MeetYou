import React from 'react';
import { dataContext } from '../context/DataContext';
import { TweetCard } from '../components/TweetCard';
import { useContext } from 'react';
import '../css/home.css'

export function TweetList() {
  const { dataTweets } = useContext(dataContext);

  if (localStorage.getItem('DataTweet') === null) {
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
