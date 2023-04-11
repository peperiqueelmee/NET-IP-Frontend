import { useAction } from '../../hooks';

const ActionsResponsive = () => {
	const { selectedAction, handleActionSelect, getActions } = useAction();
	const sizeIcon = 'text-xl';
	const actions = getActions(sizeIcon);

	return (
		<>
			<div className='flex h-2/3 items-center'>
				<div className='flex flex-col mt-10'>
					{actions.map(({ name, icon }, index) => (
						<div
							id={name}
							key={name}
							className={`shadow-md cursor-pointer bg-zinc-50 transition duration-300 ease-in-out
                               ${selectedAction === index ? 'shadow-lime-600 border border-lime-600' : ''}`}
							onClick={() => handleActionSelect(index)}>
							<div
								className={`${
									selectedAction === index
										? 'bg-gradient-to-r from-lime-500 to-lime-600'
										: 'bg-zinc-50'
								} flex items-center gap-2 px-4`}>
								<div className='py-3'>{icon}</div>
								<span
									className={`hidden md:block text-sm font-medium ${
										selectedAction === index ? 'text-white' : 'text-zinc-800'
									} `}>
									{name}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default ActionsResponsive;
