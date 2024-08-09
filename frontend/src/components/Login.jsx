import React, { useState } from 'react';
import axios from 'axios';

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
    <div>
        <h2>Login</h2>
        {error && <p>{error}</p>}
        <form onSubmit={submitHandler}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>
    </div>
);
};

export default Login;