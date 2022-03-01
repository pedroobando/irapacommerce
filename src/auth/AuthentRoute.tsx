import { LazyExoticComponent } from 'react';
import { Navigate, Route } from 'react-router-dom';

type JSXComponent = () => JSX.Element;

interface iAuthRouteProps {
  isAuthenticated: boolean;
  path: string;
  Component: LazyExoticComponent<JSXComponent> | JSXComponent;
}

export const AuthentRoute = ({ isAuthenticated, path, Component, ...args }: iAuthRouteProps) => {
  return (
    <Route
      {...args}
      path={path}
      element={(props: any) =>
        isAuthenticated ? <Navigate to="/admin" replace /> : <Component {...props} />
      }
    />
  );
};
