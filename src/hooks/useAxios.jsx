import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateFormValidation } from '../features/formValidations/formValidationSlice';
import { RESPONSE_SERVER } from '../utils/utils';

const useAxios = () => {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const dispatch = useDispatch();

  const makeRequest = async (url, data = null, method = 'GET') => {
    try {
      setIsLoading(true);
      setMessage(null);

      const response = await axios({
        method,
        url: API_BASE_URL + url,
        data,
      });
      setIsLoading(false);
      if (method === 'POST' || method === 'PUT') {
        dispatch(updateFormValidation({ inputError: null, formOk: true }));
      }
      return response.data;
    } catch (error) {
      const errorMessage = error.response.data.message;
      setIsLoading(false);
      if (error.code === RESPONSE_SERVER.BAD_REQUEST) {
        setMessage(errorMessage);
        dispatch(
          updateFormValidation({
            message: error.response.data.message,
            inputError: error.response.data.input,
            formOk: false,
          })
        );
        return;
      }
      setMessage('Error de servidor. Reintentar.');
      dispatch(updateFormValidation({ message: 'Error de servidor. Reintentar.' }));
    }
  };

  return { message, setMessage, isLoading, makeRequest };
};

export default useAxios;
