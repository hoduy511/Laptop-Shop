import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './reducers/rootReducers'

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

export default store;