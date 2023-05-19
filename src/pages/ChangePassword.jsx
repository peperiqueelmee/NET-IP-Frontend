import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircleFill, PadlockFill } from '../assets/icons';
import {
  InformativeMessage,
  InputWithValidation,
  Spinner,
} from '../components';
import axiosClient from '../config/axios';
import { RESPONSE_SERVER } from '../utils/utils';

const ChangePassword = () => {
  // User experience
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // Data user
  const { token } = useParams();
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
    meetCharacterLength &&
    meetsLowerCase &&
    meetsUpperCase &&
    meetsNumber &&
    meetsEqualsPassword;

  useEffect(() => {
    checkPasswordValidation();
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

  const handleSubmit = async e => {
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

  const checkPasswordValidation = () => {
    const requiredLength = password.length >= 6 && password.length <= 10;
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const passwordsMatch = password.length > 0 && password === repeatPassword;

    setMetCharacterLength(requiredLength);
    setMeetsLowerCase(hasLowerCase);
    setMeetsUpperCase(hasUpperCase);
    setMeetsNumber(hasNumber);
    setMeetsEqualsPassword(passwordsMatch);
  };

  return (
    <>
      <div className='flex flex-col items-center justify-center h-screen px-6 mx-auto overflow-y-auto login-page lg:py-0'>
        {/* Informative message, success or error */}
        <div className='w-full mt-16 mb-5 sm:max-w-md'>
          <InformativeMessage
            message={message}
            hasError={hasError}
            hasSuccessful={passwordWasChanged}
            hasInfo={!hasError && !passwordWasChanged}
          />
        </div>
        {/*  Form */}
        <div className='flex w-full border-2 shadow-md rounded-2xl border-lime-500 bg-gradient-to-b from-gray-100 via-zinc-100 to-stone-100 opacity-90 shadow-lime-600 sm:max-w-md md:mt-0 xl:p-0'>
          <div className='w-full p-6 mx-auto my-auto sm:p-8'>
            <h1
              className={`text-center text-xl font-bold leading-tight tracking-tight text-slate-700 md:text-2xl`}>
              Cambiar contraseña
            </h1>
            <form
              className={`mt-8 ${
                hasError || passwordWasChanged ? 'hidden' : ''
              }`}
              onSubmit={handleSubmit}>
              <InputWithValidation
                label='Contraseña'
                required={true}
                icon={
                  <PadlockFill
                    className={'text-sm text-slate-600 sm:text-base'}
                  />
                }
                type='password'
                value={password}
                onChange={setPassword}
                placeholder='Contraseña'
                validationType={'password'}
                errorMessage='La contraseña no cumple con el formato de seguridad.'
              />
              <InputWithValidation
                label='Repetir nueva contraseña'
                required={true}
                type='password'
                repeatPassword={true}
                placeholder='Repite tu contraseña nueva'
                error={
                  repeatPassword.length > 0
                    ? !meetsEqualsPassword
                    : meetsEqualsPassword
                }
                errorMessage='Tus contraseñas no coinciden.'
                value={repeatPassword}
                onChange={setRepeatPassword}
                icon={<PadlockFill className='text-slate-600' />}
              />
              {/* Password requirements */}
              <div className='mt-3 text-xs tracking-tight text-gray-600 sm:text-sm'>
                <div className='font-semibold'>La contraseña debe:</div>
                <div className='mt-1'>
                  <div className='flex items-center gap-2'>
                    <CheckCircleFill
                      className={`${
                        meetCharacterLength
                          ? 'text-emerald-500'
                          : 'text-gray-400'
                      } h-3 w-3 transition-colors duration-700 sm:h-4 sm:w-4`}
                    />
                    <div>Tener entre 6 y 10 caracteres.</div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <CheckCircleFill
                      className={`${
                        meetsLowerCase ? 'text-emerald-500' : 'text-gray-400'
                      } h-3 w-3 transition-colors duration-700 sm:h-4 sm:w-4`}
                    />
                    <div>Contener al menos una minúscula.</div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <CheckCircleFill
                      className={`${
                        meetsUpperCase ? 'text-emerald-500' : 'text-gray-400'
                      } h-3 w-3 transition-colors duration-700 sm:h-4 sm:w-4`}
                    />
                    <div>Contener al menos una mayúscula.</div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <CheckCircleFill
                      className={`${
                        meetsNumber ? 'text-emerald-500' : 'text-gray-400'
                      } h-3 w-3 transition-colors duration-700 sm:h-4 sm:w-4`}
                    />
                    <div>Contener al menos un número.</div>
                  </div>
                </div>
                <div className='flex items-center gap-2 mt-2'>
                  <CheckCircleFill
                    className={`${
                      meetsEqualsPassword ? 'text-emerald-500' : 'text-gray-400'
                    } h-3 w-3 transition-colors duration-700 sm:h-4 sm:w-4`}
                  />
                  <div>Las contraseñas deben coincidir.</div>
                </div>
              </div>
              {/* Submit */}
              <button
                disabled={!passwordMeetsAllCriteria || isLoading}
                type='submit'
                className='mt-6 w-full cursor-pointer rounded-lg bg-gradient-to-r from-lime-400 
                                           via-lime-500 to-lime-600 px-5 py-2.5
										   text-center text-sm font-medium text-white hover:bg-gradient-to-r hover:from-lime-500 hover:via-lime-600 hover:to-lime-700
                                           focus:outline-none focus:ring-2 disabled:cursor-default disabled:from-gray-400 disabled:via-gray-500 disabled:to-gray-600'>
                {isLoading ? <Spinner /> : 'Cambiar Contraseña'}
              </button>
            </form>
            <div
              className='flex justify-center mt-5 text-xs font-medium transition-colors duration-700 text-slate-700 hover:text-slate-950 sm:text-sm'>
              <Link
                to='/'
                className='cursor-pointer animated-text-underline'>
                {passwordWasChanged ? 'Iniciar Sesión' : 'Volver al inicio'}
              </Link>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className='flex flex-col items-center mt-10 text-sm text-slate-100 lg:text-base'>
          <p>Diseñado por TeleSoluciones Ltda.</p>
          <p>Viña del Mar, Chile 2023</p>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
