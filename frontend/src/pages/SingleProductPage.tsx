import { useEffect, useState } from "react";
import { getProductDetails } from "../services/api/SingleProduct";
import { ProductType } from "../types/ProductTypes";
import { useParams } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
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
                  <div className="mb-8">
                    <p className="text-gray-600 mb-4">
                      <span className="font-semibold text-lg">Brand:</span>{" "}
                      {product.brand_name}
                    </p>
                    <p className="text-gray-600 mb-4">
                      <span className="font-semibold text-lg">
                        Product Type:
                      </span>{" "}
                      {product.product_type}
                    </p>
                    <p className="text-gray-600 mb-4">
                      <span className="font-semibold text-lg">
                        Notable Ingredients:
                      </span>{" "}
                      {product.notable_ingredients.join(", ")}
                    </p>
                    <p className="text-gray-600 mb-4">
                      <span className="font-semibold text-lg">Benefits:</span>{" "}
                      {product.benefits.join(", ")}
                    </p>
                  </div>
                  <div className="flex flex-col space-y-4">
                    <div className="flex flex-col md:flex-row items-start">
                      <span className="font-semibold text-lg text-gray-800 mr-2">
                        Suited for:
                      </span>
                      <p className="text-gray-600 text-justify">
                        {product.suited_for}
                      </p>
                    </div>
                    <div className="flex flex-col md:flex-row items-start">
                      <span className="font-semibold text-lg text-gray-800 mr-2">
                        Free From:
                      </span>
                      <p className="text-gray-600 text-justify">
                        {product.free_from}
                      </p>
                    </div>
                    <div className="flex flex-col md:flex-row items-start">
                      <span className="font-semibold text-lg text-gray-800 mr-2">
                        Fun Facts:
                      </span>
                      <p className="text-gray-600 text-justify">
                        {product.fun_facts}
                      </p>
                    </div>
                  </div>
                  <div className="my-6">
                    <h2 className="text-xl font-semibold mb-4">
                      Product Info:
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                      {product.product_info.map((info) => (
                        <div key={info.key} className="flex items-center">
                          <span className="font-semibold mr-2">
                            {info.key}:
                          </span>
                          <span className="text-gray-600">{info.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-600 text-justify">
                    <span className="font-semibold ">When to Use:</span>{" "}
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
