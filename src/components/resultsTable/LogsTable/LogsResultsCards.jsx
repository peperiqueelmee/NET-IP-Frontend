import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addResults, updatePagePagination } from '../../../features';
import { useAxios } from '../../../hooks';
import { Badge } from '../../index.js';

const LogsResultsCards = () => {
  const { resultsByPagination, currentPagePagination, maximumPagePagination, results, totalResults } = useSelector(
    state => state.fetch
  );
  //Request.
  const { makeRequest } = useAxios();
  // Status redux update.
  const dispatch = useDispatch();

  useEffect(() => {
    getLogs();
  }, []);

  useEffect(() => {
    if (currentPagePagination > 1) {
      getLogs();
    }
  }, [currentPagePagination]);

  const handleScroll = () => {
    if (currentPagePagination >= maximumPagePagination) {
      return;
    }
    const element = document.getElementById('logs-card');
    const tolerance = 1;

    if (element.scrollHeight <= element.offsetHeight + element.scrollTop + tolerance) {
      dispatch(updatePagePagination({ currentPagePagination: currentPagePagination + 1 }));
    }
  };

  async function getLogs() {
    try {
      const url = `/log/get?page=${currentPagePagination}`;
      const { data, total } = await makeRequest(url);

      const maximumPagePagination = Math.ceil(total / resultsByPagination);
      dispatch(updatePagePagination({ maximumPagePagination }));
      dispatch(updateTotalResults(total));
      if (currentPagePagination < 2) {
        return dispatch(addResults(data));
      }
      dispatch(addResults([...results, ...data]));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className='block lg:hidden'>
        {results && results.length > 0 ? (
          <>
            <div className='rounded-b-md bg-stone-950 bg-opacity-70 py-1 text-center text-xs font-medium tracking-wide text-slate-200'>
              Mostrando <span className='font-bold text-blue-400'>{results.length}</span> de{' '}
              <span className='font-bold text-blue-500 '>{totalResults}</span>{' '}
              {results.length === 1 ? 'resultado' : 'resultados'}.
            </div>
            <div
              className='overflow-y-auto'
              style={{ height: '50vh' }}
              onScroll={handleScroll}
              id='logs-card'>
              {results.map((log, index) => (
                <div
                  key={log.id}
                  className='relative mt-2 flex flex-col gap-5 rounded-lg border-2 border-lime-100 bg-gradient-to-r from-gray-50 to-slate-100 px-2 py-2 text-xs opacity-90 shadow-2xl'>
                  {/*  Badge */}
                  <Badge index={index + 1} />
                  {/* Content */}
                  <div className='ml-3 mt-2 flex w-full flex-col gap-1 px-1 tracking-wide'>
                    <div className='flex w-full gap-1'>
                      <div className='w-1/3 font-bold text-gray-700'>Usuario:</div>
                      <div className='w-2/3'>{log.employee.username}</div>
                    </div>
                    <div className='flex w-full gap-1'>
                      <div className='w-1/3 font-bold text-gray-700'>Nombre Completo:</div>
                      <div className='w-1/3'>{log.employee.fullName}</div>
                    </div>
                    <div className='flex w-full gap-1'>
                      <div className='w-1/3 font-bold text-gray-700'>Descripción:</div>
                      <div className='w-2/3'>{log.log_description}</div>
                    </div>
                    <div className='flex w-full gap-1'>
                      <div className='w-1/3 font-bold text-gray-700'>Fecha:</div>
                      <div className='w-1/3'>{log.formatted_log_time}</div>
                    </div>
                    <div className='flex w-full gap-1'>
                      <div className='w-1/3 font-bold text-gray-700'>Evento:</div>
                      <div
                        className={`w-1/3 font-medium
													${log.sys_event.id === 1 ? 'text-emerald-500' : 'text-blue-600'}`}>
                        {log.sys_event.event_type}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className='flex justify-center bg-stone-950 bg-opacity-70 text-xs font-medium tracking-wide text-red-500'>
            <p>No se encontraron resultados.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default LogsResultsCards;
