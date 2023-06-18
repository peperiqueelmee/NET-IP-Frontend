import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ExitDoorFill, HelpBuoyFill, UserFill } from '../assets/icons';
import {
  Actions,
  FilterTemplate,
  LogsResultsCards,
  LogsResultsTable,
  ModalChangeStatusAnexe,
  ModalCreateEmployee,
  ModalCreateExtension,
  ModalCreateIntercom,
  ModalCreateMultiCallRinging,
  ModalEditEmployee,
  ModalGenerateReport,
  ModalLogout,
  Title,
  TrunkManagement,
  Users
} from '../components';
import { updateInfoEmployees } from '../features/employees/employeeSlice';
import { useAction, useAxios, useReport } from '../hooks';

const Home = () => {
  //Request.
  const { makeRequest } = useAxios();
  // Report.
  const { tableName, filename } = useReport();
  // Data user.
  const { rut, token, username } = useSelector(state => state.authentication);
  // Navigation .
  const navigate = useNavigate();
  const { selectedAction } = useAction();
  // Status redux update.
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener('popstate', blockBackButton);
    if (!token) {
      navigate('/');
    }
  }, []);

  // Support functions.
  const getEmployee = async rutEmployee => {
    try {
      const url = `/employee/employees/${rutEmployee}`;
      const { data } = await makeRequest(url);
      const employee = data[0];
      return employee;
    } catch (error) {
      console.log(error);
    }
  };
  const modalLogout = () => {
    document.getElementById('singOff').click();
  };
  const modalEditEmployee = async (e, rutEmployee) => {
    e.preventDefault();
    const employee = await getEmployee(rutEmployee);
    dispatch(updateInfoEmployees({ employee }));
    document.getElementById('editEmployee').click();
  };
  const blockBackButton = () => {
    navigate('/home');
    modalLogout();
  };

  return (
    <div className='home-page scroll-bar-primary h-screen overflow-y-auto'>
      <div className={`container mx-auto px-3 sm:px-6 md:px-10 `}>
        <div className='flex flex-col items-center justify-between pt-10 lg:flex-row'>
          {/* Tittle */}
          <Title titleIsExpand={true} />
          {/* Buttons: Username, Help, Sing off */}
          <div className='mb-6 mt-6 hidden flex-row gap-3 sm:flex lg:mt-0 lg:flex-row'>
            <div
              className='cursor-pointer rounded-full border-2 border-lime-500 bg-gradient-to-r from-zinc-600 via-zinc-700 to-zinc-800 px-4 py-1 text-xs tracking-wide text-gray-200 shadow-md hover:bg-gradient-to-r hover:from-zinc-700 hover:via-zinc-800 hover:to-zinc-900 md:text-sm'
              onClick={e => modalEditEmployee(e, rut)}>
              <div className='flex items-center gap-1'>
                <UserFill className='text-xs text-lime-400 lg:text-sm' />
                <span className='flex w-full justify-center'>{username}</span>
              </div>
            </div>
            <div className='cursor-pointer rounded-full border-2 border-lime-500 bg-gradient-to-r from-zinc-600 via-zinc-700 to-zinc-800 px-4 py-1 text-xs tracking-wide text-gray-200 shadow-md hover:bg-gradient-to-r hover:from-zinc-700 hover:via-zinc-800 hover:to-zinc-900 md:text-sm'>
              <div className='flex items-center gap-1'>
                <HelpBuoyFill className='text-xs text-lime-400 lg:text-sm' />
                <span className='flex w-full justify-center'>Ayuda</span>
              </div>
            </div>
            <div
              className='cursor-pointer rounded-full border-2 border-lime-500 bg-gradient-to-r from-zinc-600 via-zinc-700 to-zinc-800 px-4 py-1 text-xs tracking-wide text-gray-200 shadow-md hover:bg-gradient-to-r hover:from-zinc-700 hover:via-zinc-800 hover:to-zinc-900 md:text-sm'
              onClick={modalLogout}>
              <div className='flex items-center gap-1'>
                <ExitDoorFill className='text-xs text-lime-400 lg:text-sm' />
                <span className='flex w-full justify-center'>Cerrar sesión</span>
              </div>
            </div>
          </div>
        </div>
        {/*  Actions */}
        <div className='block'>
          <Actions />
          <FilterTemplate
            indexAction={0}
            pluralTitle={'Anexos'}
            singularTitle={'Anexo'}
          />
          <TrunkManagement />
          <FilterTemplate
            indexAction={2}
            pluralTitle={'Intercomunicadores'}
            singularTitle={'Intercom'}
          />
          <FilterTemplate
            indexAction={3}
            pluralTitle={'MCR'}
            singularTitle={'MCR'}
          />
          <Users />
          {selectedAction === 5 && (
            <>
              <LogsResultsTable /> <LogsResultsCards />
            </>
          )}
        </div>
      </div>
      {/* RESPONSIVE components less than 1024px */}
      {/* Buttons: Username, Help, Sing off */}
      <div className='fixed inset-x-0 bottom-0 z-40 block w-full rounded-t-full bg-gradient-to-r from-lime-600 to-green-600 px-10 shadow-inner sm:hidden md:hidden'>
        <div className='flex h-12 items-center justify-between'>
          <div
            className='flex cursor-pointer flex-col items-center justify-center'
            onClick={e => modalEditEmployee(e, rut)}>
            <UserFill className='text-base text-white' />
            <span className='text-xs text-slate-200'>{username}</span>
          </div>
          <div className='flex cursor-pointer flex-col items-center justify-center'>
            <HelpBuoyFill className='text-base text-white' />
            <span className='text-xs text-slate-200'>Ayuda</span>
          </div>
          <div
            className='flex cursor-pointer flex-col items-center justify-center'
            onClick={modalLogout}>
            <ExitDoorFill className='text-base text-white' />
            <span className='text-xs text-slate-200'>Cerrar sesión</span>
          </div>
        </div>
      </div>
      {/* Modals */}
      <ModalLogout />
      <ModalChangeStatusAnexe />
      <ModalCreateExtension />
      <ModalCreateIntercom />
      <ModalCreateMultiCallRinging />
      <ModalCreateEmployee />
      <ModalEditEmployee />
      <ModalGenerateReport
        tableName={tableName}
        filename={filename}
      />
    </div>
  );
};

export default Home;
