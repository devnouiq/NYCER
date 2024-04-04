import React, { useState, useEffect } from "react";
import { RandomIngredients } from "../services/api/RandomIngredientsApi";
import { Loading } from "../components/Loading";
import { IngredientsType } from "../types/ProductTypes";
import { ChevronDown, ChevronUp, RefreshCcw } from "lucide-react";
import { IngredientProducts } from "../components/IngredientProducts";

export const IngredientsPage: React.FC = () => {
  const [ingredients, setIngredients] = useState<IngredientsType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await RandomIngredients(page);
        setIngredients(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
        setLoading(false);
      }
    };

    fetchIngredients();
  }, [page]);

  const handleNextPage = () => {
    setLoading(true);
    setPage(page + 1);
  };

  const [expandedIngredient, setExpandedIngredient] = useState<number | null>(
    null
  );

  const toggleIngredient = (ingredientId: number) => {
    setExpandedIngredient(
      expandedIngredient === ingredientId ? null : ingredientId
    );
  };

  return (
    <div>
      <div className="flex items-center justify-center my-4 mx-2">
        <button
          onClick={handleNextPage}
          className="bg-[#AF7153] text-white px-4 py-2 rounded-md">
          <RefreshCcw />
        </button>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 gap-4 my-4 mx-2 md:mx-10">
          {ingredients.map((ingredient) => (
            <div
              key={ingredient._id}
              className="bg-white rounded-lg shadow-md mb-4">
              <div
                className="p-4 cursor-pointer flex items-center justify-between"
                onClick={() => toggleIngredient(ingredient._id)}>
                <h2 className="text-lg font-semibold">
                  {ingredient.ingredient_name}
                </h2>
                {expandedIngredient === ingredient._id ? (
                  <ChevronUp className="w-6 h-6 text-gray-600" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-600" />
                )}
              </div>
              <div
                className={`${
                  expandedIngredient === ingredient._id ? "block" : "hidden"
                } p-4 border-t border-gray-200`}>
                <p className="text-base text-black mb-2 font-bold">
                  what it does :{" "}
                  <span className="text-sm font-normal">
                    {ingredient.what_it_does}
                  </span>
                </p>
                <p className="text-base text-black mt-2 font-bold text-justify">
                  Description:{" "}
                  <span className="text-sm font-normal">
                    {ingredient.description}
                  </span>
                </p>
                <IngredientProducts val={ingredient.ingredient_name} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
