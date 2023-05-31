import Select from 'react-select';
import React, { useState, useEffect } from 'react';
import makeAnimated from 'react-select/animated';
import { useAxios } from '../hooks';

const animatedComponents = makeAnimated();

export default function Test() {
  //Request.
  const { makeRequest } = useAxios();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [error, setError] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    async function getExtensionsByDepartment() {
      try {
        const url = '/regular_anex/by-department/active';
        const { data } = await makeRequest(url);
        const formattedOptions = data.map(item => ({
          value: item.anex_number.toString(),
          label: item.department.department_anex,
        }));
        setOptions(formattedOptions);
      } catch (error) {
        console.log(error);
      }
    }
    getExtensionsByDepartment();
  }, []);

  const handleChange = selectedOptions => {
    const selectedValuesString = selectedValues.join(', ');

    console.log(selectedValuesString);
    if (selectedOptions.length <= 5) {
      setSelectedOptions(selectedOptions);
      setSelectedValues(selectedOptions.map(option => option.value));
      setError('');
    } else {
      setError('¡No puedes seleccionar más de 5 opciones!');
    }
  };

  const customNoOptionsMessage = () => {
    return 'No se encontraron resultados';
  };
   

  return (
    <div>
      <Select
        options={options}
        components={animatedComponents}
        isMulti
        value={selectedOptions}
        onChange={handleChange}
        placeholder='Selecciona máximo 5 anexos'
        noOptionsMessage={customNoOptionsMessage }
      />
      {error && <p>{error}</p>}
    </div>
  );
}
