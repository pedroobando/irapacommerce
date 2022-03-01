import { createContext, useReducer } from 'react';
import { authReducer } from './authReducer';

import jwt_decode from 'jwt-decode';

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
  // logged: false,
  token: '',
  decoded: {
    uid: '',
    displayName: '',
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

const retDecodeUser = (payload: string): iUserStateProps => {
  const decodeToken = jwt_decode<iUserTokenProps>(payload, { header: false });
  return {
    // logged: true,
    token: payload,
    decoded: { uid: decodeToken.uid, displayName: decodeToken.displayName },
  };
};

export const AuthProvider = ({ children }: iAuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState, initlocal);

  const doLogin = (payload: string) => {
    dispatch({
      type: 'LOGIN',
      payload: retDecodeUser(payload),
    });
    localStorage.setItem(_tokenName, payload);
  };

  const doLogout = () => {
    localStorage.removeItem(_tokenName);
    dispatch({
      type: 'LOGOUT',
    });
  };

  const doLogged = (): boolean => {
    try {
      const decodeToken = jwt_decode<iUserTokenProps>(state.user.token, { header: false });
      console.log('isLogged');
      return decodeToken.uid.trim() !== '';
    } catch (error) {
      return false;
    }
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
        doLogged,
        doLogin,
        doLogout,
        doLoading,
        doRegister,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
