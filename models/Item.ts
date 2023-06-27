import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({

  name: { type: String, required: true },
  catalogNumber: { type: String, required: true },
  itemDescription: String,
  itemType: {type: String,enum: ['fruit', 'vegetable', 'field crop'],required: true},
  date: String,
});

const Item = mongoose.model('item', itemSchema)

export default Item;
