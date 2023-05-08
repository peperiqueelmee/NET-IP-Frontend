import { useState } from 'react';

const InformativeMessage = ({ message, hasError, hasSuccessful, hasInfo }) => {
	const [isVisible, setIsVisible] = useState(true);

	const removeMessage = () => {
		setIsVisible(false);
	};

	return (
		<>
			<div
				className={`bg-black rounded-xl w-full sm:max-w-md border
								${hasError ? 'border-red-500' : hasSuccessful ? 'border-blue-500' : hasInfo ? 'border-green-500' : ''}
                                ${isVisible ? 'block' : 'hidden'}`}>
				<div
					className={`flex bg-opacity-40  rounded-xl
				 				py-1 sm:py-2 text-center text-xs sm:text-sm lg:text-base justify-between px-10 gap-2
								${hasError ? 'bg-red-800' : hasSuccessful ? 'bg-blue-500' : hasInfo ? 'bg-green-400' : ''}`}>
					<div className='text-slate-100 w-full'>{message}</div>
					<div
						className={`font-bold cursor-pointer transition-colors duration-300
									${
										hasError
											? 'text-red-500 hover:text-red-700'
											: hasSuccessful
											? 'text-blue-500 hover:text-blue-700'
											: hasInfo
											? 'text-green-500 hover:text-green-700'
											: ''
									}`}
						onClick={removeMessage}>
						X
					</div>
				</div>
			</div>
		</>
	);
};

export default InformativeMessage;
