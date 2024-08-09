import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Alert, Box } from '@mui/material';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post('/api/users/login', { username, password });
            localStorage.setItem('userInfo', JSON.stringify(data));
            setError('');
        } catch (error) {
            setError('Invalid username or password');
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Login</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <Box component="form" onSubmit={submitHandler} sx={{ mt: 3 }}>
                <TextField fullWidth label="Username" value={username} onChange={(e) => setUsername(e.target.value)} margin="normal" />
                <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Login</Button>
            </Box>
        </Container>
    );
};

export default Login;