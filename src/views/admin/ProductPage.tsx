/* eslint-disable no-unreachable */
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { GET_PRODUCTS } from '../../graphql/dslgql';
import { fetchgqlAsc } from '../../graphql/fetchgql';
import { useStateCollect } from '../../hooks/useStateCollect';
import AdminLayout from '../../layouts/admin/AdminLayout';

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

export const ProductPage = () => {
  const { user } = useContext(AuthContext);

  const readProduct = async () => {
    const { data, errors } = await fetchgqlAsc(GET_PRODUCTS, {}, user.token);
    if (!errors) {
      const { getProducts } = data;
      return getProducts;
    } else {
      return [];
    }
  };

  const newProduct = async (values: iProductProps) => {
    try {
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  };

  const updProduct = async (values: iProductProps) => {
    try {
      // const { id } = recordEdit;
      // return await updDocCollection<iService>(collecName, id!, {
      //   ...values,
      // });
    } catch (error) {
      console.error(error);
    }
    return values;
  };

  const delProduct = async (keyId: string, recordData: iProductProps) => {
    try {
      // const docService = await getDocCollection<iService>(collecName, keyId);
      // const imageId = docService?.image.id;
      // if (imageId !== '') {
      //   const storageRef = refStore(`${collecName}/${imageId}`);
      //   removeFileStore(storageRef).then(() => {});
      // }
      // return await delDocCollection<iService>(collecName, keyId);
    } catch (error) {
      console.error(error);
    }
    return '';
  };

  const {
    btnStatus,
    buttonAction,
    buttonDelete,
    buttonEdit,
    buttonReset,
    recordEdit,
    setSnapService,
    snapService,
  } = useStateCollect<iProductProps>({
    initialValues,
    readServices: readProduct,
    newService: readProduct,
    delService: delProduct,
    updService: updProduct,
  });

  //  {snapService && snapService?.map((item, idx) => <div key={idx}>{item.productName!}</div>)}

  // console.log(snapService);

  return (
    <AdminLayout className="container">
      <h3 className="mt-1 text-primary">Productos</h3>
      <ul className="">
        {snapService?.map(({ id, productName }, idx) => (
          <li key={idx} className="list-group-item">
            {productName!}
          </li>
        ))}
      </ul>
    </AdminLayout>
  );
};
