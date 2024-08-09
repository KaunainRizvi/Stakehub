import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Alert, Box } from '@mui/material';

const AddOrderForm = () => {
    const [buyerQty, setBuyerQty] = useState('');
    const [buyerPrice, setBuyerPrice] = useState('');
    const [sellerPrice, setSellerPrice] = useState('');
    const [sellerQty, setSellerQty] = useState('');
    const [message, setMessage] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();

        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.post('/api/orders/add', { buyerQty, buyerPrice, sellerPrice, sellerQty }, config);
            setMessage({ type: 'success', text: data.message });
        } catch (error) {
            setMessage({ type: 'error', text: 'Error adding order' });
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Add New Order</Typography>
            {message && (
                <Alert severity={message.type}>
                    {message.text}
                </Alert>
            )}
            <Box component="form" onSubmit={submitHandler} sx={{ mt: 3 }}>
                <TextField fullWidth label="Buyer Qty" type="number" value={buyerQty} onChange={(e) => setBuyerQty(e.target.value)} margin="normal" />
                <TextField fullWidth label="Buyer Price" type="number" value={buyerPrice} onChange={(e) => setBuyerPrice(e.target.value)} margin="normal" />
                <TextField fullWidth label="Seller Price" type="number" value={sellerPrice} onChange={(e) => setSellerPrice(e.target.value)} margin="normal" />
                <TextField fullWidth label="Seller Qty" type="number" value={sellerQty} onChange={(e) => setSellerQty(e.target.value)} margin="normal" />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Add Order</Button>
            </Box>
        </Container>
    );
};

export default AddOrderForm;
