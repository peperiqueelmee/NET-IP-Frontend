import { usePagination } from '../../../hooks';
import { Badge } from '../../index.js';

const AnexesResultsCards = ({ anexes, totalResults }) => {
  const { page, setPage, hasMore } = usePagination();

  const handleScroll = () => {
    const element = document.getElementById('anexes-card');
    const tolerance = 1;

    if (hasMore && element.scrollHeight <= element.offsetHeight + element.scrollTop + tolerance) {
      setTimeout(() => {
        setPage(page + 1);
      }, 50);
    }
  };
  return (
    <>
      <div className='block lg:hidden'>
        {anexes && anexes.length > 0 ? (
          <>
            <div className='rounded-b-md bg-stone-950 bg-opacity-70 py-1 text-center text-xs font-medium tracking-wide text-slate-200'>
              Mostrando <span className='font-bold text-blue-400'>{anexes.length}</span> de{' '}
              <span className='font-bold text-blue-500 '>{totalResults}</span>{' '}
              {anexes.length === 1 ? 'resultado' : 'resultados'}.
            </div>
            <div
              className='overflow-y-auto scroll-bar-secondary'
              style={{ height: '50vh' }}
              onScroll={handleScroll}
              id='anexes-card'>
              {anexes.map((anex, index) => (
                <div
                  key={anex.id}
                  className='relative mt-2 flex gap-5 rounded-lg border-2 border-lime-100 bg-gradient-to-r from-gray-50 to-slate-100 px-2 py-2 text-xs opacity-90 shadow-2xl'>
                  {/*  Badge */}
                  <Badge index={index + 1} />
                  {/* Content */}
                  <div className='ml-3 mt-2 flex w-full flex-col gap-1 tracking-wide'>
                    <div className='flex w-full'>
                      <div className='w-1/3 font-bold text-gray-700 sm:w-1/2'>Nro de anexo:</div>
                      <div className='w-1/2'>{anex.anex_number}</div>
                    </div>
                    <div className='flex w-full'>
                      <div className='w-1/3 font-bold text-gray-700 sm:w-1/2'>Departamento:</div>
                      <div className='w-1/2'>{anex.department.description}</div>
                    </div>
                    <div className='flex w-full'>
                      <div className='w-1/3 font-bold text-gray-700 sm:w-1/2'>T. Transporte:</div>
                      <div className='w-1/2'>{anex.transport_type.description}</div>
                    </div>
                    <div className='flex w-full'>
                      <div className='w-1/3 font-bold text-gray-700 sm:w-1/2'>Restricción:</div>
                      <div className='w-1/2'>{anex.restriction.description}</div>
                    </div>
                    <div className='flex w-full'>
                      <div className='w-1/3 font-bold text-gray-700 sm:w-1/2'>Estado:</div>
                      <div
                        className={`w-1/2 font-medium text-emerald-600
													${anex.status_id === 1 ? 'text-emerald-500' : 'text-red-600'}`}>
                        {anex.status.description}
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

export default AnexesResultsCards;
