import React, { useState } from 'react';
import axios from 'axios';

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
            setMessage(data.message);
        } catch (error) {
            setMessage('Error adding order');
        }
    };

    return (
        <div>
            <h2>Add New Order</h2>
            {message && <p>{message}</p>}
            <form onSubmit={submitHandler}>
                <input type="number" placeholder="Buyer Qty" value={buyerQty} onChange={(e) => setBuyerQty(e.target.value)} />
                <input type="number" placeholder="Buyer Price" value={buyerPrice} onChange={(e) => setBuyerPrice(e.target.value)} />
                <input type="number" placeholder="Seller Price" value={sellerPrice} onChange={(e) => setSellerPrice(e.target.value)} />
                <input type="number" placeholder="Seller Qty" value={sellerQty} onChange={(e) => setSellerQty(e.target.value)} />
                <button type="submit">Add Order</button>
            </form>
        </div>
    );
};

export default AddOrderForm;
