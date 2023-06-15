import { createSlice } from '@reduxjs/toolkit';

export const fetchSlice = createSlice({
  name: 'fetch',
  initialState: {
    currentPagePagination: 1,
    resultsByPagination: 20,
    maximumPagePagination: null,
  },
  reducers: {
    updatePagePagination: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updatePagePagination } = fetchSlice.actions;
export default fetchSlice.reducer;
