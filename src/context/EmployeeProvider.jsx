import { useState, createContext } from 'react';

const EmployeeContext = createContext();

const EmployeeProvider = ({ children }) => {
	const [employee, setEmployee] = useState(null);

	const handleEmployeeSelect = (employee) => {
		setEmployee(employee);
	};

	return (
		<EmployeeContext.Provider
			value={{
				handleEmployeeSelect,
				employee,
			}}>
			{children}
		</EmployeeContext.Provider>
	);
};

export { EmployeeProvider };
export default EmployeeContext;
