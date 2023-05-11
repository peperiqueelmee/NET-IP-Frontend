import Grow from '@mui/material/Grow';
import { useEffect, useState } from 'react';
import { SearchFill } from '../../assets/icons';
import axiosClient from '../../config/axios';
import { useAction, useEmployee } from '../../hooks';
import InfoTooltip from '../Others/InfoTooltip';
import { EmployeesResultsCards, EmployeesResultsTable, Spinner } from '../index.js';

const Users = () => {
	const { getEmployees, employees } = useEmployee();
	const { selectedAction, selectedActionUsers, handleActionSelectUsers } = useAction();
	const [isLoading, setLoading] = useState(null);
	const [rut, setRut] = useState('');
	const [totalEmployees, setTotalEmployees] = useState(null);

	// Clear options selected.
	useEffect(() => {
		handleActionSelectUsers(null);
		getEmployees(null);
		setRut('');
	}, [selectedAction]);
	// Interaction with modal.
	const modalCreateEmployee = () => {
		getEmployees(null);
		document.getElementById('createEmployee').click();
	};
	// Handles
	const handleButtonClick = (index) => {
		handleActionSelectUsers(index);
	};
	const handleListAllEmployees = async () => {
		setLoading(true);
		try {
			const url = '/employee/employees';
			const { data } = await axiosClient(url);
			getEmployees(data.data);
			setTotalEmployees(data.total);
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};
	const handleListEmployeeByRut = async (e) => {
		if (!e) {
			return;
		}
		e.preventDefault();
		setLoading(true);
		try {
			const url = `/employee/employees/${rut}`;
			const { data } = await axiosClient(url);
			getEmployees(data.data);
			setTotalEmployees(data.total);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			getEmployees('');
		}
	};
	const handleListEmployeesByStatus = async (status) => {
		setLoading(true);
		try {
			const url = `/employee/employees/status/${status}`;
			const { data } = await axiosClient(url);
			getEmployees(data.data);
			setTotalEmployees(data.total);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			getEmployees('');
		}
	};

	return (
		<>
			<Grow
				in={selectedAction === 5}
				timeout={500}>
				<div className={`pb-14 ${selectedAction === 5 ? 'block' : 'hidden'} `}>
					{/* Container */}
					<div
						className='bg-gradient-to-r from-cyan-950 via-blue-950 to-cyan-950 
									w-full opacity-90 rounded-none flex justify-center py-1.5 px-1 gap-1 lg:gap-5 flex-col lg:flex-row'>
						{/* User Management */}
						<div className='border border-lime-400 rounded-lg flex flex-col items-center justify-evenly py-2 px-4 text-xs xl:text-sm gap-y-1 font-medium'>
							<div className='text-lime-400'>Gestión cuentas de usuario</div>
							<button
								onClick={() => {
									modalCreateEmployee();
									handleButtonClick(1);
								}}
								className={`bg-gray-200 rounded-2xl px-4 py-1 
								            text-xs xl:text-sm shadow hover:shadow-lime-400 w-9/12 sm:w-6/12 lg:w-32
											${selectedActionUsers === 1 ? 'bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 text-white' : 'text-zinc-700'}`}>
								Crear Usuario
							</button>
						</div>
						{/* List of user accounts */}
						<div className='border border-lime-400 rounded-lg flex flex-col items-center justify-evenly py-2 px-4 text-xs xl:text-sm gap-y-1 font-medium'>
							<div className='text-lime-400'>Listado cuentas de usuario</div>
							<div className='flex gap-2 flex-col lg:flex-row w-9/12 sm:w-6/12 lg:w-auto'>
								<button
									onClick={() => {
										handleListAllEmployees();
										handleButtonClick(2);
									}}
									className={`bg-gray-200 rounded-2xl px-4 py-1
											    text-xs xl:text-sm shadow hover:shadow-lime-400 w-full lg:w-32
												${
													selectedActionUsers === 2
														? 'bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 text-white'
														: 'text-zinc-700 '
												}`}>
									Todos
								</button>
								<div className='flex justify-center gap-1'>
									<button
										onClick={() => {
											handleListEmployeesByStatus(1);
											handleButtonClick(3);
										}}
										className={`bg-gray-200 rounded-2xl px-4 py-1 
													text-xs xl:text-sm shadow hover:shadow-lime-400 w-full lg:w-32
													${selectedActionUsers === 3 ? 'bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 text-white' : 'text-zinc-700'}`}>
										Activos
									</button>
									<button
										onClick={() => {
											handleListEmployeesByStatus(2);
											handleButtonClick(4);
										}}
										className={`bg-gray-200 rounded-2xl px-4 py-1 
													text-xs xl:text-sm shadow hover:shadow-lime-400 w-full lg:w-32
													${selectedActionUsers === 4 ? 'bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 text-white' : 'text-zinc-700'}`}>
										Inactivos
									</button>
								</div>
							</div>
						</div>
						{/* Search by rut */}
						<div className='border border-lime-400 rounded-lg flex flex-col items-center justify-evenly py-2 px-4 text-xs xl:text-sm gap-y-1 font-medium'>
							<div className='flex items-center gap-1'>
								<div className='text-lime-400'>Búsqueda por RUT</div>
								<div style={{ marginTop: '3px' }}>
									<InfoTooltip info={'El formato de rut debe ser 12345678-9'} />
								</div>
							</div>
							<form
								onSubmit={handleListEmployeeByRut}
								className='flex items-center'>
								<input
									value={rut}
									onChange={(e) => setRut(e.target.value)}
									onClick={() => handleButtonClick(5)}
									className='rounded-l-2xl pl-4 text-xs xl:text-sm h-6 outline-none focus:border focus:border-lime-400 text-zinc-500'
									type='text'
									placeholder='Ingresa RUT de usuario'
								/>
								<button
									type='submit'
									onClick={() => {
										handleListEmployeeByRut();
										handleButtonClick(5);
									}}
									className={`bg-gray-200 rounded-r-2xl h-6 w-9 flex items-center justify-center cursor-pointer 
												shadow hover:shadow-lime-400 
												${selectedActionUsers === 5 ? 'bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 text-white' : 'text-zinc-700'}`}>
									<SearchFill />
								</button>
							</form>
						</div>
					</div>
					{/* Spinner */}
					{isLoading && (
						<div className='bg-black h-12 flex items-center justify-center opacity-70'>
							<Spinner />
						</div>
					)}
					{/* Results employees table */}
					{employees !== null && isLoading === false && (
						<EmployeesResultsTable
							employees={employees}
							totalResults={totalEmployees}
						/>
					)}
					{employees !== null && isLoading === false && (
						<EmployeesResultsCards
							employees={employees}
							totalResults={totalEmployees}
						/>
					)}
				</div>
			</Grow>
		</>
	);
};

export default Users;
