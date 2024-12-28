import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';

import { baseApi } from './api/baseApi';
import { reducer } from './rootReducer';

export const store = configureStore({
  reducer,
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: ['auth.somePathWithNonSerializableValues'],
      },
    }).concat(baseApi.middleware),
});

// Set up the persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
