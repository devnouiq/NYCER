"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRODUCT = exports.USER = void 0;
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const userSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const ProductInfoSchema = new mongoose_1.Schema({
    key: { type: String, required: true },
    status: { type: String, required: true }
});
const IngredientsSchema = new mongoose_1.Schema({
    ingredient_name: { type: String, required: true },
    what_it_does: { type: String, required: true },
    community_rating: { type: String },
    description: { type: String, required: true }
});
const productSchema = new mongoose_1.Schema({
    brand_name: { type: String, required: true },
    product_name: { type: String, required: true },
    product_img: { type: String, required: true },
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
    combined_data: { type: String, required: true }
});
const USER = (0, mongoose_1.model)("User", userSchema);
exports.USER = USER;
const PRODUCT = (0, mongoose_1.model)("Products_data", productSchema, 'products_data');
exports.PRODUCT = PRODUCT;
