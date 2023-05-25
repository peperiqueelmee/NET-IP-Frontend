import { useState, createContext, useMemo } from 'react';

const PhonesContext = createContext();

const PaginationProvider = ({ children }) => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const contextValue = useMemo(
    () => ({
      page,
      setPage,
      hasMore,
      setHasMore,
    }),
    [page, hasMore]
  );
  return <PhonesContext.Provider value={contextValue}>{children}</PhonesContext.Provider>;
};

export { PaginationProvider };
export default PhonesContext;
