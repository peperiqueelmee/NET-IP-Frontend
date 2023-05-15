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

	const thereAreUserPhones = Array.isArray(phones) && phones.length > 0;

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
	const handleGenerateReport = () => {
		document.getElementById('generate-report').click();
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
						className='flex w-full flex-col justify-center 
									gap-1 rounded-none bg-gradient-to-r from-cyan-950 via-blue-950 to-cyan-950 px-1 py-1.5 opacity-90 lg:flex-row lg:gap-5'>
						{/* List of user accounts */}
						<div className='flex flex-col items-center justify-evenly gap-y-1 rounded-lg border border-lime-400 px-4 py-2 text-xs font-medium xl:text-sm'>
							<div className='text-lime-400'>Listado de números telefónicos</div>
							<div className='flex w-9/12 flex-col gap-2 sm:w-6/12 lg:w-auto lg:flex-row'>
								<button
									onClick={() => {
										handleListAllPhones();
										handleButtonClick(1);
									}}
									className={`w-full rounded-2xl bg-gray-200 px-4
														py-1 text-xs shadow hover:shadow-lime-400 lg:w-32 xl:text-sm
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
										className={`w-full rounded-2xl bg-gray-200 px-4 
															py-1 text-xs shadow hover:shadow-lime-400 lg:w-32 xl:text-sm
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
										className={`w-full rounded-2xl bg-gray-200 px-4 
															py-1 text-xs shadow hover:shadow-lime-400 lg:w-32 xl:text-sm
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
						<div className='flex flex-col items-center justify-evenly gap-y-1 rounded-lg border border-lime-400 px-4 py-2 text-xs font-medium xl:text-sm'>
							<div className='flex items-center gap-1'>
								<div className='text-lime-400'>Búsqueda por Número</div>
								<div style={{ marginTop: '3px' }}>
									<InfoTooltip info={'Ingresa solo los 9 dígitos.'} />
								</div>
							</div>
							<form
								onSubmit={handleListPhoneByNumber}
								className='flex w-9/12 items-center text-xs sm:w-6/12 lg:w-auto xl:text-sm'>
								<div className='mr-1 text-zinc-200'>+56</div>
								<input
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									onClick={() => handleButtonClick(4)}
									className='h-6 w-full rounded-l-2xl pl-4 text-xs text-zinc-500 outline-none focus:border focus:border-lime-400 xl:text-sm'
									type='text'
									placeholder='Teléfono de cliente'
								/>
								<button
									type='submit'
									onClick={() => {
										handleListPhoneByNumber();
										handleButtonClick(4);
									}}
									className={`flex h-6 w-9 cursor-pointer items-center justify-center rounded-r-2xl bg-gray-200 
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
						<div className='flex flex-col items-center justify-evenly gap-y-1 rounded-lg border border-lime-400 px-4 py-2 text-xs font-medium xl:text-sm'>
							<div className='text-lime-400'>Generación de Reportes</div>
							<button
								disabled={!thereAreUserPhones}
								onClick={handleGenerateReport}
								className={`${thereAreUserPhones ? 'pulsate-fwd' : ''} w-9/12 rounded-2xl bg-gradient-to-r
								            from-indigo-600 via-indigo-700 to-indigo-700 px-4 py-1 text-xs 
											text-zinc-200 shadow hover:shadow-indigo-500  disabled:from-gray-400 
											disabled:via-gray-500 disabled:to-gray-600 disabled:shadow-none
											sm:w-6/12  lg:w-40 xl:text-sm`}>
								Generar Reporte
							</button>
						</div>
					</div>
					{/* Spinner */}
					{isLoading && (
						<div className='flex h-12 items-center justify-center bg-black opacity-70'>
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
