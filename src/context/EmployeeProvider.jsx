import { useState, createContext } from 'react';

const EmployeeContext = createContext();

const EmployeeProvider = ({ children }) => {
	const [employee, setEmployee] = useState(null);
	const [employees, setEmployees] = useState(null);

	const handleEmployeeSelect = (employee) => {
		setEmployee(employee);
	};

	const getEmployees = (employees) => {
		setEmployees(employees);
	};

	return (
		<EmployeeContext.Provider
			value={{
				handleEmployeeSelect,
				employee,
				getEmployees,
				employees,
			}}>
			{children}
		</EmployeeContext.Provider>
	);
};

export { EmployeeProvider };
export default EmployeeContext;
