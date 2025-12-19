import React from 'react';
import { motion } from 'framer-motion';

const HowToPage = () => {
    const steps = [
        {
            icon: "🔐",
            title: "Unlock the Tome",
            desc: "First, sign your name in the ledger (Login). Your chronicle is yours alone, guarded by a simple key."
        },
        {
            icon: "🧠",
            title: "Connect Your Mind (Beta)",
            desc: "Visit 'My Account' and paste your Google Gemini API Key. This elevates the Story Weaver from a simple scribe to a true literary genius."
        },
        {
            icon: "✍️",
            title: "Scribble Your Day",
            desc: "Go to the 'Write' tab. Pour your raw thoughts, mundane tasks, or fleeting dreams into the inkwell. Don't worry about style—just write."
        },
        {
            icon: "✨",
            title: "Let It Weave",
            desc: "Click 'Weave Story'. Watch as the Story Weaver (AI) takes your plain text and spins it into a legendary tale of myth and mystery."
        },
        {
            icon: "📖",
            title: "Read Your Chronicle",
            desc: "Visit the 'Chronicle' tab. Your entries are saved forever as a continuous saga. Watch your life become a fantasy novel, page by page."
        },
        {
            icon: "🌍",
            title: "Share the Legend",
            desc: "Proud of a chapter? Click 'Share ↗' to create a beautiful artifact card. Post it on the mortal web (Instagram/WhatsApp) to inspire others."
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
                maxWidth: '800px',
                margin: '0 auto',
                color: '#fff',
                fontFamily: 'var(--font-hand)',
                paddingBottom: '4rem'
            }}
        >
            <h1 style={{
                fontFamily: 'var(--font-title)',
                fontSize: '2.5rem',
                textAlign: 'center',
                marginBottom: '1rem',
                color: 'var(--color-accent)'
            }}>
                How to Weave Your Destiny
            </h1>
            <p style={{ textAlign: 'center', opacity: 0.7, marginBottom: '3rem', fontSize: '1.2rem' }}>
                A guide for the aspiring chronicler.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1.5rem',
                            background: 'rgba(255, 255, 255, 0.05)',
                            padding: '1.5rem',
                            borderRadius: '15px',
                            border: '1px solid var(--color-border)',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                        }}
                    >
                        <div style={{
                            fontSize: '3rem',
                            minWidth: '60px',
                            textAlign: 'center'
                        }}>
                            {step.icon}
                        </div>
                        <div>
                            <h3 style={{
                                fontFamily: 'var(--font-title)',
                                fontSize: '1.5rem',
                                color: 'var(--color-accent)',
                                marginBottom: '0.5rem'
                            }}>
                                {index + 1}. {step.title}
                            </h3>
                            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#ddd' }}>
                                {step.desc}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '4rem', opacity: 0.5, fontStyle: 'italic' }}>
                "The ink is waiting..."
            </div>
        </motion.div>
    );
};

export default HowToPage;
