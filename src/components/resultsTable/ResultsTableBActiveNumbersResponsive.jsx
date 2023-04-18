import Badge from '../Badge';

const ResultsTableBActiveNumbersResponsive = () => {
	return (
		<>
			<div
				className='sm:hidden block'
				style={{ height: '50vh', overflowY: 'scroll' }}>
				{/* Card */}
				<div className='flex bg-gradient-to-r from-gray-50 to-slate-100 mt-2 text-xs rounded-lg py-2 px-2 shadow-2xl gap-5 border-2 border-lime-100 relative'>
					{/*  Badge */}
					<Badge index={1} />
					{/* Content */}
					<div className='flex flex-col gap-1 tracking-wide w-full ml-3 mt-2'>
						<div className='flex w-full'>
							<div className='w-1/2 font-bold text-gray-700'>Número:</div>
							<div className='w-1/2'>+56912345678</div>
						</div>
						<div className='flex w-full'>
							<div className='w-1/2 font-bold text-gray-700'>Cliente:</div>
							<div className='w-1/2'>José Riquelme Aravena</div>
						</div>
						<div className='flex w-full'>
							<div className='w-1/2 font-bold text-gray-700'>Rut/Pasaporte:</div>
							<div className='w-1/2'>18.323.323-3</div>
						</div>
						<div className='flex w-full'>
							<div className='w-1/2 font-bold text-gray-700'>Dirección:</div>
							<div className='w-1/2'>Calle prueba #234 Viña del Mar</div>
						</div>
						<div className='flex w-full'>
							<div className='w-1/2 font-bold text-gray-700'>Estado:</div>
							<div className='font-medium text-emerald-600 w-1/2'>Activo</div>
						</div>
					</div>
				</div>

				{/* Card */}
				<div className='flex bg-gradient-to-r from-gray-50 to-green-50 mt-2 text-xs rounded-lg py-2 px-2 shadow-2xl gap-5 border-2 border-lime-100 relative'>
					{/*  Badge */}
					<Badge index={2} />
					{/* Content */}
					<div className='flex flex-col gap-1 tracking-wide w-full ml-3 mt-2'>
						<div className='flex w-full'>
							<div className='w-1/2 font-bold text-gray-700'>Número:</div>
							<div className='w-1/2'>+56912345678</div>
						</div>
						<div className='flex w-full'>
							<div className='w-1/2 font-bold text-gray-700'>Cliente:</div>
							<div className='w-1/2'>José Riquelme Aravena</div>
						</div>
						<div className='flex w-full'>
							<div className='w-1/2 font-bold text-gray-700'>Rut/Pasaporte:</div>
							<div className='w-1/2'>18.323.323-3</div>
						</div>
						<div className='flex w-full'>
							<div className='w-1/2 font-bold text-gray-700'>Dirección:</div>
							<div className='w-1/2'>Calle prueba #234 Viña del Mar</div>
						</div>
						<div className='flex w-full'>
							<div className='w-1/2 font-bold text-gray-700'>Estado:</div>
							<div className='font-medium text-emerald-600 w-1/2'>Activo</div>
						</div>
					</div>
				</div>
				{/* Card */}
				<div className='flex bg-gradient-to-r from-gray-50 to-slate-100 mt-2 text-xs rounded-lg py-2 px-2 shadow-2xl gap-5 border-2 border-lime-100 relative'>
					{/*  Badge */}
					<Badge index={3} />
					{/* Content */}
					<div className='flex flex-col gap-1 tracking-wide w-full ml-3 mt-2'>
						<div className='flex w-full'>
							<div className='w-1/2 font-bold text-gray-700'>Número:</div>
							<div className='w-1/2'>+56912345678</div>
						</div>
						<div className='flex w-full'>
							<div className='w-1/2 font-bold text-gray-700'>Cliente:</div>
							<div className='w-1/2'>José Riquelme Aravena</div>
						</div>
						<div className='flex w-full'>
							<div className='w-1/2 font-bold text-gray-700'>Rut/Pasaporte:</div>
							<div className='w-1/2'>18.323.323-3</div>
						</div>
						<div className='flex w-full'>
							<div className='w-1/2 font-bold text-gray-700'>Dirección:</div>
							<div className='w-1/2'>Calle prueba #234 Viña del Mar</div>
						</div>
						<div className='flex w-full'>
							<div className='w-1/2 font-bold text-gray-700'>Estado:</div>
							<div className='font-medium text-emerald-600 w-1/2'>Activo</div>
						</div>
					</div>
				</div>
				{/* Card */}
				<div className='flex bg-gradient-to-r from-gray-50 to-green-50 mt-2 text-xs rounded-lg py-2 px-2 shadow-2xl gap-5 border-2 border-lime-100 relative'>
					{/*  Badge */}
					<Badge index={4} />
					{/* Content */}
					<div className='flex flex-col gap-1 tracking-wide w-full ml-3 mt-2'>
						<div className='flex w-full'>
							<div className='w-1/2 font-bold text-gray-700'>Número:</div>
							<div className='w-1/2'>+56912345678</div>
						</div>
						<div className='flex w-full'>
							<div className='w-1/2 font-bold text-gray-700'>Cliente:</div>
							<div className='w-1/2'>José Riquelme Aravena</div>
						</div>
						<div className='flex w-full'>
							<div className='w-1/2 font-bold text-gray-700'>Rut/Pasaporte:</div>
							<div className='w-1/2'>18.323.323-3</div>
						</div>
						<div className='flex w-full'>
							<div className='w-1/2 font-bold text-gray-700'>Dirección:</div>
							<div className='w-1/2'>Calle prueba #234 Viña del Mar</div>
						</div>
						<div className='flex w-full'>
							<div className='w-1/2 font-bold text-gray-700'>Estado:</div>
							<div className='font-medium text-emerald-600 w-1/2'>Activo</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ResultsTableBActiveNumbersResponsive;
