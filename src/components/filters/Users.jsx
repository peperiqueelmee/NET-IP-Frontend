import Grow from '@mui/material/Grow';
import { useState } from 'react';
import { SearchFill } from '../../assets/icons';
import { useAction } from '../../hooks';

const Users = () => {
	const [selectedButton, setSelectedButton] = useState('');
	const { selectedAction } = useAction();

	const modalCreateEmployee = () => {
		document.getElementById('createEmployee').click();
	};
	const handleButtonClick = (buttonName) => {
		setSelectedButton(buttonName);
	};

	return (
		<>
			<Grow
				in={selectedAction === 5}
				timeout={500}>
				<div className={`pb-14 ${selectedAction === 5 ? 'block' : 'hidden'} `}>
					{/* Container */}
					<div
						className='bg-gradient-to-r from-cyan-950 via-blue-950 to-cyan-950 
									w-full opacity-90 rounded-none flex justify-center py-1 px-1 gap-1 lg:gap-5 flex-col lg:flex-row'>
						{/* User Management */}
						<div className='border border-lime-400 rounded-lg flex flex-col items-center justify-evenly py-2 px-4 text-xs lg:text-sm gap-y-1 font-medium'>
							<div className='text-lime-400'>Gestión cuentas de usuario</div>
							<button
								onClick={() => {
									modalCreateEmployee();
									handleButtonClick('button1');
								}}
								className={`bg-gray-200 text-zinc-700 rounded-2xl px-4 py-1 
								            text-xs lg:text-sm shadow hover:shadow-lime-400 w-10/12 sm:w-6/12 lg:w-32
											${selectedButton === 'button1' ? 'bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600' : ''}`}>
								Crear Usuario
							</button>
						</div>
						{/* List of user accounts */}
						<div className='border border-lime-400 rounded-lg flex flex-col items-center justify-evenly py-2 px-4 text-xs lg:text-sm gap-y-1 font-medium'>
							<div className='text-lime-400'>Listado cuentas de usuario</div>
							<div className='flex gap-2 flex-col lg:flex-row w-10/12 sm:w-6/12 lg:w-auto'>
								<button
									onClick={() => handleButtonClick('button2')}
									className={`bg-gray-200 text-zinc-700 rounded-2xl px-4 py-1
											    text-xs lg:text-sm shadow hover:shadow-lime-400 w-full lg:w-32
												${selectedButton === 'button2' ? 'bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600' : ''}`}>
									Listar todos
								</button>
								<div className='flex justify-center gap-1'>
									<button
										onClick={() => handleButtonClick('button3')}
										className={`bg-gray-200 text-zinc-700 rounded-2xl px-4 py-1 
													text-xs lg:text-sm shadow hover:shadow-lime-400 w-full lg:w-32
													${selectedButton === 'button3' ? 'bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600' : ''}`}>
										Listar activos
									</button>
									<button
										onClick={() => handleButtonClick('button4')}
										className={`bg-gray-200 text-zinc-700 rounded-2xl px-4 py-1 
													text-xs lg:text-sm shadow hover:shadow-lime-400 w-full lg:w-32
													${selectedButton === 'button4' ? 'bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600' : ''}`}>
										Listar inactivos
									</button>
								</div>
							</div>
						</div>
						{/* Search by rut */}
						<div className='border border-lime-400 rounded-lg flex flex-col items-center justify-evenly py-2 px-4 text-xs lg:text-sm gap-y-1 font-medium'>
							<div className='text-lime-400'>Búsqueda por RUT</div>
							<div className='flex items-center'>
								<input
									onClick={() => handleButtonClick('button5')}
									className='rounded-l-2xl pl-4 text-xs lg:text-sm h-6 outline-none focus:border focus:border-lime-400 text-zinc-500'
									type='text'
									placeholder='Ingresa RUT de usuario'
								/>
								<div
									onClick={() => handleButtonClick('button5')}
									className={`bg-gray-200 rounded-r-2xl h-6 w-9 flex items-center justify-center cursor-pointer 
												shadow hover:shadow-lime-400 
												${selectedButton === 'button5' ? 'bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600' : ''}`}>
									<SearchFill />
								</div>
							</div>
						</div>
					</div>
				</div>
			</Grow>
		</>
	);
};

export default Users;
