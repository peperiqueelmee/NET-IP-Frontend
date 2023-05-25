import { useContext } from 'react';
import PaginationContext from '../context/PaginationProvider';

const usePagination = () => {
  return useContext(PaginationContext);
};

export default usePagination;
