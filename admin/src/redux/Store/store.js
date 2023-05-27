import { configureStore } from '@reduxjs/toolkit';
import { employeeSlice } from './../EmployeeSlice/index';

export const store = configureStore({
  reducer: {
    employee: employeeSlice,
  },
});
