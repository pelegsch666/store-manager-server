import express from 'express';
import Item from './models/Item';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import itemsRouter from './routes/items.routes';
dotenv.config();

const MONGOURL = process.env.MONGO_URL as string;
const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/items', itemsRouter)

// connect to db

// comment 
const connetToDb = async () => {
  mongoose
    .connect(MONGOURL)
    .then(() => {
      console.log('connected to db');
      app.listen(PORT, () => console.log(`app running on port ${PORT}`));
    })
    .catch(error => {
      console.log(error);
    });
};
connetToDb();
