import { useContext } from 'react';
import PhonesContext from '../context/PhoneProvider';

const usePhone = () => {
	return useContext(PhonesContext);
};

export default usePhone;
