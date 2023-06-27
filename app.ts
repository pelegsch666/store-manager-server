import express from 'express';
import Item from './models/Item';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const MONGOURL = process.env.MONGO_URL as string;
const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

app.post('/item', (req, res) => {
  console.log(req.body);
  Item.create(req.body)
    .then(item => {
      res.status(200).json(item);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: err });
    });
});

app.delete('/items/:id', (req, res) => {
  const itemId = req.params.id;
  Item.deleteOne({ _id: itemId })
    .then(result => {
      if (result.deletedCount > 0) {
        res.status(200).json({ message: 'Item deleted successfully' });
      } else {
        res.status(404).json({ message: 'Item not found' });
      }
    })
    .catch(error => res.status(500).json({ error })); // Replace "YourModel" with your actual Mongoose model name and "_id" with the identifier field of your model
});
app.get('/items/:name', (req, res) => {
  console.log('searching for item');
  const itemName = req.params.name;
  Item.findOne({ name: itemName })
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.status(500).json({ message: error });
    });
});

app.get('/data', async (req, res) => {
  Item.find()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: err });
    });
});

app.put('/items/:id', (req, res) => {
  const itemId = req.params.id;
  const updateData = req.body;

  Item.findByIdAndUpdate(itemId, updateData, { new: true })
    .then(updatedItem => {
      if (updatedItem) {
        res.status(200).json(updatedItem);
      } else {
        res.status(404).json({ message: 'Item not found' });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: 'Error updating item', error: error.message });
    });
});

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
