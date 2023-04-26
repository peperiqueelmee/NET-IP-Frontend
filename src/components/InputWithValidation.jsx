import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { CheckCircleFill, CloseCircleFill, EyeFill, EyeFillInvisible } from '../assets/icons';
import { inputHasError } from '../utils/utils';

const InputWithValidationTest = ({ label, icon, type, value, placeholder, errorMessage, onChange, submitForm }) => {
	const [typeInput, setTypeInput] = useState(type);
	const [successInput, setSuccessInput] = useState(false);
	const [errorInput, setErrorInput] = useState(false);
	const [passwordIsVisible, setPasswordIsVisible] = useState(false);

	useEffect(() => {
		setErrorInput(submitForm);
	}, [submitForm]);

	const handleBlur = (e) => {
		const input = e.target;
		setErrorInput(inputHasError(input));
		setSuccessInput(!inputHasError(input));
	};
	const handleChange = (e) => {
		const input = e.target;
		setErrorInput(inputHasError(input));
		setSuccessInput(!inputHasError(input));
	};
	const handleFocus = () => {
		setErrorInput(false);
		setSuccessInput(false);
	};

	const togglePasswordVisibility = () => {
		setTypeInput(typeInput === 'password' ? 'text' : 'password');
		setPasswordIsVisible(!passwordIsVisible);
	};

	return (
		<>
			<div className='relative mt-2'>
				<label className='block mb-2 text-xs sm:text-sm font-medium text-slate-600'>
					{label}
					<span className='text-red-500'>*</span>
				</label>
				<input
					type={typeInput}
					className={`mt-2 border focus:outline-none text-gray-900 text-xs sm:text-sm rounded-md 
								w-full pl-10  p-2.5 shadow focus:shadow-md bg-slate-200 
								${errorInput ? 'border-red-500' : ''} ${successInput ? 'border-emerald-500' : ''} 
								${!errorInput & !successInput ? 'focus:border-sky-500' : ''}`}
					value={value}
					onChange={(e) => {
						{
							onChange(e.target.value);
						}
						handleChange(e);
					}}
					placeholder={placeholder}
					onFocus={handleFocus}
					onBlur={handleBlur}
					required=''
				/>
				{/* Left Icon Input */}
				<div className='absolute inset-y-0 left-0 mt-11 sm:mt-12 items-center pl-3 pointer-events-none'>
					<div>{icon}</div>
				</div>
				{/* Right Icon Input */}
				<div className='absolute inset-y-0 right-0 mt-11 sm:mt-12 items-center pr-3'>
					<div className='flex items-center'>
						{/* Icon to see password */}
						{type === 'password' && value.length > 0 && (
							<div
								onClick={togglePasswordVisibility}
								className='cursor-pointer flex'>
								<Button sx={{ marginRight: -1, p: 0, borderRadius: '50%', width: 20, height: 20 }}>
									{passwordIsVisible ? (
										<EyeFillInvisible className='h-4 w-4 sm:h-5 sm:w-5 text-slate-600 text-opacity-70' />
									) : (
										<EyeFill className='h-4 w-4 sm:h-5 sm:w-5 text-slate-600 text-opacity-70' />
									)}
								</Button>
							</div>
						)}
						{/* Error or success icons */}
						<div className={`${errorInput || successInput ? 'visible' : 'invisible'} cursor-text`}>
							{errorInput ? (
								<CloseCircleFill className='h-5 w-5 sm:h-5 sm:w-5 text-red-500' />
							) : (
								<CheckCircleFill className='h-4 w-4 sm:h-5 sm:w-5 text-emerald-500' />
							)}
						</div>
					</div>
				</div>
				{/* Error message */}
				<div className={`text-xs text-red-500 ml-1  ${errorInput ? 'visible' : 'invisible'}`}>
					{errorMessage}
				</div>
			</div>
		</>
	);
};

export default InputWithValidationTest;
