const { Schema, model } = require('mongoose');

const CartSchema = new Schema({
    customer: { type: Schema.ObjectId, ref: 'Person' },
    orderItems: { type: Schema.ObjectId, ref: 'OrderItem' },
    dateOrdered: { type: Date, default: new Date() },
    total: { type: Number, required: true }
})

const Cart = model("Cart", CartSchema);
module.exports = Cart;