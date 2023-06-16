import { useDispatch, useSelector } from 'react-redux';
import { updateInfoChangeStatus, updatePagePagination } from '../../../features';
import { Badge } from '../../index.js';

const MCRResultsCards = () => {
  const { currentPagePagination, maximumPagePagination, results, totalResults } = useSelector(state => state.fetch);
  const dispatch = useDispatch();

  const handleScroll = () => {
    if (currentPagePagination >= maximumPagePagination) {
      return;
    }
    const element = document.getElementById('mcr-card');
    const tolerance = 1;

    if (element.scrollHeight <= element.offsetHeight + element.scrollTop + tolerance) {
      dispatch(updatePagePagination({ currentPagePagination: currentPagePagination + 1 }));
    }
  };

  const handleModalChangeStatus = (number, statusId, id) => {
    dispatch(
      updateInfoChangeStatus({
        id,
        type: 'multi call ringing',
        number,
        statusId,
        urlUpdate: '/mcr/change-status/',
      })
    );
    document.getElementById('change-status').click();
  };
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
              id='mcr-card'>
              {results.map((multiCallRinging, index) => (
                <div
                  key={multiCallRinging.id}
                  className='relative mt-2 flex flex-col gap-5 rounded-lg border-2 border-lime-100 bg-gradient-to-r from-gray-50 to-slate-100 px-2 py-2 text-xs opacity-90 shadow-2xl'>
                  {/*  Badge */}
                  <Badge index={index + 1} />
                  {/* Content */}
                  <div className='ml-3 mt-2 flex w-full flex-col gap-1 tracking-wide'>
                    <div className='flex w-full'>
                      <div className='w-1/2 font-bold text-gray-700'>Nro de MCR:</div>
                      <div className='w-1/2'>{multiCallRinging.number}</div>
                    </div>
                    <div className='flex w-full'>
                      <div className='w-1/2 font-bold text-gray-700'>Departamento:</div>
                      <div className='w-1/2'>{multiCallRinging.department.description}</div>
                    </div>
                    <div className='flex w-full'>
                      <div className='w-1/2 font-bold text-gray-700'>T. Transporte:</div>
                      <div className='w-1/2'>{multiCallRinging.transport_type.description}</div>
                    </div>
                    <div className='flex w-full'>
                      <div className='w-1/2 font-bold text-gray-700'>Restricción:</div>
                      <div className='w-1/2'>{multiCallRinging.restriction.description}</div>
                    </div>
                    <div className='flex w-full'>
                      <div className='w-1/2 font-bold text-gray-700'>Nro(s) de anexo(s):</div>
                      <div className='w-1/2'>{multiCallRinging.mcr_call_anexes}</div>
                    </div>
                    <div className='flex w-full'>
                      <div className='w-1/2 font-bold text-gray-700'>Estado:</div>
                      <div
                        className={`w-1/2 font-medium text-emerald-600
													${multiCallRinging.status_id === 1 ? 'text-emerald-500' : 'text-red-600'}`}>
                        {multiCallRinging.status.description}
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-center'>
                    <button
                      onClick={() => handleModalChangeStatus(multiCallRinging.number, multiCallRinging.status_id, multiCallRinging.id)}
                      className='w-5/12 rounded-xl border border-blue-300
												   bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600	
												 py-1 text-xs font-bold text-slate-200 shadow-sm shadow-blue-400 hover:bg-gradient-to-r hover:from-blue-500 hover:via-blue-600 hover:to-blue-700'>
                      Cambiar estado
                    </button>
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

export default MCRResultsCards;
