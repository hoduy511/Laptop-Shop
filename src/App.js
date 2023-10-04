import logo from './logo.svg';
import './App.scss';

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

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

  return (
    <>
    <div className="App">
        <Router>
          <NavBar/>
          <Routes>
            <Route path='/Laptop-Shop/' element={<Home />} exact/>
            <Route path='/Laptop-Shop/shop' element={<Shop />} />
            <Route path='/Laptop-Shop/cart' element={<Cart />} />
            <Route path='/Laptop-Shop/login' element={<Login />} />
            <Route path='/Laptop-Shop/register' element={<Register />} />
            <Route path='/Laptop-Shop/abouts' element={<MyComponent />} />
          </Routes>
        </Router>
    </div>
    </>
  );
}

export default App;
