import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ModalLogout = () => {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	const handleToggleModal = (shouldClose) => {
		setOpen(!shouldClose);
	};

	const handleLogout = () => {
		localStorage.clear();
		navigate('/');
		setOpen(false);
	};

	return (
		<div>
			<button
				id='singOff'
				className='text-xs sm:text-base text-white'
				onClick={() => handleToggleModal(false)}></button>
			{open && (
				<div
					className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'
					onClick={() => handleToggleModal(true)}>
					<div className='bg-white rounded-lg w-96 p-4 flex flex-col items-center border border-lime-400 bg-opacity-90 mx-2'>
						<h2 className='text-base font-medium mb-4'>¿Estás seguro de cerrar sesión?</h2>
						<div className='flex space-x-4'>
							<button
								className='bg-slate-200 hover:bg-slate-300 transition-colors duration-300
                                         text-gray-900 rounded-lg px-2 py-1 text-sm md:text-base border'
								onClick={() => handleToggleModal(true)}>
								Cancelar
							</button>
							<button
								className='bg-pink-600 hover:bg-pink-700 transition-colors duration-300
                                         text-slate-100 rounded-lg px-2 py-1 text-sm md:text-base'
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
