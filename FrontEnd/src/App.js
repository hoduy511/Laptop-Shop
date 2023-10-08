import logo from './logo.svg';
import './App.scss';

import React, { useState, useContext, useEffect } from "react";
import { Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import { UserContext } from './context/UserContext';

//Component
import NavBar from './components/NavBar';
import AppRouter from './routes/AppRoutes';

function App() {
  const {user, loginContext} = useContext(UserContext);

  useEffect(()=>{
    if(localStorage.getItem('token')){
      loginContext(localStorage.getItem('email'), localStorage.getItem('token'));
    }
  }, [])

  return (
    <>
    <div className="App">
          <NavBar />
          <AppRouter/>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
    </div>
    </>
  );
}

export default App;
