import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Sử dụng Local Storage
import { combineReducers } from 'redux';
import authReducer from './slice/authSlice';
import userReducer from './slice/userSlice';
import productReducer from './slice/productSlice';
import cartSlice from './slice/cartSlice';

const persistConfig = {
  key: 'root', // Khóa cho Local Storage
  storage,
};

const persistedReducer = persistReducer(persistConfig, combineReducers({
  auth: authReducer,
  user: userReducer,
  products: productReducer,
  cart: cartSlice,
}));

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // middleware: [],
});

const persistor = persistStore(store);

export { store, persistor };
