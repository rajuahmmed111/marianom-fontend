import { combineReducers } from 'redux';
import { baseApi } from './api/baseApi';
import authReducer from './features/authSlice/authSlice';

export const reducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof reducer>;
