import { ReactElement } from 'react';
// import { iRouteProps } from '../routes/interface';

export interface iAuthContextProps {
  loading: boolean;
  user: iUserStateProps;
  logged: boolean;
  // routes?: iRouteProps | [];
  doLogin: (token: iUserTokenProps) => void;
  doLogout: () => void;
  doLoading: (status: boolean) => void;
  doRegister?: (newuser: iUserRegister) => boolean;
}

export interface iUserRegister {
  name: string;
  email: string;
  password: string;
}

export interface iUserStateProps {
  logged: boolean;
  decoded: {
    uid: string;
    name: string;
    email: string;
  };
}

export interface iServiceStateProps {
  user: iUserStateProps;
  loading: boolean;
  openDrawer: boolean;
}

export interface iAuthProviderProps {
  children: ReactElement | ReactElement[];
}

export interface iUserTokenProps {
  email: string;
  name: string;
  uid: string;
}
