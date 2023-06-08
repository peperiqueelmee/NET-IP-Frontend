import { createSlice } from '@reduxjs/toolkit';

export const formValidation = createSlice({
  name: 'formValidation',
  initialState: {
    message: null,
    inputError: null,
    formOk: null,
  },
  reducers: {
    updateFormValidation: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateFormValidation } = formValidation.actions;
export default formValidation.reducer;
