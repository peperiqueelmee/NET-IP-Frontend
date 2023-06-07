import { createSlice } from '@reduxjs/toolkit';

export const employeesSlice = createSlice({
  name: 'employees',
  initialState: {
    employee: null,
    employees: [],
    totalEmployees: null,
  },
  reducers: {
    updateInfoEmployees: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateInfoEmployees } = employeesSlice.actions;
export default employeesSlice.reducer;
