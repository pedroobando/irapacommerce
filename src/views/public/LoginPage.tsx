import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { AUTH_USER } from '../../graphql/dslgql';
import { fetchgql } from '../../graphql/fetchgql';
import { useNavigate } from 'react-router-dom';
// import { useActionGQL } from '../../hooks/useActionGQL';

import { useSEOTitle } from '../../hooks/useSeoPage';
import { FormLogin } from './components/FormLogin';

const initialValues: any = {
  nickName: 'pedro',
  password: '123456',
};

export const LoginPage = () => {
  const routNavegate = useNavigate();

  const { doLogin } = useContext(AuthContext);

  useSEOTitle({ subtitle: 'login' });

  const handleSucces = (value: any): { success: boolean; text: string } => {
    const { nickName, password } = value;
    // const { data, errors, loading } = useActionGQL(AUTH_USER, { input: { nickName, password } });
    fetchgql(AUTH_USER, { input: { nickName, password } }, '')
      .then(({ data: { authenticateToken } }) => {
        const { token } = authenticateToken;
        doLogin(token);
        routNavegate('/admin');
      })
      .catch((err) => {
        console.log(err);
      });

    return { success: true, text: '' };
  };
  // useSEOMeta({
  //   name: 'description',
  //   description: 'NUESTRA UBICACION DIRECCION, TELEFONO, MAPA Y CONTACTO',
  // });

  // const handleGoogleAuthentication = async () => {
  //   try {
  //     const { user } = await googleAuthPopup();
  //     const { displayName, email, uid } = user;
  //     doLogin({ name: displayName!, email: email!, uid });
  //   } catch (Errorf) {}
  // };

  // const handleFacebookAuthentication = async () => {
  //   try {
  //     const { user } = await facebookAuthPopup();
  //     const { displayName, email, uid } = user;
  //     doLogin({ name: displayName!, email: email!, uid });
  //   } catch (Errorf) {}
  // };

  // const formMessage = (iconSw: SweetAlertIcon, title: string, message: string) => {
  //   Swal2.fire({
  //     icon: iconSw,
  //     title: `<h1 class='text-3xl text-purple-850'>${title}</h1>`,
  //     html: `<p class='text-xl'>${message}</p>`,
  //   });
  // };

  return (
    <div>
      <FormLogin initValues={initialValues} handleSucces={handleSucces} />
    </div>
  );
};
