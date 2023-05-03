import { Badge } from '../../index.js';

const EmployeesResultsCardsResponsive = ({ employees }) => {
	return (
		<>
			<div className='lg:hidden block'>
				{employees && employees.length > 0 ? (
					<div style={{ height: '50vh', overflowY: 'scroll' }}>
						{employees.map((employee, index) => (
							<div className='flex bg-gradient-to-r from-gray-50 to-slate-100 mt-2 text-xs rounded-lg py-2 px-2 shadow-2xl gap-5 border-2 border-lime-100 relative'>
								{/*  Badge */}
								<Badge index={index + 1} />
								{/* Content */}
								<div className='flex flex-col gap-1 tracking-wide w-full ml-3 mt-2'>
									<div className='flex w-full'>
										<div className='w-1/3 sm:w-1/2 font-bold text-gray-700'>Nombre(s):</div>
										<div className='w-1/2'>{employee.names}</div>
									</div>
									<div className='flex w-full'>
										<div className='w-1/3 sm:w-1/2 font-bold text-gray-700'>Apellido(s):</div>
										<div className='w-1/2'>{employee.lastnames}</div>
									</div>
									<div className='flex w-full'>
										<div className='w-1/3 sm:w-1/2 font-bold text-gray-700'>RUT:</div>
										<div className='w-1/2'>{employee.rut}</div>
									</div>
									<div className='flex w-full'>
										<div className='w-1/3 sm:w-1/2 font-bold text-gray-700'>Email:</div>
										<div className='w-1/2'>{employee.email}</div>
									</div>
									<div className='flex w-full'>
										<div className='w-1/3 sm:w-1/2 font-bold text-gray-700'>Usuario:</div>
										<div className='w-1/2'>{employee.username}</div>
									</div>
									<div className='flex w-full'>
										<div className='w-1/3 sm:w-1/2 font-bold text-gray-700'>Cargo:</div>
										<div
											className={`w-1/2 font-semibold
													${employee.role_id === 1 ? 'text-blue-950 italic' : ''}`}>
											{employee.role.description}
										</div>
									</div>
									<div className='flex w-full'>
										<div className='w-1/3 sm:w-1/2 font-bold text-gray-700'>Estado:</div>
										<div
											className={`font-medium text-emerald-600 w-1/2
													${employee.status_id === 1 ? 'text-emerald-500' : 'text-red-600'}`}>
											{employee.status.description}
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

export default EmployeesResultsCardsResponsive;
