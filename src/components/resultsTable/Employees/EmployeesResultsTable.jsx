import { PencilFill } from '../../../assets/icons';

const EmployeeResultsTable = ({ employees }) => {
	const modalCreateEmployee = () => {
		document.getElementById('editEmployee').click();
	};

	return (
		<>
			<div
				className='hidden lg:block relative overflow-y-auto shadow-md'
				style={{ height: '70vh' }}>
				{employees && employees.length > 0 ? (
					<table className='w-full text-center text-gray-500'>
						<thead className='text-xs text-gray-700 bg-gray-200 border-b-2 border-gray-300'>
							<tr>
								<th
									scope='col'
									className='px-1 py-1'>
									Nº
								</th>
								<th
									scope='col'
									className='px-5 py-1'>
									Nombre(s)
								</th>
								<th
									scope='col'
									className='px-5 py-1'>
									Apellido(s)
								</th>
								<th
									scope='col'
									className='px-5 py-1'>
									RUT
								</th>
								<th
									scope='col'
									className='px-5 py-1'>
									E-Mail
								</th>
								<th
									scope='col'
									className='px-5 py-1'>
									Usuario
								</th>
								<th
									scope='col'
									className='px-5 py-1'>
									Cargo
								</th>
								<th
									scope='col'
									className='px-5 py-1'>
									Estado
								</th>
								<th
									scope='col'
									className='px-2 py-1'>
									Acción
								</th>
							</tr>
						</thead>
						<tbody>
							{employees.map((employee, index) => (
								<tr
									key={employee.id}
									className={`odd:bg-white even:bg-gray-100 border-b text-xs xl:text-sm text-center`}>
									<td className='px-2'>{index + 1}</td>
									<td className='px-5 border-x'>{employee.names}</td>
									<td className='px-5 border-x'>{employee.lastnames}</td>
									<td className='px-1 border-x'>{employee.rut}</td>
									<td className='px-4 border-x'>{employee.email}</td>
									<td className='px-4 border-x'>{employee.username}</td>
									<td
										className={`px-6 py-4 border-x font-semibold
										${employee.role_id === 1 ? 'text-blue-950 italic' : ''}`}>
										{employee.role.description}
									</td>
									<td
										className={`px-4 py-4 border-x font-medium 
										${employee.status_id === 1 ? 'text-emerald-500' : 'text-red-600'}`}>
										{employee.status.description}
									</td>
									<td className='px-2 py-2 border-x'>
										<div className='flex justify-center gap-2'>
											<div onClick={modalCreateEmployee}>
												<PencilFill
													className={'text-sm xl:text-base text-blue-800 cursor-pointer'}
												/>
											</div>
										</div>
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

export default EmployeeResultsTable;
