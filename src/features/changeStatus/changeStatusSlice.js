import { createSlice } from '@reduxjs/toolkit';

export const changeStatusSlice = createSlice({
  name: 'changeStatus',
  initialState: {
    id: null,
    type: null,
    number: null,
    statusId: null,
    urlUpdate: null,
  },
  reducers: {
    updateInfoChangeStatus: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateInfoChangeStatus } = changeStatusSlice.actions;
export default changeStatusSlice.reducer;
