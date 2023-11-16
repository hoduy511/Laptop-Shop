import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccessToken, selectAccessExpiration, selectRefreshToken, authentication, logout } from '../../store/slice/userSlice';
import axios from '../../services/Customize-axios';

function RefreshToken() {
  const dispatch = useDispatch();
  const [refreshInterval, setRefreshInterval] = useState(null);
  let accessToken = useSelector(selectAccessToken);
  let accessExpiration = useSelector(selectAccessExpiration);
  const refreshToken = useSelector(selectRefreshToken);
  let isLoggedIn = useSelector(state=>state.user.isLoggedIn);


  const isAccessTokenExpired = (accessExpiration) => {
    let currentTimestamp = new Date(); // Lấy thời gian hiện tại dưới dạng ISO 8601
    let expireTime = new Date(accessExpiration);
    return (expireTime < currentTimestamp);
  }

  const refreshAccessTokenIfNeeded = async () => {

    if (isLoggedIn && accessToken) {
      try {
        // Gọi API refresh token
        const response = await axios.post('/dj-rest-auth/token/refresh/', {
          refresh: refreshToken,
        });

        if (response && response.access) {
          const newAccessToken = response.access;
          const newAccessExpiration = response.access_expiration;

          dispatch(authentication({ 
            access: newAccessToken, 
            access_expiration: newAccessExpiration
          }));

        } else {
          // Xử lý lỗi khi không nhận được access token mới
          logout();
        }
      } catch (error) {
        // Xử lý lỗi khi làm mới access token không thành công
        console.error(error);
      }
    } else {
    }
  }

  useEffect(() => {
    if (isLoggedIn && accessToken) {
      if (!accessExpiration){
        setTimeout(refreshAccessTokenIfNeeded,1 * 1000);
        console.log('Chưa có accExp');
      } else if (accessExpiration){
        let isRefreshing = false;
        let remainingTime = new Date(accessExpiration) - new Date();
        const intervalId = setInterval(() => {
          if (isAccessTokenExpired(accessExpiration) === true && !(remainingTime < 0) && !isRefreshing) {
            if(remainingTime > 0 && !isRefreshing){
              refreshAccessTokenIfNeeded();
              isRefreshing = true;
              console.log('Đã được thực thi');
            }
            console.log('refresh điều kiện', remainingTime);
          } else{
            clearInterval(intervalId);
          }
        }, remainingTime);
        setRefreshInterval(intervalId);
      }
    }
  }, [accessToken]);

  return null;
}

export default RefreshToken;
