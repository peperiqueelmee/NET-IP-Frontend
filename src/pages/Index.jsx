import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputWithValidation } from '../components';
import { KeyFill } from '../assets/icons';
import { UserFill } from '../assets/icons';
import { PadlockFill } from '../assets/icons';
import axios from 'axios';

const Register = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [inputUsernameEmpty, setInputUsernameEmpty] = useState(false);
	const [inputPasswordEmpty, setInputPasswordEmpty] = useState(false);
	const [invalidCredentials, setInvalidCredentials] = useState(false);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if ([username].includes('') || [password].includes('')) {
			if ([username].includes('')) {
				setInputUsernameEmpty(true);
			}

			if ([password].includes('')) {
				setInputPasswordEmpty(true);
			}
			return;
		}

		try {
			const url = `${import.meta.env.VITE_BACKEND_URL}/employee/login`;
			const employeeData = {
				username,
				emp_password: password,
			};
			const {
				data: { data },
			} = await axios.post(url, employeeData);

			localStorage.setItem('token', data.token);
			localStorage.setItem('username', data.username);
			navigate('/home');
		} catch (error) {
			setInvalidCredentials(true);
			setTimeout(() => {
				setInvalidCredentials(false);
			}, 4000);
			console.log(error);
		}
	};

	return (
		<>
			<div className='flex flex-col items-center justify-center h-screen px-6 mx-auto lg:py-0 login-page'>
				<p className='text-white font-semibold tracking-wider md:text-2xl lg:text-3xl mb-16 text-shadow'>
					Sistema de Gestión de Anexos <span className='text-lime-400'>NET</span>{' '}
					<span className='text-slate-900'>IP</span>
				</p>
				<div className='w-full bg-neutral-50 rounded-t-xl  md:mt-0 sm:max-w-md xl:p-0 shadow-lime-600 shadow-md border-t-2 border-l-2 border-r-2 border-lime-500 flex'>
					<div className='w-full p-6 sm:p-8 mx-auto my-auto'>
						<h1 className='text-xl font-bold leading-tight tracking-tight text-slate-700 md:text-2xl text-center'>
							Ingresa a tu cuenta
						</h1>
						<form
							className='mt-8'
							onSubmit={handleSubmit}>
							<InputWithValidation
								label='Usuario'
								type='text'
								placeholder='Tu usuario'
								errorMessage='Por favor ingresa tu nombre de usuario.'
								value={username}
								onChange={setUsername}
								icon={<UserFill className='text-slate-600' />}
								emptyInputShipment={inputUsernameEmpty}
							/>
							<InputWithValidation
								label='Contraseña'
								type='password'
								placeholder='Tu contraseña'
								errorMessage='Por favor ingresa tu contraseña.'
								value={password}
								onChange={setPassword}
								icon={<PadlockFill className='text-slate-600' />}
								emptyInputShipment={inputPasswordEmpty}
							/>

							<div className={`${invalidCredentials ? 'visible' : 'invisible'} flex justify-center`}>
								<span className='text-xs text-red-600 font-medium tracking-wide'>
									Credenciales invalidas
								</span>
							</div>

							<button
								type='submit'
								className='w-full text-white focus:ring-2 focus:outline-none font-medium rounded-lg 
                                           text-sm px-5 py-2.5 text-center bg-lime-500 hover:bg-lime-600 
                                           transition-colors duration-150 disabled:bg-gray-300 cursor-pointer disabled:cursor-default mt-6'>
								Iniciar Sesión
							</button>
						</form>
					</div>
				</div>
				<div className='w-full flex justify-evenly items-center h-20 bg-gradient-to-r from-zinc-600 to-gray-500 rounded-b-xl shadow-md shadow-lime-700 md:mt-0 sm:max-w-md xl:p-0 border-r-2 border-l-2 border-b-2 border-t border-lime-600'>
					<div>
						<KeyFill className='md:text-6xl text-4xl text-slate-300' />
					</div>
					<div className='flex justify-center flex-col items-center text-sm lg:text-base'>
						<p className='font-medium text-zinc-300'>¿Olvidaste tu contraseña?</p>
						<p className='font-semibold cursor-pointer text-gray-900 hover:text-gray-400 hover:underline transition-colors duration-150'>
							Comunícate con soporte
						</p>
					</div>
				</div>
				<div className='flex flex-col items-center mt-10 text-sm lg:text-base text-slate-100'>
					<p>Diseñado por TeleSoluciones Ltda.</p>
					<p>Viña del Mar, Chile 2023</p>
				</div>
			</div>
		</>
	);
};

export default Register;
