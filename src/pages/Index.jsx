import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PadlockFill, UserFill } from '../assets/icons';
import { InformativeMessage, InputWithValidation, Spinner } from '../components';
import axiosClient from '../config/axios';
import { RESPONSE_SERVER } from '../utils/utils';

const Register = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [inputUsernameSubmitEmpty, setInputUsernameSubmitEmpty] = useState(false);
	const [inputPasswordSubmitEmpty, setInputPasswordSubmitEmpty] = useState(false);
	const [IsInvalidCredentials, setIsInvalidCredentials] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [messageError, setMessageError] = useState('');

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Validate full fields
		const isUsernameEmpty = !username;
		const isPasswordEmpty = !password;
		if (isUsernameEmpty || isPasswordEmpty) {
			setInputUsernameSubmitEmpty(isUsernameEmpty);
			setInputPasswordSubmitEmpty(isPasswordEmpty);
			return;
		}
		// Login
		try {
			setIsLoading(true);
			const url = '/employee/login';
			const employeeData = {
				username,
				emp_password: password,
			};
			const { data } = await axiosClient.post(url, employeeData);
			const token = data.data.token;

			localStorage.setItem('token', token);
			localStorage.setItem('username', username);

			navigate('/home');
			setIsLoading(false);
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

	return (
		<>
			<div className='flex flex-col items-center justify-center h-screen px-6 mx-auto lg:py-0 login-page overflow-y-auto'>
				{/* Title */}
				<h1 className='text-white font-semibold tracking-wider md:text-2xl lg:text-3xl mb-16 text-shadow'>
					Sistema de Gestión de Anexos <span className='text-lime-400'>NET</span>{' '}
					<span className='text-slate-900'>IP</span>
				</h1>
				{/* Error message */}
				{IsInvalidCredentials && (
					<InformativeMessage
						message={messageError}
						border={'border-red-500'}
						background={'bg-red-800'}
						text={'text-red-500'}
						textHover={'hover:text-red-700'}
					/>
				)}
				{/* Form */}
				<div className='opacity-90 w-full bg-gradient-to-b from-gray-100 via-zinc-100 to-stone-100 rounded-2xl md:mt-0 sm:max-w-md xl:p-0 shadow-lime-600 shadow-md border-2 border-lime-500 flex'>
					<div className='w-full p-6 sm:px-8 sm:pt-8 sm:pb-5 mx-auto my-auto'>
						<h1 className='text-xl font-bold leading-tight tracking-tight text-slate-700 md:text-2xl text-center'>
							Ingresa a tu cuenta
						</h1>
						<form
							className='mt-8'
							onClick={removeErrorMessage}
							onSubmit={handleSubmit}>
							<InputWithValidation
								label='Usuario'
								type='text'
								placeholder='Tu usuario'
								errorMessage='Por favor ingresa tu nombre de usuario.'
								value={username}
								onChange={setUsername}
								icon={<UserFill className='text-slate-600' />}
								submitForm={inputUsernameSubmitEmpty}
							/>
							<InputWithValidation
								label='Contraseña'
								type='password'
								placeholder='Tu contraseña'
								errorMessage='Por favor ingresa tu contraseña.'
								value={password}
								onChange={setPassword}
								icon={<PadlockFill className='text-slate-600' />}
								submitForm={inputPasswordSubmitEmpty}
							/>

							<button
								disabled={isLoading}
								type='submit'
								className='w-full text-white focus:ring-2 focus:outline-none font-medium rounded-lg 
                                           text-sm px-5 py-2.5 text-center bg-lime-500 hover:bg-lime-600 
                                           transition-colors duration-150 cursor-pointer disabled:cursor-default mt-6 disabled:bg-gray-400'>
								{isLoading ? <Spinner /> : 'Iniciar Sesión'}
							</button>
						</form>
						<div
							className='flex justify-center mt-5 text-xs sm:text-sm
									  text-slate-700  hover:text-slate-950 font-medium
									  transition-colors duration-700'>
							<Link
								to='/recuperar-contrasena'
								className='animated-text-underline cursor-pointer'>
								¿Olvidaste tu contraseña?
							</Link>
						</div>
					</div>
				</div>
				{/* Footer */}
				<footer className='flex flex-col items-center mt-10 text-sm lg:text-base text-slate-100'>
					<p>Diseñado por TeleSoluciones Ltda.</p>
					<p>Viña del Mar, Chile 2023</p>
				</footer>
			</div>
		</>
	);
};

export default Register;
