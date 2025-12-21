import React, { useState } from 'react';
import { motion } from 'framer-motion';

import './AuthPage.css';

const AuthPage = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Please fill in all fields.');
            return;
        }

        const users = JSON.parse(localStorage.getItem('storyWeaver_users') || '{}');

        if (isLogin) {
            if (users[username] && users[username].password === password) {
                onLogin(users[username]);
            } else {
                setError('Invalid username or password.');
            }
        } else {
            if (users[username]) {
                setError('User already exists.');
            } else {
                const newUser = { username, password, joined: new Date().toLocaleDateString() };
                users[username] = newUser;
                localStorage.setItem('storyWeaver_users', JSON.stringify(users));
                onLogin(newUser);
            }
        }
    };

    return (
        <div className="auth-container">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="auth-card"
            >
                <h2 className="auth-title">
                    {isLogin ? 'Unlock Your Chronicle' : 'Begin Your Journey'}
                </h2>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                        />
                    </div>

                    {error && <div className="auth-error">{error}</div>}

                    <button type="submit" className="submit-button">
                        {isLogin ? 'Enter' : 'Join'}
                    </button>
                </form>

                <div className="auth-footer">
                    {isLogin ? "First time?" : "Already have a key?"}{" "}
                    <button
                        onClick={() => { setIsLogin(!isLogin); setError(''); }}
                        className="toggle-button"
                    >
                        {isLogin ? "Create an account" : "Login"}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default AuthPage;
