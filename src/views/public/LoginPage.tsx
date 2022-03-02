import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { AUTH_USER } from '../../graphql/dslgql';
import { fetchgql } from '../../graphql/fetchgql';
import { useNavigate } from 'react-router-dom';

import { useSEOTitle } from '../../hooks/useSeoPage';
import { FormLogin } from './components/FormLogin';

const initialValues: any = {
  nickName: '',
  password: '',
};

export const LoginPage = () => {
  const routNavegate = useNavigate();
  const { doLogin } = useContext(AuthContext);
  useSEOTitle({ subtitle: 'login' });

  const handleSuccess = (value: any): Promise<{ success: boolean; text: string }> => {
    const { nickName, password } = value;
    let retSuccess = { success: true, text: '' };
    return fetchgql(AUTH_USER, { input: { nickName, password } }, '')
      .then(({ data, errors }) => {
        if (errors) {
          throw new Error(errors[0].message);
        } else {
          const { token } = data.authenticateToken;
          doLogin(token);
          routNavegate('/');
          return retSuccess;
        }
      })
      .catch((err) => {
        return { success: false, text: err.message };
      });
  };

  return (
    <div className="bg-gray-100 h-screen">
      <div className="flex items-center justify-center h-5/6 w-10/12 mx-auto">
        <FormLogin initValues={initialValues} handleSucces={handleSuccess} />
      </div>
    </div>
  );
};
