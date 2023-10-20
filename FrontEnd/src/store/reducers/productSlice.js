import { fetchProducts } from '../../services/ProductService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  selectedProduct: null,
  status: 'idle',
  error: null,
};

export const fetchProductsFromApi = createAsyncThunk('products/fetchProductsFromApi', async () => {
  try {
    const response = await fetchProducts();
    console.log('>>check data from reducer:',response)
    return response;
  } catch (error) {
    throw error;
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    selectProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsFromApi.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsFromApi.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProductsFromApi.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});



export const { selectProduct, loginSuccess } = productsSlice.actions;
export default productsSlice.reducer;
