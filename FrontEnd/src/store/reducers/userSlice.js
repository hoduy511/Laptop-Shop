import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { user: {}} ,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      console.log('check action: ',action);
    },
  },
});

export const { loginSuccess } = userSlice.actions;
export default userSlice.reducer;