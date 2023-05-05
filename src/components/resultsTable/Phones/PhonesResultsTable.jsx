const PhonesResultsTable = ({ phones }) => {
	return (
		<>
			<div
				className=' lg:block relative overflow-y-auto shadow-md'
				style={{ height: '70vh' }}>
				{phones && phones.length > 0 ? (
					<table className='w-full text-center text-gray-500'>
						<thead className='text-xs text-gray-700 bg-gray-200 border-b-2 border-gray-300'>
							<tr>
								<th
									scope='col'
									className='px-3 py-1'>
									Nº
								</th>
								<th
									scope='col'
									className='px-6 py-1'>
									Número Telefónico
								</th>
								<th
									scope='col'
									className='px-6 py-1'>
									Cliente
								</th>
								<th
									scope='col'
									className='px-6 py-1'>
									RUT
								</th>
								<th
									scope='col'
									className='px-6 py-1'>
									Dirección
								</th>

								<th
									scope='col'
									className='px-6 py-1'>
									Estado
								</th>
							</tr>
						</thead>
						<tbody>
							{phones.map((phone, index) => (
								<tr
									key={phone.id}
									className={`odd:bg-white even:bg-gray-100 border-b text-xs lg:text-sm text-center`}>
									<td className='px-2 py-4'>{index + 1}</td>
									<td className='px-6 py-4 border-x'>+{phone.phone_number}</td>
									<td className='px-6 py-4 border-x'>{phone.client.fullName}</td>
									<td className='px-6 py-4 border-x'>{phone.client.rut}</td>
									<td className={`px-6 py-4 border-x font-semibold`}>{phone.client.address}</td>
									<td
										className={`px-4 py-4 border-x font-medium 
										${phone.status_id === 1 ? 'text-emerald-500' : 'text-red-600'}`}>
										{phone.status.description}
									</td>
								</tr>
							))}
						</tbody>
					</table>
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
