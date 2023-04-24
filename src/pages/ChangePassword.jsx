import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircleFill, PadlockFill } from '../assets/icons';
import { InputWithValidation, Spinner } from '../components';
import { RESPONSE_SERVER } from '../utils/utils';

const ChangePassword = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [IsInvalidCredentials, setIsInvalidCredentials] = useState(false);
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [messageError, setMessageError] = useState('');

	const [meetCharacterLength, setMetCharacterLength] = useState(false);
	const [meetsLowerCase, setMeetsLowerCase] = useState(false);
	const [meetsUpperCase, setMeetsUpperCase] = useState(false);
	const [meetsNumber, setMeetsNumber] = useState(false);
	const [meetsEqualsPassword, setMeetsEqualsPassword] = useState(false);
	const passwordMeetsAllCriteria =
		meetCharacterLength && meetsLowerCase && meetsUpperCase && meetsNumber && meetsEqualsPassword;

	const navigate = useNavigate();

	useEffect(() => {
		checkPasswordStrength();
	}, [password, repeatPassword]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Login
		try {
			setIsLoading(true);
			const url = `${import.meta.env.VITE_BACKEND_URL}/employee/login`;
			const employeeData = {
				username: repeatPassword,
				emp_password: password,
			};
			const {
				data: { data },
			} = await axios.post(url, employeeData);

			setIsLoading(false);
			localStorage.setItem('token', data.token);
			localStorage.setItem('username', data.username);
			navigate('/home');
		} catch (error) {
			setIsInvalidCredentials(true);
			setIsLoading(false);

			if (error.code === RESPONSE_SERVER.BAD_REQUEST) {
				setMessageError('Usuario o contraseña incorrecta.');
				return;
			}
			setMessageError('Error de servidor. Reintentar.');
		}
	};

	const removeErrorMessage = () => {
		setIsInvalidCredentials(false);
	};

	const checkPasswordStrength = () => {
		const requiredLength = password.length >= 6 && password.length <= 10;
		const hasLowerCase = /[a-z]/.test(password);
		const hasUpperCase = /[A-Z]/.test(password);
		const hasNumber = /[0-9]/.test(password);
		const passwordsMatch = password.length > 0 && password === repeatPassword;

		setMetCharacterLength(requiredLength);
		setMeetsLowerCase(hasLowerCase);
		setMeetsUpperCase(hasUpperCase);
		setMeetsNumber(hasNumber);
		setMeetsEqualsPassword(passwordsMatch);
	};

	return (
		<>
			{/*  Tittle */}
			<div className='flex flex-col items-center justify-center h-screen px-6 mx-auto lg:py-0 login-page overflow-y-auto'>
				<p className='text-white font-semibold tracking-wider md:text-2xl lg:text-3xl mb-16 text-shadow'>
					Sistema de Gestión de Anexos <span className='text-lime-400'>NET</span>{' '}
					<span className='text-slate-900'>IP</span>
				</p>
				{/*  Error message */}
				<div className={`bg-black mb-3 rounded-xl w-full sm:max-w-md border border-blue-500`}>
					<div
						className='flex bg-blue-500 bg-opacity-40  rounded-xl
				 				sm:py-5 py-3 text-center text-sm lg:text-base justify-between px-10'>
						<div className='text-slate-100'>Hola (Usuario), Cambia tu contraseña aquí.</div>
						<div
							className='font-bold text-blue-500 hover:text-blue-700 cursor-pointer transition-colors duration-300'
							onClick={removeErrorMessage}>
							X
						</div>
					</div>
				</div>
				{/*  Form */}
				<div className='w-full bg-neutral-50 rounded-2xl md:mt-0 sm:max-w-md xl:p-0 shadow-lime-600 shadow-md border-2 border-lime-500 flex'>
					<div className='w-full p-6 sm:p-8 mx-auto my-auto'>
						<h1 className='text-xl font-bold leading-tight tracking-tight text-slate-700 md:text-2xl text-center'>
							Cambiar contraseña
						</h1>
						<form
							className='mt-8'
							onClick={removeErrorMessage}
							onSubmit={handleSubmit}>
							<InputWithValidation
								label='Nueva contraseña'
								type='password'
								placeholder='Tu contraseña nueva'
								errorMessage='Por favor ingresa tu contraseña nueva.'
								value={password}
								onChange={setPassword}
								icon={<PadlockFill className='text-slate-600' />}
							/>
							<InputWithValidation
								label='Repetir nueva contraseña'
								type='password'
								placeholder='Repite tu contraseña nueva'
								errorMessage='Por favor repite tu contraseña nueva.'
								value={repeatPassword}
								onChange={setRepeatPassword}
								icon={<PadlockFill className='text-slate-600' />}
							/>
							{/* Password requirements */}
							<div className='sm:text-sm text-xs mt-3 text-gray-600 tracking-tight'>
								<div className='font-semibold'>La contraseña debe:</div>
								<div className='mt-1'>
									<div className='flex gap-2 items-center'>
										<CheckCircleFill
											className={`${
												meetCharacterLength ? 'text-emerald-500' : 'text-gray-400'
											} w-3 h-3 sm:w-4 sm:h-4 transition-colors duration-700`}
										/>
										<div>Tener entre 6 y 10 caracteres.</div>
									</div>
									<div className='flex gap-2 items-center'>
										<CheckCircleFill
											className={`${
												meetsLowerCase ? 'text-emerald-500' : 'text-gray-400'
											} w-3 h-3 sm:w-4 sm:h-4 transition-colors duration-700`}
										/>
										<div>Contener al menos una minúscula.</div>
									</div>
									<div className='flex gap-2 items-center'>
										<CheckCircleFill
											className={`${
												meetsUpperCase ? 'text-emerald-500' : 'text-gray-400'
											} w-3 h-3 sm:w-4 sm:h-4 transition-colors duration-700`}
										/>
										<div>Contener al menos una mayúscula.</div>
									</div>
									<div className='flex gap-2 items-center'>
										<CheckCircleFill
											className={`${
												meetsNumber ? 'text-emerald-500' : 'text-gray-400'
											} w-3 h-3 sm:w-4 sm:h-4 transition-colors duration-700`}
										/>
										<div>Contener al menos un número.</div>
									</div>
								</div>
								<div className='flex gap-2 items-center mt-2'>
									<CheckCircleFill
										className={`${
											meetsEqualsPassword ? 'text-emerald-500' : 'text-gray-400'
										} w-3 h-3 sm:w-4 sm:h-4 transition-colors duration-700`}
									/>
									<div>Las contraseñas deben coincidir.</div>
								</div>
							</div>
							{/* Submit */}
							<button
								disabled={!passwordMeetsAllCriteria}
								type='submit'
								className='w-full text-white focus:ring-2 focus:outline-none font-medium rounded-lg 
                                           text-sm px-5 py-2.5 text-center bg-lime-500 hover:bg-lime-600 
                                           transition-colors duration-300 cursor-pointer disabled:cursor-default mt-6 disabled:bg-gray-400 bg-opacity-80'>
								{isLoading ? <Spinner /> : 'Cambiar Contraseña'}
							</button>
						</form>
					</div>
				</div>
				{/* Footer */}
				<div className='flex flex-col items-center mt-10 text-sm lg:text-base text-slate-100'>
					<p>Diseñado por TeleSoluciones Ltda.</p>
					<p>Viña del Mar, Chile 2023</p>
				</div>
			</div>
		</>
	);
};

export default ChangePassword;
