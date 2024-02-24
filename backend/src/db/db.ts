import { Schema, connect, model } from "mongoose"
import dotenv from "dotenv";

dotenv.config();

export type UserType = {
    email: string,
    password: string
}

type ProductInfoType = {
    key: string,
    status: string
}

type IngredientsType = {
    ingredient_name?: string,
    what_it_does?: string,
    community_rating?: string,
    description?: string
}

export type ProductType = {
    brand_name: string;
    product_name: string;
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



const userSchema = new Schema<UserType>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }

})


const ProductInfoSchema = new Schema<ProductInfoType>({
    key: { type: String, required: true },
    status: { type: String, required: true }
});

const IngredientsSchema = new Schema<IngredientsType>({
    ingredient_name: { type: String, required: true },
    what_it_does: { type: String, required: true },
    community_rating: { type: String },
    description: { type: String, required: true }
});

const productSchema = new Schema({
    brand_name: { type: String, required: true },
    product_name: { type: String, required: true },
    product_type: { type: String, required: true },
    what_it_is: { type: String, required: true },
    cool_features: { type: String, required: true },
    suited_for: { type: String, required: true },
    free_from: { type: String, required: true },
    fun_facts: { type: String, required: true },
    notable_ingredients: { type: [String], required: true },
    benefits: { type: [String], required: true },
    product_info: { type: [ProductInfoSchema], required: true },
    ingredients: { type: [IngredientsSchema], required: true },
    when_to_use: { type: String, required: true },
});

const USER = model<UserType>("User", userSchema);
const PRODUCT = model<ProductType>("Product", productSchema);

export {
    USER,
    PRODUCT
}