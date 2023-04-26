import { useEffect, useState } from 'react';
import { InputWithValidation, InputAutocomplete, InformativeMessage } from '.';
import { EmailFill, IdCardFill, LabFill, PadlockFill, UserFill, UserSecretFill } from '../assets/icons';
import axiosClient from '../config/axios';

const ModalCreateEmployee = () => {
	// Data form
	const [roles, setRoles] = useState(() => JSON.parse(localStorage.getItem('roles')) || []);
	const [roleSelected, setRoleSelected] = useState('');
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
	// Validations
	const formIsFull = names && lastnames && rut && email && username && password && role;
	const [userHasBeenCreated, setUserHasBeenCreated] = useState(null);
	//  Toggle modal
	const [open, setOpen] = useState(false);

	useEffect(() => {
		// Get roles
		async function getRoles() {
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
		}
		getRoles();
	}, []);

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
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// Create employee
			const url = '/employee';
			const employeeData = {
				rut,
				names,
				lastnames,
				role_id: role,
				username,
				emp_password: password,
				email,
			};
			await axiosClient.post(url, employeeData);

			setMessage('¡El usuario ha sido creado exitosamente!');
			// Clear form
			setNames('');
			setLastnames('');
			setRut('');
			setEmail('');
			setUsername('');
			setPassword('');
			setRole(null);
			setRoleSelected('');
			setUserHasBeenCreated(true);
		} catch (error) {
			setUserHasBeenCreated(false);
			setMessage(error.response.data.message);
		}
	};
	return (
		<div>
			<button
				id='createEmployee'
				className='text-xs sm:text-base text-white'
				onClick={() => handleToggleModal(false)}></button>
			{open && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-x-auto sm:px-20 lg:px-40 xl:px-72 px-0'>
					<div
						className={`bg-slate-200 rounded-lg py-5 w-full flex flex-col items-center bg-opacity-90 overflow-auto mt-44 sm:mt-52 lg:mt-10 mb-5 mx-5`}>
						{/* Success or error message */}
						{userHasBeenCreated != null ? (
							<div className='w-full px-3 flex justify-center'>
								<InformativeMessage
									message={message}
									border={!userHasBeenCreated ? 'border-red-500' : 'border-blue-500'}
									background={!userHasBeenCreated ? 'bg-red-800' : 'bg-blue-500'}
									text={!userHasBeenCreated ? 'text-red-500' : 'text-blue-500'}
									textHover={!userHasBeenCreated ? 'hover:text-red-700' : 'hover:text-blue-700'}
								/>
							</div>
						) : null}
						{/* Form */}
						{!userHasBeenCreated ? (
							<>
								{/* Title */}
								<div className='flex items-center gap-2 mt-2'>
									<h2 className='text-xl md:text-2xl font-bold text-slate-700'>Crear Trabajador</h2>
									<LabFill className='text-slate-700 text-lg md:ext-xl' />
								</div>
								<form
									className='w-full px-10 py-4 mt-2'
									onSubmit={handleSubmit}>
									<div className='flex flex-col'>
										<div className='md:flex gap-4 block w-full justify-center'>
											<div className='w-full'>
												<InputWithValidation
													label='Nombre(s)'
													type='text'
													placeholder='Juan Carlos'
													errorMessage='Por favor ingresa el nombre del trabajador.'
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
													errorMessage='Por favor ingresa el nombre del trabajador.'
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
													errorMessage='Por favor ingresa el nombre del trabajador.'
													value={rut}
													onChange={setRut}
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
													label='Username'
													type='text'
													placeholder='JcBodoque'
													errorMessage='Por favor ingresa el nombre del trabajador.'
													value={username}
													onChange={setUsername}
													icon={
														<UserFill className={'text-slate-600 text-sm sm:text-base'} />
													}
												/>
											</div>
											<div className='w-full'>
												<InputWithValidation
													label='Password'
													type='password'
													placeholder='Contraseña'
													errorMessage='Por favor ingresa el nombre del trabajador.'
													value={password}
													onChange={setPassword}
													icon={
														<PadlockFill
															className={'text-slate-600 text-sm sm:text-base'}
														/>
													}
												/>
											</div>
										</div>
										<div className='mt-2'>
											<label className='block mb-2 text-xs sm:text-sm font-medium text-slate-600'>
												Permisos
												<span className='text-red-500'>*</span>
											</label>
											<InputAutocomplete
												options={roles.map((role) => role.description)}
												onSelect={handleRoleSelect}
												placeholder='Seleccionar permisos'
												value={roleSelected}
											/>
										</div>
									</div>
									<div className='flex space-x-4 mt-10 justify-center'>
										<button
											className='bg-slate-200 hover:bg-slate-300 transition-colors duration-300
                                         text-gray-900 rounded-lg px-2 py-1 text-xs sm:text-sm md:text-base border border-gray-300 font-medium'
											onClick={() => handleToggleModal(true)}>
											Cancelar
										</button>
										<button
											type='submit'
											disabled={!formIsFull}
											className='bg-pink-600 hover:bg-pink-700 transition-colors duration-300
                                         text-slate-100 rounded-lg px-2 py-1 text-xs sm:text-sm md:text-base border border-pink-700 font-medium disabled:bg-gray-400 disabled:border-gray-500'>
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

export default ModalCreateEmployee;
