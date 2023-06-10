import Grow from '@mui/material/Grow';
import { useEffect, useState } from 'react';
import { SearchFill } from '../../assets/icons';
import axiosClient from '../../config/axios';
import { useAction, usePagination, useReport } from '../../hooks';
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
  const { page, setPage, setHasMore } = usePagination();
  const [isLoading, setLoading] = useState(null);
  const [anexes, setAnexes] = useState([]);
  const [totalAnexes, setTotalAnexes] = useState(null);
  const { selectedAction, selectedActionUsers, setSelectActionUsers } = useAction();
  const thereAreAnexes = Array.isArray(anexes) && anexes.length > 0;
  // Report.
  const { setTableName, setFilename } = useReport();
  // Data user.
  const [anexe, setAnexe] = useState('');
  // Buttons.
  const createAnex = 1;
  const listAllAnexes = 2;
  const listActiveAnexes = 3;
  const listBlockedAnexes = 4;
  const searchByAnex = 5;
  // Status anexes.
  const active = 1;
  const blocked = 3;

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
    handleSelectedAction();
  }, [page]);
  useEffect(() => {
    resetPhones();
  }, [selectedAction]);
  useEffect(() => {
    if (
      selectedActionUsers === listAllAnexes ||
      selectedActionUsers === listActiveAnexes ||
      selectedActionUsers === listBlockedAnexes
    ) {
      cleanPaginationPhones();
    }
  }, [selectedActionUsers]);

  // Handles.
  const handleSelectedAction = async () => {
    switch (selectedActionUsers) {
      case listAllAnexes:
        await getAllAnexes();
        break;
      case listActiveAnexes:
        await getAnexesByStatus(active);
        break;
      case listBlockedAnexes:
        await getAnexesByStatus(blocked);
        break;
      default:
        break;
    }
  };
  const handleButtonClick = index => {
    setSelectActionUsers(index);
  };
  const handleListAllAnexes = async () => {
    setLoading(true);
    try {
      const url = `/${urlFetch}`;
      const { data } = await axiosClient(url);
      console.log(data);
      setAnexes(data.data);
      setTotalAnexes(data.total);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleListAnexeByNumber = async e => {
    if (!e) {
      return;
    }
    e.preventDefault();
    setLoading(true);
    try {
      const url = `/${urlFetch}/${anexe}`;
      const { data } = await axiosClient(url);
      setAnexes(data.data);
      setTotalAnexes(data.total);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setAnexes('');
    }
  };
  const handleListAnexesByStatus = async status => {
    setLoading(true);
    try {
      const url = `/${urlFetch}/status/${status}`;
      const { data } = await axiosClient(url);
      setAnexes(data.data);
      setTotalAnexes(data.total);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setAnexes('');
    }
  };
  const handleGenerateReport = () => {
    setTableName(`${pluralTitle}-table`);
    setFilename(`Reporte-${pluralTitle}`);
    document.getElementById('generate-report').click();
  };

  // Pagination.
  const getAllAnexes = async () => {
    if (anexes.length === totalAnexes) {
      return setHasMore(false);
    }
    try {
      const url = `/${urlFetch}/?page=${page}`;
      const { data } = await axiosClient(url);
      setAnexes([...anexes, ...data.data]);
      if (anexes.length === totalAnexes) {
        setHasMore(false);
      }
    } catch (error) {
      setHasMore(false);
    }
  };
  const getAnexesByStatus = async status => {
    if (anexes.length === totalAnexes) {
      return setHasMore(false);
    }
    try {
      const url = `/${urlFetch}/status/${status}?page=${page}`;
      const { data } = await axiosClient(url);
      setAnexes([...anexes, ...data.data]);
      if (anexes.length === totalAnexes) {
        setHasMore(false);
      }
    } catch (error) {
      setHasMore(false);
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
    setHasMore(true);
    setPage(1);
  };
  const cleanPaginationPhones = () => {
    setPage(1);
    setHasMore(true);
    setAnexes([]);
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
                    handleButtonClick(createAnex);
                  }}
                  className={`w-9/12 rounded-2xl bg-gray-200 px-4 
							py-1 text-xs shadow hover:shadow-lime-400 sm:w-6/12 lg:w-32 xl:text-sm
							${
                selectedActionUsers === createAnex
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
                      handleListAllAnexes();
                      handleButtonClick(listAllAnexes);
                    }}
                    className={`w-full rounded-2xl bg-gray-200 px-4
											    py-1 text-xs shadow hover:shadow-lime-400 lg:w-32 xl:text-sm
												${
                          selectedActionUsers === listAllAnexes
                            ? 'bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 text-white'
                            : 'text-zinc-700 '
                        }`}>
                    Todos
                  </button>
                  <div className='flex justify-center gap-1'>
                    <button
                      onClick={() => {
                        handleListAnexesByStatus(active);
                        handleButtonClick(listActiveAnexes);
                      }}
                      className={`w-full rounded-2xl bg-gray-200 px-4 
													py-1 text-xs shadow hover:shadow-lime-400 lg:w-32 xl:text-sm
													${
                            selectedActionUsers === listActiveAnexes
                              ? 'bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 text-white'
                              : 'text-zinc-700'
                          }`}>
                      Activos
                    </button>
                    <button
                      onClick={() => {
                        handleListAnexesByStatus(blocked);
                        handleButtonClick(listBlockedAnexes);
                      }}
                      className={`w-full rounded-2xl bg-gray-200 px-4 
													py-1 text-xs shadow hover:shadow-lime-400 lg:w-32 xl:text-sm
													${
                            selectedActionUsers === listBlockedAnexes
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
                  onSubmit={handleListAnexeByNumber}
                  className='flex w-9/12 items-center sm:w-6/12 lg:w-auto'>
                  <input
                    value={anexe}
                    onChange={e => setAnexe(e.target.value)}
                    onClick={() => handleButtonClick(searchByAnex)}
                    className='h-6 w-full rounded-l-2xl pl-4 text-xs text-zinc-500 outline-none focus:border focus:border-lime-400 xl:text-sm'
                    type='text'
                    placeholder={`Ingrese ${singularTitle}`}
                  />
                  <button
                    type='submit'
                    onClick={() => {
                      handleListAnexeByNumber();
                      handleButtonClick(searchByAnex);
                    }}
                    className={`flex h-6 w-9 cursor-pointer items-center justify-center rounded-r-2xl bg-gray-200 
												shadow hover:shadow-lime-400 
												${
                          selectedActionUsers === searchByAnex
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
