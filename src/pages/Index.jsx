import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PadlockFill, UserFill } from '../assets/icons';
import {
  InformativeMessage,
  InputWithValidation,
  Spinner,
  Title,
} from '../components';
import { useAxios } from '../hooks';

const Register = () => {
  //Request.
  const { isLoading, message, makeRequest } = useAxios();
  // Data user.
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Event.
  const [submit, setSubmit] = useState(false);
  // Validation.
  const [IsInvalidCredentials, setIsInvalidCredentials] = useState(false);
  // Navigation.
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmit(true);
    if (!username || !password) {
      return;
    }

    try {
      const url = '/employee/login';
      const employeeData = {
        username,
        emp_password: password,
      };
      const { data } = await makeRequest(url, employeeData, 'POST');

      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      localStorage.setItem('rut', data.rut);
      navigate('/home');
    } catch (error) {
      setIsInvalidCredentials(true);
    }
  };

  const removeErrorMessage = () => {
    setIsInvalidCredentials(false);
  };

  return (
    <>
      <div className='login-page mx-auto flex h-screen flex-col items-center justify-center overflow-y-auto px-6 lg:py-0'>
        {/* Tittle */}
        <Title />
        {/* Error message */}
        {IsInvalidCredentials && (
          <div className='mb-5 w-full sm:max-w-md'>
            <InformativeMessage
              message={message}
              hasError={message.length > 0}
            />
          </div>
        )}
        {/* Form */}
        <div className='flex w-full rounded-2xl border-2 border-lime-500 bg-gradient-to-b from-gray-100 via-zinc-100 to-stone-100 opacity-90 shadow-md shadow-lime-600 sm:max-w-md md:mt-0 xl:p-0'>
          <div className='mx-auto my-auto w-full p-6 sm:px-8 sm:pb-5 sm:pt-8'>
            <h1 className='text-center text-xl font-bold leading-tight tracking-tight text-slate-700 md:text-2xl'>
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
            <div className='mt-5 flex justify-center text-xs font-medium text-slate-700 transition-colors duration-700 hover:text-slate-950 sm:text-sm'>
              <Link
                to='/recuperar-contrasena'
                className='animated-text-underline cursor-pointer'>
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>
        </div>
        {/* Footer */}
        <footer className='mt-10 flex flex-col items-center text-sm text-slate-100 lg:text-base'>
          <p>Diseñado por TeleSoluciones Ltda.</p>
          <p>Viña del Mar, Chile 2023</p>
        </footer>
      </div>
    </>
  );
};

export default Register;
