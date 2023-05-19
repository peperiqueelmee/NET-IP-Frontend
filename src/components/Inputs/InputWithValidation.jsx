import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { CheckCircleFill, CloseCircleFill, EyeFill, EyeFillInvisible, InfoFill } from '../../assets/icons';
import { isInputInvalid } from '../../utils/utils';
import { InfoTooltip } from '../index.js';

const InputWithValidationTest = ({
  label,
  required,
  icon,
  type,
  repeatPassword,
  value,
  onChange,
  placeholder,
  validationType,
  error,
  errorMessage,
  tooltip,
}) => {
  const [typeInput, setTypeInput] = useState(type);
  const [successInput, setSuccessInput] = useState(false);
  const [errorInput, setErrorInput] = useState(false);
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  useEffect(() => {
    setErrorInput(error);
    setSuccessInput(false);
  }, [error]);

  // Handles.
  const handleBlur = (e) => {
    const input = e.target;
    setErrorInput(errorInput ? errorInput : isInputInvalid(input, validationType));
    setSuccessInput(!isInputInvalid(input, validationType));
  };
  const handleChange = (e) => {
    const input = e.target;
    setErrorInput(repeatPassword ? errorInput : isInputInvalid(input, validationType));
    setSuccessInput(!isInputInvalid(input, validationType));
  };
  const handleFocus = () => {
    setErrorInput(false);
    setSuccessInput(false);
  };

  // Support functions
  const togglePasswordVisibility = () => {
    setTypeInput(typeInput === 'password' ? 'text' : 'password');
    setPasswordIsVisible(!passwordIsVisible);
  };

  // Styles.
  const typeNamesMapping = {
    password: 'pl-10 pr-20',
    default: 'px-10',
  };
  const statusMapping = {
    error: 'border-red-500 bg-pink-50',
    success: 'border-emerald-500 bg-slate-200',
    default: 'focus:border-sky-500 bg-slate-200',
  };
  const inputClassName = [
    'mt-2',
    'w-full',
    'rounded-md',
    'border',
    'py-2.5',
    'text-xs',
    'text-gray-900',
    'shadow',
    'focus:shadow-md',
    'focus:outline-none',
    'sm:text-sm',
  ]
    .concat(typeNamesMapping[type] || typeNamesMapping.default)
    .concat(
      Object.entries(statusMapping).reduce((acc, [key, value]) => {
        if (
          (key === 'error' && errorInput) ||
          (key === 'success' && successInput) ||
          (key === 'default' && !errorInput && !successInput)
        ) {
          acc.push(value);
        }
        return acc;
      }, [])
    )
    .join(' ');

  return (
    <>
      <div className='relative mt-2'>
        <div className='flex items-center gap-1'>
          <label className='mb-2 block text-xs font-medium text-slate-600 sm:text-sm'>
            {label}
            {required && <span className='text-red-500'>*</span>}
          </label>
          {tooltip && (
            <div style={{ marginTop: '-6px' }}>
              <InfoTooltip info={tooltip} />
            </div>
          )}
        </div>
        <input
          type={typeInput}
          className={inputClassName}
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
        <div className='pointer-events-none absolute inset-y-0 left-0 mt-11 items-center pl-3 sm:mt-12'>
          <div>{icon}</div>
        </div>
        {/* Right Icon Input */}
        <div className='absolute inset-y-0 right-0 mt-11 items-center pr-3 sm:mt-12'>
          <div className='flex items-center'>
            {/* Icon to see password */}
            {type === 'password' && value.length > 0 && (
              <div
                onClick={togglePasswordVisibility}
                className='flex cursor-pointer'>
                <Button sx={{ marginRight: -1, p: 0, borderRadius: '50%', width: 20, height: 20 }}>
                  {passwordIsVisible ? (
                    <EyeFillInvisible className='h-4 w-4 text-slate-600 text-opacity-70 sm:h-5 sm:w-5' />
                  ) : (
                    <EyeFill className='h-4 w-4 text-slate-600 text-opacity-70 sm:h-5 sm:w-5' />
                  )}
                </Button>
              </div>
            )}
            {/* Error or success icons */}
            <div className={`${errorInput || successInput ? 'visible' : 'invisible'} cursor-text`}>
              {errorInput ? (
                <CloseCircleFill className='h-4 w-4 text-red-500 sm:h-5 sm:w-5' />
              ) : (
                <CheckCircleFill className='h-4 w-4 text-emerald-500 sm:h-5 sm:w-5' />
              )}
            </div>
          </div>
        </div>
        {/* Error message */}
        <div
          className={`ml-1 text-xs text-red-500  
								${errorInput ? 'visible' : 'invisible'} 
								flex items-center gap-1`}>
          <InfoFill />
          {errorMessage}
        </div>
      </div>
    </>
  );
};

export default InputWithValidationTest;
