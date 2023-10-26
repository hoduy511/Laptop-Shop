import './App.scss';

import React, {useContext, useEffect } from "react";
import {ToastContainer} from 'react-toastify';


//Component
import NavBar from './components/NavBar';
import AppRouter from './routes/AppRoutes';

function App() {
  return (
    <>
    <div className="App">
          <NavBar />
          <AppRouter/>
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
