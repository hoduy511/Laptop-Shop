import './App.scss';

import React, { useEffect } from "react";
import {useDispatch, useSelector } from 'react-redux';
import {ToastContainer} from 'react-toastify';

//Component
import NavBar from './layouts/Header/NavBar';
import Footer from './layouts/Footer/Footer';
import AppRouter from './routes/AppRoutes';
import ScrollToTop from './components/ScrollToTop';

//Auth
import RefreshToken from './components/Authentication/RefreshToken';
import { logout, selectAccessToken } from './store/slice/userSlice';
import { verifyToken } from './services/UserService';

function App() {
  const isLoggedIn = useSelector(state=>state.user.isLoggedIn)
  const accessToken = useSelector(selectAccessToken);
  const dispatch = useDispatch();

  useEffect(()=>{
    verifyAccessToken();
  },[])

  const verifyAccessToken = async () =>{
    try{
      const response = await verifyToken(accessToken);
    } catch(err){
      logout();
      dispatch(logout());
    }
      
  }


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
