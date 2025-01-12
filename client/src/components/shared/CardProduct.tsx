import React from 'react';

const CardProduct = ({ data }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out cursor-pointer min-w-[400px]  ">
  
      <div className="h-32 w-full rounded-md  bg-gray-100">
        <img
          src={data?.image[0]}
          alt={data?.name}
          className="h-full w-full object-cover"
        />
      </div>
   
      <div className="mt-3 text-sm font-medium text-white bg-green-500 px-3 py-1 rounded-full w-fit">
        10 min
      </div>

      <div className="mt-3 text-lg font-semibold text-gray-800">
        {data?.name || 'Product Name'}
      </div>
   
      <div className="mt-4 flex justify-between items-center">
        <div className="text-lg font-bold text-gray-900">
          ₹{data?.price || '0.00'}
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
          Add
        </button>
      </div>
    </div>
  );
};

export default CardProduct;
