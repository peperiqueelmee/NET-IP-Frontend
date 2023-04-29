import { useState } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { QuestionCircleOutline } from '../assets/icons';

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
						<div onClick={handleTooltipOpen}>
							<QuestionCircleOutline className={'text-sm sm:text-base text-sky-600'} />
						</div>
					</Tooltip>
				</div>
			</ClickAwayListener>
		</>
	);
};

export default InfoTooltip;
