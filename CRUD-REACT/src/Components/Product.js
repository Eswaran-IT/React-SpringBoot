import React from 'react';

function Product({name, course, gender }) {
  const getImageSource = () => {
    if (gender === 'male') {
      return '/male.png'; 
        }  else {
      return '/fem.png'; }
  };

  return (
    <div className="max-w-sm rounded border rounded-lg border-black  overflow-hidden shadow-lg m-4">
      <img className="w-40 p-4  h-40" src={getImageSource()} alt="User" />

      <div className="px-6 text-center py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-red-700 font-semibold ">{course}</p>
      </div>
    </div>
  );
}

export default Product;
