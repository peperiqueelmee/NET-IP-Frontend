import Grow from '@mui/material/Grow';
import { useEffect, useState } from 'react';
import { SearchFill } from '../../assets/icons';
import axiosClient from '../../config/axios';
import { useAction, usePhone } from '../../hooks';
import { InfoTooltip, PhonesResultsCards, PhonesResultsTable, Spinner } from '../index.js';

const Phones = () => {
	const { page, updatePage, updateHasMore } = usePhone();
	const { selectedAction, selectedActionPhones, handleActionSelectPhones } = useAction();
	const [phones, setPhones] = useState([]);
	const [phone, setPhone] = useState('');
	const [isLoading, setLoading] = useState(null);
	const [totalPhones, setTotalPhones] = useState(null);

	useEffect(() => {
		handleSelectedActionPhones();
	}, [page]);
	useEffect(() => {
		resetPhones();
	}, [selectedAction]);
	useEffect(() => {
		if (selectedActionPhones === 1 || selectedActionPhones === 2 || selectedActionPhones === 3) {
			cleanPaginationPhones();
		}
	}, [selectedActionPhones]);

	// Handles.
	const handleSelectedActionPhones = async () => {
		switch (selectedActionPhones) {
			case 1:
				await getAllPhones();
				break;
			case 2:
				await getPhonesByStatus(1);
				break;
			case 3:
				await getPhonesByStatus(3);
				break;
			default:
				break;
		}
	};
	const handleButtonClick = (index) => {
		handleActionSelectPhones(index);
	};
	const handleListAllPhones = async () => {
		setLoading(true);
		try {
			const url = `/phone`;
			const { data } = await axiosClient(url);
			setPhones(data.data);
			setTotalPhones(data.total);
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};
	const handleListPhoneByNumber = async (e) => {
		if (!e) {
			return;
		}
		e.preventDefault();
		setLoading(true);
		try {
			const url = `/phone/56${phone}`;
			const { data } = await axiosClient(url);
			setPhones(data.data);
			setTotalPhones(data.total);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setPhones('');
		}
	};
	const handleLisPhonesByStatus = async (status) => {
		setLoading(true);
		try {
			const url = `/phone/status/${status}`;
			const { data } = await axiosClient(url);
			setPhones(data.data);
			setTotalPhones(data.total);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setPhones('');
		}
	};

	// Pagination.
	const getAllPhones = async () => {
		if (phones.length === totalPhones) {
			return updateHasMore(false);
		}
		try {
			const url = `/phone?page=${page}`;
			const { data } = await axiosClient(url);
			setPhones([...phones, ...data.data]);
			if (phones.length === totalPhones) {
				updateHasMore(false);
			}
		} catch (error) {
			updateHasMore(false);
		}
	};
	const getPhonesByStatus = async (status) => {
		if (phones.length === totalPhones) {
			return updateHasMore(false);
		}
		try {
			const url = `/phone/status/${status}?page=${page}`;
			const { data } = await axiosClient(url);
			setPhones([...phones, ...data.data]);
		} catch (error) {
			updateHasMore(false);
		}
	};

	// Functions.
	const resetPhones = () => {
		handleActionSelectPhones(null);
		setPhones(null);
		setPhone('');
		updateHasMore(true);
		updatePage(1);
	};
	const cleanPaginationPhones = () => {
		updatePage(1);
		updateHasMore(true);
		setPhones([]);
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
										handleButtonClick(1);
									}}
									className={`bg-gray-200 rounded-2xl px-4 py-1
														text-xs xl:text-sm shadow hover:shadow-lime-400 w-full lg:w-32
														${
															selectedActionPhones === 1
																? 'bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 text-white'
																: 'text-zinc-700 '
														}`}>
									Todos
								</button>
								<div className='flex justify-center gap-1'>
									<button
										onClick={() => {
											handleLisPhonesByStatus(1);
											handleButtonClick(2);
										}}
										className={`bg-gray-200 rounded-2xl px-4 py-1 
															text-xs xl:text-sm shadow hover:shadow-lime-400 w-full lg:w-32
															${
																selectedActionPhones === 2
																	? 'bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 text-white'
																	: 'text-zinc-700 '
															}`}>
										Activos
									</button>
									<button
										onClick={() => {
											handleLisPhonesByStatus(3);
											handleButtonClick(3);
										}}
										className={`bg-gray-200 rounded-2xl px-4 py-1 
															text-xs xl:text-sm shadow hover:shadow-lime-400 w-full lg:w-32
															${
																selectedActionPhones === 3
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
								className='flex items-center text-xs xl:text-sm w-9/12 sm:w-6/12 lg:w-auto'>
								<div className='text-zinc-200 mr-1'>+56</div>
								<input
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									onClick={() => handleButtonClick(4)}
									className='rounded-l-2xl pl-4 text-xs xl:text-sm h-6 outline-none focus:border focus:border-lime-400 text-zinc-500 w-full'
									type='text'
									placeholder='Teléfono de cliente'
								/>
								<button
									type='submit'
									onClick={() => {
										handleListPhoneByNumber();
										handleButtonClick(4);
									}}
									className={`bg-gray-200 rounded-r-2xl h-6 w-9 flex items-center justify-center cursor-pointer 
												shadow hover:shadow-lime-400 
												${
													selectedActionPhones === 4
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
					{phones !== null && isLoading === false && (
						<PhonesResultsTable
							phones={phones}
							totalResults={totalPhones}
						/>
					)}
					{phones !== null && isLoading === false && (
						<PhonesResultsCards
							phones={phones}
							totalResults={totalPhones}
						/>
					)}
				</div>
			</Grow>
		</>
	);
};

export default Phones;
