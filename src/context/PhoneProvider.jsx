import { useState, createContext } from 'react';

const PhonesContext = createContext();

const PhonesProvider = ({ children }) => {
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);

	return (
		<PhonesContext.Provider
			value={{
				page,
				setPage,
				hasMore,
				setHasMore,
			}}>
			{children}
		</PhonesContext.Provider>
	);
};

export { PhonesProvider };
export default PhonesContext;
