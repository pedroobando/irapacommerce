import React from 'react';

interface iListProductProps {
  dataCollect: any[];
  selectItem: (productId: string) => void;
}

export const ListProduct = ({ dataCollect, selectItem }: iListProductProps) => {
  if (!dataCollect) return <div />;
  return (
    <div className="flex justify-center mx-auto">
      <ul className="w-11/12 p-2 mx-auto mt-2 text-gray-900 bg-white border border-gray-200 rounded">
        {dataCollect?.map(({ id, productName, price }) => (
          <li
            key={id}
            onClick={() => selectItem(id)}
            className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white hover:cursor-pointer">
            <span>{productName!}</span>

            <span className="px-2 text-sm text-white bg-blue-400 rounded-xl">{price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
