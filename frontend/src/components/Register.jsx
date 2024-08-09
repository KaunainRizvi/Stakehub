import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post('/api/users/register', { username, password });
            localStorage.setItem('userInfo', JSON.stringify(data));
            setError('');
        } catch (error) {
            setError('User already exists');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            {error && <p>{error}</p>}
            <form onSubmit={submitHandler}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;