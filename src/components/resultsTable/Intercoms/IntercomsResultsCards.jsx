import { useDispatch, useSelector } from 'react-redux';
import { updateInfoChangeStatus, updatePagePagination } from '../../../features';
import { Badge } from '../../index.js';

const IntercomsResultsCards = () => {
  const { currentPagePagination, maximumPagePagination, results, totalResults } = useSelector(state => state.fetch);
  const dispatch = useDispatch();

  const handleScroll = () => {
    if (currentPagePagination >= maximumPagePagination) {
      return;
    }
    const element = document.getElementById('intercom-card');
    const tolerance = 1;

    if (element.scrollHeight <= element.offsetHeight + element.scrollTop + tolerance) {
      dispatch(updatePagePagination({ currentPagePagination: currentPagePagination + 1 }));
    }
  };
  const handleModalChangeStatus = (number, statusId, id) => {
    dispatch(
      updateInfoChangeStatus({
        id,
        type: 'intercomunicador',
        number,
        statusId,
        urlUpdate: '/intercom/change-status/',
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
              id='intercom-card'>
              {results.map((intercom, index) => (
                <div
                  key={intercom.id}
                  className='relative mt-2 flex gap-5 flex-col rounded-lg border-2 border-lime-100 bg-gradient-to-r from-gray-50 to-slate-100 px-2 py-2 text-xs opacity-90 shadow-2xl'>
                  {/*  Badge */}
                  <Badge index={index + 1} />
                  {/* Content */}
                  <div className='ml-3 mt-2 flex w-full flex-col gap-1 tracking-wide'>
                    <div className='flex w-full'>
                      <div className='w-1/2 font-bold text-gray-700'>Nro de intercomunicador:</div>
                      <div className='w-1/2'>{intercom.number}</div>
                    </div>
                    <div className='flex w-full'>
                      <div className='w-1/2 font-bold text-gray-700'>T. Transporte:</div>
                      <div className='w-1/2'>{intercom.transport_type.description}</div>
                    </div>
                    <div className='flex w-full'>
                      <div className='w-1/2 font-bold text-gray-700'>Restricción:</div>
                      <div className='w-1/2'>{intercom.restriction.description}</div>
                    </div>
                    <div className='flex w-full'>
                      <div className='w-1/2 font-bold text-gray-700'>A. Permitido:</div>
                      <div className='w-1/2'>
                        {intercom.restrictions_id === 2 ? intercom.intercom_caller : 'No aplica'}
                      </div>
                    </div>
                    <div className='flex w-full'>
                      <div className='w-1/2 font-bold text-gray-700'>Estado:</div>
                      <div
                        className={`w-1/2 font-medium text-emerald-600
													${intercom.status_id === 1 ? 'text-emerald-500' : 'text-red-600'}`}>
                        {intercom.status.description}
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-center'>
                    <button
                      onClick={() => handleModalChangeStatus(intercom.number, intercom.status_id, intercom.id)}
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

export default IntercomsResultsCards;
