import express from 'express';
import Item from './models/Item';
import mongoose from 'mongoose';
const cors = require('cors');

const app = express();
const PORT = 5150;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send([{ man: 'man' }]);
  console.log('lets send it');
});

app.post('/item', (req, res) => {
  try {
    console.log(req.body);
    const item = Item.create(req.body);
    console.log(item);
    console.log('here');
    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
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
  try {
    const data = await Item.find(); // Replace "YourModel" with your actual Mongoose model name
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
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
  try {
    await mongoose.connect(
      'mongodb+srv://drfeelgoodpeleg:pokemon@cluster0.icinodo.mongodb.net/?retryWrites=true&w=majority'
    );
    console.log('connected to db');
    app.listen(PORT, () => console.log(`app running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
connetToDb();

// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//   })
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server  Port: ${PORT}`);
//       /* Add data one time */
//         //  User.insertMany(users);
//         // Post.insertMany(posts);
//     });
//   })
//   .catch(error => console.log(error));
