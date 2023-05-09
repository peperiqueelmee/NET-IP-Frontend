import { useContext } from 'react';
import EmployeeContext from '../context/EmployeeProvider';

const useEmployee = () => {
	return useContext(EmployeeContext);
};

export default useEmployee;
