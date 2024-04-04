import { useState, useEffect } from "react";
// import { AccountContext } from "./Account";
import { ProductType } from "../types/ProductTypes";
import { searchApi } from "../services/api/SearchApi";
import { createKeyword } from "../services/api/UserDataApi";

export const useSearchFieldHooks = (
  openModal: boolean,
  setOpenModal: (val: boolean) => void
) => {
  const [searchProduct, setSearchProduct] = useState<ProductType[]>([]);
  const [val, setVal] = useState<string>("");
  const [displayedProducts, setDisplayedProducts] = useState<number>(3);
  const [showModal, setShowModal] = useState<number | null>(null);
  // const { getSession } = useContext(AccountContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [keywords, setKeywords] = useState<{
    keyword: string;
  }>({ keyword: "" });
  setOpenModal;
  openModal;

  useEffect(() => {
    if (keywords.keyword.length > 0) {
      const createUserWithKeywords = async () => {
        try {
          await createKeyword(keywords.keyword.toLowerCase());
        } catch (error) {
          console.error("Error creating user:", error);
        }
      };

      createUserWithKeywords();
    }
  }, [keywords.keyword]);

  // useEffect(() => {
  //   getSession()
  //     .then((session) => {
  //       setCurrentUser(session);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       console.log("Please Login !");
  //     });
  // }, [openModal]);

  const handleLoadMore = () => {
    setDisplayedProducts(displayedProducts + 3);
  };

  const handleSearch = (val: string) => {
    setLoading(true);
    setKeywords({ keyword: val });
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
