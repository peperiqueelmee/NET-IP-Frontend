import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateResults, deleteResult, updateInfoChangeStatus } from '../../features';
import { useAction, useAxios } from '../../hooks';
import { APPLICATION_STATES } from '../../utils/utils';

const ModalChangeStatusAnexe = () => {
  const [open, setOpen] = useState(false);
  const { id, type, number, statusId, urlUpdate } = useSelector(state => state.changeStatus);
  const { selectedActionUsers } = useAction();
  const { makeRequest } = useAxios();
  const dispatch = useDispatch();

  const handleToggleModal = shouldClose => {
    setOpen(!shouldClose);
  };

  const handleLogout = async () => {
    const url = urlUpdate + id;
    await makeRequest(url, null, 'PUT');

    if (selectedActionUsers === 3 || selectedActionUsers === 4) {
      dispatch(deleteResult({ number }));
    } else {
      dispatch(updateResults({ number }));
    }

    dispatch(
      updateInfoChangeStatus({
        id: null,
        type: null,
        number: null,
        statusId: null,
        urlUpdate: null,
      })
    );
  };

  return (
    <div>
      <button
        id='change-status'
        className='text-xs text-white sm:text-base'
        onClick={() => handleToggleModal(false)}></button>
      {open && (
        <div
          className='fade-in fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50'
          onClick={() => handleToggleModal(true)}>
          <div className='scale-in-top mx-2 flex w-96 flex-col items-center rounded-lg border border-lime-400 bg-white bg-opacity-90 p-4'>
            <h2 className='mb-4 text-base font-medium'>
              ¿Estás seguro de{' '}
              <span className={`${statusId === APPLICATION_STATES.Active ? 'text-red-600' : 'text-green-600'}`}>
                {statusId === APPLICATION_STATES.Active ? 'bloquear' : 'activar'}{' '}
              </span>{' '}
              el {type} {number}?
            </h2>
            <div className='flex space-x-4'>
              <button
                className='rounded-lg border bg-slate-200 px-2
                           py-1 text-sm text-gray-900 transition-colors duration-300 hover:bg-slate-300 md:text-base'
                onClick={() => handleToggleModal(true)}>
                Cancelar
              </button>
              <button
                className='rounded-lg bg-pink-600 px-2 py-1
                           text-sm text-slate-100 transition-colors duration-300 hover:bg-pink-700 md:text-base'
                onClick={handleLogout}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalChangeStatusAnexe;
