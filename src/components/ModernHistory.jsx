import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import './ModernLayout.css';

const ModernHistory = ({ stories, onDelete }) => {
    const cardRefs = useRef({});
    const [confirmingId, setConfirmingId] = useState(null);
    const [expandedIds, setExpandedIds] = useState(new Set());

    const toggleExpansion = (id) => {
        const newSet = new Set(expandedIds);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setExpandedIds(newSet);
    };

    const shareStory = async (story) => {
        const element = cardRefs.current[story.id];
        if (!element) return;

        try {
            // Create a temporary "Spotify-like" card for sharing
            // We'll clone the content or style the capture specifically
            // Ideally, we capture the element as is but ensuring it looks good

            const canvas = await html2canvas(element, {
                backgroundColor: '#1a1a1a', // Ensure dark background
                scale: 2, // High resolution
                ignoreElements: (element) => element.tagName === 'BUTTON' // Hide buttons in capture
            });

            canvas.toBlob(async (blob) => {
                if (!blob) return;

                // Construct file for sharing
                const file = new File([blob], 'story-card.png', { type: 'image/png' });

                if (navigator.canShare && navigator.canShare({ files: [file] })) {
                    await navigator.share({
                        title: 'My Story Weaver Chronicle',
                        text: `Check out this story I wove using Story Weaver!`,
                        files: [file],
                    });
                } else {
                    // Fallback to download
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'story-share-card.png';
                    link.click();
                    alert("Image saved! You can now share it on Instagram or WhatsApp.");
                }
            });
        } catch (error) {
            console.error("Sharing failed:", error);
            alert("Could not share story. Try checking your browser permissions.");
        }
    };

    if (stories.length === 0) {
        // ... (Keep existing empty state)
        return (
            <div style={{ textAlign: 'center', padding: '4rem', opacity: 0.5, fontStyle: 'italic' }}>
                <h2>No stories yet...</h2>
                <p>Pick up your pen and start writing!</p>
            </div>
        );
    }

    return (
        <div className="chronicle-container" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '4rem' }}>
            <h1 style={{ fontFamily: 'var(--font-title)', fontSize: '2.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>My Chronicle</h1>

            {stories.map((story, index) => (
                <motion.div
                    key={story.id}
                    ref={el => cardRefs.current[story.id] = el}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="chronicle-entry"
                    style={{
                        marginBottom: '3rem',
                        padding: '2rem',  // Added padding for better image capture aesthetics
                        borderRadius: '12px', // Rounded corners for social card look
                        border: '1px solid transparent' // Placeholder to prevent jumps if border added
                    }}
                >
                    <div style={{
                        fontFamily: 'var(--font-title)',
                        fontSize: '1.2rem',
                        color: 'var(--color-accent)',
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.5rem'
                    }}>
                        <span>✦ {story.date}</span>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                                onClick={() => toggleExpansion(story.id)}
                                style={{
                                    background: 'transparent',
                                    border: '1px solid #666',
                                    color: expandedIds.has(story.id) ? 'var(--color-accent)' : '#aaa',
                                    borderRadius: '4px',
                                    padding: '4px 8px',
                                    fontSize: '0.8rem',
                                    cursor: 'pointer',
                                    fontFamily: 'var(--font-hand)',
                                    fontWeight: 'bold',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {expandedIds.has(story.id) ? '🙈 Hide the Seed' : '🌱 See the Seed'}
                            </button>
                            <button
                                onClick={() => shareStory(story)}
                                style={{
                                    background: 'var(--color-accent)',
                                    border: 'none',
                                    color: '#1a1a1a',
                                    borderRadius: '4px',
                                    padding: '4px 8px',
                                    fontSize: '0.8rem',
                                    cursor: 'pointer',
                                    fontFamily: 'var(--font-hand)',
                                    fontWeight: 'bold'
                                }}
                            >
                                Share ↗
                            </button>
                            {confirmingId === story.id ? (
                                <button
                                    onClick={() => {
                                        onDelete(story.id);
                                        setConfirmingId(null);
                                    }}
                                    style={{
                                        background: 'rgba(255, 107, 107, 0.2)',
                                        border: '1px solid #ff6b6b',
                                        color: '#ff6b6b',
                                        borderRadius: '4px',
                                        padding: '4px 8px',
                                        fontSize: '0.8rem',
                                        cursor: 'pointer',
                                        fontFamily: 'var(--font-hand)',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Sure?
                                </button>
                            ) : (
                                <button
                                    onClick={() => setConfirmingId(story.id)}
                                    title="Delete Story"
                                    style={{
                                        background: 'transparent',
                                        border: '1px solid #666',
                                        color: '#666',
                                        borderRadius: '4px',
                                        padding: '4px 8px',
                                        fontSize: '0.8rem',
                                        cursor: 'pointer',
                                        fontFamily: 'var(--font-hand)',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    🗑
                                </button>
                            )}
                        </div>
                    </div>

                    <div style={{
                        fontFamily: 'var(--font-hand)',
                        fontSize: '1.35rem', // Slightly larger for readability in images
                        lineHeight: '1.6',
                        color: '#eee',
                        textAlign: 'justify'
                    }}>
                        {story.generatedText}
                    </div>

                    <AnimatePresence>
                        {expandedIds.has(story.id) && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                animate={{ opacity: 1, height: 'auto', marginTop: '1.5rem' }}
                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                style={{
                                    borderTop: '1px dashed #444',
                                    paddingTop: '1rem',
                                    overflow: 'hidden'
                                }}
                            >
                                <div style={{
                                    fontSize: '0.8rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    marginBottom: '0.5rem',
                                    color: '#888',
                                    fontFamily: 'var(--font-title)'
                                }}>
                                    Your Seed thought:
                                </div>
                                <div style={{
                                    fontFamily: 'monospace',
                                    fontSize: '0.95rem',
                                    color: '#aaa',
                                    backgroundColor: '#222',
                                    padding: '1rem',
                                    borderRadius: '8px',
                                    whiteSpace: 'pre-wrap'
                                }}>
                                    {story.originalText}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Branding footer for the image capture */}
                    <div style={{
                        marginTop: '1.5rem',
                        fontSize: '0.8rem',
                        color: '#666',
                        textAlign: 'center',
                        fontFamily: 'var(--font-title)'
                    }}>
                        Woven with Story Weaver
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default ModernHistory;
