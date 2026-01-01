"use client";
import React, { useEffect, useState } from "react";

export default function GoldenDust() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Create a fixed set of particles
    const particles = Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        // Random positions
        left: Math.random() * 100,
        top: Math.random() * 100,
        // Random animation duration (15s to 25s for slow float)
        duration: 15 + Math.random() * 10,
        // Random delay
        delay: Math.random() * 5,
        // Random size (tiny)
        size: 2 + Math.random() * 3,
        // Random opacity base (very subtle)
        opacity: 0.03 + Math.random() * 0.03,
    }));

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="absolute rounded-full bg-[#C28E0E]"
                    style={{
                        left: `${p.left}%`,
                        top: `${p.top}%`,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        opacity: p.opacity,
                        // Use a CSS variable for the target opacity in keyframes if we were using it dynamically,
                        // but here we can just use the animation directly.
                        // Actually, to match the user's keyframes exactly but with custom opacity:
                        animation: `float ${p.duration}s ease-in-out infinite`,
                        animationDelay: `-${p.delay}s`,
                        "--target-opacity": p.opacity, // passing to CSS if needed, or just relying on base style
                    } as React.CSSProperties}
                />
            ))}
        </div>
    );
}
