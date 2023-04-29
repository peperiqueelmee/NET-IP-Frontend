const ResultsTableBlockNumbers = () => {
	return (
		<>
			<div className='hidden sm:block relative overflow-x-auto shadow-md'>
				<table className='w-full text-center text-gray-500'>
					<thead className='text-xs text-gray-700 bg-gray-200 border-b-2 border-gray-300'>
						<tr>
							<th
								scope='col'
								className='px-6 py-1'>
								Número
							</th>
							<th
								scope='col'
								className='px-6 py-1'>
								Cliente
							</th>
							<th
								scope='col'
								className='px-6 py-1'>
								RUT/Pasaporte
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
						<tr className='bg-white border-b text-xs lg:text-sm text-center'>
							<td className='px-6 py-4'>+56912345678</td>
							<td className='px-6 py-4 border-x'>José Riquelme Aravena</td>
							<td className='px-6 py-4 border-x'>18.323.323-3</td>
							<td className='px-6 py-4 border-x'>Calle prueba #234 Viña del Mar</td>
							<td className='px-6 py-4 font-medium text-red-500'>Bloqueado</td>
						</tr>
						<tr className='border-b bg-gray-100 text-xs lg:text-sm text-center'>
							<td className='px-6 py-4'>+56912345678</td>
							<td className='px-6 py-4 border-x'>José Riquelme Aravena</td>
							<td className='px-6 py-4 border-x'>18.323.323-3</td>
							<td className='px-6 py-4 border-x'>Calle prueba #234 Viña del Mar</td>
							<td className='px-6 py-4 font-medium text-red-500'>Bloqueado</td>
						</tr>
						<tr className='bg-white border-b text-xs lg:text-sm text-center'>
							<td className='px-6 py-4'>+56912345678</td>
							<td className='px-6 py-4 border-x'>José Riquelme Aravena</td>
							<td className='px-6 py-4 border-x'>18.323.323-3</td>
							<td className='px-6 py-4 border-x'>Calle prueba #234 Viña del Mar</td>
							<td className='px-6 py-4 font-medium text-red-500'>Bloqueado</td>
						</tr>
					</tbody>
				</table>
			</div>
		</>
	);
};

export default ResultsTableBlockNumbers;
