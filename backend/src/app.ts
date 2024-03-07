import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import userRoute from "./routes/user";
import mongoose from "mongoose";
import cors from "cors";
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
        await mongoose.connect(process.env.DB_URL!,{
            tlsCAFile: `global-bundle.pem` //Specify the DocDB; cert
          },);
    } catch (err) {
        console.log("error: " + err);
    }
})();

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});