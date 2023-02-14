import { createContext, useState, useEffect } from 'react';
import uuid from 'react-uuid';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const dataContext = createContext();

export function DataContextProvider(props) {
  const [dataUsers, setData] = useState([]);
  const [dataTweets, setTweet] = useState([]);

  //Funciones de los Render
  function Favorite_Render() {
    let a = JSON.parse(localStorage.getItem('DataTweet'));
    setTweet(a);
    let b = JSON.parse(localStorage.getItem('Sesion'));
    if (localStorage.getItem('DataTweet') === null) {
      setTweet(a.filter((element) => element.favorite_to.includes(b.username)));
    } else {
      setTweet(a.filter((element) => element.favorite_to.includes(b.username)).reverse());
    }
  }

  function MyRender() {
    let a = JSON.parse(localStorage.getItem('DataTweet'));
    setTweet(a);
    if (localStorage.getItem('DataTweet') === null) {
      let data = JSON.parse(localStorage.getItem('Sesion'));
      setTweet(a.filter((element) => element.user === data.username));
    } else {
      let data = JSON.parse(localStorage.getItem('Sesion'));
      setTweet(a.filter((element) => element.user === data.username).reverse());
    }
  }

  function Default_Render() {
    setTweet(ReadTweet());
  }

  function Log_Out() {
    localStorage.removeItem('Sesion');
    window.location.href = '/';
  }

  function Delete(id) {
    let tweets = JSON.parse(localStorage.getItem('DataTweet'));
    tweets.forEach((e, index) => {
      if (e.id === id) {
        tweets.splice(index, 1);
        localStorage.setItem('DataTweet', JSON.stringify(tweets));
        setTweet(ReadTweet());
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Eliminado con exito',
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  }

  function Favorite(id) {
    let sesion = JSON.parse(localStorage.getItem('Sesion'));
    let tweets = JSON.parse(localStorage.getItem('DataTweet'));
    tweets.forEach((e, index) => {
      if (e.id === id) {
        let l = tweets[index].favorite_to.filter((e) => e === sesion.username);
        if (l.length == 1) {
          let r = JSON.parse(localStorage.getItem('DataTweet'));
          r.forEach((e, p) => {
            if (e.id == id) {
              r[p].favorite_to.forEach((e, x) => {
                if (e === sesion.username) {
                  r[p].favorite_to.splice(x, 1);
                }
              });
            }
          });
          localStorage.setItem('DataTweet', JSON.stringify(r));
          setTweet(ReadTweet());
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Eliminado de favoritos',
            showConfirmButton: false,
            timer: 1000,
          });
        } else {
          tweets[index].favorite_to.push(sesion.username);
          localStorage.setItem('DataTweet', JSON.stringify(tweets));
          setTweet(ReadTweet());
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Agregado  Favoritos',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  }

  function CreateTweet(text, icon, user) {
    var date = new Date();
    let data_time = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} a las ${date.getHours()}:${date.getMinutes()}`;
    let object = {
      icon: icon,
      user: user,
      text: text,
      time: data_time,
      favorite: false,
      favorite_to: [],
      id: uuid(),
    };

    if (localStorage.getItem('DataTweet') === null) {
      let dataTweet = [];
      dataTweet.push(object);
      localStorage.setItem('DataTweet', JSON.stringify(dataTweet));
      setTweet(ReadTweet());
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Tu Tweet ha sido cargado',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      let dataTweet = JSON.parse(localStorage.getItem('DataTweet'));
      dataTweet.push(object);
      localStorage.setItem('DataTweet', JSON.stringify(dataTweet));
      setTweet(ReadTweet());
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Tu Tweet ha sido cargado',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  function ReadTweet() {
    let data = JSON.parse(localStorage.getItem('DataTweet'));
    if (localStorage.getItem('DataTweet') === null) {
      return data;
    } else {
      return data.reverse();
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
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Parece que los datos son incorrectos...',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      let d = dataUsers.filter((element) => element.user === user && element.pwd === pwd);
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
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Parece que los datos son incorrectos...',
          showConfirmButton: false,
          timer: 1500,
        });
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
        Delete,
      }}
    >
      {props.children}
    </dataContext.Provider>
  );
}
