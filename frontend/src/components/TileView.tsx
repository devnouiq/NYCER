import React from "react";
import product_img from "../assets/how_to_use.png";

type IngredientsType = {
  ingredient_name?: string;
  what_it_does?: string;
  community_rating?: string;
  description?: string;
};

export type ProductView = {
  product_id: number;
  product_name: string;
  ingredients: IngredientsType[];
  benefits: string[];
  setShowModal: (productId: number) => void;
};

export const TileView: React.FC<ProductView> = ({
  product_id,
  setShowModal,
  product_name,
}) => {
  const handleSeeDetails = () => {
    setShowModal(product_id);
  };
  return (
    <div className="w-full md:w-64 border border-solid border-gray-300 p-4 shadow-md rounded-md h-auto md:h-80 overflow-hidden backdrop-blur-lg">
      <img
        src={product_img}
        alt={`Product: ${product_name}`}
        className="h-40 md:h-[180px] w-full object-cover mb-4 rounded-md"
      />
      <div className="text-center">
        <p className="text-white font-bold mb-2">{product_name}</p>
        <button
          className="bg-black text-white p-2 rounded-xl hover:bg-black focus:outline-none focus:ring focus:border-white"
          onClick={handleSeeDetails}>
          See details
        </button>
      </div>
    </div>
  );
};

export default TileView;
