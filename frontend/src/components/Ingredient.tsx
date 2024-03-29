import React, { useState, useEffect } from "react";
import { getIngredientDetails } from "../services/api/SingleIngredient";
import { Loading } from "./Loading";
import { IngredientsType } from "../types/ProductTypes";

export const Ingredient: React.FC<{ ingredient_id?: number }> = ({
  ingredient_id,
}) => {
  const [ingredient, setIngredient] = useState<IngredientsType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchIngredient = async () => {
      try {
        if (ingredient_id) {
          console.log("ingredient_id :", ingredient_id);
          const response = await getIngredientDetails(ingredient_id);
          setIngredient(response);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching ingredients:", error);
        setLoading(false);
      }
    };

    fetchIngredient();
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="mb-2">
          {ingredient && (
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
          )}
        </div>
      )}
    </div>
  );
};
