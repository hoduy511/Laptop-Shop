import './App.scss';

import React from "react";
import {useSelector } from 'react-redux';
import {ToastContainer} from 'react-toastify';

//Component
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import AppRouter from './routes/AppRoutes';
import ScrollToTop from './components/ScrollToTop';

//Auth
import RefreshToken from './hooks/RefreshToken';

function App() {
  const isLoggedIn = useSelector(state=>state.user.isLoggedIn)



  return (
    <>
    <div className="App">
      <ScrollToTop/>
          <NavBar />
          <div className='site-content'>
            <AppRouter/>
          </div>
          <Footer/>
          <RefreshToken isLoggedIn={isLoggedIn}/>
        <ToastContainer
        position="top-center"
        autoClose={500}
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
