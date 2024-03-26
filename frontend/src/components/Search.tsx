import React from "react";
import { Search } from "lucide-react";
import { useSearchFieldHooks } from "../hooks/useSearchFieldHooks";
import { SearchFieldProps } from "../types/SearchFieldTypes";
import { Loading } from "./Loading";
import { TileView } from "./TileView";
import { Product } from "./Product";
import { ProductType } from "../types/ProductTypes";

export const SearchField: React.FC<SearchFieldProps> = ({
  placeholder,
  setOpenModal,
  openModal,
}) => {
  const {
    searchProduct,
    val,
    displayedProducts,
    showModal,
    loading,
    handleLoadMore,
    handleSearch,
    handleKeyPress,
    setShowModal,
    setVal,
  } = useSearchFieldHooks(openModal, setOpenModal);

  return (
    <div className="bg-transparent">
      {loading && <Loading />}
      {searchProduct.length > 0 && (
        <div className="text-white text-4xl md:text-7xl font-bold text-center mt-4 mb-8 md:mt-8">
          Skincare At A Deeper Level
        </div>
      )}
      <div className="flex flex-grow max-w-[600px] xl:max-w-fit relative mx-auto">
        <button
          onClick={() => handleSearch(val)}
          className="text-white absolute left-0 top-0 bottom-0 m-auto px-4">
          <Search />
        </button>
        <input
          type="search"
          placeholder={placeholder}
          className="rounded-full border-secondary-border border-4 border-solid w-full md:w-[390px] py-4 px-6 bg-transparent text-white placeholder-white placeholder-opacity-100 font-bold pl-12 focus:border-white outline-none"
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
          }}
          onKeyDown={handleKeyPress}
        />
      </div>
      {searchProduct.length > 0 ? (
        <div className="flex flex-wrap items-center justify-center mt-4 font-bold text-white">
          {searchProduct
            .slice(0, displayedProducts)
            .map((product: ProductType) => (
              <div
                key={product._id}
                className="mt-2 px-2 lg:pl-20 w-full sm:w-1/2 md:w-1/3 transition-opacity duration-500 ease-in-out opacity-100">
                <TileView
                  product_id={product._id}
                  setShowModal={setShowModal}
                  {...product}
                />
              </div>
            ))}

          {searchProduct.length > displayedProducts && (
            <div className="w-full text-center mt-4 transition-opacity duration-500 ease-in-out opacity-100">
              <button
                onClick={handleLoadMore}
                className="bg-black text-white p-2 rounded-xl hover:bg-black focus:outline-none focus:ring focus:border-white">
                Load More
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="pt-8 text-center text-2xl text-white font-semibold">
          N Y C E R S E A R C H T O O L
        </div>
      )}
      {searchProduct.length == 0 && (
        <div className="text-white text-4xl md:text-7xl font-bold text-center mt-4 md:mt-32">
          Skincare At A Deeper Level
        </div>
      )}
      {showModal !== null && (
        <Product
          visible={true}
          setShowModal={setShowModal}
          product_id={showModal}
        />
      )}
    </div>
  );
};
