import error500 from '../assets/error-500.svg';

const ServerError = () => {
	return (
		<>
			<div className="w-full h-screen flex flex-col items-center justify-center">
				<div className="flex flex-col items-center justify-center">
					<img src={error500} alt="cyclist falling" />
					<p className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider text-gray-600 mt-8">500</p>
					<p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-600 mt-2">Server Error</p>
					<p className="md:text-lg xl:text-xl text-gray-500 mt-4 text-center">¡OOPS! algo ha salido mal.</p>
				</div>
			</div>
		</>
	);
};

export default ServerError;