import React, { useEffect, useState } from 'react';
import { axiosPrivate } from '../services/Customize-axios';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../store/reducers/userSlice';
import { useNavigate } from 'react-router-dom';

const Abouts = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const accessToken = useSelector(selectAccessToken);
  const isLoggedIn = useSelector(state=>state.user.isLoggedIn);

  useEffect(() => {
    // Gọi API để lấy dữ liệu của người dùng
    if(isLoggedIn){
    console.log('access', accessToken);
    axiosPrivate.get('/api/user/',{
      headers: {"Authorization": `Bearer ${accessToken}`}
    })
      .then(response => {
        setUserData(response); // Lưu dữ liệu người dùng vào state
        setLoading(false); // Đánh dấu rằng yêu cầu đã hoàn thành
      })
      .catch(error => {
          // Handle 401 Unauthorized response, for example, refresh token and retry the request.
        console.error('Error fetching user profile:', error);
        setLoading(false); // Đánh dấu rằng yêu cầu đã hoàn thành (có lỗi)
      });
    } else{
      navigate('/Laptop-Shop/login')
    }
  }, [accessToken]);

  if (loading) {
    return <p>Loading...</p>; // Hiển thị thông báo "Loading" trong quá trình gửi yêu cầu
  }

  if (!userData) {
    return <p>Error loading user profile</p>; // Hiển thị thông báo lỗi nếu có lỗi khi gửi yêu cầu
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
      {/* Hiển thị thông tin khác của người dùng */}
    </div>
  );
}

export default Abouts;
