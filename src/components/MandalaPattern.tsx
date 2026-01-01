"use client";
import React from "react";
import { motion } from "framer-motion";

export default function MandalaPattern({ className = "", opacity = 0.1 }: { className?: string; opacity?: number }) {
    return (
        <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
            <motion.svg
                viewBox="0 0 500 500"
                className="absolute w-full h-full opacity-[0.03]" // Extremely subtle
                style={{ color: "#B8860B" }}
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
            >
                <circle cx="250" cy="250" r="200" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="250" cy="250" r="180" fill="none" stroke="currentColor" strokeWidth="1" />
                <path
                    d="M250 50 L300 250 L250 450 L200 250 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                />
                <path
                    d="M50 250 L250 300 L450 250 L250 200 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                />
                {/* Simple geometric floral pattern */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                    <g key={angle} transform={`rotate(${angle} 250 250)`}>
                        <circle cx="250" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
                        <path d="M250 120 L260 180 L250 240 L240 180 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                    </g>
                ))}
            </motion.svg>
        </div>
    );
}
