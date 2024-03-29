import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { InformativeMessage, InputAutocomplete, InputWithValidation, Spinner } from '..';
import { LabFill, PadlockFill, PhoneFill } from '../../assets/icons';
import axiosClient from '../../config/axios';
import { useAction, useAxios } from '../../hooks';
import { RESPONSE_SERVER, LOG_EVENTS } from '../../utils/utils';

const ModalCreateTroncal = () => {
  //Request.
  const { makeRequest } = useAxios();
  // User experience.
  const [isLoading, setIsLoading] = useState(null);
  const { setSelectActionUsers } = useAction();
  const [message, setMessage] = useState('');
  // Data form.
  const [transportTypes, setTransportTypes] = useState(() => JSON.parse(localStorage.getItem('transport_types')) || []);
  // Data extension.
  const [troncalNumber, setTroncalNumber] = useState('');
  const [transportTypeId, setTransportTypeId] = useState(null);
  const [transportTypeSelectedString, setTransportTypeSelectedString] = useState('');
  //Data user.
  const { id } = useSelector(state => state.authentication);
  // Validations.
  const formIsFull = troncalNumber && transportTypeId;
  const [troncalHasBeenCreated, setTroncalHasBeenCreated] = useState(null);
  const [inputTroncalHasError, setInputTroncalHasError] = useState(false);
  // Event.
  const [submit, setSubmit] = useState(false);
  // Toggle modal.
  const [open, setOpen] = useState(false);

  useEffect(() => {
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
    getTransportTypes();
  }, []);

  // Handles.
  const handleToggleModal = shouldClose => {
    setOpen(!shouldClose);
    clearForm();
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
      //Create extension.
      const url = '/troncal/create';
      const troncalData = {
        number: troncalNumber,
        transportTypeId,
      };
      await axiosClient.post(url, troncalData);
      // Log.
      await axiosClient.post('/log/create', {
        logDescription: `Ha creado el troncal ${troncalNumber}`,
        employeeId: id,
        eventId: LOG_EVENTS.Create,
      });
      setIsLoading(null);
      setMessage('¡El troncal ha sido creado exitosamente!');
      setTroncalHasBeenCreated(true);
    } catch (error) {
      setIsLoading(null);
      setTroncalHasBeenCreated(false);
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
    setTroncalHasBeenCreated(null);
  };
  const actionsAfterSubmit = () => {
    // User experience.
    setIsLoading(true);
    setMessage('');
    // Validations.
    setInputTroncalHasError(false);
    setTroncalHasBeenCreated(null);
    // Event
    setSubmit(true);
  };
  const clearForm = async () => {
    // User Experience.
    setMessage('');
    // Data user.
    setTroncalNumber('');
    setTransportTypeId(null);
    setTransportTypeSelectedString('');
    // Validations.
    setTroncalHasBeenCreated(null);
    setSelectActionUsers(null);
    setInputTroncalHasError(false);
  };
  const markInputWithError = inputType => {
    const inputMap = {
      Troncal: setInputTroncalHasError,
    };
    const setInputError = inputMap[inputType];
    setInputError?.(true);
  };

  return (
    <div>
      <button
        id='create-Troncal'
        className='text-xs text-white sm:text-base'
        onClick={() => handleToggleModal(false)}></button>
      {open && (
        <div className='fade-in scroll-bar-secondary fixed inset-0 z-10 flex items-center justify-center overflow-x-auto bg-black bg-opacity-50 px-0 sm:px-20 lg:px-40 xl:px-72'>
          <div
            className={`scale-in-center mx-5 mb-5 mt-60 flex w-full  flex-col  items-center overflow-auto rounded-lg border border-lime-400 bg-slate-200 bg-opacity-90 py-5 sm:mt-52 sm:w-11/12 lg:mt-10 lg:w-10/12 2xl:w-8/12`}>
            {/* Success or error message */}
            {troncalHasBeenCreated != null ? (
              <div className='flex w-full justify-center px-3'>
                <InformativeMessage
                  message={message}
                  hasError={!troncalHasBeenCreated}
                  hasSuccessful={troncalHasBeenCreated}
                />
              </div>
            ) : null}
            {/* Form */}
            {!troncalHasBeenCreated ? (
              <>
                {/* Title */}
                <div className='mt-2 flex items-center gap-2'>
                  <h2 className='text-xl font-bold text-slate-700 md:text-2xl'>Crear Troncal</h2>
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
                          label='Numero de troncal'
                          required={true}
                          icon={<PhoneFill className={'text-sm text-slate-600 sm:text-base'} />}
                          type='text'
                          value={troncalNumber}
                          onChange={setTroncalNumber}
                          placeholder='10000'
                          validationType={'troncal'}
                          error={submit && inputTroncalHasError ? true : false}
                          errorMessage='Por favor ingresa un troncal correcto.'
                          tooltip={'El número troncal debe encontrarse en el rango de 10000 a 19999.'}
                        />
                      </div>
                      <div className='w-full mt-2'>
                        <label className='mb-4 block text-xs font-medium text-slate-600 sm:text-sm'>
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
                  {troncalHasBeenCreated != null ? (
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

export default ModalCreateTroncal;
