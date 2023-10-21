import { createSlice } from '@reduxjs/toolkit';
import axios from '../../services/Customize-axios';

const initialState = {
  usernameRegisterError: "",
  emailRegisterError: "",
  password1RegisterError: "",
  verifyEmailStatus: "unknown", // new variable in the store
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUsernameRegisterError(state, action) {
      state.usernameRegisterError = action.payload;
    },
    setEmailRegisterError(state, action) {
      state.emailRegisterError = action.payload;
    },
    setPassword1RegisterError(state, action) {
      state.password1RegisterError = action.payload;
    },
    setVerifyEmailStatus(state, action) {
      state.verifyEmailStatus = action.payload;
    },
  },
});

export default authSlice.reducer;

export const {
  setUsernameRegisterError,
  setEmailRegisterError,
  setPassword1RegisterError,
  setVerifyEmailStatus,
} = authSlice.actions;

export const verifyEmail = (key) => async (dispatch) => {
    try {
      // Set status to "started"
      dispatch(setVerifyEmailStatus("started"));
  
      // Send POST request
      const url = "/account-confirm-email/";
      await axios.post(url, { key });
  
      // Set verify email status to "ok"
      dispatch(setVerifyEmailStatus("ok"));
    } catch (error) {
      // Set status to "error"
      dispatch(setVerifyEmailStatus("error"));
    }
  };

export const getVerifyEmailStatus = (state) => state.auth.verifyEmailStatus;
