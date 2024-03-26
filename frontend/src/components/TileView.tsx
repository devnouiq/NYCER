import React from "react";
import { ProductView } from "../types/TileViewTypes";

export const TileView: React.FC<ProductView> = ({
  product_id,
  setShowModal,
  product_name,
  product_img,
}) => {
  return (
    <div className="w-full md:w-64 border border-solid border-gray-300 p-4 shadow-md rounded-md h-auto md:h-80 overflow-hidden backdrop-blur-lg">
      <img
        src={product_img}
        alt={`Product: ${product_name}`}
        className="h-40 md:h-[180px] w-full object-contain mb-4 rounded-md"
      />
      <div className="text-center">
        <p className="text-white font-bold mb-2">{product_name}</p>
        <button
          className="bg-black text-white p-2 rounded-xl hover:bg-black focus:outline-none focus:ring focus:border-white"
          onClick={() => {
            setShowModal(product_id);
          }}>
          See details
        </button>
      </div>
    </div>
  );
};
