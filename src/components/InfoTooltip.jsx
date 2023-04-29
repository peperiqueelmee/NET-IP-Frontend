import { useState } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

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
						arrow
						TransitionComponent={Zoom}
						TransitionProps={{ timeout: 600 }}
						PopperProps={{
							disablePortal: true,
						}}
						onClose={handleTooltipClose}
						open={open}
						title={info}>
						<HelpOutlineIcon
							style={{ color: '#0284c7', marginTop: '-9' }}
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
