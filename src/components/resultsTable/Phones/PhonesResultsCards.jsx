import { usePhone } from '../../../hooks';
import { Badge } from '../../index.js';

const PhonesResultsCards = ({ phones }) => {
	const { page, updatePage, hasMore } = usePhone();

	const handleScroll = () => {
		const element = document.getElementById('phone-card');
		if (hasMore && Math.ceil(element.scrollTop) + element.clientHeight >= element.scrollHeight) {
			updatePage(page + 1);
		}
	};
	return (
		<>
			<div className='lg:hidden block'>
				{phones && phones.length > 0 ? (
					<div
						className='overflow-y-auto'
						style={{ height: '50vh' }}
						onScroll={handleScroll}
						id='phone-card'>
						{phones.map((phone, index) => (
							<div
								key={phone.id}
								className='flex bg-gradient-to-r from-gray-50 to-slate-100 mt-2 text-xs rounded-lg py-2 px-2 shadow-2xl gap-5 border-2 border-lime-100 relative'>
								{/*  Badge */}
								<Badge index={index + 1} />
								{/* Content */}
								<div className='flex flex-col gap-1 tracking-wide w-full ml-3 mt-2'>
									<div className='flex w-full'>
										<div className='w-1/3 sm:w-1/2 font-bold text-gray-700'>Nro. Telefónico:</div>
										<div className='w-1/2'>+{phone.phone_number}</div>
									</div>
									<div className='flex w-full'>
										<div className='w-1/3 sm:w-1/2 font-bold text-gray-700'>Cliente:</div>
										<div className='w-1/2'>{phone.client.fullName}</div>
									</div>
									<div className='flex w-full'>
										<div className='w-1/3 sm:w-1/2 font-bold text-gray-700'>RUT:</div>
										<div className='w-1/2'>{phone.client.rut}</div>
									</div>
									<div className='flex w-full'>
										<div className='w-1/3 sm:w-1/2 font-bold text-gray-700'>Dirección:</div>
										<div className='w-1/2'>{phone.client.address}</div>
									</div>
									<div className='flex w-full'>
										<div className='w-1/3 sm:w-1/2 font-bold text-gray-700'>Estado:</div>
										<div
											className={`font-medium text-emerald-600 w-1/2
													${phone.status_id === 1 ? 'text-emerald-500' : 'text-red-600'}`}>
											{phone.status.description}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className='flex justify-center text-red-500 bg-stone-950 font-medium bg-opacity-70 text-xs tracking-wide'>
						<p>No se encontraron resultados.</p>
					</div>
				)}
			</div>
		</>
	);
};

export default PhonesResultsCards;
