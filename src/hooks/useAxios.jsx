import axios from 'axios';
import { useState } from 'react';
import { RESPONSE_SERVER } from '../utils/utils';

const useAxios = () => {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

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
      return response.data;
    } catch (error) {
      const errorMessage = error.response.data.message;
      setIsLoading(false);
      if (error.code === RESPONSE_SERVER.BAD_REQUEST) {
        setMessage(errorMessage);
        return;
      }
      setMessage('Error de servidor. Reintentar.');
    }
  };

  return { message, setMessage, isLoading, makeRequest };
};

export default useAxios;
