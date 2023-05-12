import { usePhone } from '../../../hooks';

const PhonesResultsTable = ({ phones, totalResults }) => {
	const { page, updatePage, hasMore } = usePhone();

	const handleScroll = () => {
		const element = document.getElementById('phone-table');
		const tolerance = 1;

		if (hasMore && element.scrollHeight <= element.offsetHeight + element.scrollTop + tolerance) {
			setTimeout(() => {
				updatePage(page + 1);
			}, 50);
		}
	};

	return (
		<>
			<div
				className='hidden lg:block relative overflow-y-auto shadow-md flip-in-hor-top '
				onScroll={handleScroll}
				id='phone-table'
				style={{ height: '70vh' }}>
				{phones && phones.length > 0 ? (
					<div>
						<table className='w-full text-center text-gray-500'>
							<thead className='text-xs text-gray-700 bg-gradient-to-r from-gray-200 via-zinc-200 to-neutral-200 border-b-2 border-zinc-300 sticky top-0 opacity-95'>
								<tr>
									<th
										scope='col'
										className='px-1 py-1'>
										Nº
									</th>
									<th
										scope='col'
										className='px-5 py-1'>
										Número Telefónico
									</th>
									<th
										scope='col'
										className='px-5 py-1'>
										Cliente
									</th>
									<th
										scope='col'
										className='px-5 py-1'>
										RUT
									</th>
									<th
										scope='col'
										className='px-5 py-1'>
										Dirección
									</th>

									<th
										scope='col'
										className='px-5 py-1'>
										Estado
									</th>
								</tr>
							</thead>
							<tbody>
								{phones.map((phone, index) => (
									<tr
										key={phone.id}
										className={`odd:bg-white even:bg-slate-100 border-b text-xs xl:text-sm text-center`}>
										<td className='px-2'>{index + 1}</td>
										<td className='px-5 border-x'>+{phone.phone_number}</td>
										<td className='px-5 border-x'>{phone.client.fullName}</td>
										<td className='px-1 border-x'>{phone.client.rut}</td>
										<td className={`px-6 border-x`}>{phone.client.address}</td>
										<td
											className={`px-4 py-4 border-x font-medium 
										${phone.status_id === 1 ? 'text-emerald-500' : 'text-red-600'}`}>
											{phone.status.description}
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<div className='text-slate-200 bg-stone-950 text-sm text-center py-1 bg-opacity-70 tracking-wide font-medium sticky bottom-0'>
							Mostrando <span className='font-bold text-blue-400'>{phones.length}</span> de{' '}
							<span className='font-bold text-blue-500 '>{totalResults}</span>{' '}
							{phones.length === 1 ? 'resultado' : 'resultados'}.
						</div>
					</div>
				) : (
					<div className='flex justify-center text-red-500 bg-stone-950 font-medium bg-opacity-70 text-sm tracking-wide'>
						<p>No se encontraron resultados.</p>
					</div>
				)}
			</div>
		</>
	);
};

export default PhonesResultsTable;
