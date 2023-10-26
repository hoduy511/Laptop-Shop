import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/Customize-axios';

const initialState = {
  usernameRegisterError: "",
  emailRegisterError: "",
  password1RegisterError: "",
  verifyEmailStatus: "unknown", // Trạng thái xác minh email
  accessToken: null,
};

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
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      // Các xử lý khác khi đăng xuất (nếu cần)
    },
  },
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
      });
      
  },
});

export const { setUsernameRegisterError, setEmailRegisterError, setPassword1RegisterError } = authSlice.actions;

export const getVerifyEmailStatus = (state) => state.auth.verifyEmailStatus;

export default authSlice.reducer;
