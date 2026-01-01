"use client";
import React from "react";
import { motion } from "framer-motion";

export default function PrabhavaliSVG({ className = "" }: { className?: string }) {
    return (
        <div className={`w-full max-w-4xl mx-auto flex flex-col items-center ${className} pointer-events-none`}>

            {/* --- TOP ARCH (Prabhavali) --- */}
            <svg viewBox="0 0 500 200" className="w-full h-full drop-shadow-lg" preserveAspectRatio="xMidYMin slice">
                <defs>
                    <linearGradient id="brassGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8B5A2B" />
                        <stop offset="50%" stopColor="#D4AF37" />
                        <stop offset="100%" stopColor="#8B5A2B" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Halo Background (Animated) */}
                <motion.circle cx="250" cy="250" r="220"
                    fill="none" stroke="#FFD700" strokeWidth="2" strokeDasharray="10 10" opacity="0.4"
                    animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} style={{ originX: "250px", originY: "250px" }}
                />

                {/* Outer Arch Ring */}
                <path d="M50 250 A200 200 0 0 1 450 250" fill="none" stroke="url(#brassGradient)" strokeWidth="20" />

                {/* Inner Arch Ring with Dots */}
                <path d="M70 250 A180 180 0 0 1 430 250" fill="none" stroke="#5D4037" strokeWidth="2" strokeDasharray="5 5" />

                {/* Kirtimukha (Top Center Face) - Simplified */}
                <g transform="translate(250, 60)">
                    <path d="M-20 0 Q0 -20 20 0 Q0 20 -20 0" fill="#8D1717" />
                    <path d="M-30 10 Q0 -30 30 10" fill="none" stroke="#D4AF37" strokeWidth="3" />
                    <circle cx="0" cy="30" r="5" fill="#D4AF37" />
                </g>

                {/* Flames / Leaves on Arch */}
                {[...Array(9)].map((_, i) => (
                    <circle key={i} cx={50 + i * 50} cy={250 - Math.sin((i * Math.PI) / 8) * 200} r="8" fill="#D4AF37" />
                ))}

            </svg>

            {/* --- PILLARS (Sides) - extended downwards in CSS --- */}
            {/* This component mainly provides the "Capitals" of the pillars. The shafts are CSS borders in the parent. */}

        </div>
    );
}
