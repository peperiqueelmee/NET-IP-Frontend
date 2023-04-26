import Grow from '@mui/material/Grow';
import { useMediaQuery } from 'react-responsive';

import { SearchFill } from '../../assets/icons';
import { useAction } from '../../hooks';

const Users = () => {
	const { selectedAction } = useAction();
	const isSmallScreen = useMediaQuery({ maxWidth: 900 });

	const modalCreateEmployee = () => {
		document.getElementById('createEmployee').click();
	};

	return (
		<>
			<Grow
				in={selectedAction === 5}
				timeout={500}>
				<div className={`pb-14 ${selectedAction === 5 ? 'block' : 'hidden'} `}>
					<div
						className='bg-slate-800 2xl:bg-gradient-to-r 2xl:from-cyan-950  2xl:via-blue-950 2xl:to-cyan-950 w-full opacity-90 rounded-none'>
						<div className='flex gap-1 p-1 2xl:py-2 2xl:gap-8 flex-wrap justify-center'>
							{/* Options */}
							{/* Employee Management */}
							<div className='w-full 2xl:w-2/12 xl:justify-start gap-2 bg-sky-950 flex justify-center items-center rounded-lg py-2 flex-col bg-opacity-75 border border-lime-400'>
								<div className='text-center text-xs text-lime-400 font-medium'>
									Gestión cuentas de usuario
								</div>
								<button
									onClick={modalCreateEmployee}
									className={`bg-gray-200 text-zinc-700 rounded-2xl px-4 py-1 text-xs lg:text-sm font-medium shadow
                                                    hover:shadow-lime-400 active:bg-gradient-to-r from-lime-500 to-lime-600 active:text-slate-100 w-3/4`}>
									Crear Usuario
								</button>
							</div>
							{/* Employee lists */}
							<div className='w-full 2xl:w-5/12 2xl:justify-start  gap-2 bg-sky-950 flex justify-center items-center rounded-lg py-2  px-2 flex-col bg-opacity-75 border border-lime-400'>
								<div className='text-center text-xs text-lime-400 font-medium'>
									Listado cuentas de usuario
								</div>
								<div className='flex flex-col w-full gap-2 2xl:flex-row'>
									<button
										className={`bg-gray-200 text-zinc-700 rounded-2xl px-4 py-1 text-xs lg:text-sm font-medium shadow
                                                    hover:shadow-lime-400 active:bg-gradient-to-r from-lime-500 to-lime-600 active:text-slate-100 w-full 2xl:w-7/12`}>
										Listar todos los usuarios
									</button>
									<div className='flex w-full gap-2'>
										<button
											className={`bg-gray-200 text-zinc-700 rounded-2xl px-2 py-1 text-xs lg:text-sm font-medium shadow
                                                    hover:shadow-lime-400 active:bg-gradient-to-r from-lime-500 to-lime-600 active:text-slate-100 w-3/4 2xl:w-6/12`}>
											Usuarios activos
										</button>
										<button
											className={`bg-gray-200 text-zinc-700 rounded-2xl px-2 py-1 text-xs lg:text-sm font-medium shadow
                                                    hover:shadow-lime-400 active:bg-gradient-to-r from-lime-500 to-lime-600 active:text-slate-100 w-3/4 2xl:w-6/12`}>
											Usuarios inactivos
										</button>
									</div>
								</div>
							</div>
							{/* Search employee by RUT */}
							<div className='w-full 2xl:w-2/12 2xl:justify-start gap-2 bg-sky-950 flex justify-center items-center rounded-lg py-2 flex-col bg-opacity-75 border border-lime-400'>
								<div className='text-center text-xs text-lime-400 font-medium'>Búsqueda por RUT</div>

								<div className='flex items-center'>
									<input
										type='text'
										placeholder='Ingrese RUT de usuario'
										className='ml-1 rounded-l-2xl h-full outline-none pl-4   
                                                      text-xs lg:text-sm focus:border focus:border-lime-400 hover:border border-lime-400 shadow-md'
									/>
									<button className='bg-gray-200 text-zinc-700 rounded-r-2xl px-3 py-1 text-sm font-medium shadow hover:shadow-lime-400 active:bg-gradient-to-r from-lime-500 to-lime-600 active:text-slate-100'>
										<div
											className={`${
												isSmallScreen ? 'w-full' : ''
											} flex items-center gap-2 w-full`}>
											<SearchFill />
										</div>
									</button>
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
