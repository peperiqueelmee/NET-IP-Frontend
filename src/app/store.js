import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from '../features/authentication/authenticationSlice';
import employeesReducer from '../features/employees/employeeSlice';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    employees: employeesReducer,
  },
});
