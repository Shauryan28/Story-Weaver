import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AccountPage = ({ user, stories = [], onLogout, onDeleteAccount }) => {
    // Calculate simple stats
    const totalStories = stories.length;
    const wordCount = stories.reduce((acc, story) => acc + (story.generatedText ? story.generatedText.split(' ').length : 0), 0);

    // Format joined date
    const joinedDate = user?.joined || 'Unknown';

    const [apiKey, setApiKey] = useState('');
    const [keySaved, setKeySaved] = useState(false);

    useEffect(() => {
        const savedKey = localStorage.getItem(`storyWeaver_apiKey_${user.username}`);
        if (savedKey) setApiKey(savedKey);
    }, [user]);

    const handleSaveKey = () => {
        localStorage.setItem(`storyWeaver_apiKey_${user.username}`, apiKey);
        setKeySaved(true);
        setTimeout(() => setKeySaved(false), 3000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="account-container"
            style={{ color: '#fff', maxWidth: '600px', margin: '0 auto' }}
        >
            <h1 style={{
                fontFamily: 'var(--font-title)',
                fontSize: '2.5rem',
                marginBottom: '2rem',
                color: 'var(--color-accent)',
                borderBottom: '1px solid var(--color-border)',
                paddingBottom: '1rem'
            }}>
                My Account
            </h1>

            <div style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '12px',
                padding: '2rem',
                border: '1px solid var(--color-border)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: 'var(--color-accent)',
                        color: '#1a1a1a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '3rem',
                        fontFamily: 'var(--font-title)',
                        marginRight: '1.5rem'
                    }}>
                        {user?.username?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h2 style={{ fontSize: '2rem', margin: 0 }}>{user?.username}</h2>
                        <p style={{ opacity: 0.7, marginTop: '0.5rem', fontFamily: 'var(--font-hand)' }}>
                            Weaving since {joinedDate}
                        </p>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                    <div style={{
                        padding: '1.5rem',
                        background: 'rgba(0,0,0,0.2)',
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-accent)' }}>
                            {totalStories}
                        </div>
                        <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>Stories Woven</div>
                    </div>
                    <div style={{
                        padding: '1.5rem',
                        background: 'rgba(0,0,0,0.2)',
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-accent)' }}>
                            {wordCount}
                        </div>
                        <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>Words Written</div>
                    </div>
                </div>

                <div style={{ marginBottom: '2rem', background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '8px' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', fontFamily: 'var(--font-title)' }}>Brain Link (Beta)</h3>
                    <p style={{ fontSize: '0.9rem', marginBottom: '1rem', opacity: 0.8 }}>
                        Connect to Google Gemini for smarter story weaving.
                        <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)', marginLeft: '5px' }}>Get Key</a>
                    </p>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                            type="password"
                            placeholder="Enter Gemini API Key"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            style={{
                                flex: 1,
                                padding: '10px',
                                borderRadius: '4px',
                                border: '1px solid var(--color-border)',
                                background: 'transparent',
                                color: '#fff'
                            }}
                        />
                        <button
                            onClick={handleSaveKey}
                            style={{
                                padding: '0 20px',
                                background: 'var(--color-accent)',
                                color: '#1a1a1a',
                                border: 'none',
                                borderRadius: '4px',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                        >
                            Save
                        </button>
                    </div>
                    {keySaved && <p style={{ color: '#4caf50', marginTop: '0.5rem', fontSize: '0.9rem' }}>✓ Key saved securely</p>}
                </div>

                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '2rem' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', fontFamily: 'var(--font-title)' }}>Account Actions</h3>
                    <button
                        onClick={onLogout}
                        style={{
                            padding: '12px 24px',
                            background: 'transparent',
                            border: '1px solid var(--color-border)',
                            color: '#fff',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            width: '100%',
                            fontSize: '1rem',
                            marginBottom: '1rem',
                            transition: 'all 0.2s'
                        }}
                    >
                        Sign Out
                    </button>
                    <button
                        onClick={onDeleteAccount}
                        style={{
                            padding: '12px 24px',
                            background: 'rgba(255, 107, 107, 0.1)',
                            border: '1px solid #ff6b6b',
                            color: '#ff6b6b',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            width: '100%',
                            fontSize: '1rem',
                            transition: 'all 0.2s'
                        }}
                    >
                        Delete Account
                    </button>
                    <p style={{ marginTop: '1rem', fontSize: '0.8rem', opacity: 0.5, textAlign: 'center' }}>
                        Version 1.0.0 • Story Weaver
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default AccountPage;
