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

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Hàm này được gọi khi người dùng đăng nhập thành công
  const handleLogin = (user) => {
    setLoggedIn(true);
    setUser(user);
  };

  // Hàm này được gọi khi người dùng đăng xuất
  const handleLogout = () => {
    setLoggedIn(false);
    setUser(null);
  };

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
          </Routes>
        </Router>
    </div>
    </>
  );
}

export default App;
