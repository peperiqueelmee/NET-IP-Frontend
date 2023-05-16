import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserFill } from '../assets/icons';
import { InformativeMessage, InputWithValidation, Spinner, Title } from '../components';
import axiosClient from '../config/axios';
import { RESPONSE_SERVER } from '../utils/utils';

const RecoverPassword = () => {
  // User experience
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  // Data user
  const [username, setUsername] = useState('');
  // Event
  const [submit, setSubmit] = useState(false);
  // Validation
  const [IsUsernameInvalid, setIsUsernameInvalid] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);
    if (!username) {
      return;
    }
    try {
      // Recover password
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
        setMessage(error.response.data.message);
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
      <div className='login-page mx-auto flex h-screen flex-col items-center justify-center overflow-y-auto px-6 lg:py-0'>
        {/* Title */}
        <Title />
        {/* Success or error message */}
        {IsUsernameInvalid !== null ? (
          <div className='mb-5 w-full sm:max-w-md'>
            <InformativeMessage
              message={message}
              hasError={IsUsernameInvalid}
              hasSuccessful={!IsUsernameInvalid}
            />
          </div>
        ) : null}
        {/* Form */}
        <div className='flex w-full rounded-2xl border-2 border-lime-500 bg-gradient-to-b from-gray-100 via-zinc-100 to-stone-100 opacity-90 shadow-md shadow-lime-600 sm:max-w-md md:mt-0 xl:p-0'>
          <div className='mx-auto my-auto w-full p-6 sm:px-8 sm:pb-5 sm:pt-8'>
            <h1 className='text-center text-xl font-bold leading-tight tracking-tight text-slate-700 md:text-2xl'>
              Recupera tu contraseña
            </h1>
            <form
              className={`mt-8 ${IsUsernameInvalid === false ? 'hidden' : ''}`}
              onChange={removeMessage}
              onClick={removeMessage}
              onSubmit={handleSubmit}>
              <InputWithValidation
                label='Usuario'
                required={true}
                type='text'
                placeholder='Tu usuario'
                errorMessage={IsUsernameInvalid ? 'Usuario no registrado.' : 'Por favor ingresa tu nombre de usuario.'}
                value={username}
                onChange={setUsername}
                icon={<UserFill className='text-slate-600' />}
                error={username.length === 0 && submit ? true : IsUsernameInvalid ? true : false}
              />

              <button
                disabled={isLoading}
                type='submit'
                className='mt-6 w-full cursor-pointer rounded-lg bg-gradient-to-r from-lime-400 
                                           via-lime-500 to-lime-600 px-5 py-2.5
										   text-center text-sm font-medium text-white hover:bg-gradient-to-r hover:from-lime-500 hover:via-lime-600 hover:to-lime-700
                                           focus:outline-none focus:ring-2 disabled:cursor-default disabled:from-gray-400 disabled:via-gray-500 disabled:to-gray-600'>
                {isLoading ? <Spinner /> : 'Recuperar Contraseña'}
              </button>
            </form>
            <div
              className='mt-5 flex justify-center text-xs font-medium
									  text-slate-700 transition-colors duration-700
									  hover:text-slate-950 sm:text-sm'>
              <Link
                to='/'
                className='animated-text-underline cursor-pointer'>
                Iniciar Sesión
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

export default RecoverPassword;
