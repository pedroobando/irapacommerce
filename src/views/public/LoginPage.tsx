import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { AUTH_USER } from '../../graphql/dslgql';
import { fetchgql } from '../../graphql/fetchgql';
import { useNavigate } from 'react-router-dom';
// import { useActionGQL } from '../../hooks/useActionGQL';

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

  const handleSucces = (value: any): { success: boolean; text: string } => {
    const { nickName, password } = value;

    fetchgql(AUTH_USER, { input: { nickName, password } }, '')
      .then(({ data: { authenticateToken } }) => {
        const { token } = authenticateToken;
        doLogin(token);
        routNavegate('/');
      })
      .catch((err) => {
        console.log(err);
      });

    return { success: true, text: '' };
  };

  return (
    <div>
      <FormLogin initValues={initialValues} handleSucces={handleSucces} />
    </div>
  );
};
