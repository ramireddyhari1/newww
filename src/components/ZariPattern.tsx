"use client";
import React from "react";

export default function ZariPattern() {
    return (
        <svg className="absolute inset-0 w-full h-full opacity-30 select-none pointer-events-none">
            <defs>
                <pattern
                    id="zari-pattern"
                    x="0"
                    y="0"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                >
                    {/* Base Gold Thread Color */}
                    <rect width="40" height="40" fill="transparent" />

                    {/* Intricate Lattice / Diamond Work (Muggus/Rangoli inspired) */}
                    <path
                        d="M20 0 L40 20 L20 40 L0 20 Z"
                        fill="none"
                        stroke="#D4AF37"
                        strokeWidth="1"
                        opacity="0.6"
                    />
                    <path
                        d="M20 5 L35 20 L20 35 L5 20 Z"
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth="0.5"
                    />

                    {/* Central Dot/Rudraksha Bead */}
                    <circle cx="20" cy="20" r="2" fill="#D4AF37" />

                    {/* Corner Dots */}
                    <circle cx="0" cy="0" r="1" fill="#B45309" />
                    <circle cx="40" cy="0" r="1" fill="#B45309" />
                    <circle cx="0" cy="40" r="1" fill="#B45309" />
                    <circle cx="40" cy="40" r="1" fill="#B45309" />

                </pattern>

                {/* Metallic Gradient Definition for Backgrounds */}
                <linearGradient id="gold-metal" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#926F34" />
                    <stop offset="25%" stopColor="#FFFFAC" />
                    <stop offset="50%" stopColor="#D4AF37" />
                    <stop offset="75%" stopColor="#FFFFAC" />
                    <stop offset="100%" stopColor="#926F34" />
                </linearGradient>
            </defs>

            <rect width="100%" height="100%" fill="url(#zari-pattern)" />
        </svg>
    );
}
