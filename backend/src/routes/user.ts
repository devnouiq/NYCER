import express, { Request, Response } from "express";
import { PRODUCT, ProductType, USER } from "../db/db"
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
        {
            $or: [
            { brand_name: { $regex: keyword, $options: "i" } },
            { product_name: { $regex: keyword, $options: "i" } },
            { notable_ingredients: { $regex: keyword, $options: "i" } },
            ]
        },
        {
            brand_name: 1,
            product_name: 1,
            product_img: 1
        }
        ).limit(10);

        if (results.length === 0) {
            return res.status(404).json({ message: "No matching products found" });
        }

        res.json({ message: "Search results", results: results });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})


router.get("/searchbyingredient", async (req: Request, res: Response) => {
    const keyword: string = req.query.keyword as string;

    if (!keyword) {
        return res.status(400).json({ message: "Keyword is required" });
    }

    try {
        const results = await PRODUCT.find(
        {
            "ingredients.ingredient_name": { $regex: keyword, $options: "i" }
        },
        {
            brand_name: 1,
            product_name: 1,
            product_img: 1
        }
        ).limit(8);

        if (results.length === 0) {
            return res.status(404).json({ message: "No matching products found" });
        }

        res.json({ message: "Search results", results: results });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})

router.get("/search/:productid", async (req: Request, res: Response) => {
    try {
        const singleProductId: string = req.params.productid;
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


router.get("/products", async (req: Request, res: Response) => {
    try {
        const randomProducts: ProductType[] = await PRODUCT.aggregate([
            { $sample: { size: 8 } },
            {
                $project: {
                    brand_name: 1,
                    product_name: 1,
                    product_img: 1
                }
            }
        ]);

        res.json({ randomProducts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


router.get("/ingredients", async (req: Request, res: Response) => {
    try {
        const randomIngredients: ProductType[] = await PRODUCT.aggregate([
            { $sample: { size: 2 } },
            { $unwind: "$ingredients" },
            { $sample: { size: 10 } },
            {
                $project: {
                    "ingredient_name": "$ingredients.ingredient_name",
                    "what_it_does": "$ingredients.what_it_does",
                    "community_rating": "$ingredients.community_rating",
                    "description": "$ingredients.description",
                    "_id": "$ingredients._id"
                }
            }
        ]);

        res.json({ randomIngredients });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


router.get("/ingredients/:ingredientsId", async (req: Request, res: Response) => {
  try {
    const ingredientsId = req.params.ingredientsId;

    const product: ProductType | null = await PRODUCT.findOne(
      { "ingredients._id": ingredientsId },
      { "ingredients.$": 1, _id: 0 }
    );

    if (!product) {
      return res.status(404).json({ message: "Ingredient not found" });
    }

    const ingredient = product.ingredients[0];

    res.json({ ingredient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.post('/usersdata', async (req: Request, res: Response) => {
  try {
    const { username, keyword } = req.body;

    const user = await USER.findOne({ username });

    if (!user) {
      const newUser = new USER({
        username,
        keywords: [{ keyword, count: 1 }],
      });

      const savedUser = await newUser.save();
      return res.status(201).json(savedUser);
    }

    const existingKeyword = user.keywords.find(kw => kw.keyword === keyword);

    if (existingKeyword) {
      existingKeyword.count += 1;
    } else {
      user.keywords.push({ keyword, count: 1 });
    }

    const savedUser = await user.save();

    res.status(200).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});


router.get('/allusersdata', async (req: Request, res: Response) => {
  try {

    const users = await USER.find();

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});



export default router;