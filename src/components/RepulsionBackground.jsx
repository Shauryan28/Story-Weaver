import React, { useEffect, useRef } from 'react';

const WORDS = [
    "mystery", "shadow", "whisper", "echo", "midnight", "dream", "star", "nebula",
    "vortex", "secret", "ancient", "rune", "spark", "fable", "myth", "legend",
    "chronicle", "abyss", "light", "darkness", "realm", "phantom", "spirit", "dust",
    "memory", "time", "void", "creation", "imagination", "story", "weave", "ink"
];

// Spring physics constants
const SPRING_STIFFNESS = 0.1;
const SPRING_DAMPING = 0.8;
const REPULSION_RADIUS = 150;
const REPULSION_FORCE = 5000; // tuned for effect

const RepulsionBackground = () => {
    const canvasRef = useRef(null);

    // State refs
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const gridRef = useRef([]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let animId;

        const initGrid = () => {
            // Flow layout parameters
            const fontSize = 14;
            const lineHeight = 28;
            const paddingX = 15;

            gridRef.current = [];

            ctx.font = `${fontSize}px "Patrick Hand"`;

            const rows = Math.ceil(window.innerHeight / lineHeight) + 2;

            for (let j = 0; j < rows; j++) {
                let currentX = -50; // Start off-screen
                const y = j * lineHeight + (Math.random() * 5); // Slight vertical jitter

                while (currentX < window.innerWidth + 50) {
                    const wordText = WORDS[Math.floor(Math.random() * WORDS.length)];
                    const metrics = ctx.measureText(wordText);
                    const wordWidth = metrics.width;

                    gridRef.current.push({
                        text: wordText,
                        ox: currentX + wordWidth / 2, // Centered X for physics
                        oy: y,
                        x: 0,
                        y: 0,
                        vx: 0,
                        vy: 0,
                        rotation: (Math.random() - 0.5) * 0.1, // Minimal rotation
                        size: fontSize + Math.random() * 2,
                        width: wordWidth
                    });

                    currentX += wordWidth + paddingX + (Math.random() * 10);
                }
            }

            // Initialize current pos to origin
            gridRef.current.forEach(p => { p.x = p.ox; p.y = p.oy; });
        };

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            initGrid();
        };

        window.addEventListener('resize', resize);
        resize();

        const render = () => {
            const { x: mx, y: my } = mouseRef.current;

            // Clear
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.restore();

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#ffffff';

            gridRef.current.forEach(word => {
                // 1. Calculate vector from word to mouse
                const dx = mx - word.x;
                const dy = my - word.y;
                const distSq = dx * dx + dy * dy;
                const dist = Math.sqrt(distSq);

                // 2. Repulsion Force
                let fx = 0;
                let fy = 0;

                if (dist < REPULSION_RADIUS) {
                    const force = REPULSION_FORCE / (distSq + 100); // Inverse square lawish
                    const angle = Math.atan2(dy, dx);
                    // Move AWAY from mouse: -cos, -sin
                    fx = -Math.cos(angle) * force;
                    fy = -Math.sin(angle) * force;
                }

                // 3. Spring Force (return to origin)
                const springX = (word.ox - word.x) * SPRING_STIFFNESS;
                const springY = (word.oy - word.y) * SPRING_STIFFNESS;

                // 4. Apply forces to velocity
                word.vx += fx + springX;
                word.vy += fy + springY;

                // 5. Damping
                word.vx *= SPRING_DAMPING;
                word.vy *= SPRING_DAMPING;

                // 6. Update position
                word.x += word.vx;
                word.y += word.vy;

                // 7. Render
                // Base opacity low, higher if force active?
                // User asked for "going through", visible repulsion implies we see them move.
                // Let's keep them dimly visible, and maybe brighter when repelled?

                let alpha = 0.05; // Base faint visibility
                if (dist < REPULSION_RADIUS) {
                    alpha = Math.min(0.8, 0.05 + ((REPULSION_RADIUS - dist) / REPULSION_RADIUS));
                }

                ctx.save();
                ctx.translate(word.x, word.y);
                ctx.rotate(word.rotation);

                ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.font = `${word.size}px "Patrick Hand"`;
                ctx.fillText(word.text, 0, 0);

                ctx.restore();
            });

            animId = requestAnimationFrame(render);
        };

        render();
        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: -1,
                pointerEvents: 'none',
                background: '#151515'
            }}
        />
    );
};

export default RepulsionBackground;
