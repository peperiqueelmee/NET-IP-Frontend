import { useState, createContext } from 'react';

const PhonesContext = createContext();

const PhonesProvider = ({ children }) => {
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);

	const updatePage = (page) => {
		setPage(page);
	};

	const updateHasMore = (state) => {
		setHasMore(state);
	};

	return (
		<PhonesContext.Provider
			value={{
				page,
				updatePage,
				hasMore,
				updateHasMore,
			}}>
			{children}
		</PhonesContext.Provider>
	);
};

export { PhonesProvider };
export default PhonesContext;
