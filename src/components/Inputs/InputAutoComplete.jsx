import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

const InputAutocomplete = ({ value, options, onSelect, placeholder, disabled = false, formSubmit = false }) => {
  const [inputValue, setInputValue] = useState('');
  const uniqueOptions = [...new Set(options)];

  return (
    <>
      <Autocomplete
        style={{ fontSize: '46px' }}
        disabled={disabled}
        value={value}
        onChange={(event, newValue) => {
          onSelect(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        options={uniqueOptions}
        noOptionsText='No se encontraron coincidencias'
        sx={{
          '& .MuiInputBase-root': {
            border: `1px solid ${formSubmit && !value ? '#EF4444' : '#E5E7EB'}`,
            borderRadius: '0.375rem',
            backgroundColor: '#e2e8f0',
            '&:hover': {
              borderColor: disabled ? '#E5E7EB' : '#0EA5E9',
            },
            '&.Mui-focused': {
              backgroundColor: '#e2e8f0',
              borderColor: '#0EA5E9',
            },
          },
          '& .MuiAutocomplete-listbox li': {
            '&:hover': {
              backgroundColor: disabled ? '#fff' : '#E5E7EB',
              cursor: disabled ? 'default' : 'pointer',
            },
          },
          '& .MuiInputBase-input': {
            fontSize: '14px',
            color: '#111827',
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant='standard'
            placeholder={placeholder}
            InputProps={{
              ...params.InputProps,
              disableUnderline: true,
              classes: {
                root: 'pl-4 p-2 shadow-sm',
              },
            }}
          />
        )}
      />
    </>
  );
};

export default InputAutocomplete;
