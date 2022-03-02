import { useState } from 'react';
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
  handleSucces: (values: iFieldLogin) => Promise<iSuccessMessage>;
}

const initialValuesError = { success: true, text: '' };

export const FormLogin = ({ initValues, handleSucces }: iFormLoginProps) => {
  const [errorMessage, setErrorMessage] = useState<iSuccessMessage>(initialValuesError);

  const { resetForm, handleSubmit, errors, touched, getFieldProps, handleReset } = useFormik({
    initialValues: { ...initValues },
    onSubmit: (values) => {
      handleSucces({ ...values, nickName: values.nickName.trim().toLowerCase() }).then(
        (retSuccess) => {
          if (!retSuccess.success) {
            setErrorMessage({ ...retSuccess });
          } else {
            resetForm();
          }
        },
      );
    },
    onReset: (values) => {
      setErrorMessage(initialValuesError);
    },
    validationSchema: Yup.object({
      nickName: Yup.string()
        .required('El usuario es requerido')
        .min(5, 'Debe tener minimo 5 caracteres'),

      password: Yup.string()
        .required('El password o contraseña es requerido')
        .min(6, 'Debe tener minimo 6 caracteres'),
    }),
  });

  return (
    <div className="h-screen">
      <div className="h-full bg-slate-50 py-4 ">
        <form
          noValidate
          onSubmit={handleSubmit}
          onReset={handleReset}
          className="border-2 border-solid border-slate-500 mx-auto w-11/12 flex-1 p-6 lg:w-4/5 rounded-lg shadow-xl">
          <h3 className="uppercase text-gray-500 font-bold text-center text-2xl mb-2">
            Login o Acceso
          </h3>
          <hr />
          <div
            className={
              !errorMessage.success
                ? 'my-2 px-2 py-2 bg-red-50 text-center text-lg rounded border-2 border-solid border-red-200'
                : 'hidden'
            }
            role="alert">
            {errorMessage.text}
          </div>

          <div className="mb-3 w-full py-2">
            <label htmlFor="nickName" className="text-base uppercase">
              Usuario
            </label>
            <input
              id="nickName"
              {...getFieldProps('nickName')}
              type="text"
              className="w-full border-[1px] border-solid rounded border-slate-500 mt-2 px-4 py-2 text-base bg-slate-50 focus:border-purple-850 focus:bg-blacklt focus:text-black focus:placeholder:text-white"
              placeholder="wilkemberramon"
            />
            {touched.nickName && errors.nickName && (
              <div className="mt-2 alert alert-warning alert-sm px-2 py-1" role={'alert'}>
                * {errors.nickName}
              </div>
            )}
          </div>

          <div className="mb-3 w-full py-2">
            <label htmlFor="password" className="uppercase">
              Contraseña o password
            </label>
            <input
              id="password"
              {...getFieldProps('password')}
              type="password"
              placeholder="Password"
              className="w-full border-[1px] border-solid rounded border-slate-500 mt-2 px-4 py-2 text-base bg-slate-50 focus:border-purple-850 focus:bg-blacklt focus:text-black focus:placeholder:text-white"
            />
            {touched.password && errors.password && (
              <div className="mt-1 text-black bg-yellow-100 py-1 px-2 rounded">
                * {errors.password}
              </div>
            )}
          </div>

          <div className="flex justify-between gap-2">
            <button
              type="submit"
              className="w-[45%] border-solid border-2 bg-blue-400 px-4 py-2 rounded-lg uppercase text-sm hover:bg-blue-500">
              Login
            </button>

            <button
              type="reset"
              className="w-[45%] border-solid border-2 border-yellow-400 bg-transparent px-4 py-2 rounded-lg uppercase text-sm">
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
