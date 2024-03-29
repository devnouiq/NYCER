import { useEffect, useState } from "react";
import { getProductDetails } from "../services/api/SingleProduct";
import { ProductType } from "../types/ProductTypes";
import { useParams } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Ingredient } from "../components/Ingredient";
import { IngredientProducts } from "../components/IngredientProducts";
import { Loading } from "../components/Loading";

export const SingleProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProductDetails(productId!);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

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
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {product ? (
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
                  <h1 className="text-3xl text-center font-semibold mb-6">
                    {product.product_name}
                  </h1>
                  <div className="flex justify-center mb-6">
                    <img
                      src={product.product_img}
                      alt={product.product_name}
                      className="rounded-lg shadow-md max-h-96"
                    />
                  </div>
                  <div className="mb-6">
                    <p className="text-gray-600 mb-2">
                      <span className="font-semibold">Brand:</span>{" "}
                      {product.brand_name}
                    </p>
                    <p className="text-gray-600 mb-2">
                      <span className="font-semibold">Product Type:</span>{" "}
                      {product.product_type}
                    </p>
                    <p className="text-gray-600 mb-2">
                      <span className="font-semibold">
                        Notable Ingredients:
                      </span>{" "}
                      {product.notable_ingredients.join(", ")}
                    </p>
                    <p className="text-gray-600 mb-2">
                      <span className="font-semibold">Benefits:</span>{" "}
                      {product.benefits.join(", ")}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-gray-600 mb-2">
                        <span className="font-semibold">What it is:</span>{" "}
                        {product.what_it_is}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-2">
                        <span className="font-semibold">Suited for:</span>{" "}
                        {product.suited_for}
                      </p>
                      <p className="text-gray-600 mb-2">
                        <span className="font-semibold">Free From:</span>{" "}
                        {product.free_from}
                      </p>
                      <p className="text-gray-600 mb-2">
                        <span className="font-semibold">Fun Facts:</span>{" "}
                        {product.fun_facts}
                      </p>
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold mb-4">Product Info:</h2>
                  <ul className="list-disc list-inside mb-6">
                    {product.product_info.map((info) => (
                      <li key={info.key} className="text-gray-600 mb-2">
                        <span className="font-semibold">{info.key}:</span>{" "}
                        {info.status}
                      </li>
                    ))}
                  </ul>
                  <p className="text-gray-600">
                    <span className="font-semibold">When to Use:</span>{" "}
                    {product.when_to_use}
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-4">Ingredients:</h2>
                  {product.ingredients.map((ingredient) => (
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
                          expandedIngredient === ingredient._id
                            ? "block"
                            : "hidden"
                        } p-4 border-t border-gray-200`}>
                        <p className="text-lg text-black mb-2 font-bold">
                          what_it_does :{" "}
                          <span className="text-sm font-normal">
                            {ingredient.what_it_does}
                          </span>
                        </p>
                        <Ingredient ingredient_id={ingredient._id} />
                        <IngredientProducts val={ingredient.ingredient_name} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="container mx-auto px-4 py-8">
              Product not found.
            </div>
          )}
        </>
      )}
    </div>
  );
};
