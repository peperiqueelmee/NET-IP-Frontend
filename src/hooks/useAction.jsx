import { useContext } from 'react';
import ActionContext from '../context/ActionProvider';

const useAction = () => {
	return useContext(ActionContext);
};

export default useAction;
