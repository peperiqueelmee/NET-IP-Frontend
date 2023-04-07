import { useState } from 'react';
import axios from 'axios';

const useAxios = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
    const API_TOKEN = import.meta.env.VITE_TOKEN;

    const sendRequests = async (requests) => {
        setIsLoading(true);
        try {
            const headers = {
                Authorization: `Bearer ${API_TOKEN}`,
            };
            const responses = await Promise.all(requests.map(({ method, url, data }) => {
                return axios({
                    method,
                    url: `${API_BASE_URL}${url}`,
                    data,
                    headers,
                });
            }));
            setResponse(responses.map(res => res));
            setError(null);
        } catch (err) {
            setResponse(null);
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    const postRequest = async (url, data) => {
        await sendRequests([{ method: 'post', url, data }]);
    };

    return [response, error, isLoading, sendRequests, postRequest];
};

export default useAxios;