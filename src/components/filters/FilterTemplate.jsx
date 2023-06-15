import Grow from '@mui/material/Grow';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchFill } from '../../assets/icons';
import axiosClient from '../../config/axios';
import { updatePagePagination } from '../../features';
import { useAction, useReport } from '../../hooks';
import { APPLICATION_STATES, USER_ACTIONS } from '../../utils/utils';
import {
  AnexResultsTable,
  AnexesResultsCards,
  IntercomsResultsCards,
  IntercomsResultsTable,
  MCRResultsCards,
  MCRResultsTable,
  Spinner,
} from '../index.js';

const FilterTemplate = ({ indexAction, pluralTitle, singularTitle, urlFetch }) => {
  // User experience.
  const [isLoading, setLoading] = useState(null);
  const [anexes, setAnexes] = useState([]);
  const [totalAnexes, setTotalAnexes] = useState(null);
  const { selectedAction, selectedActionUsers, setSelectActionUsers } = useAction();
  const thereAreAnexes = Array.isArray(anexes) && anexes.length > 0;
  // Report.
  const { setTableName, setFilename } = useReport();
  // Data user.
  const [anexe, setAnexe] = useState('');
  const dispatch = useDispatch();
  // Pagination.
  const { resultsByPagination, currentPagePagination } = useSelector(state => state.fetch);

  // Component rendering.
  const componentsTablesObj = {
    0: (
      <AnexResultsTable
        anexes={anexes}
        totalResults={totalAnexes}
      />
    ),
    2: (
      <IntercomsResultsTable
        intercoms={anexes}
        totalResults={totalAnexes}
      />
    ),
    3: (
      <MCRResultsTable
        multiCallRingings={anexes}
        totalResults={totalAnexes}
      />
    ),
  };
  const componentsCardsObj = {
    0: (
      <AnexesResultsCards
        anexes={anexes}
        totalResults={totalAnexes}
      />
    ),
    2: (
      <IntercomsResultsCards
        intercoms={anexes}
        totalResults={totalAnexes}
      />
    ),
    3: (
      <MCRResultsCards
        multiCallRingings={anexes}
        totalResults={totalAnexes}
      />
    ),
  };
  const tableRender = componentsTablesObj[indexAction];
  const cardRender = componentsCardsObj[indexAction];

  useEffect(() => {
    if (currentPagePagination > 1) {
      handleSelectedAction();
    }
  }, [currentPagePagination]);
  useEffect(() => {
    resetPhones();
    dispatch(updatePagePagination({ currentPagePagination: 1, maximumPagePagination: null }));
  }, [selectedAction]);
  useEffect(() => {
    if (
      selectedActionUsers === USER_ACTIONS.ListAll ||
      selectedActionUsers === USER_ACTIONS.ListActive ||
      selectedActionUsers === USER_ACTIONS.ListInactive
    ) {
      setAnexes([]);
    }
  }, [selectedActionUsers]);

  // Handles.
  const handleSelectedAction = async () => {
    switch (selectedActionUsers) {
      case USER_ACTIONS.ListAll:
        await handlePagination('all');
        break;
      case USER_ACTIONS.ListActive:
        await handlePagination('status', APPLICATION_STATES.Active);
        break;
      case USER_ACTIONS.ListInactive:
        await handlePagination('status', APPLICATION_STATES.Blocked);
        break;
      default:
        break;
    }
  };
  const handleChangeAction = index => {
    setSelectActionUsers(index);
    dispatch(updatePagePagination({ currentPagePagination: 1, maximumPagePagination: null }));
  };

  const handleFetch = async (type, status = null, e = null) => {
    setLoading(true);
    if (type === 'byNumber') {
      if (!e) {
        return;
      }
      e.preventDefault();
    }
    const urlPaths = {
      all: `/${urlFetch}/?page=${1}`,
      byNumber: `/${urlFetch}/${anexe}`,
      status: `/${urlFetch}/status/${status}?page=${1}`,
    };
    const url = urlPaths[type];
    try {
      const { data } = await axiosClient(url);
      const maximumPagePagination = Math.ceil(data.total / resultsByPagination);
      dispatch(updatePagePagination({ maximumPagePagination }));
      setAnexes(data.data);
      setTotalAnexes(data.total);
    } catch (error) {
      setAnexes(null);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateReport = () => {
    setTableName(`${pluralTitle}-table`);
    setFilename(`Reporte-${pluralTitle}`);
    document.getElementById('generate-report').click();
  };

  // Pagination.
  const handlePagination = async (type, status = null) => {
    const urlPaths = {
      all: `/${urlFetch}/?page=${currentPagePagination}`,
      status: `/${urlFetch}/status/${status}?page=${currentPagePagination}`,
    };
    const url = urlPaths[type];
    try {
      const { data } = await axiosClient(url);
      setAnexes([...anexes, ...data.data]);
    } catch (error) {
      setAnexes(null);
    } finally {
      setLoading(false);
    }
  };

  //Support functions.
  const modalCreateAnex = () => {
    setAnexes(null);
    document.getElementById(`create-${singularTitle}`).click();
  };
  const resetPhones = () => {
    setSelectActionUsers(null);
    setAnexes(null);
    setAnexe('');
  };

  return (
    <>
      <Grow
        in={selectedAction === indexAction}
        timeout={500}>
        <div className={`pb-14 ${selectedAction === indexAction ? 'block' : 'hidden'} `}>
          {/* Container */}
          <div className='bg-gradient-to-r from-cyan-950 via-blue-950 to-cyan-950'>
            <div
              className='flex w-full flex-col justify-center 
									gap-1 rounded-none px-1 py-1.5 opacity-90 lg:flex-row lg:gap-5'>
              {/* Extension management */}
              <div className='flex flex-col items-center justify-evenly gap-y-1 rounded-lg border border-lime-400 px-4 py-2 text-xs font-medium xl:text-sm'>
                <div className='text-lime-400'>Gestión de {pluralTitle}</div>
                <button
                  onClick={() => {
                    modalCreateAnex();
                    handleChangeAction(USER_ACTIONS.Create);
                  }}
                  className={`w-9/12 rounded-2xl bg-gray-200 px-4 
							py-1 text-xs shadow hover:shadow-lime-400 sm:w-6/12 lg:w-32 xl:text-sm
							${
                selectedActionUsers === USER_ACTIONS.Create
                  ? 'bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 text-white'
                  : 'text-zinc-700'
              }`}>
                  Crear {singularTitle}
                </button>
              </div>
              {/* Extension lists */}
              <div className='flex flex-col items-center justify-evenly gap-y-1 rounded-lg border border-lime-400 px-4 py-2 text-xs font-medium xl:text-sm'>
                <div className='text-lime-400'>Listado de {pluralTitle}</div>
                <div className='flex w-9/12 flex-col gap-2 sm:w-6/12 lg:w-auto lg:flex-row'>
                  <button
                    onClick={() => {
                      handleFetch('all');
                      handleChangeAction(USER_ACTIONS.ListAll);
                    }}
                    className={`w-full rounded-2xl bg-gray-200 px-4
											    py-1 text-xs shadow hover:shadow-lime-400 lg:w-32 xl:text-sm
												${
                          selectedActionUsers === USER_ACTIONS.ListAll
                            ? 'bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 text-white'
                            : 'text-zinc-700 '
                        }`}>
                    Todos
                  </button>
                  <div className='flex justify-center gap-1'>
                    <button
                      onClick={() => {
                        handleFetch('status', APPLICATION_STATES.Active);
                        handleChangeAction(USER_ACTIONS.ListActive);
                      }}
                      className={`w-full rounded-2xl bg-gray-200 px-4 
													py-1 text-xs shadow hover:shadow-lime-400 lg:w-32 xl:text-sm
													${
                            selectedActionUsers === USER_ACTIONS.ListActive
                              ? 'bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 text-white'
                              : 'text-zinc-700'
                          }`}>
                      Activos
                    </button>
                    <button
                      onClick={() => {
                        handleFetch('status', APPLICATION_STATES.Blocked);
                        handleChangeAction(USER_ACTIONS.ListInactive);
                      }}
                      className={`w-full rounded-2xl bg-gray-200 px-4 
													py-1 text-xs shadow hover:shadow-lime-400 lg:w-32 xl:text-sm
													${
                            selectedActionUsers === USER_ACTIONS.ListInactive
                              ? 'bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 text-white'
                              : 'text-zinc-700'
                          }`}>
                      Bloqueados
                    </button>
                  </div>
                </div>
              </div>
              {/* Search by Extension */}
              <div className='flex flex-col items-center justify-evenly gap-y-1 rounded-lg border border-lime-400 px-4 py-2 text-xs font-medium xl:text-sm'>
                <div className='flex items-center gap-1'>
                  <div className='text-lime-400'>Búsqueda por {singularTitle}</div>
                </div>
                <form
                  onSubmit={e => handleFetch('byNumber', null, e)}
                  className='flex w-9/12 items-center sm:w-6/12 lg:w-auto'>
                  <input
                    value={anexe}
                    onChange={e => setAnexe(e.target.value)}
                    onClick={() => handleChangeAction(USER_ACTIONS.ListByOne)}
                    className='h-6 w-full rounded-l-2xl pl-4 text-xs text-zinc-500 outline-none focus:border focus:border-lime-400 xl:text-sm'
                    type='text'
                    placeholder={`Ingrese ${singularTitle}`}
                  />
                  <button
                    type='submit'
                    onClick={() => {
                      handleFetch('byNumber');
                      handleChangeAction(USER_ACTIONS.ListByOne);
                    }}
                    className={`flex h-6 w-9 cursor-pointer items-center justify-center rounded-r-2xl bg-gray-200 
												shadow hover:shadow-lime-400 
												${
                          selectedActionUsers === USER_ACTIONS.ListByOne
                            ? 'bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 text-white'
                            : 'text-zinc-700'
                        }`}>
                    <SearchFill />
                  </button>
                </form>
              </div>
              {/* Report Extensions */}
              <div className='flex flex-col items-center justify-evenly gap-y-1 rounded-lg border border-lime-400 px-4 py-2 text-xs font-medium lg:hidden xl:flex xl:text-sm'>
                <div className='text-lime-400'>Generación de Reportes</div>
                <button
                  onClick={handleGenerateReport}
                  disabled={!thereAreAnexes}
                  className={`${thereAreAnexes ? 'pulsate-fwd' : ''} w-9/12 rounded-2xl bg-gradient-to-r
								            from-indigo-600 via-indigo-700 to-indigo-700 px-4 py-1 text-xs 
											text-zinc-200 shadow hover:shadow-indigo-500  disabled:from-gray-400 
											disabled:via-gray-500 disabled:to-gray-600 disabled:shadow-none
											sm:w-6/12  lg:w-40 xl:text-sm`}>
                  Generar Reporte
                </button>
              </div>
            </div>
            <div className='hidden justify-evenly px-11 py-2 lg:flex xl:hidden'>
              <div className='flex w-full items-center gap-y-1 rounded-lg border border-lime-400 px-4 py-2 text-xs font-medium lg:flex-col'>
                <div className='text-lime-400'>Generación de Reportes</div>
                <button
                  onClick={handleGenerateReport}
                  disabled={!thereAreAnexes}
                  className={`${thereAreAnexes ? 'pulsate-fwd' : ''} w-9/12 rounded-2xl bg-gradient-to-r
								            from-indigo-600 via-indigo-700 to-indigo-700 px-4 py-1 text-xs 
											text-zinc-200 shadow hover:shadow-indigo-500  disabled:from-gray-400 
											disabled:via-gray-500 disabled:to-gray-600 disabled:shadow-none
											sm:w-6/12  lg:w-40 xl:text-sm`}>
                  Generar Reporte
                </button>
              </div>
            </div>
          </div>
          {/* Spinner */}
          {isLoading && (
            <div className='flex h-12 items-center justify-center bg-black opacity-70'>
              <Spinner />
            </div>
          )}
          {/* Results employees table */}
          {anexes !== null && isLoading === false && (
            <>
              {tableRender} {cardRender}
            </>
          )}
        </div>
      </Grow>
    </>
  );
};

export default FilterTemplate;
