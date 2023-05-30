import { usePagination } from '../../../hooks';

const IntercomsResultsTable = ({ intercoms, totalResults }) => {
  const { page, setPage, hasMore } = usePagination();

  const handleScroll = () => {
    const element = document.getElementById('div-intercoms-table');
    const tolerance = 1;

    if (hasMore && element.scrollHeight <= element.offsetHeight + element.scrollTop + tolerance) {
      setTimeout(() => {
        setPage(page + 1);
      }, 50);
    }
  };

  return (
    <>
      <div
        className='flip-in-hor-top relative hidden overflow-y-auto shadow-md lg:block scroll-bar-secondary'
        onScroll={handleScroll}
        id='div-intercoms-table'
        style={{ height: '70vh' }}>
        {intercoms && intercoms.length > 0 ? (
          <div>
            <table
              id='Intercomunicadores-table'
              className='w-full text-center text-gray-500'>
              <thead className='sticky top-0 border-b-2 border-zinc-300 bg-gradient-to-r from-gray-200 via-zinc-200 to-neutral-200 text-xs text-gray-700 opacity-95'>
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
                {intercoms.map((intercom, index) => (
                  <tr
                    key={intercom.id}
                    className={`border-b text-center text-xs odd:bg-white even:bg-slate-100 xl:text-sm`}>
                    <td className='px-2'>{index + 1}</td>
                    <td className='border-x px-5'>{intercom.intercom_number}</td>
                    <td className='border-x px-5'>{intercom.transport_type.description}</td>
                    <td className={`border-x px-6`}>{intercom.restriction.description}</td>
                    <td className={`border-x px-6`}>
                      {intercom.restrictions_id === 2 ? intercom.intercom_caller : 'No aplica'}
                    </td>
                    <td
                      className={`border-x px-4 py-4 font-medium 
										${intercom.status_id === 1 ? 'text-emerald-500' : 'text-red-600'}`}>
                      {intercom.status.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='sticky bottom-0 bg-stone-950 bg-opacity-70 py-1 text-center text-sm font-medium tracking-wide text-slate-200'>
              Mostrando <span className='font-bold text-blue-400'>{intercoms.length}</span> de{' '}
              <span className='font-bold text-blue-500 '>{totalResults}</span>{' '}
              {intercoms.length === 1 ? 'resultado' : 'resultados'}.
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
