import { useEffect } from 'react';

import { ExitDoorFill, HelpBuoyFill, UserFill } from '../assets/icons';
import { Actions, ModalLogout, Users, ModalCreateEmployee, Phones } from '../components';
import Logo from '../assets/Logo/Logo';

const Home = () => {
	const token = localStorage.getItem('token');
	const username = localStorage.getItem('username');

	useEffect(() => {
		if (!token) {
			navigate('/');
		}
	}, []);

	const logout = () => {
		document.getElementById('singOff').click();
	};

	return (
		<div className='h-screen  home-page overflow-y-auto'>
			<div className={`container mx-auto px-6 md:px-10 `}>
				<div className='flex items-center justify-between pt-10 flex-col lg:flex-row'>
					{/* Tittle */}
					<div className='text-white font-semibold tracking-wider text-lg md:text-xl xl:text-2xl text-shadow focus-in-expand flex gap-2 items-center flex-col sm:flex-row'>
						<Logo className={'sm:w-9 xl:w-10 hidden sm:block'} />
						<div className='flex gap-1 flex-col items-center sm:flex-row'>
							<div className='flex gap-2'>
								<div className='block sm:hidden'>
									<Logo className={'w-7'} />
								</div>
								<div>Sistema de Gestión de Anexos</div>
							</div>
							<div className='flex gap-2 items-center'>
								<span className='text-lime-400'>NET</span> <span className='text-slate-900'>IP</span>
							</div>
						</div>
					</div>

					{/* Buttons: Username, Help, Sing off */}
					<div className='sm:flex gap-3 flex-row lg:flex-row mt-6 lg:mt-0 hidden'>
						<div className='border-2 border-lime-500 px-4 py-1 rounded-full text-white bg-gradient-to-r from-zinc-600 to-zinc-700 cursor-pointer text-xs md:text-sm tracking-wide shadow-md hover:bg-gradient-to-r hover:from-zinc-700 hover:to-zinc-800'>
							<div className='flex items-center gap-1'>
								<UserFill className='text-xs lg:text-sm text-lime-400' />
								<span className='flex w-full justify-center'>{username}</span>
							</div>
						</div>
						<div className='border-2 border-lime-500 px-4 py-1 rounded-full text-white bg-gradient-to-r from-zinc-600 to-zinc-700 cursor-pointer text-xs md:text-sm tracking-wide shadow-md hover:bg-gradient-to-r hover:from-zinc-700 hover:to-zinc-800'>
							<div className='flex items-center gap-1'>
								<HelpBuoyFill className='text-xs lg:text-sm text-lime-400' />
								<span className='flex w-full justify-center'>Ayuda</span>
							</div>
						</div>
						<div className='border-2 border-lime-500 px-4 py-1 rounded-full text-white bg-gradient-to-r from-zinc-600 to-zinc-700 cursor-pointer text-xs md:text-sm tracking-wide shadow-md hover:bg-gradient-to-r hover:from-zinc-700 hover:to-zinc-800'>
							<div
								className='flex items-center gap-1'
								onClick={logout}>
								<ExitDoorFill className='text-xs lg:text-sm text-lime-400' />
								<span className='flex w-full justify-center'>Cerrar sesión</span>
							</div>
						</div>
					</div>
				</div>
				{/*  Actions */}
				<div className='block'>
					<Actions />
					<Users />
					<Phones />
				</div>
			</div>

			{/* RESPONSIVE components less than 1024px */}
			{/* Buttons: Username, Help, Sing off */}
			<div className='block sm:hidden fixed inset-x-0 bottom-0 z-40 bg-gradient-to-r from-lime-600 to-green-600 rounded-t-full px-10 shadow-inner w-full md:hidden'>
				<div className='flex justify-between items-center h-12'>
					<div className='flex flex-col justify-center items-center cursor-pointer'>
						<UserFill className='text-base  text-white' />
						<span className='text-xs text-slate-200'>{username}</span>
					</div>
					<div className='flex flex-col justify-center items-center cursor-pointer'>
						<HelpBuoyFill className='text-base  text-white' />
						<span className='text-xs text-slate-200'>Ayuda</span>
					</div>
					<div
						className='flex flex-col justify-center items-center cursor-pointer'
						onClick={logout}>
						<ExitDoorFill className='text-base text-white' />
						<span className='text-xs text-slate-200'>Cerrar sesión</span>
					</div>
				</div>
			</div>
			<ModalLogout />
			<ModalCreateEmployee />
		</div>
	);
};

export default Home;
