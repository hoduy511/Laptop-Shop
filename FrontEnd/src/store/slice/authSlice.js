import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/Customize-axios';

const initialState = {
  verifyEmailStatus: "unknown", // Trạng thái xác minh email
  resetPasswordStatus: "unknown",
};

export const resetPassword = createAsyncThunk('/auth/resetPassword', async (key) =>{
  try {
    // Gửi POST request
    const url = "/password/reset/confirm/";
    await axios.post(url, { 
      new_password1: key.password1, 
      new_password2: key.password2,
      uid: key.uid,
      token: key.token
    });

    // Nếu thành công, trả về "ok"
    return "ok";
  } catch (error) {
    // Nếu có lỗi, trả về "error"
    throw error;
  }
});

// Thêm một Async Thunk để xác minh email
export const verifyEmail = createAsyncThunk('auth/verifyEmail', async (key) => {
  try {
    // Gửi POST request
    const url = "/account-confirm-email/";
    await axios.post(url, { key });

    // Nếu thành công, trả về "ok"
    return "ok";
  } catch (error) {
    // Nếu có lỗi, trả về "error"
    throw error;
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.verifyEmailStatus = "started";
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.verifyEmailStatus = action.payload;
      })
      .addCase(verifyEmail.rejected, (state) => {
        state.verifyEmailStatus = "error";
      })
      .addCase(resetPassword.pending, (state) => {
        state.resetPasswordStatus = "started";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetPasswordStatus = action.payload;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.resetPasswordStatus = "error";
      });
  },
});

export const getVerifyEmailStatus = (state) => state.auth.verifyEmailStatus;
export const getResetPasswordStatus = (state) => state.auth.resetPasswordStatus;

export default authSlice.reducer;
