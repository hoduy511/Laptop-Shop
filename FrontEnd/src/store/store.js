import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reduxLocalStorageMiddleware from './reduxLocalStorageMiddleware';

import productsReducer from './reducers/productSlice'
import userSlice from './reducers/userSlice';

const middleware = [
  ...getDefaultMiddleware(),
  reduxLocalStorageMiddleware,
]

export const store = configureStore({
  reducer: {
    products: productsReducer,
    user: userSlice,
  },
  middleware: middleware,
});

export default store;