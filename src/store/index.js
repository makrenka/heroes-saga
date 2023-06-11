import { configureStore } from '@reduxjs/toolkit';

import { heroesApiSlice } from '../api/heroesApiSlice';
import filters from './filtersSlice';

export const store = configureStore({
  reducer: {
    [heroesApiSlice.reducerPath]: heroesApiSlice.reducer,
    filters
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(heroesApiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});
