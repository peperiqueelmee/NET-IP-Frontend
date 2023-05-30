import { useEffect, useState } from 'react';
import { InformativeMessage, InputAutocomplete, InputWithValidation, Spinner } from '..';
import { LabFill, PadlockFill, PhoneFill } from '../../assets/icons';
import axiosClient from '../../config/axios';
import { useAction, useAxios } from '../../hooks';
import { RESPONSE_SERVER } from '../../utils/utils';

const ModalCreateExtension = () => {
  //Request.
  const { makeRequest } = useAxios();
  // User experience.
  const [isLoading, setIsLoading] = useState(null);
  const { setSelectActionUsers } = useAction();
  const [message, setMessage] = useState('');
  // Data form.
  const [departments, setDepartments] = useState(() => JSON.parse(localStorage.getItem('departments')) || []);
  const [transportTypes, setTransportTypes] = useState(() => JSON.parse(localStorage.getItem('transport_types')) || []);
  // Data user.
  const [extensionNumber, setExtensionNumber] = useState('');
  const [password, setPassword] = useState('');
  const [departmentId, setDepartmentId] = useState(null);
  const [departmentSelectedString, setDepartmentSelectedString] = useState('');
  const [transportTypeId, setTransportTypeId] = useState(null);
  const [transportTypeSelectedString, setTransportTypeSelectedString] = useState('');
  // Validations.
  const formIsFull = extensionNumber && password && departmentId && transportTypeId;
  const [extensionHasBeenCreated, setExtensionHasBeenCreated] = useState(null);
  const [inputAnexHasError, setInputAnexHasError] = useState(false);
  const [inputPasswordHasError, setInputPasswordHasError] = useState(false);
  // Event.
  const [submit, setSubmit] = useState(false);
  // Toggle modal.
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Get departments.
    async function getDepartments() {
      if (!departments.length) {
        try {
          const url = '/departments';
          const { data } = await makeRequest(url);
          localStorage.setItem('departments', JSON.stringify(data));
          setDepartments(data);
        } catch (error) {
          console.log(error);
        }
      }
    }
    // Get transport types.
    async function getTransportTypes() {
      if (!transportTypes.length) {
        try {
          const url = '/transport_types';
          const { data } = await makeRequest(url);
          localStorage.setItem('transport_types', JSON.stringify(data));
          setTransportTypes(data);
        } catch (error) {
          console.log(error);
        }
      }
    }
    getDepartments();
    getTransportTypes();
  }, []);

  // Handles.
  const handleToggleModal = shouldClose => {
    setOpen(!shouldClose);
    clearForm();
  };
  const handleDepartmentSelect = departmentSelected => {
    setDepartmentSelectedString(departmentSelected);
    const selectedObject = departments.find(({ description }) => description === departmentSelected);
    if (!selectedObject) {
      setDepartmentId(null);
      return;
    }
    setDepartmentId(selectedObject.id);
  };
  const handleTransportTypeSelect = transportTypeSelected => {
    setTransportTypeSelectedString(transportTypeSelected);
    const selectedObject = transportTypes.find(({ description }) => description === transportTypeSelected);
    if (!selectedObject) {
      setTransportTypeId(null);
      return;
    }
    setTransportTypeId(selectedObject.id);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    actionsAfterSubmit();

    try {
      // Create employee.
      const url = '/regular_anex/create';
      const extensionData = {
        anexNumber: extensionNumber,
        password,
        transportType: transportTypeId,
        department: departmentId,
      };
      await axiosClient.post(url, extensionData);
      setIsLoading(null);
      setMessage('¡El anexo ha sido creado exitosamente!');
      setExtensionHasBeenCreated(true);
    } catch (error) {
      setIsLoading(null);
      setExtensionHasBeenCreated(false);
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
    setExtensionHasBeenCreated(null);
  };
  const actionsAfterSubmit = () => {
    // User experience.
    setIsLoading(true);
    setMessage('');
    // Validations.
    setInputAnexHasError(false);
    setInputPasswordHasError(false);
    setExtensionHasBeenCreated(null);
    // Event
    setSubmit(true);
  };
  const clearForm = async () => {
    // User Experience.
    setMessage('');
    // Data user.
    setExtensionNumber('');
    setPassword('');
    setTransportTypeId(null);
    setDepartmentId(null);
    setDepartmentSelectedString('');
    setTransportTypeSelectedString('');
    // Validations.
    setExtensionHasBeenCreated(null);
    setSelectActionUsers(null);
    setInputAnexHasError(false);
    setInputPasswordHasError(false);
  };
  const markInputWithError = inputType => {
    const inputMap = {
      Anex: setInputAnexHasError,
      Password: setInputPasswordHasError,
    };
    const setInputError = inputMap[inputType];
    setInputError?.(true);
  };

  return (
    <div>
      <button
        id='create-Anexo'
        className='text-xs text-white sm:text-base'
        onClick={() => handleToggleModal(false)}></button>
      {open && (
        <div className='fade-in fixed inset-0 z-10 flex items-center justify-center overflow-x-auto bg-black bg-opacity-50 px-0 sm:px-20 lg:px-40 xl:px-72 scroll-bar-secondary'>
          <div
            className={`scale-in-center mx-5 mb-5 mt-60 flex w-full  flex-col  items-center overflow-auto rounded-lg border border-lime-400 bg-slate-200 bg-opacity-90 py-5 sm:mt-52 sm:w-11/12 lg:mt-10 lg:w-10/12 2xl:w-8/12`}>
            {/* Success or error message */}
            {extensionHasBeenCreated != null ? (
              <div className='flex w-full justify-center px-3'>
                <InformativeMessage
                  message={message}
                  hasError={!extensionHasBeenCreated}
                  hasSuccessful={extensionHasBeenCreated}
                />
              </div>
            ) : null}
            {/* Form */}
            {!extensionHasBeenCreated ? (
              <>
                {/* Title */}
                <div className='mt-2 flex items-center gap-2'>
                  <h2 className='text-xl font-bold text-slate-700 md:text-2xl'>Crear Anexo</h2>
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
                          label='Numero de anexo'
                          required={true}
                          icon={<PhoneFill className={'text-sm text-slate-600 sm:text-base'} />}
                          type='text'
                          value={extensionNumber}
                          onChange={setExtensionNumber}
                          placeholder='1001'
                          validationType={'extension'}
                          error={submit && inputAnexHasError ? true : false}
                          errorMessage='Por favor ingresa un anexo correcto.'
                          tooltip={'El número anexo debe encontrarse en el rango de 1001 a 9999.'}
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
                    <div className='block w-full justify-center gap-4 md:flex'>
                      <div className='w-full'>
                        <label className='mb-2 block text-xs font-medium text-slate-600 sm:text-sm'>
                          Departamento
                          <span className='text-red-500'>*</span>
                        </label>
                        <InputAutocomplete
                          options={departments.map(department => department.description)}
                          onSelect={handleDepartmentSelect}
                          placeholder='Seleccionar departamento'
                          value={departmentSelectedString}
                        />
                      </div>
                      <div className='w-full'>
                        <label className='mb-2 block text-xs font-medium text-slate-600 sm:text-sm'>
                          Tipo de transporte
                          <span className='text-red-500'>*</span>
                        </label>
                        <InputAutocomplete
                          options={transportTypes.map(transportType => transportType.description)}
                          onSelect={handleTransportTypeSelect}
                          placeholder='Seleccionar transporte'
                          value={transportTypeSelectedString}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Error message */}
                  {extensionHasBeenCreated != null ? (
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

export default ModalCreateExtension;
