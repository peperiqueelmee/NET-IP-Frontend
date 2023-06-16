import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import { ChangeOutline } from '../../../assets/icons';
import { updatePagePagination, updateInfoChangeStatus } from '../../../features';

const AnexResultsTable = () => {
  const { currentPagePagination, maximumPagePagination, results, totalResults } = useSelector(state => state.fetch);
  const dispatch = useDispatch();

  const handleScroll = () => {
    if (currentPagePagination >= maximumPagePagination) {
      return;
    }
    const element = document.getElementById('div-anexe-table');
    const tolerance = 1;

    if (element.scrollHeight <= element.offsetHeight + element.scrollTop + tolerance) {
      dispatch(updatePagePagination({ currentPagePagination: currentPagePagination + 1 }));
    }
  };

  const handleModalChangeStatus = (number, statusId, id) => {
    dispatch(
      updateInfoChangeStatus({
        id,
        type: 'anexo',
        number,
        statusId,
        urlUpdate: '/regular_anex/change-status/',
      })
    );
    document.getElementById('change-status').click();
  };

  return (
    <>
      <div
        className='flip-in-hor-top scroll-bar-secondary relative hidden overflow-y-auto shadow-md lg:block'
        onScroll={handleScroll}
        id='div-anexe-table'
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
                    Número de anexo
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-1'>
                    Departamento
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
                    Estado
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-1'>
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.map((anex, index) => (
                  <tr
                    key={anex.id}
                    className={`border-b text-center text-xs odd:bg-white even:bg-sky-50 xl:text-sm`}>
                    <td className='px-2'>{index + 1}</td>
                    <td className='border-x px-5'>{anex.number}</td>
                    <td className='border-x px-1'>{anex.department.description}</td>
                    <td className='border-x px-5'>{anex.transport_type.description}</td>
                    <td className={`border-x px-6`}>{anex.restriction.description}</td>
                    <td className={`border-x py-4 font-medium text-white`}>
                      <div className='flex justify-center'>
                        <div
                          className={`border bg-gradient-to-r shadow ${
                            anex.status_id === 1
                              ? 'border-emerald-200 from-emerald-400 via-emerald-500 to-emerald-600 shadow-emerald-200'
                              : 'border-red-200 from-red-400 via-red-500 to-red-600 shadow-red-200'
                          } w-20 rounded-md py-1`}>
                          {anex.status.description}
                        </div>
                      </div>
                    </td>
                    <td className='border-x px-2 py-2'>
                      <div className='flex justify-center gap-2'>
                        <div
                          data-tooltip-id='change-status-anexe'
                          data-tooltip-delay-show={100}
                          onClick={() => handleModalChangeStatus(anex.number, anex.status_id, anex.id)}>
                          <ChangeOutline className={'cursor-pointer text-lg text-blue-800'} />
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
      <Tooltip
        className='text-xs'
        id='change-status-anexe'
        place='bottom'
        variant='info'
        content='Cambiar estado'
      />
    </>
  );
};

export default AnexResultsTable;
