import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExitDoorFill, HelpBuoyFill, UserFill } from '../assets/icons';
import { Actions, ModalCreateEmployee, ModalEditEmployee, ModalLogout, Phones, Title, Users } from '../components';
import { useEmployee } from '../hooks';
import axiosClient from '../config/axios';

const Home = () => {
	const { handleEmployeeSelect } = useEmployee();

	const token = localStorage.getItem('token');
	const username = localStorage.getItem('username');
	const userRut = localStorage.getItem('rut');

	const navigate = useNavigate();

	useEffect(() => {
		if (!token) {
			navigate('/');
		}
	}, []);

	const getEmployee = async (rutEmployee) => {
		try {
			const url = `/employee/employees/${rutEmployee}`;
			const { data } = await axiosClient(url);
			return data.data[0];
		} catch (error) {
			console.log(error);
		}
	};
	const modalLogout = () => {
		document.getElementById('singOff').click();
	};
	const modalEditEmployee = async (e, rutEmployee) => {
		e.preventDefault();
		const employee = await getEmployee(rutEmployee);
		handleEmployeeSelect(employee);
		document.getElementById('editEmployee').click();
	};

	return (
		<div className='home-page  h-screen overflow-y-auto'>
			<div className={`container mx-auto px-3 sm:px-6 md:px-10 `}>
				<div className='flex flex-col items-center justify-between pt-10 lg:flex-row'>
					{/* Tittle */}
					<Title titleIsExpand={true} />
					{/* Buttons: Username, Help, Sing off */}
					<div className='mb-6 mt-6 hidden flex-row gap-3 sm:flex lg:mt-0 lg:flex-row'>
						<div
							className='cursor-pointer rounded-full border-2 border-lime-500 bg-gradient-to-r from-zinc-600 
									   via-zinc-700 to-zinc-800 px-4 py-1 text-xs
									   tracking-wide text-gray-200 shadow-md hover:bg-gradient-to-r 
									   hover:from-zinc-700 hover:via-zinc-800 hover:to-zinc-900 md:text-sm'
							onClick={(e) => modalEditEmployee(e, userRut)}>
							<div className='flex items-center gap-1'>
								<UserFill className='text-xs text-lime-400 lg:text-sm' />
								<span className='flex w-full justify-center'>{username}</span>
							</div>
						</div>
						<div
							className='cursor-pointer rounded-full border-2 border-lime-500 bg-gradient-to-r from-zinc-600 
									   via-zinc-700 to-zinc-800 px-4 py-1 text-xs
									   tracking-wide text-gray-200 shadow-md hover:bg-gradient-to-r 
									   hover:from-zinc-700 hover:via-zinc-800 hover:to-zinc-900 md:text-sm'>
							<div className='flex items-center gap-1'>
								<HelpBuoyFill className='text-xs text-lime-400 lg:text-sm' />
								<span className='flex w-full justify-center'>Ayuda</span>
							</div>
						</div>
						<div
							className='cursor-pointer rounded-full border-2 border-lime-500 bg-gradient-to-r from-zinc-600 
									   via-zinc-700 to-zinc-800 px-4 py-1 text-xs
									   tracking-wide text-gray-200 shadow-md hover:bg-gradient-to-r 
									   hover:from-zinc-700 hover:via-zinc-800 hover:to-zinc-900 md:text-sm'
							onClick={modalLogout}>
							<div className='flex items-center gap-1'>
								<ExitDoorFill className='text-xs text-lime-400 lg:text-sm' />
								<span className='flex w-full justify-center'>Cerrar sesión</span>
							</div>
						</div>
					</div>
				</div>
				{/*  Actions */}
				<div className='block'>
					<Actions />
					<Phones />
					<Users />
				</div>
			</div>

			{/* RESPONSIVE components less than 1024px */}
			{/* Buttons: Username, Help, Sing off */}
			<div className='fixed inset-x-0 bottom-0 z-40 block w-full rounded-t-full bg-gradient-to-r from-lime-600 to-green-600 px-10 shadow-inner sm:hidden md:hidden'>
				<div className='flex h-12 items-center justify-between'>
					<div
						className='flex cursor-pointer flex-col items-center justify-center'
						onClick={(e) => modalEditEmployee(e, userRut)}>
						<UserFill className='text-base  text-white' />
						<span className='text-xs text-slate-200'>{username}</span>
					</div>
					<div className='flex cursor-pointer flex-col items-center justify-center'>
						<HelpBuoyFill className='text-base  text-white' />
						<span className='text-xs text-slate-200'>Ayuda</span>
					</div>
					<div
						className='flex cursor-pointer flex-col items-center justify-center'
						onClick={modalLogout}>
						<ExitDoorFill className='text-base text-white' />
						<span className='text-xs text-slate-200'>Cerrar sesión</span>
					</div>
				</div>
			</div>
			{/* Modals */}
			<ModalLogout />
			<ModalCreateEmployee />
			<ModalEditEmployee />
		</div>
	);
};

export default Home;
