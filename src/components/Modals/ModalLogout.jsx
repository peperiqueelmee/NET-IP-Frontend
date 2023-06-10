import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ModalLogout = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleToggleModal = shouldClose => {
    setOpen(!shouldClose);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
    setOpen(false);
  };

  return (
    <div>
      <button
        id='singOff'
        className='text-xs text-white sm:text-base'
        onClick={() => handleToggleModal(false)}></button>
      {open && (
        <div
          className='fade-in fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50'
          onClick={() => handleToggleModal(true)}>
          <div className='scale-in-top mx-2 flex w-96 flex-col items-center rounded-lg border border-lime-400 bg-white bg-opacity-90 p-4'>
            <h2 className='mb-4 text-base font-medium'>¿Estás seguro de cerrar sesión?</h2>
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

export default ModalLogout;
