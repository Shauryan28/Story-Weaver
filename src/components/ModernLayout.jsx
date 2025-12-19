import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RepulsionBackground from './RepulsionBackground';
import './ModernLayout.css';

const ModernLayout = ({ activeTab, onTabChange, onExport, onLogout, user, mainContent }) => {
    return (
        <>
            <RepulsionBackground />
            <div className="app-layout">
                <aside className="sidebar">
                    <div className="sidebar-header">
                        <div className="brand">
                            Story Weaver
                        </div>
                    </div>

                    <nav className="nav-menu">
                        <button
                            className={`nav-item ${activeTab === 'write' ? 'active' : ''}`}
                            onClick={() => onTabChange('write')}
                        >
                            <span>✐</span> Write
                        </button>
                        <button
                            className={`nav-item ${activeTab === 'history' ? 'active' : ''}`}
                            onClick={() => onTabChange('history')}
                        >
                            <span>📖</span> Chronicle
                        </button>
                        <button
                            className={`nav-item ${activeTab === 'account' ? 'active' : ''}`}
                            onClick={() => onTabChange('account')}
                        >
                            <span>👤</span> My Account
                        </button>
                        <button
                            className={`nav-item ${activeTab === 'howto' ? 'active' : ''}`}
                            onClick={() => onTabChange('howto')}
                        >
                            <span>📜</span> Guide
                        </button>
                        <button
                            className={`nav-item ${activeTab === 'about' ? 'active' : ''}`}
                            onClick={() => onTabChange('about')}
                        >
                            <span>💡</span> Why?
                        </button>
                    </nav>

                    <div className="sidebar-footer">
                        <div style={{ marginBottom: '1rem', color: '#888', fontSize: '0.9rem' }}>
                            Logged in as <span style={{ color: 'var(--color-accent)' }}>{user?.username}</span>
                        </div>
                        <button className="nav-item" onClick={onExport} style={{ fontSize: '0.9rem', justifyContent: 'center', marginBottom: '0.5rem' }}>
                            Export All
                        </button>
                        <button
                            className="nav-item"
                            onClick={onLogout}
                            style={{
                                fontSize: '0.9rem',
                                justifyContent: 'center',
                                border: '1px solid #ff6b6b',
                                color: '#ff6b6b'
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </aside>

                <main className="main-content custom-scroll">
                    <div className="content-container">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                {mainContent}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </main>
            </div>
        </>
    );
};

export default ModernLayout;
