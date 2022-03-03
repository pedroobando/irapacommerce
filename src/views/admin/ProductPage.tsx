import { useContext, useEffect, useState } from 'react';
import AdminLayout from '../../layouts/admin/AdminLayout';
import { AuthContext } from '../../context/AuthContext';
import { GET_PRODUCTS, NEW_PRODUCT, UPD_PRODUCT, DEL_PRODUCT } from '../../graphql/dslgql';
import { fetchgql } from '../../graphql/fetchgql';
import { FormProduct } from './components/FormProduct';
import { ListProduct } from './components/ListProduct';

interface iProductProps {
  id: string;
  code: string;
  productName: string;
  price: number;
  cost: number;
}

const initialValues: iProductProps = {
  id: '',
  code: '',
  productName: '',
  price: 0,
  cost: 0,
};

enum EnAction {
  READ = 1,
  NEW,
  EDIT,
  BACK,
}

export const ProductPage = () => {
  const { user } = useContext(AuthContext);
  const [dataCollect, setDataCollect] = useState<iProductProps[]>([]);
  const [actionForm, setActionForm] = useState(EnAction.READ);
  const [dataSelItem, setDataSelItem] = useState<iProductProps>(initialValues);

  useEffect(() => {
    if (actionForm === EnAction.READ) {
      fetchgql(GET_PRODUCTS, {}, user.token)
        .then(({ data }) => {
          const { getProducts } = data;
          setDataCollect([...getProducts]);
        })
        .catch((err) => console.log(err));
    }
    return () => {
      console.log('salida product');
    };
  }, [actionForm, user.token]);

  const selProduct = (productId: string) => {
    try {
      const itemSelected = dataCollect.find((item) => item.id === productId) || initialValues;
      setDataSelItem({ ...itemSelected });
      setActionForm(EnAction.EDIT);
    } catch (error) {}
  };

  const newProduct = () => {
    setDataSelItem({ ...initialValues });
    setActionForm(EnAction.NEW);
  };

  const handleNew = (value: any): Promise<{ success: boolean; text: string }> => {
    const { code, productName, cost, price } = value;
    let retSuccess = { success: true, text: '' };
    return fetchgql(NEW_PRODUCT, { input: { code, productName, cost, price } }, user.token)
      .then(({ data, errors }) => {
        if (errors) {
          throw new Error(errors[0].message);
        } else {
          setActionForm(EnAction.READ);
          return retSuccess;
        }
      })
      .catch((err) => {
        return { success: false, text: err.message };
      });
  };

  const handleUpd = (value: any): Promise<{ success: boolean; text: string }> => {
    const { id, code, productName, cost, price } = value;
    let retSuccess = { success: true, text: '' };
    return fetchgql(
      UPD_PRODUCT,
      { productId: id, input: { code, productName, cost, price } },
      user.token,
    )
      .then(({ data, errors }) => {
        if (errors) {
          throw new Error(errors[0].message);
        } else {
          setActionForm(EnAction.READ);
          return retSuccess;
        }
      })
      .catch((err) => {
        return { success: false, text: err.message };
      });
  };

  const handleDel = (value: any): void => {
    try {
      fetchgql(DEL_PRODUCT, { productId: value }, user.token)
        .then(({ data, errors }) => {
          if (errors) {
            throw new Error(errors[0].message);
          } else {
            setActionForm(EnAction.READ);
          }
        })
        .catch((err) => {
          return { success: false, text: err.message };
        });
    } catch (error) {}
  };

  const handleBck = (): void => {
    setActionForm(EnAction.BACK);
  };

  return (
    <AdminLayout className="container mx-auto md:mx-10">
      <h3 className="flex justify-between px-2 py-1 text-white uppercase bg-blue-400 md:font-bold md:text-blue-400 md:bg-transparent">
        <span className="text-xl">Productos</span>
        <button
          onClick={newProduct}
          className="px-2 py-0 text-sm border-2 border-white border-solid rounded md:inline md:border-blue-400">
          NUEVO
        </button>
      </h3>

      {actionForm !== EnAction.READ && actionForm !== EnAction.BACK ? (
        <FormProduct
          formStatus={actionForm}
          initValues={dataSelItem}
          handleNew={handleNew}
          handleUpd={handleUpd}
          handleBck={handleBck}
          handleDel={handleDel}
        />
      ) : (
        <ListProduct dataCollect={dataCollect} selectItem={selProduct} />
      )}
    </AdminLayout>
  );
};
