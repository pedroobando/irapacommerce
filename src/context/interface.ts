import { ReactElement } from 'react';

export interface iAuthContextProps {
  loading: boolean;
  user: iUserStateProps;
  doLogged: () => boolean;
  doLogin: (token: string) => void;
  doLogout: () => void;
  // doLoading: (status: boolean) => void;
  // doRegister?: (newuser: iUserRegister) => boolean;
}

export interface iUserRegister {
  name: string;
  email: string;
  password: string;
}

export interface iUserStateProps {
  // logged: boolean;
  token: string | undefined;
  decoded: iUserTokenProps;
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
  uid: string;
  displayName: string;
}
