import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserFill } from '../assets/icons';
import { InputWithValidation, Spinner, InformativeMessage } from '../components';
import axiosClient from '../config/axios';
import { RESPONSE_SERVER } from '../utils/utils';

const RecoverPassword = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [inputUsernameSubmitEmpty, setInputUsernameSubmitEmpty] = useState(false);
	const [IsUsernameInvalid, setIsUsernameInvalid] = useState(null);
	const [username, setUsername] = useState('');
	const [message, setMessage] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Validate full fields
		const isUsernameEmpty = !username;
		if (isUsernameEmpty) {
			setInputUsernameSubmitEmpty(isUsernameEmpty);
			return;
		}
		// Recover password
		try {
			setIsLoading(true);
			const url = '/employee/forgot-password';
			const employeeData = {
				username,
			};
			const { data } = await axiosClient.post(url, employeeData);
			const name = data.data.name;
			const email = data.data.email;

			setIsUsernameInvalid(false);
			setIsLoading(false);
			setMessage(`${name} revisa tu correo ${email} para continuar.`);
		} catch (error) {
			setIsUsernameInvalid(true);
			setIsLoading(false);

			if (error.code === RESPONSE_SERVER.BAD_REQUEST) {
				setMessage('Usuario no registrado.');
				return;
			}
			setMessage('Error de servidor. Reintentar.');
		}
	};

	const removeMessage = () => {
		setIsUsernameInvalid(null);
	};

	return (
		<>
			<div className='flex flex-col items-center justify-center h-screen px-6 mx-auto lg:py-0 login-page overflow-y-auto'>
				{/* Title */}
				<h1 className='text-white font-semibold tracking-wider md:text-2xl lg:text-3xl mb-16 text-shadow'>
					Sistema de Gestión de Anexos <span className='text-lime-400'>NET</span>{' '}
					<span className='text-slate-900'>IP</span>
				</h1>
				{/* Success or error message */}
				{IsUsernameInvalid !== null ? (
					<InformativeMessage
						message={message}
						border={IsUsernameInvalid ? 'red-500' : 'blue-500'}
						background={IsUsernameInvalid ? 'red-800' : 'blue-500'}
						text={IsUsernameInvalid ? 'red-500' : 'blue-500'}
						textHover={IsUsernameInvalid ? 'red-700' : 'blue-600'}
					/>
				) : null}
				{/* Form */}
				<div className='opacity-90 w-full bg-gradient-to-b from-gray-100 via-zinc-100 to-stone-100 rounded-2xl md:mt-0 sm:max-w-md xl:p-0 shadow-lime-600 shadow-md border-2 border-lime-500 flex'>
					<div className='w-full p-6 sm:px-8 sm:pt-8 sm:pb-5 mx-auto my-auto'>
						<h1 className='text-xl font-bold leading-tight tracking-tight text-slate-700 md:text-2xl text-center'>
							Recupera tu contraseña
						</h1>
						<form
							className={`mt-8 ${IsUsernameInvalid === false ? 'hidden' : ''}`}
							onClick={removeMessage}
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

							<button
								disabled={isLoading}
								type='submit'
								className='w-full text-white focus:ring-2 focus:outline-none font-medium rounded-lg 
                                           text-sm px-5 py-2.5 text-center bg-lime-500 hover:bg-lime-600 
                                           transition-colors duration-150 cursor-pointer disabled:cursor-default mt-6 disabled:bg-gray-400'>
								{isLoading ? <Spinner /> : 'Recuperar Contraseña'}
							</button>
						</form>
						<div
							className='flex justify-center mt-5 text-xs sm:text-sm
									  text-slate-700 hover:text-slate-950 font-medium
									  transition-colors duration-700'>
							<Link
								to='/'
								className='animated-text-underline cursor-pointer'>
								Iniciar Sesión
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

export default RecoverPassword;
