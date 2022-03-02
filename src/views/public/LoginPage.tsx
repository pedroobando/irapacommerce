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

  //TODO: Arreglar esto manana y transformalo a una funcion asicrona
  const handleSucces = (value: any): { success: boolean; text: string } => {
    const { nickName, password } = value;

    fetchgql(AUTH_USER, { input: { nickName, password } }, '')
      .then(({ data: { authenticateToken }, errors }) => {
        if (errors) {
          return { success: false, text: errors[0].message };
        } else {
          const { token } = authenticateToken;
          doLogin(token);
          routNavegate('/');
          return { success: true, text: '' };
        }
      })
      .catch((err) => {});
    console.log('first');
  };

  return (
    <div>
      <FormLogin initValues={initialValues} handleSucces={handleSucces} />
    </div>
  );
};
