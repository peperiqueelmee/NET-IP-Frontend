import { useState, useEffect } from 'react';
import Grow from '@mui/material/Grow';
import { SearchFill } from '../../assets/icons';
import { Spinner, EmployeesResultsTable, EmployeesResultsCards } from '../index.js';
import { useAction } from '../../hooks';
import axiosClient from '../../config/axios';
import InfoTooltip from '../InfoTooltip';

const Users = () => {
	const { selectedAction } = useAction();
	const [selectedButton, setSelectedButton] = useState('');
	const [isLoading, setLoading] = useState(null);
	const [employees, setEmployees] = useState(null);
	const [rut, setRut] = useState('');

	// Clear options selected.
	useEffect(() => {
		setSelectedButton('');
		setEmployees(null);
		setRut('');
	}, [selectedAction]);
	// Interaction with modal.
	const modalCreateEmployee = () => {
		setEmployees(null);
		document.getElementById('createEmployee').click();
	};
	// Handles
	const handleButtonClick = (buttonName) => {
		setSelectedButton(buttonName);
	};
	const handleListAllEmployees = async () => {
		setLoading(true);
		try {
			const url = '/employee/employees';
			const { data } = await axiosClient(url);
			setEmployees(data.data);
			console.log(data.data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};
	const handleListEmployeeByRut = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const url = `/employee/employees/${rut}`;
			const { data } = await axiosClient(url);
			setEmployees(data.data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setEmployees('');
			console.log(error);
		}
	};
	const handleListEmployeesByStatus = async (status) => {
		setLoading(true);
		try {
			const url = `/employee/employees/status/${status}`;
			const { data } = await axiosClient(url);
			setEmployees(data.data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setEmployees('');
			console.log(error);
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
									w-full opacity-90 rounded-none flex justify-center py-1 px-1 gap-1 lg:gap-5 flex-col lg:flex-row'>
						{/* User Management */}
						<div className='border border-lime-400 rounded-lg flex flex-col items-center justify-evenly py-2 px-4 text-xs lg:text-sm gap-y-1 font-medium'>
							<div className='text-lime-400'>Gestión cuentas de usuario</div>
							<button
								onClick={() => {
									modalCreateEmployee();
									handleButtonClick('button1');
								}}
								className={`bg-gray-200 text-zinc-700 rounded-2xl px-4 py-1 
								            text-xs lg:text-sm shadow hover:shadow-lime-400 w-11/12 sm:w-6/12 lg:w-32
											${selectedButton === 'button1' ? 'bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600' : ''}`}>
								Crear Usuario
							</button>
						</div>
						{/* List of user accounts */}
						<div className='border border-lime-400 rounded-lg flex flex-col items-center justify-evenly py-2 px-4 text-xs lg:text-sm gap-y-1 font-medium'>
							<div className='text-lime-400'>Listado cuentas de usuario</div>
							<div className='flex gap-2 flex-col lg:flex-row w-11/12 sm:w-6/12 lg:w-auto'>
								<button
									onClick={() => {
										handleListAllEmployees();
										handleButtonClick('button2');
									}}
									className={`bg-gray-200 text-zinc-700 rounded-2xl px-4 py-1
											    text-xs lg:text-sm shadow hover:shadow-lime-400 w-full lg:w-32
												${selectedButton === 'button2' ? 'bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600' : ''}`}>
									Listar todos
								</button>
								<div className='flex justify-center gap-1'>
									<button
										onClick={() => {
											handleListEmployeesByStatus(1);
											handleButtonClick('button3');
										}}
										className={`bg-gray-200 text-zinc-700 rounded-2xl px-4 py-1 
													text-xs lg:text-sm shadow hover:shadow-lime-400 w-full lg:w-32
													${selectedButton === 'button3' ? 'bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600' : ''}`}>
										Listar activos
									</button>
									<button
										onClick={() => {
											handleListEmployeesByStatus(2);
											handleButtonClick('button4');
										}}
										className={`bg-gray-200 text-zinc-700 rounded-2xl px-4 py-1 
													text-xs lg:text-sm shadow hover:shadow-lime-400 w-full lg:w-32
													${selectedButton === 'button4' ? 'bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600' : ''}`}>
										Listar inactivos
									</button>
								</div>
							</div>
						</div>
						{/* Search by rut */}
						<div className='border border-lime-400 rounded-lg flex flex-col items-center justify-evenly py-2 px-4 text-xs lg:text-sm gap-y-1 font-medium'>
							<div className='flex items-center gap-3'>
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
									onClick={() => handleButtonClick('button5')}
									className='rounded-l-2xl pl-4 text-xs lg:text-sm h-6 outline-none focus:border focus:border-lime-400 text-zinc-500'
									type='text'
									placeholder='Ingresa RUT de usuario'
								/>
								<button
									type='submit'
									onClick={() => {
										handleListEmployeeByRut();
										handleButtonClick('button5');
									}}
									className={`bg-gray-200 rounded-r-2xl h-6 w-9 flex items-center justify-center cursor-pointer 
												shadow hover:shadow-lime-400 
												${selectedButton === 'button5' ? 'bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600' : ''}`}>
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
					{employees !== null && isLoading === false && <EmployeesResultsTable employees={employees} />}
					{employees !== null && isLoading === false && <EmployeesResultsCards employees={employees} />}
				</div>
			</Grow>
		</>
	);
};

export default Users;
