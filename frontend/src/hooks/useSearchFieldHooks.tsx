import { useState, useEffect, useContext } from "react";
import { AccountContext } from "./Account";
import { ProductType } from "../types/ProductTypes";
import { searchApi } from "../services/api/SearchApi";

export const useSearchFieldHooks = (
  openModal: boolean,
  setOpenModal: (val: boolean) => void
) => {
  const [searchProduct, setSearchProduct] = useState<ProductType[]>([]);
  const [val, setVal] = useState<string>("");
  const [displayedProducts, setDisplayedProducts] = useState<number>(3);
  const [showModal, setShowModal] = useState<number | null>(null);
  const { getSession } = useContext(AccountContext);
  const [currentUser, setCurrentUser] = useState<void>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getSession()
      .then((session) => {
        console.log("Session: ", session);
        setCurrentUser(session);
      })
      .catch((err) => {
        console.error(err);
        console.log("Please Login !");
      });
  }, [openModal]);

  const handleLoadMore = () => {
    setDisplayedProducts(displayedProducts + 3);
  };

  const handleSearch = (val: string) => {
    if (!currentUser) {
      setOpenModal(true);
    } else {
      setLoading(true);
      searchApi(val)
        .then((response) => {
          setSearchProduct(response.data.results);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(val);
    }
  };

  return {
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
  };
};
