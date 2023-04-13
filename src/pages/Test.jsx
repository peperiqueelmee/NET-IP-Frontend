import * as React from 'react';

import Grow from '@mui/material/Grow';

const test = () => {
	const [checked, setChecked] = React.useState(false);

	const handleChange = () => {
		setChecked((prev) => !prev);
	};

	return (
		<>
			<button onClick={handleChange}>s</button>

			<Grow
				in={checked}
				timeout={500}>
				<div>test</div>
			</Grow>
		</>
	);
};

export default test;
