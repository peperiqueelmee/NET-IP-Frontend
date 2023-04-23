import React from 'react';

const Spinner = () => {
	return (
		<>
			<div className='flex justify-center'>
				<div class='sk-chase w-5 h-5'>
					<div class='sk-chase-dot'></div>
					<div class='sk-chase-dot'></div>
					<div class='sk-chase-dot'></div>
					<div class='sk-chase-dot'></div>
					<div class='sk-chase-dot'></div>
					<div class='sk-chase-dot'></div>
				</div>
			</div>
		</>
	);
};

export default Spinner;
