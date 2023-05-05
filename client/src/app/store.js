import { configureStore } from '@reduxjs/toolkit';
import districtSlice from './districtSlice.js';

export const store = configureStore({
  reducer: {
    district: districtSlice,
  },
});
