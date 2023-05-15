import Grow from '@mui/material/Grow';
import { useEffect, useState } from 'react';
import { SearchFill } from '../../assets/icons';
import axiosClient from '../../config/axios';
import { useAction, useEmployee } from '../../hooks';
import InfoTooltip from '../Others/InfoTooltip';
import { EmployeesResultsCards, EmployeesResultsTable, Spinner } from '../index.js';

const Users = () => {
	const { setEmployees, employees, totalEmployees, setTotalEmployees } = useEmployee();
	const { selectedAction, selectedActionUsers, handleActionSelectUsers } = useAction();
	const [isLoading, setLoading] = useState(null);
	const [rut, setRut] = useState('');

	// Clear options selected.
	useEffect(() => {
		handleActionSelectUsers(null);
		setEmployees(null);
		setRut('');
	}, [selectedAction]);
	// Interaction with modal.
	const modalCreateEmployee = () => {
		setEmployees(null);
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
			setEmployees(data.data);
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
			setEmployees(data.data);
			setTotalEmployees(data.total);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setEmployees('');
		}
	};
	const handleListEmployeesByStatus = async (status) => {
		setLoading(true);
		try {
			const url = `/employee/employees/status/${status}`;
			const { data } = await axiosClient(url);
			setEmployees(data.data);
			setTotalEmployees(data.total);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setEmployees('');
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
						className='flex w-full flex-col justify-center 
									gap-1 rounded-none bg-gradient-to-r from-cyan-950 via-blue-950 to-cyan-950 px-1 py-1.5 opacity-90 lg:flex-row lg:gap-5'>
						{/* User Management */}
						<div className='flex flex-col items-center justify-evenly gap-y-1 rounded-lg border border-lime-400 px-4 py-2 text-xs font-medium xl:text-sm'>
							<div className='text-lime-400'>Gestión cuentas de usuario</div>
							<button
								onClick={() => {
									modalCreateEmployee();
									handleButtonClick(1);
								}}
								className={`w-9/12 rounded-2xl bg-gray-200 px-4 
								            py-1 text-xs shadow hover:shadow-lime-400 sm:w-6/12 lg:w-32 xl:text-sm
											${selectedActionUsers === 1 ? 'bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 text-white' : 'text-zinc-700'}`}>
								Crear Usuario
							</button>
						</div>
						{/* List of user accounts */}
						<div className='flex flex-col items-center justify-evenly gap-y-1 rounded-lg border border-lime-400 px-4 py-2 text-xs font-medium xl:text-sm'>
							<div className='text-lime-400'>Listado cuentas de usuario</div>
							<div className='flex w-9/12 flex-col gap-2 sm:w-6/12 lg:w-auto lg:flex-row'>
								<button
									onClick={() => {
										handleListAllEmployees();
										handleButtonClick(2);
									}}
									className={`w-full rounded-2xl bg-gray-200 px-4
											    py-1 text-xs shadow hover:shadow-lime-400 lg:w-32 xl:text-sm
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
										className={`w-full rounded-2xl bg-gray-200 px-4 
													py-1 text-xs shadow hover:shadow-lime-400 lg:w-32 xl:text-sm
													${selectedActionUsers === 3 ? 'bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 text-white' : 'text-zinc-700'}`}>
										Activos
									</button>
									<button
										onClick={() => {
											handleListEmployeesByStatus(2);
											handleButtonClick(4);
										}}
										className={`w-full rounded-2xl bg-gray-200 px-4 
													py-1 text-xs shadow hover:shadow-lime-400 lg:w-32 xl:text-sm
													${selectedActionUsers === 4 ? 'bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 text-white' : 'text-zinc-700'}`}>
										Inactivos
									</button>
								</div>
							</div>
						</div>
						{/* Search by rut */}
						<div className='flex flex-col items-center justify-evenly gap-y-1 rounded-lg border border-lime-400 px-4 py-2 text-xs font-medium xl:text-sm'>
							<div className='flex items-center gap-1'>
								<div className='text-lime-400'>Búsqueda por RUT</div>
								<div style={{ marginTop: '3px' }}>
									<InfoTooltip info={'El formato de rut debe ser 12345678-9'} />
								</div>
							</div>
							<form
								onSubmit={handleListEmployeeByRut}
								className='flex w-9/12 items-center sm:w-6/12 lg:w-auto'>
								<input
									value={rut}
									onChange={(e) => setRut(e.target.value)}
									onClick={() => handleButtonClick(5)}
									className='h-6 w-full rounded-l-2xl pl-4 text-xs text-zinc-500 outline-none focus:border focus:border-lime-400 xl:text-sm'
									type='text'
									placeholder='Ingresa RUT de usuario'
								/>
								<button
									type='submit'
									onClick={() => {
										handleListEmployeeByRut();
										handleButtonClick(5);
									}}
									className={`flex h-6 w-9 cursor-pointer items-center justify-center rounded-r-2xl bg-gray-200 
												shadow hover:shadow-lime-400 
												${selectedActionUsers === 5 ? 'bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 text-white' : 'text-zinc-700'}`}>
									<SearchFill />
								</button>
							</form>
						</div>
					</div>
					{/* Spinner */}
					{isLoading && (
						<div className='flex h-12 items-center justify-center bg-black opacity-70'>
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
