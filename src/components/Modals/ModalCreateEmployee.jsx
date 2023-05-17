import { useEffect, useState } from 'react';
import { InformativeMessage, InputAutocomplete, InputWithValidation, Spinner } from '..';
import { EmailFill, IdCardFill, LabFill, PadlockFill, UserFill, UserSecretFill } from '../../assets/icons';
import axiosClient from '../../config/axios';
import { useAction } from '../../hooks';
import { RESPONSE_SERVER } from '../../utils/utils';

const ModalCreateEmployee = () => {
  // User experience.
  const [isLoading, setIsLoading] = useState(null);
  const { setSelectActionUsers } = useAction();
  const [message, setMessage] = useState('');
  // Data form.
  const [roles, setRoles] = useState(() => JSON.parse(localStorage.getItem('roles')) || []);
  // Data user.
  const [names, setNames] = useState('');
  const [lastnames, setLastnames] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(null);
  const [roleSelected, setRoleSelected] = useState('');
  // Validations.
  const formIsFull = names && lastnames && rut && email && username && password && role;
  const [userHasBeenCreated, setUserHasBeenCreated] = useState(null);
  const [inputRutHasError, setInputRutHasError] = useState(false);
  const [inputEmailHasError, setInputEmailHasError] = useState(false);
  const [inputUsernameHasError, setInputUsernameHasError] = useState(false);
  const [inputPasswordHasError, setInputPasswordHasError] = useState(false);
  // Event.
  const [submit, setSubmit] = useState(false);
  // Toggle modal.
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Get roles.
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

  // Handles.
  const handleToggleModal = (shouldClose) => {
    setOpen(!shouldClose);
    clearForm();
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
    actionsAfterSubmit();

    try {
      // Create employee.
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
      setIsLoading(null);
      setMessage('¡El usuario ha sido creado exitosamente!');
      setUserHasBeenCreated(true);
    } catch (error) {
      setIsLoading(null);
      setUserHasBeenCreated(false);
      if (error.code === RESPONSE_SERVER.BAD_REQUEST) {
        const messageError = error.response.data.message;
        const inputWithError = error.response.data.input;
        setMessage(messageError);

        return markInputWithError(inputWithError);
      }
      setMessage('Error de servidor. Reintentar.');
    }
  };

  // Support functions.
  const removeErrorMessage = () => {
    setUserHasBeenCreated(null);
  };
  const actionsAfterSubmit = () => {
    // User experience.
    setIsLoading(true);
    setMessage('');
    // Validations.
    setInputRutHasError(false);
    setInputEmailHasError(false);
    setInputUsernameHasError(false);
    setInputPasswordHasError(false);
    setUserHasBeenCreated(null);
    // Event
    setSubmit(true);
  };
  const clearForm = async () => {
    // User Experience.
    setMessage('');
    // Data user.
    setNames('');
    setLastnames('');
    setRut('');
    setEmail('');
    setUsername('');
    setPassword('');
    setRole(null);
    setRoleSelected('');
    // Validations.
    setUserHasBeenCreated(null);
    setSelectActionUsers(null);
    setInputRutHasError(false);
    setInputEmailHasError(false);
    setInputUsernameHasError(false);
    setInputPasswordHasError(false);
  };
  const markInputWithError = (inputType) => {
    const inputMap = {
      RUT: setInputRutHasError,
      Email: setInputEmailHasError,
      Username: setInputUsernameHasError,
      Password: setInputPasswordHasError,
    };
    const setInputError = inputMap[inputType];
    setInputError?.(true);
  };

  return (
    <div>
      <button
        id='createEmployee'
        className='text-xs text-white sm:text-base'
        onClick={() => handleToggleModal(false)}></button>
      {open && (
        <div className='fixed inset-0 z-10 flex items-center justify-center overflow-x-auto bg-black bg-opacity-50 px-0 sm:px-20 lg:px-40 xl:px-72'>
          <div
            className={`mx-5 mb-5 mt-60 flex w-full flex-col  items-center  overflow-auto rounded-lg bg-slate-200 bg-opacity-90 py-5 sm:mt-52 sm:w-11/12 lg:mt-10 lg:w-10/12 2xl:w-8/12`}>
            {/* Success or error message */}
            {userHasBeenCreated != null ? (
              <div className='flex w-full justify-center px-3'>
                <InformativeMessage
                  message={message}
                  hasError={!userHasBeenCreated}
                  hasSuccessful={userHasBeenCreated}
                />
              </div>
            ) : null}
            {/* Form */}
            {!userHasBeenCreated ? (
              <>
                {/* Title */}
                <div className='mt-2 flex items-center gap-2'>
                  <h2 className='text-xl font-bold text-slate-700 md:text-2xl'>Crear Trabajador</h2>
                  <LabFill className='md:ext-xl text-lg text-slate-700' />
                </div>
                <form
                  className='mt-2 w-full px-10 py-4'
                  onClick={removeErrorMessage}
                  onSubmit={handleSubmit}>
                  <div className='flex flex-col'>
                    <div className='block w-full justify-center gap-4 md:flex'>
                      <div className='w-full'>
                        <InputWithValidation
                          label='Nombre(s)'
                          required={true}
                          icon={<UserSecretFill className={'text-sm text-slate-600 sm:text-base'} />}
                          type='text'
                          value={names}
                          onChange={setNames}
                          placeholder='Juan Carlos'
                          errorMessage='Por favor ingresa el/los nombre(s).'
                        />
                      </div>
                      <div className='w-full'>
                        <InputWithValidation
                          label='Apellido(s)'
                          required={true}
                          icon={<UserSecretFill className={'text-sm text-slate-600 sm:text-base'} />}
                          type='text'
                          value={lastnames}
                          onChange={setLastnames}
                          placeholder='Bodoque Bodoque'
                          errorMessage='Por favor ingresa el/los apellido(s).'
                        />
                      </div>
                    </div>
                    <div className='block w-full justify-center gap-4 md:flex'>
                      <div className='w-full'>
                        <InputWithValidation
                          label='R.U.T'
                          required={true}
                          icon={<IdCardFill className={'text-sm text-slate-600 sm:text-base'} />}
                          type='text'
                          value={rut}
                          onChange={setRut}
                          placeholder='10123456-3'
                          validationType={'rut'}
                          error={submit && inputRutHasError ? true : false}
                          errorMessage='Formato de RUT incorrecta y/o inválido.'
                          tooltip={'El formato de rut debe ser 12345678-9'}
                        />
                      </div>
                      <div className='w-full'>
                        <InputWithValidation
                          label='E-Mail'
                          required={true}
                          icon={<EmailFill className={'text-sm text-slate-600 sm:text-base'} />}
                          type='email'
                          value={email}
                          onChange={setEmail}
                          placeholder='juancarlosbodoque@correo.cl'
                          validationType={'email'}
                          error={submit && inputEmailHasError ? true : false}
                          errorMessage='Por favor ingresa un correo válido.'
                        />
                      </div>
                    </div>
                    <div className='block w-full justify-center gap-4 md:flex'>
                      <div className='w-full'>
                        <InputWithValidation
                          label='Usuario'
                          required={true}
                          icon={<UserFill className={'text-sm text-slate-600 sm:text-base'} />}
                          type='text'
                          value={username}
                          onChange={setUsername}
                          placeholder='JcBodoque'
                          error={submit && inputUsernameHasError ? true : false}
                          errorMessage='Por favor ingresa un nombre de usuario valido.'
                        />
                      </div>
                      <div className='w-full'>
                        <InputWithValidation
                          label='Contraseña'
                          required={true}
                          icon={<PadlockFill className={'text-sm text-slate-600 sm:text-base'} />}
                          type='password'
                          value={password}
                          onChange={setPassword}
                          placeholder='Contraseña'
                          validationType={'password'}
                          error={submit && inputPasswordHasError ? true : false}
                          errorMessage='La contraseña no cumple con el formato de seguridad.'
                          tooltip={
                            'El formato de contraseña debe ser 6-10 caracteres, contener al menos: 1 mayúscula, 1 minúscula, 1 número.'
                          }
                        />
                      </div>
                    </div>
                    <div className='mt-2'>
                      <label className='mb-2 block text-xs font-medium text-slate-600 sm:text-sm'>
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
                  {/* Error message */}
                  {userHasBeenCreated != null ? (
                    <div className={`mt-4 block text-center text-xs font-medium text-red-600 md:hidden`}>{message}</div>
                  ) : null}
                  {isLoading && (
                    <div className='mt-4'>
                      <Spinner />
                    </div>
                  )}
                  <div className='mt-8 flex justify-center space-x-4'>
                    <button
                      className='w-20 rounded-lg border border-gray-300
                               bg-slate-200 px-2 py-1 text-xs font-medium 
                               text-gray-900 transition-colors duration-300 
                               hover:bg-slate-300 sm:text-sm md:text-base'
                      onClick={() => handleToggleModal(true)}>
                      Cancelar
                    </button>
                    <button
                      type='submit'
                      disabled={!formIsFull || isLoading}
                      className='w-20 rounded-lg border border-pink-700
                               bg-pink-600 px-2 py-1 text-xs font-medium text-slate-100 transition-colors duration-300
										           hover:bg-pink-700 disabled:border-gray-500 disabled:bg-gray-400 sm:text-sm md:text-base'>
                      Crear
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div
                className='mt-5 flex justify-center text-xs font-medium
									  text-slate-700 transition-colors duration-700
									  hover:text-slate-950 sm:text-sm'>
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
