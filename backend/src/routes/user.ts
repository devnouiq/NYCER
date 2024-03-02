import express, { Express, Request, Response } from "express";
import { USER, UserType, ProductType, PRODUCT } from "../db/db"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY: string = process.env.ACCESS_TOKEN_SECRET || '';

const router = express.Router();

function generateJwtForUser(user: UserType) {
    const payload = { email: user.email }
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
}

router.post("/signup", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userFound = await USER.findOne({ email });
    if (userFound) {
        res.status(401).json({ message: "User already exists!" });
    } else {
        const newUser = new USER({ email, password });
        await newUser.save();
        const token = generateJwtForUser(newUser);
        res.status(201).json({ message: "new user created successfully!!", token: token });
    }
})

router.post("/signin", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user: UserType | null = await USER.findOne({ email, password });

    if (user) {
        const token = generateJwtForUser(user);
        res.json({ message: "user logged in sucessfully!!", token: token });
    } else {
        res.status(403).json({ message: "Invalid username or password" });
    }
})

router.get("/test", (req, res) => {
    res.json({message: "test"})
})

router.get("/search", async (req: Request, res: Response) => {
    const keyword: string = req.query.keyword as string;
    if (!keyword) {
        return res.status(400).json({ message: "Keyword is required" });
    }
    try {
        const results = await PRODUCT.find({
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
    } catch (error) {
        console.error(error);
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
