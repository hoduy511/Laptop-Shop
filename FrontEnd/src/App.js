import logo from './logo.svg';
import './App.scss';

import React, { useState, useContext, useEffect } from "react";
import { Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import { UserContext } from './context/UserContext';

//Component
import NavBar from './components/NavBar';
import Home from './components/Home';
import Cart from './components/Cart';
import Shop from './components/Shop';
import Login from './components/LoginForm';
import Register from './components/RegistrationForm';
import Abouts from './components/About';
import MyComponent from './components/MyComponent';

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
          <Routes>
            <Route path='/Laptop-Shop/' element={<Home />} exact/>
            <Route path='/Laptop-Shop/shop' element={<Shop />} />
            <Route path='/Laptop-Shop/cart' element={<Cart />} />
            <Route path='/Laptop-Shop/login' element={<Login />} />
            <Route path='/Laptop-Shop/register' element={<Register />} />
            <Route path='/Laptop-Shop/abouts' element={<Abouts />} />
          </Routes>
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
