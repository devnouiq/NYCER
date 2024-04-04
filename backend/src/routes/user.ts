import express, { Request, Response } from "express";
import { EMAIL, PRODUCT, ProductType, KEYWORDS } from "../db/db"
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
        ).limit(5);

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
    const { page = 1, limit = 8 }: any = req.query;
    const skip = (page - 1) * limit;

    try {
        const randomProducts = await PRODUCT.aggregate([
            {
                $project: {
                    brand_name: 1,
                    product_name: 1,
                    product_img: 1
                }
            },
            { $skip: skip },
            { $sample: { size: parseInt(limit) } }
        ]);

        res.json({ randomProducts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


router.get("/ingredients", async (req, res) => {
  const { page = 1, limit = 8 }: any= req.query;
  const skip = (page - 1) * limit;
  try {
    const ingredients = await PRODUCT.aggregate([
      { $unwind: "$ingredients" },
      {
        $project: {
          "ingredient_name": "$ingredients.ingredient_name",
          "what_it_does": "$ingredients.what_it_does",
          "description": "$ingredients.description",
          "_id": "$ingredients._id"
        }
      },
      { $skip: skip },
      { $sample: { size: parseInt(limit) } }
    ]);

    res.json({ ingredients });
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


router.post('/keywordsdata', async (req: Request, res: Response) => {
  try {
    const { keyword } = req.body;

    let existingKeyword = await KEYWORDS.findOne({ keyword });

    if (existingKeyword) {
      existingKeyword.count += 1;
    } else {
      existingKeyword = new KEYWORDS({ keyword, count: 1 });
    }

    await existingKeyword.save();

    res.status(201).json(existingKeyword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});


router.get('/allkeywordsdata', async (req: Request, res: Response) => {
  try {

    const keywords = await KEYWORDS.find();

    res.status(200).json(keywords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});


router.post('/emails', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const existingEmail = await EMAIL.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const newEmail = new EMAIL({
      email
    });
    const savedEmail = await newEmail.save();

    res.status(201).json(savedEmail);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.get('/allemails', async (req: Request, res: Response) => {
  try {
    const emails = await EMAIL.find();
    res.status(200).json(emails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});


export default router;