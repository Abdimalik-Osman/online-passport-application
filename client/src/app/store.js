import { configureStore } from '@reduxjs/toolkit';
import districtSlice from './districtSlice.js';
import applicantSlice from './applicantSlice.js';

export const store = configureStore({
  reducer: {
    district: districtSlice,
    applicant:applicantSlice
  },
});
