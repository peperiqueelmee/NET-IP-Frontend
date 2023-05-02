import { useEffect } from 'react';

import { ExitDoorFill, HelpBuoyFill, UserFill } from '../assets/icons';
import { Actions, ModalLogout, Users, ModalCreateEmployee, Phones } from '../components';

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
				<div className='flex items-center justify-between pt-10 flex-col md:flex-row'>
					<p className='text-white font-semibold tracking-wider text-sm md:text-xl xl:text-2xl text-shadow focus-in-expand'>
						Sistema de Gestión de Anexos <span className='text-lime-400'>NET</span>{' '}
						<span className='text-slate-900'>IP</span>
					</p>

					{/* Buttons: Username, Help, Sing off */}
					<div className='sm:flex gap-3 flex-row md:flex-col lg:flex-row mt-6 md:mt-0 hidden'>
						<div className='border-2 border-lime-500 px-4 py-1 rounded-full text-white bg-gradient-to-r from-zinc-600 to-zinc-700 cursor-pointer text-xs md:text-sm tracking-wide shadow-md hover:bg-gradient-to-r hover:from-zinc-700 hover:to-zinc-800'>
							<div className='flex items-center gap-1'>
								<UserFill className='text-xs lg:text-sm text-lime-400' />
								<span className='flex w-full justify-center'>{username}@usuario</span>
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
						<span className='text-xs text-slate-200'>{username}@usuario</span>
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
