import Grow from '@mui/material/Grow';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchFill } from '../../assets/icons';
import axiosClient from '../../config/axios';
import { updateInfoEmployees } from '../../features/employees/employeeSlice';
import { useAction } from '../../hooks';
import { APPLICATION_STATES, USER_ACTIONS } from '../../utils/utils';
import InfoTooltip from '../Others/InfoTooltip';
import { EmployeesResultsCards, EmployeesResultsTable, Spinner } from '../index.js';

const buttonStylesActivated = 'bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 text-white';
const buttonStylesNormal = 'rounded-2xl bg-gray-200 px-4 py-1 text-xs shadow hover:shadow-lime-400 xl:text-sm';

const TrunkManagement = () => {
  //User experience.
  const [isLoading, setLoading] = useState(null);
  const { selectedAction, selectedActionUsers, setSelectActionUsers } = useAction();
  //Data.
  const { employees } = useSelector(state => state.employees);
  // Data user
  const [employeeRut, setEmployeeRut] = useState('');
  // Status update.
  const dispatch = useDispatch();

  useEffect(() => {
    setSelectActionUsers(null);
    dispatch(updateInfoEmployees({ employees: null }));
    setEmployeeRut('');
  }, [selectedAction]);

  // Handles.
  const handleChangeAction = index => {
    setSelectActionUsers(index);
  };
  const handleFetchEmployees = async (type, status = null, e = null) => {
    setLoading(true);
    if (type === 'rut') {
      if (!e) {
        return;
      }
      e.preventDefault();
    }
    const urlPaths = {
      all: '/employee/employees',
      rut: `/employee/employees/${employeeRut}`,
      status: `/employee/employees/status/${status}`,
    };
    const url = urlPaths[type];
    try {
      const { data } = await axiosClient(url);
      dispatch(updateInfoEmployees({ employees: data.data, totalEmployees: data.total }));
    } catch (error) {
      dispatch(updateInfoEmployees({ employees: null }));
    } finally {
      setLoading(false);
    }
  };

  //Support functions.
  const modalCreateEmployee = () => {
    dispatch(updateInfoEmployees({ employees: null }));
    document.getElementById('createEmployee').click();
  };

  return (
    <>
      {selectedAction === 1 && (
        <Grow
          in={selectedAction === 1}
          timeout={500}>
          <div className={'pb-14'}>
            {/* Container */}
            <div
              className='flex w-full flex-col justify-center 
									gap-1 rounded-none bg-gradient-to-r from-cyan-950 via-blue-950 to-cyan-950 px-1 py-1.5 opacity-90 lg:flex-row lg:gap-5'>
              {/* User Management */}
              <div className='flex flex-col items-center justify-evenly gap-y-1 rounded-lg border border-lime-400 px-4 py-2 text-xs font-medium xl:text-sm'>
                <div className='text-lime-400'>Gestión cuentas de usuario</div>
                <div className='flex w-9/12 sm:w-6/12 lg:w-auto'>
                  <button
                    onClick={() => {
                      modalCreateEmployee();
                      handleChangeAction(USER_ACTIONS.Create);
                    }}
                    className={`w-full lg:w-32 ${buttonStylesNormal}
							            ${selectedActionUsers === USER_ACTIONS.Create ? buttonStylesActivated : buttonStylesNormal}`}>
                    Crear Usuario
                  </button>
                </div>
              </div>
              {/* List of user accounts */}
              <div className='flex flex-col items-center justify-evenly gap-y-1 rounded-lg border border-lime-400 px-4 py-2 text-xs font-medium xl:text-sm'>
                <div className='text-lime-400'>Listado cuentas de usuario</div>
                <div className='flex w-9/12 flex-col gap-2 sm:w-6/12 lg:w-auto lg:flex-row'>
                  <button
                    onClick={() => {
                      handleFetchEmployees('all');
                      handleChangeAction(USER_ACTIONS.ListAll);
                    }}
                    className={`w-full lg:w-32 ${buttonStylesNormal}
												${selectedActionUsers === USER_ACTIONS.ListAll ? buttonStylesActivated : 'text-zinc-700 '}`}>
                    Todos
                  </button>
                  <div className='flex justify-center gap-1'>
                    <button
                      onClick={() => {
                        handleFetchEmployees('status', APPLICATION_STATES.Active);
                        handleChangeAction(USER_ACTIONS.ListActive);
                      }}
                      className={`w-full lg:w-32 ${buttonStylesNormal}
													${selectedActionUsers === USER_ACTIONS.ListActive ? buttonStylesActivated : 'text-zinc-700'}`}>
                      Activos
                    </button>
                    <button
                      onClick={() => {
                        handleFetchEmployees('status', APPLICATION_STATES.Inactive);
                        handleChangeAction(USER_ACTIONS.ListInactive);
                      }}
                      className={`w-full lg:w-32 ${buttonStylesNormal}
													${selectedActionUsers === USER_ACTIONS.ListInactive ? buttonStylesActivated : 'text-zinc-700'}`}>
                      Inactivos
                    </button>
                  </div>
                </div>
              </div>
              {/* Search by rut */}
              <div className='flex flex-col items-center justify-evenly gap-y-1 rounded-lg border border-lime-400 px-4 py-2 text-xs font-medium xl:text-sm'>
                <div className='flex items-center gap-1'>
                  <div className='text-lime-400'>Búsqueda por RUT</div>
                  <div style={{ marginTop: '3px' }}>
                    <InfoTooltip info={'El formato de rut debe ser 12345678-9'} />
                  </div>
                </div>
                <form
                  onSubmit={e => handleFetchEmployees('rut', null, e)}
                  className='flex w-9/12 items-center sm:w-6/12 lg:w-auto'>
                  <input
                    value={employeeRut}
                    onChange={e => setEmployeeRut(e.target.value)}
                    onClick={() => handleChangeAction(USER_ACTIONS.ListByOne)}
                    className='h-6 w-full rounded-l-2xl pl-4 text-xs text-zinc-500 outline-none focus:border focus:border-lime-400 xl:text-sm'
                    type='text'
                    placeholder='Ingresa RUT de usuario'
                  />
                  <button
                    type='submit'
                    onClick={() => {
                      handleFetchEmployees('rut');
                      handleChangeAction(USER_ACTIONS.ListByOne);
                    }}
                    className={`flex h-6 w-9 cursor-pointer items-center justify-center rounded-r-2xl bg-gray-200 
												shadow hover:shadow-lime-400 
												${selectedActionUsers === USER_ACTIONS.ListByOne ? buttonStylesActivated : 'text-zinc-700'}`}>
                    <SearchFill />
                  </button>
                </form>
              </div>
            </div>
            {/* Spinner */}
            {isLoading && (
              <div className='flex h-12 items-center justify-center bg-black opacity-70'>
                <Spinner />
              </div>
            )}
            {/* Results employees table */}
            {employees !== null && isLoading === false && (
              <>
                <EmployeesResultsTable />
                <EmployeesResultsCards />
              </>
            )}
          </div>
        </Grow>
      )}
    </>
  );
};

export default TrunkManagement;
