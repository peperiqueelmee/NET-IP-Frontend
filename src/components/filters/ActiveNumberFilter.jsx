import { useMediaQuery } from 'react-responsive';
import Grow from '@mui/material/Grow';

import ResultsTableActiveNumbers from '../resultsTable/ResultsTableActiveNumbers';
import ResultsTableBActiveNumbersResponsive from '../resultsTable/ResultsTableBActiveNumbersResponsive';
import { SearchFill } from '../../assets/icons';
import { useAction } from '../../hooks';

const ActiveNumberFilter = () => {
	const { selectedAction } = useAction();
	const isSmallScreen = useMediaQuery({ maxWidth: 900 });

	return (
		<>
			<Grow
				in={selectedAction === 0}
				timeout={500}>
				<div className={`pb-14 ${selectedAction === 0 ? 'block' : 'hidden'} `}>
					<div className='bg-gradient-to-r from-gray-300  via-gray-400 to-gray-500 w-full rounded-none'>
						<div className='flex py-5 px-5 lg:justify-between flex-wrap justify-center gap-1 lg:gap-0'>
							<div className='flex gap-4 lg:gap-8 flex-wrap justify-center'>
								{/* Filter by all numbers */}
								<button
									className={`${
										isSmallScreen ? 'w-full' : ''
									} bg-gray-200 text-zinc-700 rounded-2xl px-4 py-1 text-xs lg:text-sm font-medium shadow hover:shadow-lime-400 active:bg-gradient-to-r from-lime-500 to-lime-600 active:text-slate-100`}>
									Listar todos los números activos
								</button>

								{/* Filter by number */}
								<div className='flex items-center'>
									<label className='text-xs lg:text-sm font-medium'>
										<span className='text-red-600'>+</span>56
									</label>
									<input
										type='text'
										className='ml-1 rounded-l-2xl h-full outline-none pl-4 w-28 lg:w-40  text-xs lg:text-sm focus:border focus:border-lime-400 hover:border border-lime-400 shadow-md'
									/>
									<button className='bg-gray-200 text-zinc-700 rounded-r-2xl px-3 py-1 text-sm font-medium shadow hover:shadow-lime-400 active:bg-gradient-to-r from-lime-500 to-lime-600 active:text-slate-100'>
										<div
											className={`${
												isSmallScreen ? 'w-full' : ''
											} flex items-center gap-2 w-full`}>
											<SearchFill />
											<span className='text-xs lg:text-sm hidden sm:block'>
												Buscar número activo
											</span>
										</div>
									</button>
								</div>
							</div>

							{/*  Generate report */}
							<button
								className={`{ ${
									isSmallScreen ? 'w-full mt-2' : 'mt-0'
								} bg-rose-500 text-zinc-200 rounded-2xl px-4 py-1 text-xs lg:text-sm font-medium shadow hover:shadow-rose-400 active:bg-gradient-to-r from-rose-200 to-rose-300 active:text-slate-700`}>
								Generar reporte
							</button>
						</div>
					</div>
					<ResultsTableActiveNumbers />
					<ResultsTableBActiveNumbersResponsive />
				</div>
			</Grow>
		</>
	);
};

export default ActiveNumberFilter;
