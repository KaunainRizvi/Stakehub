const express = require('express');
const { addOrder, getPendingOrders, getCompletedOrders } = require('../controllers/orderController');
const router = express.Router();

router.route('/add').post(addOrder);
router.route('/pending').get(getPendingOrders);
router.route('/completed').get(getCompletedOrders);

module.exports = router;
