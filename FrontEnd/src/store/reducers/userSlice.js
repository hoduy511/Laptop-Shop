
import { createSlice } from '@reduxjs/toolkit';
import { logoutApi } from '../../services/UserService';
import { toast } from 'react-toastify';

const initialState = {
  isLoggedIn: false, // Trạng thái đăng nhập
  user: { // Thời gian hết hạn access token
  },
  auth:{
    access: null,
    access_expiration: null
  },
  address:{}
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    authentication:(state, action) =>{
      state.auth.access = action.payload.access;
      state.auth.access_expiration = action.payload.access_expiration;
    },
    logout: (state) => {
      if(state.isLoggedIn === true){
        state.user = [];
        state.auth = {
          access: null,
          access_expiration: null,
        };
        state.address = {};
        logoutApi(state.user.access);
        state.isLoggedIn = false;
        toast.success('Đăng xuất thành công!');
      }
    },
    loadAddress: (state, action) =>{
      state.address = action.payload;
    }
  },
});

export const { loginSuccess, logout, authentication, loadAddress } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectAccessToken = (state) => state.user.auth.access;
export const selectRefreshToken = (state) => state.user.user.refresh;
export const selectAccessExpiration = (state) => state.user.auth.access_expiration;

export default userSlice.reducer;
