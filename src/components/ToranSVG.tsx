"use client";
import React from "react";
import { motion } from "framer-motion";

export default function ToranSVG({ className = "" }: { className?: string }) {
    // Variants for gentle wind swaying effect
    const sway = {
        initial: { rotate: -2 },
        animate: { rotate: 2 },
        transition: {
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse" as const, // Fix type error by asserting as const
            ease: "easeInOut",
        },
    };

    const leafSway = {
        initial: { rotate: -1 },
        animate: { rotate: 1 },
        transition: {
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse" as const,
            ease: "easeInOut",
        },
    };

    return (
        <div className={`w-full overflow-hidden ${className}`}>
            <svg viewBox="0 0 1000 120" className="w-full h-auto drop-shadow-lg" preserveAspectRatio="none">

                {/* Main Rope/Folded Cloth */}
                <defs>
                    <linearGradient id="ropeGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#D4AF37" />
                        <stop offset="50%" stopColor="#B45309" />
                        <stop offset="100%" stopColor="#78350F" />
                    </linearGradient>
                    <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="1" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* The horizontal curved rope holding the items */}
                <path
                    d="M0,10 Q100,25 200,10 T400,10 T600,10 T800,10 T1000,10"
                    fill="none"
                    stroke="url(#ropeGradient)"
                    strokeWidth="4"
                />

                {/* Mango Leaves (Mavilai) - Repeated patterns */}
                {[100, 300, 500, 700, 900].map((x, i) => (
                    <motion.g
                        key={`leaf-${i}`}
                        initial="initial"
                        animate="animate"
                        variants={leafSway}
                        style={{ transformOrigin: `${x}px 10px` }}
                    >
                        {/* Leaf Body */}
                        <path
                            d={`M${x},10 Q${x - 15},60 ${x},90 Q${x + 15},60 ${x},10`}
                            fill="#357a38" /* Fresh Green */
                            stroke="#1b5e20"
                            strokeWidth="1"
                        />
                        {/* Leaf Veins */}
                        <path
                            d={`M${x},10 L${x},85`}
                            stroke="#4caf50"
                            strokeWidth="0.5"
                        />
                    </motion.g>
                ))}

                {/* Marigold Flowers (Chendu Malli) - Hanging between leaves */}
                {[200, 400, 600, 800].map((x, i) => (
                    <motion.g
                        key={`flower-${i}`}
                        initial="initial"
                        animate="animate"
                        variants={sway}
                        transition={{ delay: i * 0.2 }} // Stagger animations
                        style={{ transformOrigin: `${x}px 10px` }}
                    >
                        {/* String holding the flower */}
                        <line x1={x} y1="10" x2={x} y2="40" stroke="#f57f17" strokeWidth="1" />

                        {/* Orange/Yellow Marigold Ball */}
                        <circle cx={x} cy="50" r="12" fill="#ff6f00" />
                        <circle cx={x} cy="50" r="10" fill="#ff8f00" />
                        <circle cx={x} cy="50" r="6" fill="#ffca28" />

                        {/* Small red decorative tip at bottom */}
                        <circle cx={x} cy="65" r="3" fill="#B91C1C" />
                    </motion.g>
                ))}

            </svg>
        </div>
    );
}
