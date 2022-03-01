import { Suspense, useEffect, useState, useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';

import { LoginPage } from './views/public/LoginPage';
import { Dashboad } from './views/admin/Dashboad';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProtectedRoute } from './auth/ProtectedRoute';

// import { adminRoutes, publicRoutes, authRoutes } from './routes';
// import { iRouteProps } from './routes/interface';

export const AppCommerce = () => {
  return (
    <AuthProvider>
      <RouteService />
    </AuthProvider>
  );
};

const RouteService = () => {
  const [logged, setLogged] = useState(false);
  const { doLogged, user } = useContext(AuthContext);

  useEffect(() => {
    const retval = doLogged();
    // console.log(retval);
    setLogged(retval);
    return () => {
      'limpiar';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.token]);

  // const [uidUser, setUidUser] = useState('kmduiewrjivjkj-39823');

  // useEffect(() => {
  //   // console.log(user.decoded.uid, uidUser);
  //   if (user.decoded.uid !== uidUser) {
  //     // if (user.uid) {
  //     //   doLogin({ uid: user.uid, email: user.email, name: user.displayName });
  //     //   if (user.email === 'servidentmjco@gmail.com') {
  //     //     setRouteState([...adminRoutes]);
  //     //   } else {
  //     //     setRouteState([...authRoutes]);
  //     //   }
  //     // } else {
  //     //   setRouteState([...publicRoutes]);
  //     // }
  //   }
  //   // setUidUser(user.decoded.uid);

  //   return () => {
  //     console.log('limpiar');
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [uidUser, user.decoded.uid]);

  // if (uidUser !== user.decoded.uid) {
  //   return <h1>Loading User</h1>;
  // }

  return (
    <Suspense fallback={<span>loading..</span>}>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={logged ? <Dashboad /> : <Navigate to="/login" replace />} />
          {/* <ProtectedRoute isAuthenticated={logged} path={'/admin'} Component={Dashboad} /> */}
          {/* <Route key={path} path={path} element={<Component />} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/login" replace />} />
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
