import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts, fetchCategories, fetchIdProduct } from '../../services/ProductService';

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
    return response;
  } catch (error) {
    throw error;
  }
});

export const fetchCategoriesFromApi = createAsyncThunk('categories/fetchCategoriesFromApi', async () => {
  try {
    const response = await fetchCategories();
    return response;
  } catch (error) {
    throw error;
  }
});

export const fetchIdProductFromApi = createAsyncThunk('selectedProduct/fetchIdProductFromApi', async (productId) => {
  try {
    const response = await fetchIdProduct(productId);
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
        state.products = action.payload; // Update the 'products' field directly
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
        state.categories = action.payload; // Update the 'categories' field directly
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
        state.selectedProduct = action.payload; // Update the 'selectedProduct' field directly
      })
      .addCase(fetchIdProductFromApi.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { selectProduct } = productsSlice.actions;
export default productsSlice.reducer;
