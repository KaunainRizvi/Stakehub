import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddOrderForm from './components/AddOrderForm';
import OrdersTable from './components/OrdersTable';
import Login from './components/Login';
import Register from './components/Register';
import { CssBaseline, AppBar, Toolbar, Typography, Container } from '@mui/material';

function App() {
    return (
        <Router>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Order Management System</Typography>
                </Toolbar>
            </AppBar>
            <Container sx={{ mt: 4 }}>
                <Routes>
                    <Route path="/" element={<OrdersTable />} />
                    <Route path="/add-order" element={<AddOrderForm />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
