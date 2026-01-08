"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
    // 1. Cursor Orb State (Framer Motion)
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);
    const springConfig = { damping: 20, stiffness: 400 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);
    const [isHovering, setIsHovering] = useState(false);

    // 2. Particle System State (Canvas)
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<any[]>([]);
    const lastPos = useRef({ x: -100, y: -100 });

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            // Spawn particles on move
            spawnParticles(e.clientX, e.clientY, 1);
            lastPos.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseDown = (e: MouseEvent) => {
            spawnParticles(e.clientX, e.clientY, 20); // Burst
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);
        window.addEventListener("mousedown", handleMouseDown);

        // Canvas Animation Loop
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        let animationId: number;
        let isActive = false;

        const startLoop = () => {
            if (!isActive) {
                isActive = true;
                render();
            }
        };

        const spawnParticles = (x: number, y: number, count: number) => {
            for (let i = 0; i < count; i++) {
                particles.current.push({
                    x,
                    y,
                    vx: (Math.random() - 0.5) * 2, // Random drift
                    vy: (Math.random() - 0.5) * 2,
                    life: 1, // 1 to 0
                    color: Math.random() > 0.5 ? '#C28E0E' : '#FFD700', // Gold mix
                    size: Math.random() * 2 + 0.5
                });
            }
            startLoop();
        };

        const render = () => {
            if (!canvas || !ctx) return;

            // If no particles and canvas is clear (we can assume clear if we stop loop properly), stop.
            if (particles.current.length === 0) {
                ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear one last time
                isActive = false;
                return;
            }

            // Resize if needed
            if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }

            // Clear
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update & Draw Particles
            for (let i = particles.current.length - 1; i >= 0; i--) {
                const p = particles.current[i];
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 0.02; // Fade speed

                if (p.life <= 0) {
                    particles.current.splice(i, 1);
                    continue;
                }

                ctx.globalAlpha = p.life;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }

            animationId = requestAnimationFrame(render);
        };

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("mousedown", handleMouseDown);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
            <canvas ref={canvasRef} className="absolute inset-0" />

            {/* Main Firefly Orb */}
            <motion.div
                className="absolute w-4 h-4 -ml-2 -mt-2 rounded-full bg-templeGold shadow-[0_0_15px_2px_rgba(194,142,14,0.6)]"
                style={{ x: cursorX, y: cursorY }}
            >
                {/* Core */}
                <div className="w-full h-full bg-white rounded-full scale-50 opacity-80" />
            </motion.div>

            {/* Hover Halo */}
            <motion.div
                className="absolute border border-templeGold rounded-full opacity-0"
                style={{ x: cursorX, y: cursorY, left: -20, top: -20, width: 40, height: 40 }}
                animate={{
                    scale: isHovering ? 1.5 : 0.5,
                    opacity: isHovering ? 0.5 : 0,
                    borderColor: isHovering ? "#FFD700" : "transparent"
                }}
                transition={{ duration: 0.2 }}
            />
        </div>
    );
}
