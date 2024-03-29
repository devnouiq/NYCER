import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/user';
import mongoose from 'mongoose';
import cors from 'cors';
dotenv.config();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

const corsOptions = {
  origin: ['https://www.nycerbeautysearch.com'],
};

app.use(express.json());
app.use(cors(corsOptions));

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Server is up and running!');
});

app.use('/', userRoute);

(async () => {
  try {
    await mongoose.connect(process.env.DB_URL!,{
          tlsCAFile: `global-bundle.pem`,
      });
  } catch (err: any) {
    console.log('error: ' + err);
  }
})();

app.listen(port, () => {
  console.log(`[server]: Server is running ${process.pid}`);
});
