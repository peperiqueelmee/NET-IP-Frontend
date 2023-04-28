import Tooltip from '@mui/material/Tooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useState } from 'react';

const InfoTooltip = ({ info }) => {
	const [open, setOpen] = useState(false);

	const handleTooltipClose = () => {
		setOpen(false);
	};
	const handleTooltipOpen = () => {
		setOpen(true);
	};

	return (
		<>
			<ClickAwayListener onClickAway={handleTooltipClose}>
				<div className='cursor-pointer'>
					<Tooltip
						PopperProps={{
							disablePortal: true,
						}}
						onClose={handleTooltipClose}
						open={open}
						placement='right-start'
						title={info}>
						<HelpOutlineIcon
							style={{ color: '#475569', marginTop: '-9' }}
							fontSize='small'
							onClick={handleTooltipOpen}
						/>
					</Tooltip>
				</div>
			</ClickAwayListener>
		</>
	);
};

export default InfoTooltip;
