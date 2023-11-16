import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    totalQuantity: 0, // Initial cart total quantity
  },
  reducers: {
    setTotalQuantity: (state, action) => {
      state.totalQuantity = action.payload;
    },plusQuantity: (state, action) => {
      state.totalQuantity += action.payload;
    }
  },
});

export const { setTotalQuantity, plusQuantity } = cartSlice.actions;
export default cartSlice.reducer;
