import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PadlockFill, UserFill } from '../assets/icons';
import {
  InformativeMessage,
  InputWithValidation,
  Spinner,
  Title,
} from '../components';
import axiosClient from '../config/axios';
import { RESPONSE_SERVER } from '../utils/utils';

const Register = () => {
  // User experience.
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState('');
  // Data user.
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Event.
  const [submit, setSubmit] = useState(false);
  // Validation.
  const [IsInvalidCredentials, setIsInvalidCredentials] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmit(true);
    if (!username || !password) {
      return;
    }

    try {
      // Login.
      setIsLoading(true);
      const url = '/employee/login';
      const employeeData = {
        username,
        emp_password: password,
      };
      const {
        data: {
          data: { token, rut },
        },
      } = await axiosClient.post(url, employeeData);

      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      localStorage.setItem('rut', rut);

      navigate('/home');
      setIsLoading(false);
    } catch (error) {
      setIsInvalidCredentials(true);
      setIsLoading(false);

      if (error.code === RESPONSE_SERVER.BAD_REQUEST) {
        setMessageError(error.response.data.message);
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
      <div className='flex flex-col items-center justify-center h-screen px-6 mx-auto overflow-y-auto login-page lg:py-0'>
        {/* Tittle */}
        <Title />
        {/* Error message */}
        {IsInvalidCredentials && (
          <div className='w-full mb-5 sm:max-w-md'>
            <InformativeMessage
              message={messageError}
              hasError={messageError.length > 0}
            />
          </div>
        )}
        {/* Form */}
        <div className='flex w-full border-2 shadow-md rounded-2xl border-lime-500 bg-gradient-to-b from-gray-100 via-zinc-100 to-stone-100 opacity-90 shadow-lime-600 sm:max-w-md md:mt-0 xl:p-0'>
          <div className='w-full p-6 mx-auto my-auto sm:px-8 sm:pb-5 sm:pt-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-center text-slate-700 md:text-2xl'>
              Ingresa a tu cuenta
            </h1>
            <form
              className='mt-8'
              onChange={removeErrorMessage}
              onClick={removeErrorMessage}
              onSubmit={handleSubmit}>
              <InputWithValidation
                label='Usuario'
                required={true}
                type='text'
                placeholder='Tu usuario'
                errorMessage={
                  IsInvalidCredentials
                    ? 'Credenciales incorrectas.'
                    : 'Por favor ingresa tu nombre de usuario.'
                }
                value={username}
                onChange={setUsername}
                icon={<UserFill className='text-slate-600' />}
                error={
                  (username.length === 0 && submit) || IsInvalidCredentials
                }
              />
              <InputWithValidation
                label='Contraseña'
                required={true}
                type='password'
                placeholder='Tu contraseña'
                errorMessage={
                  IsInvalidCredentials
                    ? 'Credenciales incorrectas.'
                    : 'Por favor ingresa tu contraseña.'
                }
                value={password}
                onChange={setPassword}
                icon={<PadlockFill className='text-slate-600' />}
                error={
                  (username.length === 0 && submit) || IsInvalidCredentials
                }
              />
              <button
                disabled={isLoading}
                type='submit'
                className='mt-6 w-full cursor-pointer rounded-lg bg-gradient-to-r from-lime-400 
                         via-lime-500 to-lime-600 px-5 py-2.5 
						               text-center text-sm font-medium text-white hover:bg-gradient-to-r hover:from-lime-500 hover:via-lime-600 hover:to-lime-700
                           focus:outline-none focus:ring-2 disabled:cursor-default disabled:bg-gradient-to-r disabled:from-gray-400 disabled:via-gray-500 disabled:to-gray-600'>
                {isLoading ? <Spinner /> : 'Iniciar Sesión'}
              </button>
            </form>
            <div className='flex justify-center mt-5 text-xs font-medium transition-colors duration-700 text-slate-700 hover:text-slate-950 sm:text-sm'>
              <Link
                to='/recuperar-contrasena'
                className='cursor-pointer animated-text-underline'>
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>
        </div>
        {/* Footer */}
        <footer className='flex flex-col items-center mt-10 text-sm text-slate-100 lg:text-base'>
          <p>Diseñado por TeleSoluciones Ltda.</p>
          <p>Viña del Mar, Chile 2023</p>
        </footer>
      </div>
    </>
  );
};

export default Register;
