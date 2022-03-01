import { LazyExoticComponent } from 'react';

type JSXComponent = () => JSX.Element;

export interface iRouteProps {
  to: string;
  path: string;
  Component: LazyExoticComponent<JSXComponent> | JSXComponent;
  name: string;
  show?: boolean;
}
