import { useEffect, useState } from 'react';
import { InformativeMessage, InputAutocomplete, InputWithValidation, Spinner } from '..';
import { EmailFill, IdCardFill, PadlockFill, PencilFill, UserFill, UserSecretFill } from '../../assets/icons';
import axiosClient from '../../config/axios';
import { useAction, useEmployee } from '../../hooks';
import { RESPONSE_SERVER } from '../../utils/utils';

const ModalEditEmployee = () => {
	// Data init
	const userRut = localStorage.getItem('rut');
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
				className='text-xs text-white sm:text-base'
				onClick={() => handleToggleModal(false)}></button>
			{open && (
				<div className='fixed inset-0 z-10 flex items-center justify-center overflow-x-auto bg-black bg-opacity-50 px-0 sm:px-20 lg:px-40 xl:px-72'>
					<div
						className={`mx-5 mb-5 mt-60 flex w-full flex-col  items-center  overflow-auto rounded-lg bg-slate-200 bg-opacity-90 py-5 sm:mt-52 sm:w-11/12 lg:mt-10 lg:w-10/12 2xl:w-8/12`}>
						{/* Success or error message */}
						{userHasBeenCreated != null ? (
							<div className='flex w-full justify-center px-3'>
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
								<div className='mt-2 flex items-center gap-2'>
									<h2 className='text-xl font-bold text-slate-700 md:text-2xl'>Editar Trabajador</h2>
									<PencilFill className='md:ext-xl text-lg text-slate-700' />
								</div>
								<form
									className='mt-2 w-full px-10 py-4'
									onClick={removeErrorMessage}
									onSubmit={handleSubmit}>
									<div className='flex flex-col'>
										<div className='block w-full justify-center gap-4 md:flex'>
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
															className={'text-sm text-slate-600 sm:text-base'}
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
															className={'text-sm text-slate-600 sm:text-base'}
														/>
													}
												/>
											</div>
										</div>
										<div className='block w-full justify-center gap-4 md:flex'>
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
														<IdCardFill className={'text-sm text-slate-600 sm:text-base'} />
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
														<EmailFill className={'text-sm text-slate-600 sm:text-base'} />
													}
												/>
											</div>
										</div>
										<div className='block w-full justify-center gap-4 md:flex'>
											<div className='w-full'>
												<InputWithValidation
													label='Usuario'
													type='text'
													placeholder='JcBodoque'
													errorMessage='Por favor ingresa el nombre de usuario.'
													value={username}
													onChange={setUsername}
													icon={
														<UserFill className={'text-sm text-slate-600 sm:text-base'} />
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
															className={'text-sm text-slate-600 sm:text-base'}
														/>
													}
												/>
											</div>
										</div>
										<div
											className={`${
												userRut === rut ? 'hidden' : 'block md:flex md:justify-center'
											} w-full  gap-4`}>
											<div className='w-full'>
												<label className='mb-2 block text-xs font-medium text-slate-600 sm:text-sm'>
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
												<label className='mb-2 block text-xs font-medium text-slate-600 sm:text-sm'>
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
											className={`mt-4 block text-center text-xs font-medium text-red-600 md:hidden`}>
											{message}
										</div>
									) : null}
									{isLoading && (
										<div className='mt-4'>
											<Spinner />
										</div>
									)}
									<div className='mt-8 flex justify-center space-x-4'>
										<button
											className='w-20 rounded-lg border border-gray-300
                                         bg-slate-200 px-2 py-1 text-xs font-medium text-gray-900 transition-colors duration-300 hover:bg-slate-300 sm:text-sm md:text-base'
											onClick={() => handleToggleModal(true)}>
											Cancelar
										</button>
										<button
											type='submit'
											disabled={isLoading}
											className='w-20 rounded-lg border border-pink-700
                                         			   bg-pink-600 px-2 py-1 text-xs font-medium text-slate-100 transition-colors duration-300
										               hover:bg-pink-700 disabled:border-gray-500 disabled:bg-gray-400 sm:text-sm md:text-base'>
											Guardar
										</button>
									</div>
								</form>
							</>
						) : (
							<div
								className='mt-5 flex justify-center text-xs font-medium
									  text-slate-700 transition-colors duration-700
									  hover:text-slate-950 sm:text-sm'>
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
