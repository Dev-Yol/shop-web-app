const { Schema, model } = require('mongoose');

const OrderItemSchema = new Schema({
    product: { type: Schema.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true },
})

const OrderItem = model("OrderItem", OrderItemSchema);
module.exports = OrderItem;