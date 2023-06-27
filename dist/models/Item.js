"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const itemSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    catalogNumber: { type: String, required: true },
    itemDescription: String,
    itemType: { type: String, enum: ['fruit', 'vegetable', 'field crop'], required: true },
    date: String,
});
const Item = mongoose_1.default.model('item', itemSchema);
exports.default = Item;
