import { Link } from 'react-router-dom';

import { Actions, ActiveNumberFilter,BlockNumberFilter } from '../components';
import { UserFill, HelpBuoyFill, ExitDoorFill } from '../assets/icons';

const Home = () => {
	return (
		<div className='h-screen home-page'>
			<div className='container mx-auto px-10'>
				<div className='flex items-center justify-between pt-10 flex-col md:flex-row'>
					<p className='text-white font-semibold tracking-wider text-sm md:text-xl xl:text-2xl text-shadow focus-in-expand'>
						Sistema de Gestión de Anexos <span className='text-lime-400'>NET</span>{' '}
						<span className='text-slate-900'>IP</span>
					</p>

					{/* Buttons: Username, Help, Sing off */}
					<div className='sm:flex gap-3 flex-row md:flex-col lg:flex-row mt-6 md:mt-0 hidden'>
						<div className='border-2 border-lime-500 px-4 py-1 rounded-full text-white bg-gradient-to-r from-zinc-600 to-zinc-700 cursor-pointer text-xs md:text-sm tracking-wide shadow-md hover:bg-gradient-to-r hover:from-zinc-700 hover:to-zinc-800'>
							<div className='flex items-center gap-1'>
								<UserFill className='text-sm md:text-base text-lime-400' />
								<span className='flex w-full justify-center'>nombre@Usuario</span>
							</div>
						</div>
						<div className='border-2 border-lime-500 px-4 py-1 rounded-full text-white bg-gradient-to-r from-zinc-600 to-zinc-700 cursor-pointer text-xs md:text-sm tracking-wide shadow-md hover:bg-gradient-to-r hover:from-zinc-700 hover:to-zinc-800'>
							<div className='flex items-center gap-1'>
								<HelpBuoyFill className='text-sm md:text-base text-lime-400' />
								<span className='flex w-full justify-center'>Ayuda</span>
							</div>
						</div>
						<div className='border-2 border-lime-500 px-4 py-1 rounded-full text-white bg-gradient-to-r from-zinc-600 to-zinc-700 cursor-pointer text-xs md:text-sm tracking-wide shadow-md hover:bg-gradient-to-r hover:from-zinc-700 hover:to-zinc-800'>
							<Link
								to='/'
								className='flex items-center gap-1'>
								<ExitDoorFill className='text-sm md:text-base text-lime-400' />
								<span className='flex w-full justify-center'>Cerrar Sesión</span>
							</Link>
						</div>
					</div>
				</div>

				{/*  Actions */}
				<div className='block'>
					<Actions />
					<ActiveNumberFilter />
					<BlockNumberFilter />
				</div>
			</div>

			{/* RESPONSIVE components less than 1024px */}

			{/* Buttons: Username, Help, Sing off */}
			<div className='block sm:hidden fixed inset-x-0 bottom-0 z-40 bg-gradient-to-r from-lime-600 to-green-600 rounded-t-full px-10 shadow-inner w-full md:hidden'>
				<div className='flex justify-between items-center h-12'>
					<div className='flex flex-col justify-center items-center'>
						<UserFill className='text-base  text-white' />
						<span className='text-xs text-slate-200'>nombre@usuario</span>
					</div>
					<div className='flex flex-col justify-center items-center'>
						<HelpBuoyFill className='text-base  text-white' />
						<span className='text-xs text-slate-200'>Ayuda</span>
					</div>
					<Link
						to='/'
						className='flex flex-col justify-center items-center'>
						<ExitDoorFill className='text-base text-white' />
						<span className='text-xs text-slate-200'>Cerrar Sesión</span>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Home;
