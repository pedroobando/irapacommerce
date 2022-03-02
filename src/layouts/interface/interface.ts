import { ReactElement } from 'react';

export interface iLayoutProps {
  className?: string;
  children?: ReactElement | ReactElement[];
}

export interface iAuthNavbarProps {
  displayName: string;
  imagenUrl: string;
}
