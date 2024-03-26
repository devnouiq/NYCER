export type IngredientsType = {
  ingredient_name?: string;
  what_it_does?: string;
  community_rating?: string;
  description?: string;
};

export type ProductView = {
  product_id: number;
  product_name: string;
  product_img: string;
  ingredients: IngredientsType[];
  benefits: string[];
  setShowModal: (productId: number) => void;
};
