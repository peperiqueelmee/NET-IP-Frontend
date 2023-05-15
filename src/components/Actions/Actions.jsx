import { useMediaQuery } from 'react-responsive';
import { FreeMode, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useAction } from '../../hooks';
import { useId } from 'react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

const Actions = () => {
	const { selectedAction, handleActionSelect, getActions } = useAction();
	const sizeIcon = 'text-3xl';
	const mobileScreenSizeIcon = 'text-2xl';
	const actions = getActions(sizeIcon, mobileScreenSizeIcon);

	const breakpoints = [
		{ max: 1279, slides: 6 },
		{ max: 1023, slides: 5 },
		{ max: 767, slides: 4 },
		{ max: 531, slides: 3 },
		{ max: 431, slides: 2 },
		{ max: 331, slides: 1 },
	];

	const slidesPreview = breakpoints.reduce(
		(slides, { max, slides: slidesForBreakpoint }) =>
			useMediaQuery({ query: `(max-width: ${max}px)` }) ? slidesForBreakpoint : slides,
		actions.length
	);

	return (
		<>
			<div
				className='mt-10 h-36 w-full rounded-t-2xl border-2 border-l-lime-500 border-r-lime-500 border-t-lime-500 bg-gradient-to-r from-zinc-100 via-gray-100
			             to-stone-200 pl-4 pr-0 pt-3 lg:h-40 xl:h-32'>
				<div className='h-full w-full'>
					<Swiper
						slidesPerView={slidesPreview}
						spaceBetween={-60}
						freeMode={true}
						pagination={{
							clickable: true,
						}}
						modules={[FreeMode, Pagination]}>
						{actions.map(({ name, icon }, index) => (
							<SwiperSlide key={useId()}>
								{/*  Container */}
								<div
									className={`mr-4 flex h-20 w-24 flex-shrink-0 cursor-pointer flex-col items-center rounded-2xl 
							            bg-zinc-50 px-1 py-0.5 shadow-md transition duration-300  ease-in-out lg:h-24 lg:w-28
										${
											selectedAction === index
												? 'border border-lime-600 bg-gradient-to-r from-lime-500 to-lime-600 shadow-lg shadow-lime-600'
												: 'border border-zinc-50 bg-gradient-to-r from-zinc-50 to-zinc-200 hover:shadow-md hover:shadow-lime-500'
										}`}
									onClick={() => handleActionSelect(index)}>
									{/* Icon */}
									<div className='py-2'>{icon}</div>

									{/*  Text */}
									<div className={`flex text-center`}>
										<span
											className={`text-xs font-medium tracking-tighter lg:text-sm  ${
												selectedAction === index ? 'text-white' : 'text-zinc-800'
											}`}>
											{name}
										</span>
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</>
	);
};

export default Actions;
