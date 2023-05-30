import { usePagination } from '../../../hooks';

const AnexResultsTable = ({ anexes, totalResults }) => {
  const { page, setPage, hasMore } = usePagination();

  const handleScroll = () => {
    const element = document.getElementById('div-anexe-table');
    const tolerance = 1;

    console.log(hasMore);
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
        id='div-anexe-table'
        style={{ height: '70vh' }}>
        {anexes && anexes.length > 0 ? (
          <div>
            <table
              id='Anexos-table'
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
                </tr>
              </thead>
              <tbody>
                {anexes.map((anex, index) => (
                  <tr
                    key={anex.id}
                    className={`border-b text-center text-xs odd:bg-white even:bg-slate-100 xl:text-sm`}>
                    <td className='px-2'>{index + 1}</td>
                    <td className='border-x px-5'>{anex.anex_number}</td>
                    <td className='border-x px-1'>{anex.department.description}</td>
                    <td className='border-x px-5'>{anex.transport_type.description}</td>
                    <td className={`border-x px-6`}>{anex.restriction.description}</td>
                    <td
                      className={`border-x px-4 py-4 font-medium 
										${anex.status_id === 1 ? 'text-emerald-500' : 'text-red-600'}`}>
                      {anex.status.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='sticky bottom-0 bg-stone-950 bg-opacity-70 py-1 text-center text-sm font-medium tracking-wide text-slate-200'>
              Mostrando <span className='font-bold text-blue-400'>{anexes.length}</span> de{' '}
              <span className='font-bold text-blue-500 '>{totalResults}</span>{' '}
              {anexes.length === 1 ? 'resultado' : 'resultados'}.
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

export default AnexResultsTable;
