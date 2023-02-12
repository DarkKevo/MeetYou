import { createContext, useState, useEffect } from 'react';
import uuid from 'react-uuid';

export const dataContext = createContext();

export function DataContextProvider(props) {
  const [dataUsers, setData] = useState([]);
  const [dataTweets, setTweet] = useState([]);

  //Funciones de los Render
  function Favorite_Render() {
    let a = JSON.parse(localStorage.getItem('DataTweet'));
    setTweet(a);
    setTweet(a.filter((element) => element.favorite === true));
  }

  function MyRender() {
    let a = JSON.parse(localStorage.getItem('DataTweet'));
    setTweet(a);
    let data = JSON.parse(localStorage.getItem('Sesion'));
    setTweet(a.filter((element) => element.user === data.username));
  }

  function Default_Render() {
    setTweet(ReadTweet());
  }

  function Log_Out() {
    localStorage.removeItem('Sesion');
    window.location.href = '/';
  }

  function Favorite(id) {
    let tweets = JSON.parse(localStorage.getItem('DataTweet'));
    tweets.forEach((e, index) => {
      if (e.id === id) {
        if (tweets[index].favorite === true) {
          tweets[index].favorite = false;
          localStorage.setItem('DataTweet', JSON.stringify(tweets));
          setTweet(ReadTweet());
        } else if (tweets[index].favorite === false) {
          tweets[index].favorite = true;
          localStorage.setItem('DataTweet', JSON.stringify(tweets));
          setTweet(ReadTweet());
        }
      }
    });
  }

  function CreateTweet(text, icon, user) {
    let date = new Date();
    let data_time = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} a las ${date.getHours()}:${date.getMinutes()}`;
    let object = {
      icon: icon,
      user: user,
      text: text,
      time: data_time,
      favorite: false,
      id: uuid(),
    };

    if (localStorage.getItem('DataTweet') === null) {
      let dataTweet = [];
      dataTweet.push(object);
      localStorage.setItem('DataTweet', JSON.stringify(dataTweet));
      setTweet(ReadTweet());
    } else {
      let dataTweet = JSON.parse(localStorage.getItem('DataTweet'));
      dataTweet.push(object);
      localStorage.setItem('DataTweet', JSON.stringify(dataTweet));
      setTweet(ReadTweet());
    }
  }

  function ReadTweet() {
    let data = JSON.parse(localStorage.getItem('DataTweet'));
    return data;
  }

  function ReadData() {
    if (localStorage.getItem('DataUser') === null) {
      return;
    } else {
      let data = JSON.parse(localStorage.getItem('DataUser'));
      return data;
    }
  }

  function CreateUser(user, pwd, icon) {
    let obj = {
      user,
      pwd,
      icon,
    };

    if (localStorage.getItem('DataUser') === null) {
      let dataUser = [];
      dataUser.push(obj);
      localStorage.setItem('DataUser', JSON.stringify(dataUser));
      setData(ReadData());
    } else {
      let dataUser = JSON.parse(localStorage.getItem('DataUser'));
      dataUser.push(obj);
      localStorage.setItem('DataUser', JSON.stringify(dataUser));
      setData(ReadData());
    }
  }

  function VerifyUser(user, pwd) {
    if (localStorage.getItem('DataUser') === null) {
      alert('No Login');
    } else {
      let d = dataUsers.filter(
        (element) => element.user === user && element.pwd === pwd
      );
      if (d.length == 1) {
        if (localStorage.getItem('Sesion') === null) {
          let SesionActually = {
            username: user,
            sesion: true,
            icon: d[0].icon,
          };
          localStorage.setItem('Sesion', JSON.stringify(SesionActually));
          setData(ReadData());
        } else {
          let SesionActually = {
            username: null,
            sesion: false,
            icon: null,
          };
          let dataUser = JSON.parse(localStorage.getItem('Sesion'));
          dataUser = SesionActually;
          localStorage.setItem('Sesion', JSON.stringify(dataUser));
          setData(ReadData());
        }
        window.location.href = '/Home';
      } else {
        alert('No Login');
      }
    }
  }

  useEffect(() => {
    setData(ReadData());
    setTweet(ReadTweet());
  }, []);

  return (
    <dataContext.Provider
      value={{
        dataUsers,
        VerifyUser,
        CreateUser,
        CreateTweet,
        dataTweets,
        Log_Out,
        Favorite,
        Favorite_Render,
        MyRender,
        Default_Render,
      }}
    >
      {props.children}
    </dataContext.Provider>
  );
}
