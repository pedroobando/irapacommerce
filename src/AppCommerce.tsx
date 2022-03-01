import { Suspense, useEffect, useState, useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';

import { LoginPage } from './views/public/LoginPage';

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
  // const [routeState, setRouteState] = useState<iRouteProps[]>([]);
  const { doLogin, user } = useContext(AuthContext);
  const [uidUser, setUidUser] = useState('kmduiewrjivjkj-39823');

  useEffect(() => {
    // console.log(user.decoded.uid, uidUser);
    if (user.decoded.uid !== uidUser) {
      // if (user.uid) {
      //   doLogin({ uid: user.uid, email: user.email, name: user.displayName });
      //   if (user.email === 'servidentmjco@gmail.com') {
      //     setRouteState([...adminRoutes]);
      //   } else {
      //     setRouteState([...authRoutes]);
      //   }
      // } else {
      //   setRouteState([...publicRoutes]);
      // }
    }
    setUidUser(user.decoded.uid);

    return () => {
      console.log('limpiar');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uidUser, user.decoded.uid]);

  if (uidUser !== user.decoded.uid) {
    return <h1>Loading User</h1>;
  }

  return (
    <Suspense fallback={<span>loading..</span>}>
      <BrowserRouter>
        <Routes>
          {/* <Route key={path} path={path} element={<Component />} /> */}
          <Route path="/" element={<LoginPage />} />
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
