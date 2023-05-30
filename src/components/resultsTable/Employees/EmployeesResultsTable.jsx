import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { PencilFill } from '../../../assets/icons';
import axiosClient from '../../../config/axios';
import { useEmployee } from '../../../hooks';

const EmployeeResultsTable = ({ employees, totalResults }) => {
	const { setEmployee } = useEmployee();

	const modalEditEmployee = async (e, rutEmployee) => {
		e.preventDefault();
		const employee = await getEmployee(rutEmployee);
		setEmployee(employee);
		document.getElementById('editEmployee').click();
	};

	const getEmployee = async (rutEmployee) => {
		try {
			const url = `/employee/employees/${rutEmployee}`;
			const { data } = await axiosClient(url);
			return data.data[0];
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div
				className='flip-in-hor-top relative hidden overflow-y-auto shadow-md lg:block scroll-bar-secondary'
				style={{ height: '70vh' }}>
				{employees && employees.length > 0 ? (
					<div>
						<table className='w-full text-center text-gray-500'>
							<thead className='sticky top-0 border-b-2 border-zinc-300 bg-gradient-to-r from-gray-200 via-zinc-200 to-neutral-200 text-xs text-gray-700 opacity-95'>
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
										className={`border-b text-center text-xs odd:bg-white even:bg-slate-100 xl:text-sm`}>
										<td className='px-2'>{index + 1}</td>
										<td className='border-x px-5'>{employee.names}</td>
										<td className='border-x px-5'>{employee.lastnames}</td>
										<td className='border-x px-1'>{employee.rut}</td>
										<td className='border-x px-4'>{employee.email}</td>
										<td className='border-x px-4'>{employee.username}</td>
										<td
											className={`border-x px-6 py-4 font-semibold
										${employee.role_id === 1 ? 'italic text-blue-950' : ''}`}>
											{employee.role.description}
										</td>
										<td
											className={`border-x px-4 py-4 font-medium 
										${employee.status_id === 1 ? 'text-emerald-500' : 'text-red-600'}`}>
											{employee.status.description}
										</td>
										{/* Pencil */}
										<td className='border-x px-2 py-2'>
											<div className='flex justify-center gap-2'>
												<div
													data-tooltip-id='tooltip'
													data-tooltip-delay-show={100}
													onClick={(e) => modalEditEmployee(e, employee.rut)}>
													<PencilFill className={'cursor-pointer text-sm text-blue-800 xl:text-base'} />
												</div>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<div className='sticky bottom-0 bg-stone-950 bg-opacity-70 py-1 text-center text-sm font-medium tracking-wide text-slate-200'>
							Mostrando <span className='font-bold text-blue-400'>{employees.length}</span> de{' '}
							<span className='font-bold text-blue-500 '>{totalResults}</span>{' '}
							{employees.length === 1 ? 'resultado' : 'resultados'}.
						</div>
					</div>
				) : (
					<div className='flex justify-center bg-stone-950 bg-opacity-70 text-sm font-medium tracking-wide text-red-500'>
						<p>No se encontraron resultados.</p>
					</div>
				)}
			</div>
			<Tooltip
				className='text-xs'
				id='tooltip'
				place='bottom'
				variant='info'
				content='Editar'
			/>
		</>
	);
};

export default EmployeeResultsTable;
