import { createContext, useState, useEffect } from 'react';

export const dataContext = createContext()

export function DataContextProvider(props) {
  const [dataUser, setData] = useState([]);

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
    let a = dataUser.filter((i) => i.usuario !== user && i.password !== pwd);
    if (a.length < dataUser.length) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    ReadData()
      .then((r) => setData(r))
      .catch((e) => console.error(e));
  }, []);

  return (
    <DataContextProvider.Provider value={{ dataUser, VerifyUser, CreateUser }}>
      {props.children}
    </DataContextProvider.Provider>
  );
}
