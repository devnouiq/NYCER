import express, { Request, Response } from "express";
import { PRODUCT } from "../db/db"
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.get("/search", async (req: Request, res: Response) => {
    const keyword: string = req.query.keyword as string;

    if (!keyword) {
        return res.status(400).json({ message: "Keyword is required" });
    }

    try {
        const results = await PRODUCT.find(
            { $text: { $search: keyword } },
            { brand_name: 1, product_name: 1, product_img: 1, score: { $meta: "textScore" } } // Projection
        ).sort({ score: { $meta: "textScore" } }).limit(10);

        if (results.length === 0) {
            return res.status(404).json({ message: "No matching products found" });
        }

        res.json({ message: "Search results", results: results });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})

router.get("/search/:searchid", async (req: Request, res: Response) => {
    try {
        const singleProductId: string = req.params.searchid;
        const singleProduct: string = await PRODUCT.findById(singleProductId) || "";
        if(singleProduct){
            res.json({singleProduct});
        } else {
            res.status(404).json({message: "Product not found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal Server Error"});
    }
});


export default router;
