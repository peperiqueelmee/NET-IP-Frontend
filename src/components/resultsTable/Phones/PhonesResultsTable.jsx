import { usePagination } from '../../../hooks';

const PhonesResultsTable = ({ phones, totalResults }) => {
  const { page, setPage, hasMore } = usePagination();

  const handleScroll = () => {
    const element = document.getElementById('div-phone-table');
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
        className='flip-in-hor-top scroll-bar-secondary relative hidden overflow-y-auto shadow-md lg:block'
        onScroll={handleScroll}
        id='div-phone-table'
        style={{ height: '70vh' }}>
        {phones && phones.length > 0 ? (
          <div>
            <table
              id='phone-table'
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
                    Número Telefónico
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-1'>
                    Cliente
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-1'>
                    RUT
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-1'>
                    Dirección
                  </th>

                  <th
                    scope='col'
                    className='px-5 py-1'>
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody>
                {phones.map((phone, index) => (
                  <tr
                    key={phone.id}
                    className={`border-b text-center text-xs odd:bg-white even:bg-sky-50 xl:text-sm`}>
                    <td className='px-2'>{index + 1}</td>
                    <td className='border-x px-5'>+{phone.phone_number}</td>
                    <td className='border-x px-5'>{phone.client.fullName}</td>
                    <td className='border-x px-1'>{phone.client.rut}</td>
                    <td className={`border-x px-6`}>{phone.client.address}</td>
                    <td className={`border-x py-4 font-medium text-white`}>
                      <div className='flex justify-center'>
                        <div
                          className={`border bg-gradient-to-r shadow ${
                            phone.status_id === 1
                              ? 'border-emerald-200 from-emerald-400 via-emerald-500 to-emerald-600 shadow-emerald-200'
                              : 'border-red-200 from-red-400 via-red-500 to-red-600 shadow-red-200'
                          } w-20 rounded-md py-1`}>
                          {phone.status.description}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='sticky bottom-0 bg-stone-950 bg-opacity-70 py-1 text-center text-sm font-medium tracking-wide text-slate-200'>
              Mostrando <span className='font-bold text-blue-400'>{phones.length}</span> de{' '}
              <span className='font-bold text-blue-500 '>{totalResults}</span>{' '}
              {phones.length === 1 ? 'resultado' : 'resultados'}.
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

export default PhonesResultsTable;
