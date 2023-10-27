// userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { logoutApi } from '../../services/UserService';


const initialState = {
  isLoggedIn: false, // Trạng thái đăng nhập
  user: {
    access_expiration: null, // Thời gian hết hạn access token
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      const currentExpiration = new Date();
      // currentExpiration.setMinutes(currentExpiration.getMinutes() + 0);
      currentExpiration.setSeconds(currentExpiration.getSeconds() + 1);
      state.user.access_expiration = currentExpiration; 
    },
    logout: (state) => {
      logoutApi(state.user.access);
      state.isLoggedIn = false;
      state.user = [];
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectAccessToken = (state) => state.user.user.access;
export const selectRefreshToken = (state) => state.user.user.refresh;
export const selectAccessExpiration = (state) => state.user.user.access_expiration;

export default userSlice.reducer;
