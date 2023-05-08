import React from 'react';

const Spinner = () => {
	return (
		<>
			<div className='flex justify-center'>
				<div className='sk-chase w-5 h-5'>
					<div className='sk-chase-dot'></div>
					<div className='sk-chase-dot'></div>
					<div className='sk-chase-dot'></div>
					<div className='sk-chase-dot'></div>
					<div className='sk-chase-dot'></div>
					<div className='sk-chase-dot'></div>
				</div>
			</div>
		</>
	);
};

export default Spinner;
