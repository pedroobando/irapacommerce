import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface iFieldLogin {
  nickName: string;
  password: string;
}

interface iSuccessMessage {
  text: string;
  success: boolean;
}

interface iFormLoginProps {
  initValues: iFieldLogin;
  handleSucces: (values: iFieldLogin) => iSuccessMessage;
}

const initialValuesError = { success: true, text: '' };

export const FormLogin = ({ initValues, handleSucces }: iFormLoginProps) => {
  const [errorMessage, setErrorMessage] = useState<iSuccessMessage>(initialValuesError);

  const { resetForm, handleSubmit, errors, touched, getFieldProps, handleReset } = useFormik({
    initialValues: { ...initValues },
    onSubmit: (values) => {
      const retSuccess = handleSucces({ ...values });
      if (!retSuccess.success) {
        setErrorMessage({ ...retSuccess });
      } else {
        resetForm();
      }
    },
    onReset: (values) => {
      setErrorMessage(initialValuesError);
    },
    validationSchema: Yup.object({
      nickName: Yup.string()
        .required('El usuario es requerido')
        .min(6, 'Debe tener minimo 6 caracteres'),

      password: Yup.string()
        .required('El password o contraseña es requerido')
        .min(6, 'Debe tener minimo 6 caracteres'),
    }),
  });

  return (
    <div className="container">
      <form
        noValidate
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="border border-2 rounded border-secondary p-4 my-4">
        <h3 className="mt-1 mb-2 text-secondary text-center uppercase">Login o Acceso</h3>
        <hr />
        <div
          className={!errorMessage.success ? 'my-2 alert alert-danger alert px-2' : 'd-none'}
          role={'alert'}>
          {errorMessage.text}
        </div>

        <div className="mb-3">
          <label htmlFor="nickName" className="form-label">
            Usuario
          </label>
          <input
            id="nickName"
            {...getFieldProps('nickName')}
            type="text"
            className="form-control"
            placeholder="wilkemberramon"
          />
          {touched.nickName && errors.nickName && (
            <div className="mt-2 alert alert-warning alert-sm px-2 py-1" role={'alert'}>
              * {errors.nickName}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña o password
          </label>
          <input
            id="password"
            {...getFieldProps('password')}
            type="password"
            placeholder="Password"
            className="form-control"
          />
          {touched.password && errors.password && (
            <div className="mt-2 alert alert-warning alert-sm px-2 py-1">* {errors.password}</div>
          )}
        </div>

        <div className="row justify-content-evenly">
          <div className="d-grid col-6">
            <button type="submit" className="btn btn-success">
              Login
            </button>
          </div>
          <div className="d-grid col-6">
            <button type="reset" className=" btn btn-warning">
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
