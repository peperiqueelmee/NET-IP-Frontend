import React from 'react';

const Badge = ({ index }) => {
	return (
		<>
			<span
				className='absolute top-0.5 left-0.5 bg-gradient-to-r from-red-500 to-red-600
                 text-slate-100 w-4 h-4 text-center font-medium rounded-full text-xs shadow shadow-red-500'>
				{index}
			</span>
		</>
	);
};

export default Badge;
