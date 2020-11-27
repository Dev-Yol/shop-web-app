const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    photo: { type: String },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    brand: { type: String, required: true },
    color: { type: [String], required: true },
    size: { type: [String], required: true },
    description: { type: String },
}, {
    collection: 'products'
})

const Product = model("Product", ProductSchema);
module.exports = Product;