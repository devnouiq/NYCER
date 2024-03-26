import { useProduct } from "../hooks/useProductDetails";
import { IngredientsType, ProductType, ModalType } from "../types/ProductTypes";

export const Product: React.FC<ModalType> = ({
  visible,
  setShowModal,
  product_id,
}) => {
  if (!visible) return null;

  const truncateDescription = (
    maxLength: number,
    description?: string
  ): string => {
    if (description) {
      return description.length > maxLength
        ? description.substring(0, maxLength) + "..."
        : description;
    }
    return "";
  };

  const handleReadMore = (
    setProductDetails: React.Dispatch<React.SetStateAction<ProductType | null>>,
    ingredientId: number
  ): void => {
    setProductDetails((prevProductDetails) => {
      if (!prevProductDetails) {
        return prevProductDetails;
      }
      const updatedIngredients = prevProductDetails.ingredients.map(
        (ingredient) => {
          if (ingredient._id === ingredientId) {
            return {
              ...ingredient,
              isExpanded: !ingredient.isExpanded,
            };
          }
          return ingredient;
        }
      );

      return {
        ...prevProductDetails,
        ingredients: updatedIngredients,
      };
    });
  };

  const { productDetails, setProductDetails } = useProduct(product_id);

  return (
    <div className="bg-[#AF7153] p-4 md:p-8 mt-20 fixed inset-2 overflow-y-auto max-h-[80vh] max-w-[60vw] mx-auto rounded-lg shadow-lg">
      <button
        onClick={() => {
          setShowModal(null);
        }}
        className="bg-black text-white p-2 rounded-xl hover:bg-black focus:outline-none focus:ring focus:border-white">
        Cancel
      </button>

      {productDetails && (
        <div className="mt-4 md:mt-6 text-white">
          <div className="flex items-center justify-center">
            <img
              src={productDetails.product_img}
              alt=""
              className="h-40 w-40 md:h-48 md:w-48 object-contain rounded-md shadow-md bg-current"
            />
          </div>
          <h2 className="text-lg md:text-2xl font-bold">
            {productDetails.product_name}
          </h2>

          <div className="mt-2 p-4 border border-gray-300 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Benefits:</h3>
            <div className="text-black font-bold">
              {productDetails.benefits &&
                productDetails.benefits.map(
                  (benefit: string, index: number) => (
                    <p key={index} className="mb-2">
                      {benefit}
                    </p>
                  )
                )}
            </div>
          </div>

          {productDetails.ingredients && (
            <div className="mt-6">
              {productDetails.ingredients.map((ingredient: IngredientsType) => (
                <div
                  key={ingredient._id}
                  className="mb-8 p-6 bg-[#E1CEC3] rounded-lg shadow-md">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 flex ite">
                    Ingredient Name: {ingredient.ingredient_name}
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Description:{" "}
                    {ingredient.isExpanded
                      ? ingredient.description
                      : truncateDescription(100, ingredient.description)}
                  </p>

                  {ingredient.description &&
                    ingredient.description.length > 100 && (
                      <button
                        className="text-slate-400 mt-2 hover:text-black focus:outline-none"
                        onClick={() =>
                          handleReadMore(setProductDetails, ingredient._id)
                        }>
                        {ingredient.isExpanded ? "Read Less" : "Read More"}
                      </button>
                    )}

                  <p className="mt-2 text-gray-600">
                    Community Rating: {ingredient.community_rating}
                  </p>
                  <p className="mt-2 text-gray-600">
                    What It Does: {ingredient.what_it_does}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
