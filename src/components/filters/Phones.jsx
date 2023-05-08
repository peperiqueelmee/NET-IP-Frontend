import Grow from '@mui/material/Grow';
import { useEffect, useState } from 'react';
import { SearchFill } from '../../assets/icons';
import axiosClient from '../../config/axios';
import { useAction } from '../../hooks';
import { InfoTooltip, PhonesResultsCards, PhonesResultsTable, Spinner } from '../index.js';

const Phones = () => {
	const { selectedAction } = useAction();
	const [selectedButton, setSelectedButton] = useState('');
	const [isLoading, setLoading] = useState(null);
	const [phones, setPhones] = useState(null);
	const [phone, setPhone] = useState('');

	// Clear options selected.
	useEffect(() => {
		setSelectedButton('');
		setPhones(null);
		setPhone('');
	}, [selectedAction]);
	// Handles
	const handleButtonClick = (buttonName) => {
		setSelectedButton(buttonName);
	};
	const handleListAllPhones = async () => {
		setLoading(true);
		try {
			const url = `/phone`;
			const { data } = await axiosClient(url);
			setPhones(data.data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};
	const handleListPhoneByNumber = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const url = `/phone/56${phone}`;
			const { data } = await axiosClient(url);
			setPhones(data.data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setPhones('');
			console.log(error);
		}
	};
	const handleLisPhonesByStatus = async (status) => {
		setLoading(true);
		try {
			const url = `/phone/status/${status}`;
			const { data } = await axiosClient(url);
			setPhones(data.data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setPhones('');
			console.log(error);
		}
	};

	return (
		<>
			<Grow
				in={selectedAction === 0}
				timeout={500}>
				<div className={`pb-14 ${selectedAction === 0 ? 'block' : 'hidden'}`}>
					{/* Container */}
					<div
						className='bg-gradient-to-r from-cyan-950 via-blue-950 to-cyan-950 
									w-full opacity-90 rounded-none flex justify-center py-1.5 px-1 gap-1 lg:gap-5 flex-col lg:flex-row'>
						{/* List of user accounts */}
						<div className='border border-lime-400 rounded-lg flex flex-col items-center justify-evenly py-2 px-4 text-xs xl:text-sm gap-y-1 font-medium'>
							<div className='text-lime-400'>Listado de números telefónicos</div>
							<div className='flex gap-2 flex-col lg:flex-row w-9/12 sm:w-6/12 lg:w-auto'>
								<button
									onClick={() => {
										handleListAllPhones();
										handleButtonClick('button1');
									}}
									className={`bg-gray-200 rounded-2xl px-4 py-1
														text-xs xl:text-sm shadow hover:shadow-lime-400 w-full lg:w-32
														${
															selectedButton === 'button1'
																? 'bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 text-white'
																: 'text-zinc-700 '
														}`}>
									Todos
								</button>
								<div className='flex justify-center gap-1'>
									<button
										onClick={() => {
											handleLisPhonesByStatus(1);
											handleButtonClick('button2');
										}}
										className={`bg-gray-200 rounded-2xl px-4 py-1 
															text-xs xl:text-sm shadow hover:shadow-lime-400 w-full lg:w-32
															${
																selectedButton === 'button2'
																	? 'bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 text-white'
																	: 'text-zinc-700 '
															}`}>
										Activos
									</button>
									<button
										onClick={() => {
											handleLisPhonesByStatus(3);
											handleButtonClick('button3');
										}}
										className={`bg-gray-200 rounded-2xl px-4 py-1 
															text-xs xl:text-sm shadow hover:shadow-lime-400 w-full lg:w-32
															${
																selectedButton === 'button3'
																	? 'bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 text-white'
																	: 'text-zinc-700'
															}`}>
										Bloqueados
									</button>
								</div>
							</div>
						</div>
						{/* Search by Phone */}
						<div className='border border-lime-400 rounded-lg flex flex-col items-center justify-evenly py-2 px-4 text-xs xl:text-sm gap-y-1 font-medium'>
							<div className='flex items-center gap-1'>
								<div className='text-lime-400'>Búsqueda por Número</div>
								<div style={{ marginTop: '3px' }}>
									<InfoTooltip info={'Ingresa solo los 9 dígitos.'} />
								</div>
							</div>
							<form
								onSubmit={handleListPhoneByNumber}
								className='flex items-center text-xs xl:text-sm'>
								<div className='text-zinc-200 mr-1'>+56</div>
								<input
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									onClick={() => handleButtonClick('button4')}
									className='rounded-l-2xl pl-4 text-xs xl:text-sm h-6 outline-none focus:border focus:border-lime-400 text-zinc-500'
									type='text'
									placeholder='Teléfono de cliente'
								/>
								<button
									type='submit'
									onClick={() => {
										handleListPhoneByNumber();
										handleButtonClick('button4');
									}}
									className={`bg-gray-200 rounded-r-2xl h-6 w-9 flex items-center justify-center cursor-pointer 
												shadow hover:shadow-lime-400 
												${
													selectedButton === 'button4'
														? 'bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 text-white'
														: 'text-zinc-700'
												}`}>
									<SearchFill />
								</button>
							</form>
						</div>
						{/* User Management */}
						<div className='border border-lime-400 rounded-lg flex flex-col items-center justify-evenly py-2 px-4 text-xs xl:text-sm gap-y-1 font-medium'>
							<div className='text-lime-400'>Generación de Reportes</div>
							<button
								className={`bg-gray-200 text-zinc-200 rounded-2xl px-4 py-1 
								            text-xs xl:text-sm shadow hover:shadow-red-400 w-9/12 sm:w-6/12 lg:w-40
										    bg-gradient-to-r from-red-400 via-red-500 to-red-600`}>
								Generar Reporte
							</button>
						</div>
					</div>
					{/* Spinner */}
					{isLoading && (
						<div className='bg-black h-12 flex items-center justify-center opacity-70'>
							<Spinner />
						</div>
					)}
					{/* Results employees table */}
					{phones !== null && isLoading === false && <PhonesResultsTable phones={phones} />}
					{phones !== null && isLoading === false && <PhonesResultsCards phones={phones} />}
				</div>
			</Grow>
		</>
	);
};

export default Phones;
