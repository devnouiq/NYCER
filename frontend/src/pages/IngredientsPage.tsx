import React, { useState, useEffect } from "react";
import { RandomIngredients } from "../services/api/RandomIngredientsApi";
import { Loading } from "../components/Loading";
import { IngredientsType } from "../types/ProductTypes";
import { ChevronDown, ChevronUp } from "lucide-react";
import { IngredientProducts } from "../components/IngredientProducts";

export const IngredientsPage: React.FC = () => {
  const [ingredients, setIngredients] = useState<IngredientsType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await RandomIngredients();
        setIngredients(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);

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
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 gap-4 my-4 mx-2 md:mx-10">
          {ingredients.map((ingredient) => (
            <div
              key={ingredient._id}
              className="bg-white rounded-lg p-4 shadow-md flex flex-col">
              <div
                className="flex items-center"
                onClick={() => toggleIngredient(ingredient._id)}>
                <div className="transition-transform duration-300">
                  {expandedIngredient === ingredient._id ? (
                    <ChevronUp className="mr-2" />
                  ) : (
                    <ChevronDown className="mr-2" />
                  )}
                </div>
                <h2 className="text-lg font-semibold">
                  {ingredient.ingredient_name}
                </h2>
              </div>
              <p className="text-base text-black mb-2 font-bold">
                what it does :{" "}
                <span className="text-sm font-normal">
                  {ingredient.what_it_does}
                </span>
              </p>
              <div
                className={`mt-4 ${
                  expandedIngredient === ingredient._id ? "block" : "hidden"
                }`}>
                <div
                  key={ingredient._id}
                  className="bg-white rounded-lg p-4 shadow-md ">
                  <p className="text-sm mt-2">
                    Community rating: {ingredient.community_rating}
                  </p>
                  <p className="text-sm mt-2">
                    Description: {ingredient.description}
                  </p>
                </div>
                <IngredientProducts val={ingredient.ingredient_name} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
