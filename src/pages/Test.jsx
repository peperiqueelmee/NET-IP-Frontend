import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { Spinner } from '../components';

export default function Test() {
	const [state, setState] = React.useState({
		open: false,
		vertical: 'top',
		horizontal: 'center',
	});
	const { vertical, horizontal, open } = state;

	const handleClick = (newState) => () => {
		setState({ open: true, ...newState });
	};

	const handleClose = () => {
		setState({ ...state, open: false });
	};

	const buttons = (
		<React.Fragment>
			<Button
				onClick={handleClick({
					vertical: 'top',
					horizontal: 'center',
				})}>
				Top-Center
			</Button>
		</React.Fragment>
	);

	return (
		<div>
			{buttons}
			<Snackbar
				anchorOrigin={{ vertical, horizontal }}
				open={open}
				onClose={handleClose}
				message={`Cargando ... `}

			/>
		</div>
	);
}
