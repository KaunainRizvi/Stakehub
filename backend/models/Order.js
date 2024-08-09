const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    buyerQty: { type: Number, required: true },
    buyerPrice: { type: Number, required: true },
    sellerPrice: { type: Number, required: true },
    sellerQty: { type: Number, required: true },
}, { timestamps: true });

const completedOrderSchema = mongoose.Schema({
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
const CompletedOrder = mongoose.model('CompletedOrder', completedOrderSchema);

module.exports = { Order, CompletedOrder };
