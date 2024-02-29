import React from "react";
import product_img from "../assets/how_to_use.png";
import { useNavigate } from "react-router-dom";
import { Product } from "./Product";

type IngredientsType = {
  ingredient_name?: string;
  what_it_does?: string;
  community_rating?: string;
  description?: string;
};

export type ProductView = {
  product_id: string;
  product_name: string;
  ingredients: IngredientsType[];
  benefits: string[];
};

export const TileView: React.FC<ProductView> = ({
  product_id,
  product_name,
  ingredients,
  benefits,
}) => {
  function handleNavigation() {
    console.log("Navigating to details...");
    useNavigate();
  }

  return (
    <div className="w-full md:w-64 border border-solid border-gray-300 p-4 shadow-md rounded-md h-auto md:h-80 overflow-hidden">
      <img
        src={product_img}
        alt={`Product: ${product_name}`}
        className="h-40 md:h-48 w-full object-cover mb-4 rounded-md"
      />
      <div className="text-center">
        <p className="text-white font-bold mb-2">{product_name}</p>
        <button
          onClick={handleNavigation}
          className="bg-black text-white p-2 rounded-xl hover:bg-black focus:outline-none focus:ring focus:border-white">
          see details
        </button>
      </div>
    </div>
  );
};

export default TileView;
