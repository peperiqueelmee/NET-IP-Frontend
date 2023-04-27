import Tooltip from '@mui/material/Tooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const InfoTooltip = ({ info }) => {
	return (
		<>
			<div className='cursor-pointer'>
				<Tooltip
					title={info}
					placement='right-start'>
					<HelpOutlineIcon
						style={{ color: '#475569', marginTop: '-9' }}
						fontSize='small'
					/>
				</Tooltip>
			</div>
		</>
	);
};

export default InfoTooltip;
