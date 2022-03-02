import { Suspense, useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';

import { LoginPage } from './views/public/LoginPage';
import { Dashboad } from './views/admin/Dashboad';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProductPage } from './views/admin/ProductPage';

export const AppCommerce = () => {
  return (
    <AuthProvider>
      <RouteService />
    </AuthProvider>
  );
};

const RouteService = () => {
  const { user } = useContext(AuthContext);

  return (
    <Suspense fallback={<span>loading..</span>}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          {user.token !== undefined && <Route path="/" element={<Dashboad />} />}
          {user.token !== undefined && <Route path="/product" element={<ProductPage />} />}
          {user.token === undefined && (
            <Route path="/*" element={<Navigate to="/login" replace />} />
          )}
          <Route path="/*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

// {routeState.map(({ path, Component }) => (
//   <Route key={path} path={path} element={<Component />} />
// ))}

// {routeState.length > 0 && (
//   <Route path="/*" element={<Navigate to={routeState[0].to} replace />} />
// )}
