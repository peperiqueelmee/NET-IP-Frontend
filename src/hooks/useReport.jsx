import { useContext } from 'react';
import ReportContext from '../context/ReportProvider';

const useReport = () => {
  return useContext(ReportContext);
};

export default useReport;
