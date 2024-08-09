import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddOrderForm from './components/AddOrderForm';
import OrdersTable from './components/OrdersTable';
import Login from './components/Login';
import Register from './components/Register';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<OrdersTable />} />
                    <Route path="/add-order" element={<AddOrderForm />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
