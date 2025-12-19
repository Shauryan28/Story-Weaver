import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './ModernEditor.css';

const ModernEditor = ({ onWeave, isGenerating }) => {
    const [text, setText] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);

    const handleSubmit = async () => {
        if (!text.trim()) return;
        setIsAnimating(true);

        // Wait for animation to finish
        await new Promise(resolve => setTimeout(resolve, 1500));

        onWeave(text);
        setText('');
        setIsAnimating(false);
    };

    // Split text into words for animation, preserving visual flow roughly
    const words = text.split(/(\s+)/);

    return (
        <div className="editor-wrapper" style={{ position: 'relative' }}>
            <div className="editor-header">
                <div className="editor-date">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
            </div>

            {isAnimating ? (
                <div
                    className="editor-textarea custom-scroll"
                    style={{
                        pointerEvents: 'none',
                        whiteSpace: 'pre-wrap',
                        overflow: 'hidden' // contain falling words
                    }}
                >
                    {words.map((word, i) => (
                        <motion.span
                            key={i}
                            style={{ display: 'inline-block' }}
                            initial={{ opacity: 1, y: 0, x: 0 }}
                            animate={{
                                opacity: 0,
                                y: Math.random() * 200 + 300, // Fall down
                                x: Math.random() * 100 + 200, // Move right towards button
                                scale: 0,
                                rotate: Math.random() * 360 - 180
                            }}
                            transition={{
                                duration: 1,
                                delay: i * 0.005, // Stagger effect
                                ease: "easeIn"
                            }}
                        >
                            {word}
                        </motion.span>
                    ))}
                </div>
            ) : (
                <textarea
                    className="editor-textarea custom-scroll"
                    placeholder="Type about your day here...&#10;&#10;For example:&#10;'Today I found a strange key in the park and it started glowing when I picked it up...'"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled={isGenerating || isAnimating}
                />
            )}

            <div className="editor-actions">
                <motion.button
                    className={`action-button ${(isGenerating || isAnimating) ? 'loading-dots' : ''}`}
                    onClick={handleSubmit}
                    disabled={isGenerating || isAnimating || !text.trim()}
                    initial={{ scale: 1 }}
                    whileHover={!isGenerating && !isAnimating && text.trim() ? {
                        scale: 1.05,
                        rotate: [-1, 2, -2, 1, 0],
                        boxShadow: "0 0 20px rgba(255, 255, 255, 0.6)",
                        transition: { duration: 0.3 }
                    } : {}}
                    whileTap={!isGenerating && !isAnimating && text.trim() ? { scale: 0.95 } : {}}
                    animate={
                        (isGenerating || isAnimating) ? {
                            background: ["#1a1a1a", "#ffffff", "#1a1a1a"],
                            color: ["#ffffff", "#000000", "#ffffff"],
                            scale: [1, 0.95, 1],
                            transition: { duration: 0.5, repeat: Infinity }
                        } : text.trim() ? {
                            y: [0, -3, 0],
                            borderColor: ["#555", "#fff", "#555"],
                            transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        } : {}
                    }
                    style={{
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}
                >
                    {(isGenerating || isAnimating) ? (
                        <>
                            <motion.span
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                style={{ display: 'inline-block' }}
                            >
                                🌀
                            </motion.span>
                            {isAnimating ? 'Absorbing...' : 'Weaving Fate...'}
                        </>
                    ) : (
                        <>
                            Weave Story
                        </>
                    )}
                </motion.button>
            </div>
        </div>
    );
};

export default ModernEditor;
