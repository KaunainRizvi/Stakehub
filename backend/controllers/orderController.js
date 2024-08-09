const asyncHandler = require('express-async-handler');
const { Order, CompletedOrder } = require('../models/Order');

const addOrder = asyncHandler(async (req, res) => {
    const { buyerQty, buyerPrice, sellerPrice, sellerQty } = req.body;

    const match = await Order.findOne({
        buyerPrice: sellerPrice,
        sellerQty: buyerQty,
    });

    if (match) {
        const qty = Math.min(buyerQty, sellerQty);

        await CompletedOrder.create({
            price: buyerPrice,
            qty,
        });

        if (match.sellerQty === qty && match.buyerPrice === sellerPrice) {
            await match.remove(); // Remove the exact matching order
        } else {
            match.sellerQty -= qty;
            await match.save();
        }

        res.status(201).json({ message: 'Order matched and completed!' });
    } else {
        const order = new Order({
            buyerQty,
            buyerPrice,
            sellerPrice,
            sellerQty,
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
});

const getPendingOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({});
    res.json(orders);
});

const getCompletedOrders = asyncHandler(async (req, res) => {
    const orders = await CompletedOrder.find({});
    res.json(orders);
});

module.exports = { addOrder, getPendingOrders, getCompletedOrders };
