import Logo from '../assets/Logo/Logo';

const Title = ({ titleIsExpand = false }) => {
	return (
		<>
			<div
				className={`mb-6 text-white font-semibold tracking-wider text-lg md:text-xl xl:text-2xl text-shadow  
						${titleIsExpand ? 'focus-in-expand' : ''} flex gap-2 items-center flex-col sm:flex-row`}>
				<Logo className={'sm:w-9 xl:w-10 hidden sm:block'} />
				<div className='flex gap-1 flex-col items-center sm:flex-row'>
					<div className='flex gap-2'>
						<div className='block sm:hidden'>
							<Logo className={'w-7'} />
						</div>
						<div>Sistema de Gestión de Anexos</div>
					</div>
					<div className='flex gap-2 items-center'>
						<span className='text-lime-400'>NET</span> <span className='text-slate-900'>IP</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default Title;
