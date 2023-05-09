import { useEffect, useState } from 'react';
import { InformativeMessage, InputAutocomplete, InputWithValidation, Spinner } from '..';
import { EmailFill, IdCardFill, PadlockFill, PencilFill, UserFill, UserSecretFill } from '../../assets/icons';
import axiosClient from '../../config/axios';
import { useEmployee, useAction } from '../../hooks';
import { RESPONSE_SERVER } from '../../utils/utils';

const ModalEditEmployee = () => {
	const [isLoading, setIsLoading] = useState(null);
	const { selectedActionUsers } = useAction();
	// Data form
	const { employee, getEmployees } = useEmployee();
	const [roles, setRoles] = useState(() => JSON.parse(localStorage.getItem('roles')) || []);
	const [statuses, setStatuses] = useState(() => JSON.parse(localStorage.getItem('statuses')) || []);
	const [roleSelected, setRoleSelected] = useState('');
	const [statusSelected, setStatusSelected] = useState('');
	// Messages
	const [message, setMessage] = useState('');
	// Employee data
	const [names, setNames] = useState('');
	const [lastnames, setLastnames] = useState('');
	const [rut, setRut] = useState('');
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [role, setRole] = useState(null);
	const [status, setStatus] = useState(null);
	// Validations
	const [userHasBeenCreated, setUserHasBeenCreated] = useState(null);
	//  Toggle modal
	const [open, setOpen] = useState(false);

	useEffect(() => {
		async function fetchData() {
			// Get roles
			if (!roles.length) {
				try {
					const url = '/role';
					const { data } = await axiosClient.get(url);
					localStorage.setItem('roles', JSON.stringify(data.data));
					setRoles(data.data);
				} catch (error) {
					console.log(error);
				}
			}
			// Get status
			if (!statuses.length) {
				try {
					const url = '/status/employee';
					const { data } = await axiosClient.get(url);
					localStorage.setItem('statuses', JSON.stringify(data.data));
					setStatuses(data.data);
				} catch (error) {
					console.log(error);
				}
			}
		}
		fetchData();
	}, []);

	useEffect(() => {
		if (employee) {
			setNames(employee.names);
			setLastnames(employee.lastnames);
			setRut(employee.rut);
			setEmail(employee.email);
			setUsername(employee.username);
			setRoleSelected(employee.role.description);
			setRole(employee.role_id);
			setStatusSelected(employee.status.description);
			setStatus(employee.status_id);
		}
	}, [employee]);

	const handleToggleModal = (shouldClose) => {
		setUserHasBeenCreated(null);
		setOpen(!shouldClose);
	};
	const handleRoleSelect = (roleSelected) => {
		setRoleSelected(roleSelected);
		const selectedObject = roles.find(({ description }) => description === roleSelected);
		if (!selectedObject) {
			setRole(null);
			return;
		}
		setRole(selectedObject.id);
	};
	const handleStatusSelect = (statusSelected) => {
		setStatusSelected(statusSelected);
		const selectedObject = statuses.find(({ description }) => description === statusSelected);
		if (!selectedObject) {
			setRole(null);
			return;
		}
		setStatus(selectedObject.id);
	};
	const handleSubmit = async (e) => {
		setIsLoading(true);
		setUserHasBeenCreated(null);
		setMessage('');
		e.preventDefault();
		try {
			// Update employee.
			const url = `/employee/update/${employee.id}`;
			const employeeData = {
				names,
				lastnames,
				rut,
				email,
				username,
				emp_password: password,
				role_id: role,
				status_id: status,
			};
			await axiosClient.put(url, employeeData);
			setIsLoading(null);
			setMessage('¡El usuario ha sido editado exitosamente!');
			setUserHasBeenCreated(true);

			// Refresh data employee.
			let urlEmployee;
			if (selectedActionUsers === 2) {
				urlEmployee = '/employee/employees';
			}
			if (selectedActionUsers === 3) {
				urlEmployee = '/employee/employees/status/1';
			}
			if (selectedActionUsers === 4) {
				urlEmployee = '/employee/employees/status/2';
			}
			if (selectedActionUsers === 5) {
				urlEmployee = `/employee/employees/${rut}`;
			}
			const { data } = await axiosClient(urlEmployee);
			getEmployees(data.data);
		} catch (error) {
			setIsLoading(null);
			setUserHasBeenCreated(false);
			if (error.code === RESPONSE_SERVER.BAD_REQUEST) {
				setMessage(error.response.data.message);
				return;
			}
			setMessage('Error de servidor. Reintentar.');
		}
	};

	const removeErrorMessage = () => {
		setUserHasBeenCreated(null);
	};

	return (
		<div>
			<button
				id='editEmployee'
				className='text-xs sm:text-base text-white'
				onClick={() => handleToggleModal(false)}></button>
			{open && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-x-auto sm:px-20 lg:px-40 xl:px-72 px-0'>
					<div
						className={`bg-slate-200 rounded-lg py-5 w-full sm:w-11/12 lg:w-10/12  2xl:w-8/12  flex flex-col items-center bg-opacity-90 overflow-auto mt-44 sm:mt-52 lg:mt-10 mb-5 mx-5`}>
						{/* Success or error message */}
						{userHasBeenCreated != null ? (
							<div className='w-full px-3 flex justify-center'>
								<InformativeMessage
									message={message}
									hasError={!userHasBeenCreated}
									hasSuccessful={userHasBeenCreated}
								/>
							</div>
						) : null}
						{/* Form */}
						{!userHasBeenCreated ? (
							<>
								{/* Title */}
								<div className='flex items-center gap-2 mt-2'>
									<h2 className='text-xl md:text-2xl font-bold text-slate-700'>Editar Trabajador</h2>
									<PencilFill className='text-slate-700 text-lg md:ext-xl' />
								</div>
								<form
									className='w-full px-10 py-4 mt-2'
									onClick={removeErrorMessage}
									onSubmit={handleSubmit}>
									<div className='flex flex-col'>
										<div className='md:flex gap-4 block w-full justify-center'>
											<div className='w-full'>
												<InputWithValidation
													label='Nombre(s)'
													type='text'
													placeholder='Juan Carlos'
													errorMessage='Por favor ingresa el/los nombre(s).'
													value={names}
													onChange={setNames}
													icon={
														<UserSecretFill
															className={'text-slate-600 text-sm sm:text-base'}
														/>
													}
												/>
											</div>
											<div className='w-full'>
												<InputWithValidation
													label='Apellido(s)'
													type='text'
													placeholder='Bodoque Bodoque'
													errorMessage='Por favor ingresa el/los apellido(s).'
													value={lastnames}
													onChange={setLastnames}
													icon={
														<UserSecretFill
															className={'text-slate-600 text-sm sm:text-base'}
														/>
													}
												/>
											</div>
										</div>
										<div className='md:flex gap-4 block w-full justify-center'>
											<div className='w-full'>
												<InputWithValidation
													label='R.U.T'
													type='text'
													placeholder='10123456-3'
													errorMessage='Formato de RUT incorrecta y/o inválido.'
													value={rut}
													onChange={setRut}
													tooltip={true}
													infoTooltip={'El formato de rut debe ser 12345678-9'}
													validateRut={true}
													icon={
														<IdCardFill className={'text-slate-600 text-sm sm:text-base'} />
													}
												/>
											</div>
											<div className='w-full'>
												<InputWithValidation
													label='E-Mail'
													type='email'
													placeholder='juancarlosbodoque@correo.cl'
													errorMessage='Por favor ingresa un correo válido.'
													value={email}
													onChange={setEmail}
													icon={
														<EmailFill className={'text-slate-600 text-sm sm:text-base'} />
													}
												/>
											</div>
										</div>
										<div className='md:flex gap-4 block w-full justify-center'>
											<div className='w-full'>
												<InputWithValidation
													label='Usuario'
													type='text'
													placeholder='JcBodoque'
													errorMessage='Por favor ingresa el nombre de usuario.'
													value={username}
													onChange={setUsername}
													icon={
														<UserFill className={'text-slate-600 text-sm sm:text-base'} />
													}
												/>
											</div>
											<div className='w-full'>
												<InputWithValidation
													label='Contraseña'
													type='password'
													placeholder='Contraseña'
													errorMessage='La contraseña no cumple con el formato de seguridad.'
													value={password}
													onChange={setPassword}
													tooltip={true}
													validatePassword={true}
													infoTooltip={
														'El formato de contraseña debe ser 6-10 caracteres, contener al menos: 1 mayúscula, 1 minúscula, 1 número.'
													}
													icon={
														<PadlockFill
															className={'text-slate-600 text-sm sm:text-base'}
														/>
													}
												/>
											</div>
										</div>
										<div className='md:flex gap-4 block w-full justify-center'>
											<div className='w-full'>
												<label className='block mb-2 text-xs sm:text-sm font-medium text-slate-600'>
													Permisos
												</label>
												<InputAutocomplete
													options={roles.map((role) => role.description)}
													onSelect={handleRoleSelect}
													placeholder='Seleccionar permisos'
													value={roleSelected}
												/>
											</div>
											<div className='w-full'>
												<label className='block mb-2 text-xs sm:text-sm font-medium text-slate-600'>
													Estado
												</label>
												<InputAutocomplete
													options={statuses.map((status) => status.description)}
													onSelect={handleStatusSelect}
													placeholder='Seleccionar permisos'
													value={statusSelected}
												/>
											</div>
										</div>
									</div>
									{/* Error message */}
									{userHasBeenCreated != null ? (
										<div
											className={`text-red-600 font-medium text-xs text-center mt-4 block md:hidden`}>
											{message}
										</div>
									) : null}
									{isLoading && (
										<div className='mt-4'>
											<Spinner />
										</div>
									)}
									<div className='flex space-x-4 mt-8 justify-center'>
										<button
											className='bg-slate-200 hover:bg-slate-300 transition-colors duration-300
                                         text-gray-900 rounded-lg px-2 py-1 text-xs sm:text-sm md:text-base border border-gray-300 font-medium w-20'
											onClick={() => handleToggleModal(true)}>
											Cancelar
										</button>
										<button
											type='submit'
											disabled={isLoading}
											className='bg-pink-600 hover:bg-pink-700 transition-colors duration-300
                                         			   text-slate-100 rounded-lg px-2 py-1 text-xs sm:text-sm md:text-base border
										               border-pink-700 font-medium disabled:bg-gray-400 disabled:border-gray-500 w-20'>
											Guardar
										</button>
									</div>
								</form>
							</>
						) : (
							<div
								className='flex justify-center mt-5 text-xs sm:text-sm
									  text-slate-700 hover:text-slate-950 font-medium
									  transition-colors duration-700'>
								<button
									onClick={() => handleToggleModal(true)}
									className='animated-text-underline cursor-pointer'>
									Volver
								</button>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default ModalEditEmployee;
