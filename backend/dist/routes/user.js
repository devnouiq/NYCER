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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
router.get("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const keyword = req.query.keyword;
    if (!keyword) {
        return res.status(400).json({ message: "Keyword is required" });
    }
    try {
        const results = yield db_1.PRODUCT.find({ $text: { $search: keyword } }, { brand_name: 1, product_name: 1, product_img: 1, score: { $meta: "textScore" } } // Projection
        ).sort({ score: { $meta: "textScore" } }).limit(10);
        if (results.length === 0) {
            return res.status(404).json({ message: "No matching products found" });
        }
        res.json({ message: "Search results", results: results });
    }
    catch (error) {
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
