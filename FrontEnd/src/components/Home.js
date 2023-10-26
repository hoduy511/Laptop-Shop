import axios from 'axios';
import React from 'react';


const Home = () => {
  
  const handleClick = async () =>{
    try{

      const response= await axios.get("http://127.0.0.1/:8000/dj-rest-auth/token/refresh/",{
        withCredentials:true,
        refresh:''
    });
      console.log('check refresh token:',response);
    } catch(err){
      console.error(err);
    }
  }

  return <div className='home'>
    Hello HoangLoc
    <button onClick={()=>handleClick()}>Click Me</button>
  </div>;
};

export default Home;
