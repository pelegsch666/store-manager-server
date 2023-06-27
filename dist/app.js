"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Item_1 = __importDefault(require("./models/Item"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors = require('cors');
const app = (0, express_1.default)();
const PORT = 8085;
app.use(cors());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send([{ man: 'man' }]);
    console.log('lets send it');
});
app.post('/item', (req, res) => {
    try {
        console.log(req.body);
        const item = Item_1.default.create(req.body);
        console.log(item);
        res.status(200).json(item);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
});
app.delete('/items/:id', (req, res) => {
    console.log('iam here');
    const itemId = req.params.id;
    Item_1.default.deleteOne({ _id: itemId })
        .then(result => {
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'Item deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'Item not found' });
        }
    })
        .catch(error => res.status(500).json({ error })); // Replace "YourModel" with your actual Mongoose model name and "_id" with the identifier field of your model
});
app.get('/data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Item_1.default.find(); // Replace "YourModel" with your actual Mongoose model name
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
}));
app.put('/items/:id', (req, res) => {
    const itemId = req.params.id;
    const updateData = req.body;
    Item_1.default.findByIdAndUpdate(itemId, updateData, { new: true })
        .then(updatedItem => {
        if (updatedItem) {
            res.status(200).json(updatedItem);
        }
        else {
            res.status(404).json({ message: 'Item not found' });
        }
    })
        .catch(error => {
        res.status(500).json({ message: 'Error updating item', error: error.message });
    });
});
const connetToDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect('mongodb+srv://drfeelgoodpeleg:pokemon@cluster0.icinodo.mongodb.net/?retryWrites=true&w=majority');
        console.log('connected to db');
        app.listen(PORT, () => console.log(`app running on port ${PORT}`));
    }
    catch (error) {
        console.log(error);
    }
});
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
