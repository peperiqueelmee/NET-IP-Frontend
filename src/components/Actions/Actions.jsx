import { useAction } from '../../hooks';

const Actions = () => {
	const { selectedAction, handleActionSelect, getActions } = useAction();
	const sizeIcon = 'text-5xl';
	const actions = getActions(sizeIcon);

	return (
		<>
			<div className='bg-white py-4 px-2 mt-10 w-full border-2 border-t-lime-500 border-l-lime-500 border-r-lime-500 rounded-t-2xl'>
				{/* Actions*/}
				<div className='ml-10 flex flex-wrap gap-8 justify-start'>
					{actions.map(({ name, icon }, index) => (
						/*  Container */
						<div
							id={name}
							key={name}
							className={`shadow-md cursor-pointer bg-zinc-50 rounded w-40 transition duration-300 ease-in-out flex flex-col items-center
                               ${
									selectedAction === index
										? 'shadow-lime-600 shadow-lg border border-lime-600 bg-gradient-to-r from-lime-500 to-lime-600'
										: 'hover:shadow-md hover:shadow-lime-200 bg-zinc-50'
								}`}
							onClick={() => handleActionSelect(index)}>
							{/* Icon */}
							<div className='py-3'>{icon}</div>

							{/*  Text */}
							<div className={`text-center text-gray-500 tracking-tight h-16`}>
								<div className='h-full flex items-center'>
									{name.split(' ').length === 2 ? (
										<div className='flex flex-col leading-none'>
											{name.split(' ').map((word, indexWord) => (
												<span
													key={indexWord}
													className={`font-medium tracking tracking-tighter ${
														selectedAction === index ? 'text-white' : 'text-black'
													} ${indexWord > 0 ? 'mt-2' : ''}`}>
													{word}
												</span>
											))}
										</div>
									) : (
										<span
											className={`font-medium tracking tracking-tighter ${
												selectedAction === index ? 'text-white' : 'text-black'
											}`}>
											{name}
										</span>
									)}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Actions;
