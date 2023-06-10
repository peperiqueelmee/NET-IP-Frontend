import { createSlice } from '@reduxjs/toolkit';

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    token: null,
    username: null,
    rut: null,
    role: null,
  },
  reducers: {
    addAuthentication: (state, action) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.rut = action.payload.rut;
      state.role = action.payload.role;
    },
  },
});

export const { addAuthentication } = authenticationSlice.actions;
export default authenticationSlice.reducer;
