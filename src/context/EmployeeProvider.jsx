import { useState, createContext } from 'react';

const EmployeeContext = createContext();

const EmployeeProvider = ({ children }) => {
	const [employee, setEmployee] = useState(null);
	const [employees, setEmployees] = useState(null);
	const [totalEmployees, setTotalEmployees] = useState(null);

	return (
		<EmployeeContext.Provider
			value={{
				setEmployee,
				employee,
				employees,
				setEmployees,
				totalEmployees,
				setTotalEmployees,
			}}>
			{children}
		</EmployeeContext.Provider>
	);
};

export { EmployeeProvider };
export default EmployeeContext;
