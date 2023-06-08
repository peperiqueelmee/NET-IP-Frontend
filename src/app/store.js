import { configureStore } from '@reduxjs/toolkit';
import { employeesReducer, formValidationReducer, authenticationReducer } from '../features';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    employees: employeesReducer,
    formValidation: formValidationReducer,
  },
});
