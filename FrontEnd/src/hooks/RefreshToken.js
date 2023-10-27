import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccessToken, selectAccessExpiration, selectRefreshToken, loginSuccess, } from '../store/reducers/userSlice';
import axios from '../services/Customize-axios';

function RefreshToken() {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);
  const accessExpiration = useSelector(selectAccessExpiration);
  const refreshToken = useSelector(selectRefreshToken);
  const isLoggedIn = useSelector(state=>state.user.isLoggedIn);



  const isAccessTokenExpired = (accessExpiration) => {
    const currentTimestamp = new Date(); // Lấy thời gian hiện tại dưới dạng ISO 8601
    const expirationDate = Date(accessExpiration);
    console.log('currentTime:',currentTimestamp)
    console.log('expire:',expirationDate)
    return expirationDate < currentTimestamp;
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

          dispatch(loginSuccess({ access: newAccessToken, access_expiration: newAccessExpiration }));

          setTimeout(refreshAccessTokenIfNeeded, 0.2 * 60 * 1000 + 50 * 1000);
        } else {
          // Xử lý lỗi khi không nhận được access token mới
        }
      } catch (error) {
        // Xử lý lỗi khi làm mới access token không thành công
        console.error(error);
        setTimeout(refreshAccessTokenIfNeeded, 4 * 60 * 1000 + 50 * 1000);
      }
    } else {
      setTimeout(refreshAccessTokenIfNeeded, 4 * 60 * 1000 + 50 * 1000);
    }
  }

  useEffect(() => {
    if (isLoggedIn && accessToken && isAccessTokenExpired(accessExpiration) ) {
      refreshAccessTokenIfNeeded();
    }
  }, [isLoggedIn, accessToken, accessExpiration]);

  return null;
}

export default RefreshToken;
