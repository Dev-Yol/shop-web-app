const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    variants: { type: [String] }, //colors 
    sizes: { type: [String] },
    photo: { type: String },
    description: { type: String }, //optional
    // photos: { type: [String] },  if  you want multiple
})

const Product = model("Product", ProductSchema);
module.exports = Product;