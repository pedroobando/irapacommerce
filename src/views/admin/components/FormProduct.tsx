import React from 'react';

export const FormProduct = () => {
  const handleSubmit = (value: any) => {
    console.log(value);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-1">
      <div className="p-2 mx-2 bg-white border-2 border-separate border-gray-400 rounded">
        <div className="w-full py-2 mb-3">
          <label htmlFor="code" className="text-base uppercase">
            CODIGO:
          </label>
          <input
            id="code"
            name="code"
            type="text"
            className="w-full border-[1px] border-solid rounded border-gray-500 mt-2 px-4 py-2 text-base bg-transparent focus:text-black focus:bg-white"
            placeholder="Indique le codigo del producto"
          />
          {/* {touched.nickName && errors.nickName && (
          <div
            className="mt-1 text-black bg-yellow-100 py-1 px-2 rounded text-sm border-solid border-yellow-500 border-[1px]"
            role={'alert'}>
            * {errors.nickName}
          </div>
        )} */}
        </div>
        <button className="px-2 py-2 text-sm text-white bg-blue-400 rounded">ENVIAR</button>
      </div>
    </form>
  );
};
