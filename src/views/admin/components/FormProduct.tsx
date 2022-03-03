import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CgErase, CgAssign, CgClose, CgTrash } from 'react-icons/cg';

import styles from './Form.module.css';

interface iFieldProduct {
  id: string;
  code: string;
  productName: string;
  cost: number;
  price: number;
}

interface iSuccessMessage {
  text: string;
  success: boolean;
}

interface iFormProductProps {
  initValues: iFieldProduct;
  formStatus: number;
  handleNew: (values: iFieldProduct) => Promise<iSuccessMessage>;
  handleUpd: (values: iFieldProduct) => Promise<iSuccessMessage>;
  handleDel: (values: string) => void;
  handleBck: () => void;
}

const initialValuesError = { success: true, text: '' };

export const FormProduct = ({
  initValues,
  formStatus,
  handleNew,
  handleUpd,
  handleDel,
  handleBck,
}: iFormProductProps) => {
  const [errorMessage, setErrorMessage] = useState<iSuccessMessage>(initialValuesError);

  const { resetForm, handleSubmit, errors, touched, getFieldProps, handleReset } = useFormik({
    initialValues: { ...initValues },
    onSubmit: (values) => {
      switch (formStatus) {
        case 2:
          handleNew({ ...values }).then((retSuccess) => {
            if (!retSuccess.success) {
              setErrorMessage({ ...retSuccess });
            }
          });
          break;

        case 3:
          handleUpd({ ...values }).then((retSuccess) => {
            if (!retSuccess.success) {
              setErrorMessage({ ...retSuccess });
            }
          });
          break;

        default:
          resetForm();
          break;
      }
    },
    onReset: (values) => {
      setErrorMessage(initialValuesError);
    },
    validationSchema: Yup.object({
      // code: Yup.string().required('El codigo del producto es requerido'),
      productName: Yup.string()
        .required('El nombre del producto es requerido')
        .min(5, 'Debe tener minimo 5 caracteres'),

      cost: Yup.number().min(0, 'El costo del producto debe ser igual o mayor a cero'),
      price: Yup.number().moreThan(0, 'El precio del producto debe ser mayor que cero'),
    }),
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="flex-1 w-11/12 p-4 mx-auto mt-2 border-2 border-solid rounded-lg shadow-xl bg-slate-50 border-slate-300 lg:w-4/5">
      <div
        className={
          !errorMessage.success
            ? 'my-2 px-2 py-2 bg-red-50 text-center text-lg rounded border-2 border-solid border-red-200'
            : 'hidden'
        }
        role="alert">
        {errorMessage.text}
      </div>

      <div className={styles.formcontrol}>
        <label htmlFor="code" className="text-base">
          Codigo:
        </label>
        <input
          id="code"
          {...getFieldProps('code')}
          type="text"
          className={styles.inputform}
          placeholder="codigo del producto"
        />
        {touched.code && errors.code && (
          <div className={styles.errorform} role={'alert'}>
            * {errors.code}
          </div>
        )}
      </div>

      <div className={styles.formcontrol}>
        <label htmlFor="productName" className="text-base">
          Nombre:
        </label>
        <input
          id="productName"
          {...getFieldProps('productName')}
          type="text"
          className={styles.inputform}
          placeholder="nombre del producto"
        />
        {touched.productName && errors.productName && (
          <div className={styles.errorform} role={'alert'}>
            * {errors.productName}
          </div>
        )}
      </div>

      <div className={styles.formcontrol}>
        <label htmlFor="cost" className="text-base">
          Costo:
        </label>
        <input
          id="cost"
          {...getFieldProps('cost')}
          type="number"
          className={styles.inputform}
          placeholder="costo del producto"
        />
        {touched.cost && errors.cost && (
          <div className={styles.errorform} role={'alert'}>
            * {errors.cost}
          </div>
        )}
      </div>

      <div className={styles.formcontrol}>
        <label htmlFor="price" className="text-base">
          Precio:
        </label>
        <input
          id="price"
          {...getFieldProps('price')}
          type="number"
          className={styles.inputform}
          placeholder="costo del producto"
        />
        {touched.price && errors.price && (
          <div className={styles.errorform} role={'alert'}>
            * {errors.price}
          </div>
        )}
      </div>

      <div className="flex justify-between gap-2">
        <button
          type="submit"
          className="px-2 py-1 text-base text-white uppercase bg-blue-400 border-2 border-solid rounded-lg hover:bg-blue-500">
          ENVIAR
          <CgAssign className="inline ml-1 text-lg text-white" />
        </button>
        <div>
          <button
            type="reset"
            className="px-2 py-1 mr-2 text-base uppercase bg-transparent border-2 border-yellow-400 border-solid rounded-lg">
            <CgErase className="inline text-lg text-yellow-700 md:mr-1" />
            <span className="hidden md:inline">Reset</span>
          </button>
          <button
            type="button"
            onClick={() => handleDel(initValues.id)}
            className="px-2 py-1 mr-2 text-base uppercase bg-transparent border-2 border-red-400 border-solid rounded-lg">
            <CgTrash className="inline text-lg text-red-700 md:mr-1" />
            <span className="hidden md:inline">Borrar</span>
          </button>
          <button
            type="button"
            onClick={handleBck}
            className="px-2 py-1 text-base uppercase bg-transparent border-2 border-gray-400 border-solid rounded-lg">
            <CgClose className="inline text-lg text-gray-700 md:mr-1" />
            <span className="hidden md:inline">Volver</span>
          </button>
        </div>
      </div>
    </form>
  );
};
