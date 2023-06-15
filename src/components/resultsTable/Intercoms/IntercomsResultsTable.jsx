import { useDispatch, useSelector } from 'react-redux';
import { updatePagePagination } from '../../../features';

const IntercomsResultsTable = () => {
  const { currentPagePagination, maximumPagePagination, results, totalResults } = useSelector(state => state.fetch);
  const dispatch = useDispatch();

  const handleScroll = () => {
    if (currentPagePagination >= maximumPagePagination) {
      return;
    }
    const element = document.getElementById('div-intercoms-table');
    const tolerance = 1;

    if (element.scrollHeight <= element.offsetHeight + element.scrollTop + tolerance) {
      dispatch(updatePagePagination({ currentPagePagination: currentPagePagination + 1 }));
    }
  };

  return (
    <>
      <div
        className='flip-in-hor-top scroll-bar-secondary relative hidden overflow-y-auto shadow-md lg:block'
        onScroll={handleScroll}
        id='div-intercoms-table'
        style={{ height: '70vh' }}>
        {results && results.length > 0 ? (
          <div>
            <table
              id='Intercomunicadores-table'
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
                    Número de intercomunicador
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-1'>
                    Tipo de transporte
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-1'>
                    Restricción
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-1'>
                    Anexo para llamadas permitido
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-1'>
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.map((intercom, index) => (
                  <tr
                    key={intercom.id}
                    className={`border-b text-center text-xs odd:bg-white even:bg-sky-50 xl:text-sm`}>
                    <td className='px-2'>{index + 1}</td>
                    <td className='border-x px-5'>{intercom.intercom_number}</td>
                    <td className='border-x px-5'>{intercom.transport_type.description}</td>
                    <td className={`border-x px-6`}>{intercom.restriction.description}</td>
                    <td className={`border-x px-6`}>
                      {intercom.restrictions_id === 2 ? intercom.intercom_caller : 'No aplica'}
                    </td>
                    <td className={`border-x py-4 font-medium text-white`}>
                      <div className='flex justify-center'>
                        <div
                          className={`border bg-gradient-to-r shadow ${
                            intercom.status_id === 1
                              ? 'border-emerald-200 from-emerald-400 via-emerald-500 to-emerald-600 shadow-emerald-200'
                              : 'border-red-200 from-red-400 via-red-500 to-red-600 shadow-red-200'
                          } w-20 rounded-md py-1`}>
                          {intercom.status.description}
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

export default IntercomsResultsTable;
