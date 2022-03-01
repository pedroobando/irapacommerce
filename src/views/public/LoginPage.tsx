import React, { useState } from 'react';

import { useSEOTitle } from '../../hooks/useSeoPage';
import { FormLogin } from './components/FormLogin';

const initialValues: any = {
  nickName: 'pedro',
  password: '',
};

export const LoginPage = () => {
  // const { doLogin, loading, doLoading } = useContext(AuthContext);

  useSEOTitle({ subtitle: 'LOGIN' });

  const handleSucces = (value: any): { success: boolean; text: string } => {
    console.log(value);
    if (value.nickName !== 'pedroobando') {
      return { success: false, text: 'Nombre diferente a pedroobando' };
    }
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
