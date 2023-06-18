import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePagePagination, addResults, updateTotalResults } from '../../../features';
import { useAxios } from '../../../hooks';

const LogsResultsTable = () => {
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
    const element = document.getElementById('div-log-table');
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
      <div
        className='flip-in-hor-top scroll-bar-secondary relative hidden overflow-y-auto shadow-md lg:block'
        onScroll={handleScroll}
        id='div-log-table'
        style={{ height: '70vh' }}>
        {results && results.length > 0 ? (
          <div>
            <table
              id='Anexos-table'
              className='w-full text-center text-gray-500'>
              <thead className='sticky top-0 border border-zinc-200 bg-gradient-to-r from-gray-50 via-zinc-50 to-neutral-50 text-xs text-gray-600 opacity-95'>
                <tr>
                  <th
                    scope='col'
                    className='px-1 py-1'>
                    Nº
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-1'>
                    Usuario
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-1'>
                    Nombre Completo
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-1'>
                    Descripción
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-1'>
                    Fecha
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-1'>
                    Evento
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.map((log, index) => (
                  <tr
                    key={log.id}
                    className={`border-b text-center text-xs odd:bg-white even:bg-sky-50 xl:text-sm`}>
                    <td className='px-2'>{index + 1}</td>
                    <td className='border-x px-5'>{log.employee.username}</td>
                    <td className={`border-x px-3`}>{log.employee.fullName}</td>
                    <td className='border-x px-5'>{log.log_description}</td>
                    <td className='border-x px-1'>{log.formatted_log_time}</td>
                    <td className={`border-x py-4 font-medium text-white`}>
                      <div className='flex justify-center'>
                        <div
                          className={`border bg-gradient-to-r shadow ${
                            log.sys_event.id === 1
                              ? 'border-emerald-200 from-emerald-400 via-emerald-500 to-emerald-600 shadow-emerald-200'
                              : 'border-blue-200 from-blue-400 via-blue-500 to-blue-600 shadow-blue-200'
                          } w-24 rounded-md py-1`}>
                          {log.sys_event.event_type}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='sticky bottom-0 bg-stone-950 bg-opacity-70 py-1 text-center text-sm font-medium tracking-wide text-slate-200'>
              Mostrando <span className='font-bold text-blue-400'>{results.length}</span> de{' '}
              <span className='font-bold text-blue-500 '>{totalResults}</span>{' '}
              {results.length === 1 ? 'resultado' : 'resultados'}.
            </div>
          </div>
        ) : (
          <div className='flex justify-center bg-stone-950 bg-opacity-70 text-sm font-medium tracking-wide text-red-500'>
            <p>No se encontraron resultados.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default LogsResultsTable;
