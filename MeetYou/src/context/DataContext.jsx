import { createContext, useState, useEffect } from 'react';

export const dataContext = createContext();

export function DataContextProvider(props) {
  const [dataUser, setData] = useState([]);

  var SesionActually = {
    username: null,
    sesion: false,
    icon: null,
  };

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
    } else {
      let dataUser = JSON.parse(localStorage.getItem('DataUser'));
      dataUser.push(obj);
      localStorage.setItem('DataUser', JSON.stringify(dataUser));
    }
  }

  function VerifyUser(user, pwd) {
    let a = dataUser.filter((i) => i.user !== user && i.pwd !== pwd);
    if (a.length < dataUser.length) {
      SesionActually.username = user;
      SesionActually.sesion = true;
      a = dataUser.filter((i) => i.user === user && i.pwd === pwd);
      SesionActually.icon = a[0].icon;
      return true;
    } else {
      alert('No inciaste');
      SesionActually.username = null;
      SesionActually.sesion = false;
      return false;
    }
  }

  useEffect(() => {
    setData(ReadData());
  }, []);

  return (
    <dataContext.Provider
      value={{ dataUser, VerifyUser, CreateUser, SesionActually }}
    >
      {props.children}
    </dataContext.Provider>
  );
}
