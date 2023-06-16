import { createSlice } from '@reduxjs/toolkit';
import { APPLICATION_STATES } from '../../utils/utils';

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
    updateResults: (state, action) => {
      return {
        ...state,
        results: state.results.map(item => {
          if (item.number === action.payload.number) {
            if (item.status_id === APPLICATION_STATES.Active) {
              return {
                ...item,
                status_id: APPLICATION_STATES.Blocked,
                status: {
                  ...item.status,
                  description: 'Bloqueado',
                },
              };
            } else {
              return {
                ...item,
                status_id: APPLICATION_STATES.Active,
                status: {
                  ...item.status,
                  description: 'Activo',
                },
              };
            }
          } else {
            return item;
          }
        }),
      };
    },
    deleteResult: (state, action) => {
      return {
        ...state,
        results: state.results.filter(item => item.number !== action.payload.number),
        totalResults: state.totalResults - 1,
      };
    },
  },
});

export const { updatePagePagination, addResults, updateTotalResults, updateResults, deleteResult } = fetchSlice.actions;
export default fetchSlice.reducer;
