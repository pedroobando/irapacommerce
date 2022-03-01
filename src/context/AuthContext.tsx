import { createContext, useReducer } from 'react';
import { authReducer } from './authReducer';

import {
  iAuthContextProps,
  iAuthProviderProps,
  iServiceStateProps,
  iUserRegister,
  iUserStateProps,
  iUserTokenProps,
} from './interface';

export const AuthContext = createContext({} as iAuthContextProps);
const _tokenName = '39sk238xs2';

const user: iUserStateProps = {
  logged: false,
  decoded: {
    uid: '',
    name: '',
    email: '',
  },
};

export const initialState: iServiceStateProps = {
  user,
  loading: false,
  openDrawer: false,
};

const initlocal = (): iServiceStateProps => {
  return {
    user: { ...user },
    loading: false,
    openDrawer: false,
  };
};

const retDecodeUser = (payload: iUserTokenProps): iUserStateProps => {
  return {
    logged: true,
    decoded: {
      uid: payload.uid,
      name: payload.name,
      email: payload.email,
    },
  };
};

export const AuthProvider = ({ children }: iAuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState, initlocal);

  const doLogin = (payload: iUserTokenProps) => {
    // localStorage.setItem(_tokenName, payload.token);
    dispatch({
      type: 'LOGIN',
      payload: retDecodeUser(payload),
    });
  };

  const doLogout = () => {
    // localStorage.removeItem(_tokenName);
    dispatch({
      type: 'LOGOUT',
    });
  };

  const doLoading = (status: boolean) => {
    dispatch({ type: 'LOADING', payload: status });
  };

  const doRegister = (newuser: iUserRegister): boolean => {
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        loading: state.loading,
        user: state.user,
        logged: state.user.logged,
        doLogin,
        doLogout,
        doLoading,
        doRegister,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
