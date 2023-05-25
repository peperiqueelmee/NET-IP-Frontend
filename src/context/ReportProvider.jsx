import { useState, createContext, useMemo } from 'react';

const ReportContext = createContext();

const ReportProvider = ({ children }) => {
  const [tableName, setTableName] = useState(null);
  const [filename, setFilename] = useState(null);

  const contextValue = useMemo(
    () => ({
      tableName,
      setTableName,
      filename,
      setFilename,
    }),
    [tableName, filename]
  );
  return <ReportContext.Provider value={contextValue}>{children}</ReportContext.Provider>;
};

export { ReportProvider };
export default ReportContext;
