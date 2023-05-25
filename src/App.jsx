import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ActionProvider } from './context/ActionProvider';
import { EmployeeProvider } from './context/EmployeeProvider';
import { PaginationProvider } from './context/PaginationProvider';
import { ReportProvider } from './context/ReportProvider';

import ChangePassword from './pages/ChangePassword';
import Home from './pages/Home';
import Index from './pages/Index';
import PageNotFound from './pages/PageNotFound';
import RecoverPassword from './pages/RecoverPassword';
import ServerError from './pages/ServerError';
import Test from './pages/Test';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={<Index />}
        />
        <Route
          path='home'
          element={
            <ReportProvider>
              <PaginationProvider>
                <EmployeeProvider>
                  <ActionProvider>
                    <Home />
                  </ActionProvider>
                </EmployeeProvider>
              </PaginationProvider>
            </ReportProvider>
          }
        />
        <Route
          path='test'
          element={
            <ActionProvider>
              <Test />
            </ActionProvider>
          }
        />
        <Route
          path='recuperar-contrasena'
          element={<RecoverPassword />}
        />
        <Route
          path='cambiar-contrasena/:token'
          element={<ChangePassword />}
        />
        <Route
          path='error-server'
          element={<ServerError />}
        />
        <Route
          path='*'
          element={<PageNotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
