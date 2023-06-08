import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InformativeMessage, InputAutocomplete, InputWithValidation, Spinner } from '..';
import { EmailFill, IdCardFill, PadlockFill, PencilFill, UserFill, UserSecretFill } from '../../assets/icons';
import { updateInfoEmployees, updateFormValidation } from '../../features';
import { useAction, useAxios } from '../../hooks';
import { TYPES_ERRORS_INPUT } from '../../utils/utils';

const ModalEditEmployee = () => {
  //Request.
  const { makeRequest, isLoading } = useAxios();
  // User experience.
  const { selectedActionUsers } = useAction();
  const { message, inputError, formOk } = useSelector(state => state.formValidation);
  // Data form.
  const { employee } = useSelector(state => state.employees);
  const [roles, setRoles] = useState(() => JSON.parse(localStorage.getItem('roles')) || []);
  const [statuses, setStatuses] = useState(() => JSON.parse(localStorage.getItem('statuses')) || []);
  // Data user.
  const [employeeData, setEmployeeData] = useState({
    names: '',
    lastnames: '',
    rut: '',
    email: '',
    username: '',
    emp_password: '',
    role_id: null,
    status_id: null,
  });
  const [roleSelectedString, setRoleSelectedString] = useState('');
  const [statusSelectedString, setStatusSelectedString] = useState('');
  const userRut = useSelector(state => state.authentication.rut);
  // Event.
  const [submit, setSubmit] = useState(false);
  //  Toggle modal.
  const [open, setOpen] = useState(false);
  // Status redux update.
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData(path, setter, storageKey) {
      if (localStorage.getItem(storageKey)) {
        const data = JSON.parse(localStorage.getItem(storageKey));
        setter(data);
        return;
      }
      try {
        const { data } = await makeRequest(path);
        localStorage.setItem(storageKey, JSON.stringify(data));
        setter(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData('/role', setRoles, 'roles');
    fetchData('/status/employee', setStatuses, 'statuses');
  }, []);

  useEffect(() => {
    if (employee) {
      return uploadEmployeeData(employee);
    }
  }, [employee]);

  //Handles.
  const handleToggleModal = shouldClose => {
    setOpen(!shouldClose);
    clearForm();
  };

  const selectOption = (setSelected, array, key, setEmployeeData) => selected => {
    setSelected(selected);
    const selectedObject = array.find(({ description }) => description === selected);
    setEmployeeData(prevData => ({
      ...prevData,
      [key]: selectedObject ? selectedObject.id : null,
    }));
  };
  const handleRoleSelect = selectOption(setRoleSelectedString, roles, 'role_id', setEmployeeData);
  const handleStatusSelect = selectOption(setStatusSelectedString, statuses, 'status_id', setEmployeeData);

  const handleSubmit = async e => {
    actionsAfterSubmit();
    e.preventDefault();
    const url = `/employee/update/${employee.id}`;
    const response = await makeRequest(url, employeeData, 'PUT');

    if (!response || response.error) {
      return;
    }
    dispatch(updateFormValidation({ message: '¡El usuario ha sido editado exitosamente!' }));
    // Refresh table employees.
    const urlEmployee = getUrlEmployee(selectedActionUsers, employeeData.rut);
    const { data, total } = await makeRequest(urlEmployee);
    dispatch(updateInfoEmployees({ employees: data, totalEmployees: total }));
  };

  // Support functions.
  const uploadEmployeeData = employee => {
    setEmployeeData({
      ...employeeData,
      names: employee.names,
      lastnames: employee.lastnames,
      rut: employee.rut,
      email: employee.email,
      username: employee.username,
      role_id: employee.role_id,
      status_id: employee.status_id,
    });
    setRoleSelectedString(employee.role.description);
    setStatusSelectedString(employee.status.description);
  };
  const removeErrorMessage = () => {
    dispatch(updateFormValidation({ formOk: null }));
  };
  const actionsAfterSubmit = () => {
    dispatch(updateFormValidation({ message: '', inputError: null, formOk: null }));
    setSubmit(true);
  };
  const clearForm = async () => {
    dispatch(updateFormValidation({ message: '', inputError: null, formOk: null }));
    setEmployeeData({
      names: '',
      lastnames: '',
      rut: '',
      email: '',
      username: '',
      emp_password: '',
      role_id: null,
      status_id: null,
    });
  };
  const getUrlEmployee = (selectedActionUsers, rut) => {
    const urlMap = {
      2: '/employee/employees',
      3: '/employee/employees/status/1',
      4: '/employee/employees/status/2',
      5: `/employee/employees/${rut}`,
    };
    return urlMap[selectedActionUsers] ?? '/employee/employees';
  };

  return (
    <>
      <button
        id='editEmployee'
        className='text-xs text-white sm:text-base'
        onClick={() => handleToggleModal(false)}></button>
      {open && (
        <div className='fade-in fixed inset-0 z-10 flex items-center justify-center overflow-x-auto bg-black bg-opacity-50 px-0 sm:px-20 lg:px-40 xl:px-72'>
          <div
            className={`scale-in-center mx-5 mb-5 mt-60 flex w-full  flex-col  items-center overflow-auto rounded-lg border border-lime-400 bg-slate-200 bg-opacity-90 py-5 sm:mt-52 sm:w-11/12 lg:mt-10 lg:w-10/12 2xl:w-8/12`}>
            {/* Success or error message */}
            {formOk != null && (
              <div className='flex w-full justify-center px-3'>
                <InformativeMessage
                  message={message}
                  hasError={!formOk}
                  hasSuccessful={formOk}
                />
              </div>
            )}
            {/* Form */}
            {!formOk ? (
              <>
                {/* Title */}
                <div className='mt-2 flex items-center gap-2'>
                  <h2 className='text-xl font-bold text-slate-700 md:text-2xl'>Editar Trabajador</h2>
                  <PencilFill className='md:ext-xl text-lg text-slate-700' />
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
                          icon={<UserSecretFill className={'text-sm text-slate-600 sm:text-base'} />}
                          type='text'
                          value={employeeData.names}
                          onChange={value => {
                            setEmployeeData(prevData => ({
                              ...prevData,
                              names: value,
                            }));
                          }}
                          placeholder='Juan Carlos'
                          errorMessage='Por favor ingresa el/los nombre(s).'
                        />
                      </div>
                      <div className='w-full'>
                        <InputWithValidation
                          label='Apellido(s)'
                          icon={<UserSecretFill className={'text-sm text-slate-600 sm:text-base'} />}
                          type='text'
                          value={employeeData.lastnames}
                          onChange={value => {
                            setEmployeeData(prevData => ({
                              ...prevData,
                              lastnames: value,
                            }));
                          }}
                          placeholder='Bodoque Bodoque'
                          errorMessage='Por favor ingresa el/los apellido(s).'
                        />
                      </div>
                    </div>
                    <div className='block w-full justify-center gap-4 md:flex'>
                      <div className='w-full'>
                        <InputWithValidation
                          label='R.U.T'
                          icon={<IdCardFill className={'text-sm text-slate-600 sm:text-base'} />}
                          type='text'
                          value={employeeData.rut}
                          onChange={value => {
                            setEmployeeData(prevData => ({
                              ...prevData,
                              rut: value,
                            }));
                          }}
                          placeholder='10123456-3'
                          validationType={'rut'}
                          error={submit && TYPES_ERRORS_INPUT.RUT === inputError}
                          errorMessage='Formato de RUT incorrecta y/o inválido.'
                          tooltip={'El formato de rut debe ser 12345678-9'}
                        />
                      </div>
                      <div className='w-full'>
                        <InputWithValidation
                          label='E-Mail'
                          icon={<EmailFill className={'text-sm text-slate-600 sm:text-base'} />}
                          type='email'
                          value={employeeData.email}
                          onChange={value => {
                            setEmployeeData(prevData => ({
                              ...prevData,
                              email: value,
                            }));
                          }}
                          placeholder='juancarlosbodoque@correo.cl'
                          validationType={'email'}
                          error={submit && TYPES_ERRORS_INPUT.Email === inputError}
                          errorMessage='Por favor ingresa un correo válido.'
                        />
                      </div>
                    </div>
                    <div className='block w-full justify-center gap-4 md:flex'>
                      <div className='w-full'>
                        <InputWithValidation
                          label='Usuario'
                          icon={<UserFill className={'text-sm text-slate-600 sm:text-base'} />}
                          type='text'
                          value={employeeData.username}
                          onChange={value => {
                            setEmployeeData(prevData => ({
                              ...prevData,
                              username: value,
                            }));
                          }}
                          placeholder='JcBodoque'
                          error={submit && TYPES_ERRORS_INPUT.Username === inputError}
                          errorMessage='Por favor ingresa un nombre de usuario valido.'
                        />
                      </div>
                      <div className='w-full'>
                        <InputWithValidation
                          label='Contraseña'
                          icon={<PadlockFill className={'text-sm text-slate-600 sm:text-base'} />}
                          type='password'
                          value={employeeData.emp_password}
                          onChange={value => {
                            setEmployeeData(prevData => ({
                              ...prevData,
                              emp_password: value,
                            }));
                          }}
                          placeholder='Contraseña'
                          validationType={'password'}
                          error={submit && TYPES_ERRORS_INPUT.Password === inputError}
                          errorMessage='La contraseña no cumple con el formato de seguridad.'
                          tooltip={
                            'El formato de contraseña debe ser 6-10 caracteres, contener al menos: 1 mayúscula, 1 minúscula, 1 número.'
                          }
                        />
                      </div>
                    </div>
                    <div
                      className={`${
                        userRut === employee.rut ? 'hidden' : 'block md:flex md:justify-center'
                      } w-full  gap-4`}>
                      <div className='w-full'>
                        <label className='mb-2 block text-xs font-medium text-slate-600 sm:text-sm'>Permisos</label>
                        <InputAutocomplete
                          options={roles.map(role => role.description)}
                          onSelect={handleRoleSelect}
                          placeholder='Seleccionar permisos'
                          value={roleSelectedString}
                        />
                      </div>
                      <div className='w-full'>
                        <label className='mb-2 block text-xs font-medium text-slate-600 sm:text-sm'>Estado</label>
                        <InputAutocomplete
                          options={statuses.map(status => status.description)}
                          onSelect={handleStatusSelect}
                          placeholder='Seleccionar permisos'
                          value={statusSelectedString}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Error message */}
                  {formOk != null ? (
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
                               bg-slate-200 px-2 py-1 text-xs font-medium text-gray-900 transition-colors duration-300
                               hover:bg-slate-300 sm:text-sm md:text-base'
                      onClick={() => handleToggleModal(true)}>
                      Cancelar
                    </button>
                    <button
                      type='submit'
                      disabled={isLoading}
                      className='w-20 rounded-lg border border-pink-700
                               bg-pink-600 px-2 py-1 text-xs font-medium text-slate-100 transition-colors duration-300
										           hover:bg-pink-700 disabled:border-gray-500 disabled:bg-gray-400 sm:text-sm md:text-base'>
                      Guardar
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
    </>
  );
};

export default ModalEditEmployee;
