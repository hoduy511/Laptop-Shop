import React from 'react';
import wallpaper from '../assets/image/wallpaper.jpg'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () =>{
    navigate('/shop');
  }
  return (
    <>
    <div className='h-100' style={{
      background: `url(${wallpaper})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      height: "100vh",
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      minHeight:'800px'
    }}>
      <nav aria-label="breadcrumb" class="main-breadcrumb"
        style={{
          width: '80%',
          margin: '0 auto'
        }}
        >
        <ol class="breadcrumb">
          <li class="breadcrumb-item active" style={{color: "#F08804"}} aria-current="page">Home</li>
        </ol>
      </nav>
      <div className="box" style={{
        background: 'rgba(255, 255, 255, 0.7)', // semi-transparent white background
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center',
      }}>
        <h3>Chào mừng bạn đến với trang Web 👋</h3>
        <p>Tôi là: Nguyễn Hoàng Lộc</p>
        <p>MSSV: 2051120259</p>
        <p>Lớp: CN20D</p>
        <button className='btn btn-primary btn-lg' onClick={handleClick}>Shop Now</button>
      </div>
    </div>
    </>
  );
};

export default Home;
