import { fetchProducts, fetchCategories, fetchIdProduct } from '../../services/ProductService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  categories: [],
  selectedProduct: null,
  status: 'idle',
  error: null,
};

export const fetchProductsFromApi = createAsyncThunk('products/fetchProductsFromApi', async () => {
  try {
    const response = await fetchProducts();
    console.log('>>check product from reducer:',response)
    return response;
  } catch (error) {
    throw error;
  }
});

export const fetchCategoriesFromApi = createAsyncThunk('categories/fetchCategoriesFromApi', async () => {
  try {
    const response = await fetchCategories();
    console.log('>>check categories from reducer:',response)
    return response;
  } catch (error) {
    throw error;
  }
});

export const fetchIdProductFromApi = createAsyncThunk('selectedProduct/fetchIdProductFromApi', async (productId) => {
  try {
    const response = await fetchIdProduct(productId);
    console.log('check product id:',productId)
    console.log('>>check id from reducer:',response)
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
      })
      .addCase(fetchCategoriesFromApi.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesFromApi.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchCategoriesFromApi.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchIdProductFromApi.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchIdProductFromApi.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchIdProductFromApi.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
      
  },
});



export const { selectProduct } = productsSlice.actions;
export default productsSlice.reducer;
