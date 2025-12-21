import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import './ModernHistory.css';

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
            const canvas = await html2canvas(element, {
                backgroundColor: '#1a1a1a',
                scale: 2,
                ignoreElements: (element) => element.tagName === 'BUTTON'
            });

            canvas.toBlob(async (blob) => {
                if (!blob) return;
                const file = new File([blob], 'story-card.png', { type: 'image/png' });

                if (navigator.canShare && navigator.canShare({ files: [file] })) {
                    await navigator.share({
                        title: 'My Story Weaver Chronicle',
                        text: `Check out this story I wove using Story Weaver!`,
                        files: [file],
                    });
                } else {
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
        return (
            <div style={{ textAlign: 'center', padding: '4rem', opacity: 0.5, fontStyle: 'italic' }}>
                <h2>No stories yet...</h2>
                <p>Pick up your pen and start writing!</p>
            </div>
        );
    }

    return (
        <div className="chronicle-container">
            <h1 className="chronicle-header">My Chronicle</h1>

            {stories.map((story, index) => (
                <motion.div
                    key={story.id}
                    ref={el => cardRefs.current[story.id] = el}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="chronicle-entry"
                >
                    <div className="entry-header">
                        <span>✦ {story.date}</span>
                        <div className="entry-actions">
                            <button
                                onClick={() => toggleExpansion(story.id)}
                                className={`btn-ghost ${expandedIds.has(story.id) ? 'active' : ''}`}
                            >
                                {expandedIds.has(story.id) ? '🙈 Hide the Seed' : '🌱 See the Seed'}
                            </button>
                            <button
                                onClick={() => shareStory(story)}
                                className="btn-primary"
                            >
                                Share ↗
                            </button>
                            {confirmingId === story.id ? (
                                <button
                                    onClick={() => {
                                        onDelete(story.id);
                                        setConfirmingId(null);
                                    }}
                                    className="btn-danger"
                                >
                                    Sure?
                                </button>
                            ) : (
                                <button
                                    onClick={() => setConfirmingId(story.id)}
                                    title="Delete Story"
                                    className="btn-ghost"
                                >
                                    🗑
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="entry-content">
                        {story.generatedText}
                    </div>

                    <AnimatePresence>
                        {expandedIds.has(story.id) && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                animate={{ opacity: 1, height: 'auto', marginTop: '1.5rem' }}
                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                className="seed-section"
                            >
                                <div className="seed-label">
                                    Your Seed thought:
                                </div>
                                <div className="seed-content">
                                    {story.originalText}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="entry-footer">
                        Woven with Story Weaver
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default ModernHistory;
