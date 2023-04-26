import { useState } from 'react';

const InformativeMessage = ({ border, background, text, textHover, message }) => {
	const [isVisible, setIsVisible] = useState(true);

	const removeMessage = () => {
		setIsVisible(false);
	};

	return (
		<>
			<div
				className={`bg-black mb-3 rounded-xl w-full sm:max-w-md border
                                ${isVisible ? 'block' : 'hidden'} 
                                ${border}`}>
				<div
					className={`flex bg-opacity-40  rounded-xl
				 				   py-3 text-center text-xs sm:text-sm lg:text-base justify-between px-10
                                   ${background}`}>
					<div className='text-slate-100 w-full'>{message}</div>
					<div
						className={`font-bold cursor-pointer transition-colors duration-300
                                    ${text} ${textHover} `}
						onClick={removeMessage}>
						X
					</div>
				</div>
			</div>
		</>
	);
};

export default InformativeMessage;
