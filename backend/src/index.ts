import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/user";
import mongoose from "mongoose";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!!");
});

app.use("/user", userRoute);

(async () => {
    try {
        await mongoose.connect(process.env.DB_URL!);
    } catch (err) {
        console.log("error: " + err);
    }
})();

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});