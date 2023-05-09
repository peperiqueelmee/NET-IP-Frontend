import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircleFill, PadlockFill } from '../assets/icons';
import { InformativeMessage, InputWithValidation, Spinner } from '../components';
import axiosClient from '../config/axios';
import { RESPONSE_SERVER } from '../utils/utils';

const ChangePassword = () => {
	const params = useParams();
	const { token } = params;

	const [message, setMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	// Data user
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	// Request validations
	const [hasError, setHasError] = useState(false);
	const [passwordWasChanged, setPasswordWasChanged] = useState(null);
	// Password validations
	const [meetCharacterLength, setMetCharacterLength] = useState(false);
	const [meetsLowerCase, setMeetsLowerCase] = useState(false);
	const [meetsUpperCase, setMeetsUpperCase] = useState(false);
	const [meetsNumber, setMeetsNumber] = useState(false);
	const [meetsEqualsPassword, setMeetsEqualsPassword] = useState(false);
	const passwordMeetsAllCriteria =
		meetCharacterLength && meetsLowerCase && meetsUpperCase && meetsNumber && meetsEqualsPassword;

	useEffect(() => {
		checkPasswordStrength();
	}, [password, repeatPassword]);
	useEffect(() => {
		const checkToken = async () => {
			try {
				const url = `/employee/forgot-password/${token}`;
				const { data } = await axiosClient(url);
				const employeeName = data.data;

				setHasError(false);
				setMessage(`Hola ${employeeName}, cambia tu contraseña aquí.`);
			} catch (error) {
				setHasError(true);
				if (error.code === RESPONSE_SERVER.BAD_REQUEST) {
					setMessage(error.response.data.message);
					return;
				}
				setMessage('Error de servidor. Reintentar.');
			}
		};
		checkToken();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// Change password
			setIsLoading(true);
			const url = `/employee/forgot-password/${token}`;
			const { data } = await axiosClient.post(url, { emp_password: password });
			const employeeName = data.data.name;

			setIsLoading(false);
			setPasswordWasChanged(true);
			setMessage(`${employeeName} tu contraseña ha sido cambiada.`);
		} catch (error) {
			setIsLoading(false);
			setHasError(true);
			setMessage('Error de servidor. Reintentar.');
		}
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
			<div className='flex flex-col items-center justify-center h-screen px-6 mx-auto lg:py-0 login-page overflow-y-auto'>
				{/*  Tittle */}
				<p className='text-white font-semibold tracking-wider md:text-2xl lg:text-3xl mb-16 text-shadow'>
					Sistema de Gestión de Anexos <span className='text-lime-400'>NET</span>{' '}
					<span className='text-slate-900'>IP</span>
				</p>
				{/* Informative message, success or error */}
				<div className='w-full mb-5 sm:max-w-md'>
					<InformativeMessage
						message={message}
						hasError={hasError}
						hasSuccessful={passwordWasChanged}
						hasInfo={!hasError && !passwordWasChanged}
					/>
				</div>
				{/*  Form */}
				<div className='opacity-90 w-full bg-gradient-to-b from-gray-100 via-zinc-100 to-stone-100 rounded-2xl md:mt-0 sm:max-w-md xl:p-0 shadow-lime-600 shadow-md border-2 border-lime-500 flex'>
					<div className='w-full p-6 sm:p-8 mx-auto my-auto'>
						<h1
							className={`text-xl font-bold leading-tight tracking-tight text-slate-700 md:text-2xl text-center`}>
							Cambiar contraseña
						</h1>
						<form
							className={`mt-8 ${hasError || passwordWasChanged ? 'hidden' : ''}`}
							onSubmit={handleSubmit}>
							<InputWithValidation
								label='Nueva contraseña'
								required={true}
								type='password'
								placeholder='Tu contraseña nueva'
								errorMessage='Por favor ingresa tu contraseña nueva.'
								value={password}
								onChange={setPassword}
								icon={<PadlockFill className='text-slate-600' />}
							/>
							<InputWithValidation
								label='Repetir nueva contraseña'
								required={true}
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
								disabled={!passwordMeetsAllCriteria || isLoading}
								type='submit'
								className='w-full text-white focus:ring-2 focus:outline-none font-medium rounded-lg 
                                           text-sm px-5 py-2.5 text-center
										   bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 hover:bg-gradient-to-r hover:from-lime-500 hover:via-lime-600 hover:to-lime-700
                                           cursor-pointer disabled:cursor-default mt-6 disabled:from-gray-400 disabled:via-gray-500 disabled:to-gray-600'>
								{isLoading ? <Spinner /> : 'Cambiar Contraseña'}
							</button>
						</form>
						<div
							className='flex justify-center mt-5 text-xs sm:text-sm
									  text-slate-700 hover:text-slate-950 font-medium
									  transition-colors duration-700'>
							<Link
								to='/'
								className='animated-text-underline cursor-pointer'>
								{passwordWasChanged ? 'Iniciar Sesión' : 'Volver al inicio'}
							</Link>
						</div>
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
