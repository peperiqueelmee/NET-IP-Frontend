import { createSlice } from '@reduxjs/toolkit';

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    token: null,
    username: null,
    rut: null,
  },
  reducers: {
    addAuthentication: (state, action) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.rut = action.payload.rut;
    },
  },
});

export const { addAuthentication } = authenticationSlice.actions;
export default authenticationSlice.reducer;
