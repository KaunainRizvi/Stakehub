import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container } from '@mui/material';

const OrdersTable = () => {
    const [pendingOrders, setPendingOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            const storedUserInfo = localStorage.getItem('userInfo');
            if (!storedUserInfo) {
                navigate('/login'); 
                return;
            }

            const userInfo = JSON.parse(storedUserInfo);

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            try {
                const { data: pendingData } = await axios.get('/api/orders/pending', config);
                const { data: completedData } = await axios.get('/api/orders/completed', config);

                setPendingOrders(pendingData);
                setCompletedOrders(completedData);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [navigate]);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Pending Orders</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Buyer Qty</TableCell>
                            <TableCell>Buyer Price</TableCell>
                            <TableCell>Seller Price</TableCell>
                            <TableCell>Seller Qty</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pendingOrders.map((order) => (
                            <TableRow key={order._id}>
                                <TableCell>{order.buyerQty}</TableCell>
                                <TableCell>{order.buyerPrice}</TableCell>
                                <TableCell>{order.sellerPrice}</TableCell>
                                <TableCell>{order.sellerQty}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>Completed Orders</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Price</TableCell>
                            <TableCell>Qty</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {completedOrders.map((order) => (
                            <TableRow key={order._id}>
                                <TableCell>{order.price}</TableCell>
                                <TableCell>{order.qty}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default OrdersTable;
