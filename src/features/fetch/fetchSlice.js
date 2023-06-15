import { createSlice } from '@reduxjs/toolkit';

export const fetchSlice = createSlice({
  name: 'fetch',
  initialState: {
    currentPagePagination: 1,
    resultsByPagination: 20,
    maximumPagePagination: null,
    results: null,
    totalResults: null,
  },
  reducers: {
    updatePagePagination: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    addResults: (state, action) => {
      return {
        ...state,
        results: action.payload,
      };
    },
    updateTotalResults: (state, action) => {
      return {
        ...state,
        totalResults: action.payload,
      };
    },
  },
});

export const { updatePagePagination, addResults, updateTotalResults } = fetchSlice.actions;
export default fetchSlice.reducer;
