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
                                border-${border}`}>
				<div
					className={`flex bg-opacity-40  rounded-xl
				 				   sm:py-5 py-3 text-center text-xs sm:text-sm lg:text-base justify-between px-10
                                   bg-${background}`}>
					<div className='text-slate-100'>{message}</div>
					<div
						className={`font-bold cursor-pointer transition-colors duration-300
                                    text-${text} hover:text-${textHover} `}
						onClick={removeMessage}>
						X
					</div>
				</div>
			</div>
		</>
	);
};

export default InformativeMessage;
