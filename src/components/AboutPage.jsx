import React from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="about-container"
            style={{ color: '#fff' }}
        >
            <h1 style={{ fontFamily: 'var(--font-title)', fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--color-accent)' }}>Why Does This Exist?</h1>

            <div style={{ fontFamily: 'var(--font-hand)', fontSize: '1.3rem', lineHeight: '1.8', maxWidth: '700px' }}>
                <p style={{ marginBottom: '1.5rem' }}>
                    Hey there! You might be wondering, "Why am I typing into a dark void with floating words?"
                </p>

                <p style={{ marginBottom: '1.5rem' }}>
                    Well, the truth is simpler than you think. This app exists because sometimes our thoughts are messy, like a dictionary exploded in space (which is what the background is, by the way).
                </p>

                <p style={{ marginBottom: '1.5rem' }}>
                    I created **Story Weaver** to help you untangle those thoughts. You dump your raw, chaotic day onto the page, and our digital weaver stitches it into something coherent—a story you can look back on.
                </p>

                <div style={{
                    marginTop: '3rem',
                    padding: '2rem',
                    border: '1px dashed var(--color-accent)',
                    borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px'
                }}>
                    <p style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
                        Designed & Built by <span style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>Shaurya Nandecha</span>
                    </p>
                    <p style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '1rem', opacity: 0.8 }}>
                        (Because reality is boring without a little bit of story magic.)
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default AboutPage;
