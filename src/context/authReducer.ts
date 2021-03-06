import { iServiceStateProps } from './interface';

interface iTypePayload {
  type: 'LOGIN' | 'LOGOUT' | 'LOADING';
  payload?: any | null;
}

export const authReducer = (
  state: iServiceStateProps,
  { type, payload }: iTypePayload,
): iServiceStateProps => {
  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        user: payload,
        loading: false,
      };

    case 'LOGOUT':
      return {
        ...state,
        user: { token: undefined, decoded: { uid: '', displayName: '' } },
      };

    case 'LOADING':
      return {
        ...state,
        loading: payload,
      };

    default:
      return state;
  }
};
