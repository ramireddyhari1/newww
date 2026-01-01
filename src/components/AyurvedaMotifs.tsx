"use client";
import React from "react";
import { motion } from "framer-motion";

export default function AyurvedaMotifs({ className = "" }: { className?: string }) {
    return (
        <div className={`pointer-events-none ${className}`}>

            {/* Top Left Lotus Vine */}
            <div className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 opacity-90">
                <motion.svg viewBox="0 0 100 100" className="w-full h-full"
                    initial={{ opacity: 0, x: -20, y: -20 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    <path d="M0 0 C 20 50, 50 20, 100 0 L 0 100 Z" fill="none" />
                    {/* Stylized Lotus Petals */}
                    <path d="M10 10 Q 30 30 10 50 Q -10 30 10 10" fill="#B8860B" fillOpacity="0.8" />
                    <path d="M10 50 Q 30 70 10 90 Q -10 70 10 50" fill="#2E4C36" fillOpacity="0.6" />
                    <path d="M25 25 Q 45 45 65 25" fill="none" stroke="#B8860B" strokeWidth="0.5" />
                    <circle cx="10" cy="10" r="2" fill="#B8860B" />
                </motion.svg>
            </div>

            {/* Top Right Lotus Vine (Mirrored) */}
            <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 opacity-90 transform scale-x-[-1]">
                <motion.svg viewBox="0 0 100 100" className="w-full h-full"
                    initial={{ opacity: 0, x: -20, y: -20 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                >
                    <path d="M10 10 Q 30 30 10 50 Q -10 30 10 10" fill="#B8860B" fillOpacity="0.8" />
                    <path d="M10 50 Q 30 70 10 90 Q -10 70 10 50" fill="#2E4C36" fillOpacity="0.6" />
                    <path d="M25 25 Q 45 45 65 25" fill="none" stroke="#B8860B" strokeWidth="0.5" />
                    <circle cx="10" cy="10" r="2" fill="#B8860B" />
                </motion.svg>
            </div>

            {/* Bottom Right - Single Lotus Flower */}
            <div className="absolute bottom-4 right-4 w-24 h-24 opacity-60">
                <motion.svg viewBox="0 0 50 50" className="w-full h-full"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 5, repeat: Infinity }}
                >
                    <path d="M25 50 Q 0 25 25 0 Q 50 25 25 50" fill="url(#lotusGradient)" />
                    <defs>
                        <linearGradient id="lotusGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#FDF5E6" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </motion.svg>
            </div>

        </div>
    );
}
