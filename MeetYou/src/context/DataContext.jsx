import { createContext, useState, useEffect } from 'react';
import uuid from 'react-uuid';

export const dataContext = createContext();

export function DataContextProvider(props) {
  const [dataUsers, setData] = useState([]);
  const [dataTweets, setTweet] = useState([]);

  function Log_Out() {
    localStorage.removeItem('Sesion');
    window.location.href = '/';
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
    if (localStorage.getItem('DataTweet') === null) {
      return;
    } else {
      let data = JSON.parse(localStorage.getItem('DataTweet'));
      return data;
    }
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
      }}
    >
      {props.children}
    </dataContext.Provider>
  );
}
