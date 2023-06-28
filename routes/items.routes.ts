import express from 'express';
import Item from '../models/Item';

const itemsRouter = express.Router();


// adding item
itemsRouter.post('/', (req, res) => {
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
// delete item
itemsRouter.delete('/:id', (req, res) => {
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

// get all items
itemsRouter.get('/', async (req, res) => {
  Item.find()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: err });
    });
});
// update item
itemsRouter.put('/:id', async (req, res) => {
  const itemId = req.params.id;
  const updateData = req.body;
   console.log(itemId, req.body)
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

export default itemsRouter