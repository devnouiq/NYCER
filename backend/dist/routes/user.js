"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../db/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET || '';
const router = express_1.default.Router();
function generateJwtForUser(user) {
    const payload = { email: user.email };
    return jsonwebtoken_1.default.sign(payload, SECRET_KEY, { expiresIn: "1h" });
}
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const userFound = yield db_1.USER.findOne({ email });
    if (userFound) {
        res.status(401).json({ message: "User already exists!" });
    }
    else {
        const newUser = new db_1.USER({ email, password });
        yield newUser.save();
        const token = generateJwtForUser(newUser);
        res.status(201).json({ message: "new user created successfully!!", token: token });
    }
}));
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield db_1.USER.findOne({ email, password });
    if (user) {
        const token = generateJwtForUser(user);
        res.json({ message: "user logged in sucessfully!!", token: token });
    }
    else {
        res.status(403).json({ message: "Invalid username or password" });
    }
}));
router.get("/test", (req, res) => {
    res.json({ message: "test" });
});
router.get("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const keyword = req.query.keyword;
    if (!keyword) {
        return res.status(400).json({ message: "Keyword is required" });
    }
    try {
        const results = yield db_1.PRODUCT.find({
            $or: [
                { brand_name: { $regex: keyword, $options: 'i' } },
                { product_name: { $regex: keyword, $options: 'i' } },
                { product_type: { $regex: keyword, $options: 'i' } },
                { what_it_is: { $regex: keyword, $options: 'i' } },
                { cool_features: { $regex: keyword, $options: 'i' } },
                { suited_for: { $regex: keyword, $options: 'i' } },
                { free_from: { $regex: keyword, $options: 'i' } },
                { fun_facts: { $regex: keyword, $options: 'i' } },
                { notable_ingredients: { $elemMatch: { $regex: keyword, $options: 'i' } } },
                { benefits: { $elemMatch: { $regex: keyword, $options: 'i' } } },
                { 'product_info.key': { $regex: keyword, $options: 'i' } },
                { 'product_info.status': { $regex: keyword, $options: 'i' } },
                { 'ingredients.ingredient_name': { $regex: keyword, $options: 'i' } },
                { 'ingredients.what_it_does': { $regex: keyword, $options: 'i' } },
                { 'ingredients.community_rating': { $regex: keyword, $options: 'i' } },
                { 'ingredients.description': { $regex: keyword, $options: 'i' } },
                { when_to_use: { $regex: keyword, $options: 'i' } }
            ]
        });
        if (results.length === 0) {
            return res.status(404).json({ message: "No matching products found" });
        }
        res.json({ message: "Search results", results: results });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
router.get("/search/:searchid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const singleProductId = req.params.searchid;
        const singleProduct = (yield db_1.PRODUCT.findById(singleProductId)) || "";
        if (singleProduct) {
            res.json({ singleProduct });
        }
        else {
            res.status(404).json({ message: "Product not found" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
exports.default = router;
