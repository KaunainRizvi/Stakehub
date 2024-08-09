import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrdersTable = () => {
    const [pendingOrders, setPendingOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data: pendingData } = await axios.get('/api/orders/pending', config);
            const { data: completedData } = await axios.get('/api/orders/completed', config);

            setPendingOrders(pendingData);
            setCompletedOrders(completedData);
        };

        fetchOrders();
    }, []);

    return (
        <div>
            <h2>Pending Orders</h2>
            <table>
                <thead>
                    <tr>
                        <th>Buyer Qty</th>
                        <th>Buyer Price</th>
                        <th>Seller Price</th>
                        <th>Seller Qty</th>
                    </tr>
                </thead>
                <tbody>
                    {pendingOrders.map((order) => (
                        <tr key={order._id}>
                            <td>{order.buyerQty}</td>
                            <td>{order.buyerPrice}</td>
                            <td>{order.sellerPrice}</td>
                            <td>{order.sellerQty}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Completed Orders</h2>
            <table>
                <thead>
                    <tr>
                        <th>Price</th>
                        <th>Qty</th>
                    </tr>
                </thead>
                <tbody>
                    {completedOrders.map((order) => (
                        <tr key={order._id}>
                            <td>{order.price}</td>
                            <td>{order.qty}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersTable;
