import React, { useState } from 'react';
import { motion } from 'framer-motion';

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
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontFamily: 'var(--font-hand)'
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                    background: 'rgba(30, 30, 30, 0.9)',
                    padding: '3rem',
                    borderRadius: '12px',
                    border: '1px solid var(--color-border)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    width: '100%',
                    maxWidth: '400px'
                }}
            >
                <h2 style={{ fontFamily: 'var(--font-title)', textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>
                    {isLogin ? 'Unlock Your Chronicle' : 'Begin Your Journey'}
                </h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.8 }}>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                background: 'transparent',
                                border: '1px solid var(--color-border)',
                                color: '#fff',
                                borderRadius: '4px',
                                fontFamily: 'var(--font-hand)',
                                fontSize: '1.1rem'
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.8 }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                background: 'transparent',
                                border: '1px solid var(--color-border)',
                                color: '#fff',
                                borderRadius: '4px',
                                fontFamily: 'var(--font-hand)',
                                fontSize: '1.1rem'
                            }}
                        />
                    </div>

                    {error && <div style={{ color: '#ff6b6b', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}

                    <button
                        type="submit"
                        style={{
                            background: 'var(--color-accent)',
                            color: '#1a1a1a',
                            border: 'none',
                            padding: '12px',
                            borderRadius: '4px',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            marginTop: '1rem',
                            boxShadow: '0 0 10px rgba(255,255,255,0.2)'
                        }}
                    >
                        {isLogin ? 'Enter' : 'Join'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '1rem', opacity: 0.7 }}>
                    {isLogin ? "First time?" : "Already have a key?"}{" "}
                    <button
                        onClick={() => { setIsLogin(!isLogin); setError(''); }}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-accent)',
                            textDecoration: 'underline',
                            fontSize: '1rem'
                        }}
                    >
                        {isLogin ? "Create an account" : "Login"}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default AuthPage;
