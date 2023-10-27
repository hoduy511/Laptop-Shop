import './App.scss';

import React from "react";
import { useSelector } from 'react-redux';
import {ToastContainer} from 'react-toastify';


//Component
import NavBar from './components/NavBar';
import AppRouter from './routes/AppRoutes';

//Auth
import RefreshToken from './hooks/RefreshToken';

function App() {
  const isLoggedIn = useSelector(state=>state.user.isLoggedIn)

  return (
    <>
    <div className="App">
          <NavBar />
          <AppRouter/>
          <RefreshToken isLoggedIn={isLoggedIn}/>
        <ToastContainer
        position="top-right"
        autoClose={1000}
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
