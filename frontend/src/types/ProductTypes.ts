type ProductInfoType = {
    key: string,
    status: string
}

export type IngredientsType = {
    isExpanded: boolean;
    _id: number;
    ingredient_name?: string,
    what_it_does?: string,
    community_rating?: string,
    description?: string
}

export type ProductType = {
    _id: number;
    brand_name: string;
    product_name: string;
    product_img: string;
    product_type: string;
    what_it_is: string;
    cool_features: string;
    suited_for: string;
    free_from: string;
    fun_facts: string;
    notable_ingredients: string[];
    benefits: string[];
    product_info: ProductInfoType[];
    ingredients: IngredientsType[];
    when_to_use: string;
}


export type ModalType= {
  visible: boolean;
  setShowModal: (productId: number | null) => void;
  product_id: number;
}