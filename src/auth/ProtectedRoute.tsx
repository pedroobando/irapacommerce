import { LazyExoticComponent } from 'react';
import { Route, Navigate } from 'react-router-dom';

type JSXComponent = () => JSX.Element;

interface iProtectedRouteProps {
  isAuthenticated: boolean;
  path: string;
  Component: LazyExoticComponent<JSXComponent> | JSXComponent;
}

export const ProtectedRoute = ({
  isAuthenticated,
  path,
  Component,
  ...args
}: iProtectedRouteProps) => {
  return (
    <Route
      {...args}
      path={path}
      element={(props: any) =>
        !isAuthenticated ? <Navigate to="/auth/login" /> : <Component {...props} />
      }
    />
  );
};
