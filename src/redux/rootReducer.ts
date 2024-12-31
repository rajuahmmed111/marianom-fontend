import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { baseApi } from './api/baseApi';
import authReducer from './features/authSlice/authSlice';

// Persist configuration for Auth
const authPersistConfig = {
  key: 'auth',
  storage,
};

// Wrap the auth reducer with the persistReducer
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const reducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: persistedAuthReducer, // Persisted auth reduce
});

export type RootState = ReturnType<typeof reducer>;
