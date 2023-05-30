import { useEffect, useState } from 'react';
import { InformativeMessage, InputAutocomplete, InputWithValidation, Spinner } from '..';
import { LabFill, PadlockFill, PhoneFill } from '../../assets/icons';
import axiosClient from '../../config/axios';
import { useAction, useAxios } from '../../hooks';
import { RESPONSE_SERVER } from '../../utils/utils';

const ModalCreateIntercom = () => {
  //Request.
  const { makeRequest } = useAxios();
  // User experience.
  const [isLoading, setIsLoading] = useState(null);
  const { setSelectActionUsers } = useAction();
  const [message, setMessage] = useState('');
  // Data form.
  const [restrictionsTypes, setRestrictionsTypes] = useState(
    () => JSON.parse(localStorage.getItem('restrictions')) || []
  );
  const [transportTypes, setTransportTypes] = useState(() => JSON.parse(localStorage.getItem('transport_types')) || []);
  const [extensionsByDepartment, setExtensionsByDepartment] = useState([]);
  // Data user.
  const [intercomNumber, setIntercomNumber] = useState('');
  const [password, setPassword] = useState('');
  const [restrictionId, setRestrictionId] = useState(null);
  const [restrictionSelectedString, setRestrictionSelectedString] = useState('');
  const [transportTypeId, setTransportTypeId] = useState(null);
  const [transportTypeSelectedString, setTransportTypeSelectedString] = useState('');
  const [extensionByDepartmentSelectedString, setExtensionByDepartmentSelectedString] = useState('');
  const [intercomCaller, setIntercomCaller] = useState(null);
  // Validations.
  const formIsFull =
    intercomNumber && password && restrictionId && transportTypeId && (restrictionId !== 2 || intercomCaller);

  const [extensionHasBeenCreated, setExtensionHasBeenCreated] = useState(null);
  const [inputAnexHasError, setInputAnexHasError] = useState(false);
  const [inputPasswordHasError, setInputPasswordHasError] = useState(false);
  // Event.
  const [submit, setSubmit] = useState(false);
  // Toggle modal.
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function getExtensionsByDepartment() {
      try {
        const url = '/regular_anex/by-department/active';
        const { data } = await makeRequest(url);
        setExtensionsByDepartment(data);
      } catch (error) {
        console.log(error);
      }
    }
    async function getDepartments() {
      if (!restrictionsTypes.length) {
        try {
          const url = '/restrictions';
          const { data } = await makeRequest(url);
          localStorage.setItem('restrictions', JSON.stringify(data));
          setRestrictionsTypes(data);
        } catch (error) {
          console.log(error);
        }
      }
    }
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
    getExtensionsByDepartment();
  }, [open]);

  // Handles.
  const handleToggleModal = shouldClose => {
    setOpen(!shouldClose);
    clearForm();
  };
  const handleDepartmentSelect = departmentSelected => {
    setRestrictionSelectedString(departmentSelected);
    const selectedObject = restrictionsTypes.find(({ description }) => description === departmentSelected);
    if (!selectedObject) {
      setRestrictionId(null);
      return;
    }
    setRestrictionId(selectedObject.id);
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
  const handleExtensionByDepartmentSelect = extensionByDepartmentSelected => {
    setExtensionByDepartmentSelectedString(extensionByDepartmentSelected);
    if (!extensionByDepartmentSelected) {
      return setIntercomCaller(null);
    }
    const extensionNumber = parseInt(extensionByDepartmentSelected.match(/\d+/)[0]);
    setIntercomCaller(extensionNumber);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    actionsAfterSubmit();

    try {
      const url = '/intercom/create';
      const intercomData = {
        intercomNumber,
        password,
        transportTypeId,
        restrictionId,
        intercomCaller,
      };
      await axiosClient.post(url, intercomData);
      setIsLoading(null);
      setMessage('¡El intercomunicador ha sido creado exitosamente!');
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
    setIntercomNumber('');
    setPassword('');
    setTransportTypeId(null);
    setRestrictionId(null);
    setRestrictionSelectedString('');
    setTransportTypeSelectedString('');
    setExtensionByDepartmentSelectedString('');
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
        id='create-Intercom'
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
                  <h2 className='text-xl font-bold text-slate-700 md:text-2xl'>Crear Intercomunicador</h2>
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
                          label='Numero de intercomunicador'
                          required={true}
                          icon={<PhoneFill className={'text-sm text-slate-600 sm:text-base'} />}
                          type='text'
                          value={intercomNumber}
                          onChange={setIntercomNumber}
                          placeholder='20000'
                          validationType={'intercom'}
                          error={submit && inputAnexHasError ? true : false}
                          errorMessage='Por favor ingresa un intercomunicador correcto.'
                          tooltip={'El número intercomunicador debe encontrarse en el rango de 20000 a 29999.'}
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
                          Restricción
                          <span className='text-red-500'>*</span>
                        </label>
                        <InputAutocomplete
                          options={restrictionsTypes.map(department => department.description)}
                          onSelect={handleDepartmentSelect}
                          placeholder='Seleccionar restricción'
                          value={restrictionSelectedString}
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
                    {restrictionId === 2 && (
                      <div className='w-full'>
                        <label className='mb-2 block text-xs font-medium text-slate-600 sm:text-sm'>
                          Número restringido
                          <span className='text-red-500'>*</span>
                        </label>
                        <InputAutocomplete
                          options={extensionsByDepartment.map(
                            extensionByDepartment => extensionByDepartment.department.department_anex
                          )}
                          onSelect={handleExtensionByDepartmentSelect}
                          placeholder='Seleccionar anexo'
                          value={extensionByDepartmentSelectedString}
                        />
                      </div>
                    )}
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

export default ModalCreateIntercom;
