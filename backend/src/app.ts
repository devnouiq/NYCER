import cluster from 'cluster';
import os from 'os';
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/user';
import mongoose from 'mongoose';
import cors from 'cors';
dotenv.config();

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers
  cluster.fork();
//   for (let i = 0; i < numCPUs-3; i++) {
//     cluster.fork();
//   }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  const app: Express = express();
  const port: number | string = process.env.PORT || 3000;

  // Custom CORS middleware function
  const corsOptions = {
    origin: ['http://localhost:5173'],
  };

  app.use(express.json());
  app.use(cors(corsOptions));

  app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Server is up and running!');
  });

  app.use('/', userRoute);

  (async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI!);
    } catch (err: any) {
      console.log('error: ' + err);
    }
  })();

  app.listen(port, () => {
    console.log(`[server]: Server is running ${process.pid}`);
  });
}
