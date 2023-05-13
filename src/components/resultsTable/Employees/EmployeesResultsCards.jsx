import axiosClient from '../../../config/axios';
import { useEmployee } from '../../../hooks';
import { Badge } from '../../index.js';

const EmployeesResultsCardsResponsive = ({ employees, totalResults }) => {
	const { handleEmployeeSelect } = useEmployee();

	const modalEditEmployee = async (e, rutEmployee) => {
		e.preventDefault();
		const employee = await getEmployee(rutEmployee);
		handleEmployeeSelect(employee);
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
			<div className='block lg:hidden'>
				{employees && employees.length > 0 ? (
					<>
						<div className='rounded-b-md bg-stone-950 bg-opacity-70 py-1 text-center text-xs font-medium tracking-wide text-slate-200'>
							Mostrando <span className='font-bold text-blue-400'>{employees.length}</span> de{' '}
							<span className='font-bold text-blue-500 '>{totalResults}</span>{' '}
							{employees.length === 1 ? 'resultado' : 'resultados'}.
						</div>
						<div
							className='overflow-y-auto'
							style={{ height: '50vh' }}>
							{employees.map((employee, index) => (
								<div
									key={employee.id}
									className='relative mt-2 flex flex-col gap-5 rounded-lg border-2 border-lime-100 bg-gradient-to-r from-gray-50 to-slate-100 px-2 py-2 text-xs shadow-2xl'>
									{/*  Badge */}
									<Badge index={index + 1} />
									{/* Content */}
									<div className='ml-3 mt-2 flex w-full flex-col gap-1 tracking-wide'>
										<div className='flex w-full'>
											<div className='w-1/3 font-bold text-gray-700 sm:w-1/2'>Nombre(s):</div>
											<div className='w-1/2'>{employee.names}</div>
										</div>
										<div className='flex w-full'>
											<div className='w-1/3 font-bold text-gray-700 sm:w-1/2'>Apellido(s):</div>
											<div className='w-1/2'>{employee.lastnames}</div>
										</div>
										<div className='flex w-full'>
											<div className='w-1/3 font-bold text-gray-700 sm:w-1/2'>RUT:</div>
											<div className='w-1/2'>{employee.rut}</div>
										</div>
										<div className='flex w-full'>
											<div className='w-1/3 font-bold text-gray-700 sm:w-1/2'>Email:</div>
											<div className='w-1/2'>{employee.email}</div>
										</div>
										<div className='flex w-full'>
											<div className='w-1/3 font-bold text-gray-700 sm:w-1/2'>Usuario:</div>
											<div className='w-1/2'>{employee.username}</div>
										</div>
										<div className='flex w-full'>
											<div className='w-1/3 font-bold text-gray-700 sm:w-1/2'>Cargo:</div>
											<div
												className={`w-1/2 font-semibold
													${employee.role_id === 1 ? 'italic text-blue-950' : ''}`}>
												{employee.role.description}
											</div>
										</div>
										<div className='flex w-full'>
											<div className='w-1/3 font-bold text-gray-700 sm:w-1/2'>Estado:</div>
											<div
												className={`w-1/2 font-medium text-emerald-600
													${employee.status_id === 1 ? 'text-emerald-500' : 'text-red-600'}`}>
												{employee.status.description}
											</div>
										</div>
									</div>
									<div className='flex justify-center'>
										<button
											onClick={(e) => modalEditEmployee(e, employee.rut)}
											className='w-5/12 rounded-xl border border-blue-300
												   bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600	
												 py-1 text-xs font-bold text-slate-200 shadow-sm shadow-blue-400 hover:bg-gradient-to-r hover:from-blue-500 hover:via-blue-600 hover:to-blue-700'>
											Editar
										</button>
									</div>
								</div>
							))}
						</div>
					</>
				) : (
					<div className='flex justify-center bg-stone-950 bg-opacity-70 text-xs font-medium tracking-wide text-red-500'>
						<p>No se encontraron resultados.</p>
					</div>
				)}
			</div>
		</>
	);
};

export default EmployeesResultsCardsResponsive;
