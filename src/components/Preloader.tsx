"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3500); // Extended slightly to admire the chakra
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#1a2e22] text-ivory overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
                >
                    <div className="relative flex flex-col items-center">
                        {/* ULTIMATE SUDHARSHANA CHAKRA */}
                        <div className="relative w-64 h-64 md:w-80 md:h-80 mb-10 flex items-center justify-center">

                            <motion.svg
                                viewBox="0 0 300 300"
                                className="absolute inset-0 w-full h-full drop-shadow-[0_0_25px_rgba(255,140,0,0.6)]"
                            >
                                <defs>
                                    <linearGradient id="divineFire" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#FF4500" /> {/* Red Orange */}
                                        <stop offset="50%" stopColor="#FFD700" /> {/* Gold */}
                                        <stop offset="100%" stopColor="#FF8C00" /> {/* Dark Orange */}
                                    </linearGradient>
                                    <linearGradient id="metallicGold" x1="0%" y1="100%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#BF953F" />
                                        <stop offset="50%" stopColor="#FCF6BA" />
                                        <stop offset="100%" stopColor="#B38728" />
                                    </linearGradient>
                                    <filter id="glow">
                                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>

                                {/* LAYER 1: 108 Flames/Blades Ring (The Cutting Edge) - Fast Clockwise */}
                                <motion.g
                                    style={{ transformOrigin: "150px 150px" }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                >
                                    {Array.from({ length: 36 }).map((_, i) => (
                                        <path
                                            key={i}
                                            d="M150,20 L160,50 L140,50 Z"
                                            fill="url(#divineFire)"
                                            transform={`rotate(${i * 10} 150 150)`}
                                        />
                                    ))}
                                    <circle cx="150" cy="150" r="110" fill="none" stroke="url(#metallicGold)" strokeWidth="2" />
                                </motion.g>

                                {/* LAYER 2: Tantric Star (Shatkona) - Slow Counter-Clockwise */}
                                <motion.g
                                    style={{ transformOrigin: "150px 150px" }}
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                >
                                    {/* Upward Triangle */}
                                    <polygon points="150,60 228,195 72,195" fill="none" stroke="url(#metallicGold)" strokeWidth="1.5" />
                                    {/* Downward Triangle */}
                                    <polygon points="150,240 228,105 72,105" fill="none" stroke="url(#metallicGold)" strokeWidth="1.5" />
                                    {/* Inner Circle */}
                                    <circle cx="150" cy="150" r="50" fill="none" stroke="url(#divineFire)" strokeWidth="1" strokeDasharray="2 2" />
                                </motion.g>

                                {/* LAYER 3: The Radiant Core (Brahma Tejas) - Pulsing */}
                                <motion.circle
                                    cx="150"
                                    cy="150"
                                    r="15"
                                    fill="url(#divineFire)"
                                    filter="url(#glow)"
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                />
                                {/* Sanskrit OM-like curve simulation (abstract) */}
                                <path
                                    d="M145,145 Q155,140 160,150 T150,160 M150,140 Q165,135 165,145"
                                    stroke="#FFF" strokeWidth="2" fill="none" strokeLinecap="round"
                                />

                            </motion.svg>
                        </div>

                        {/* Brand Text Reveal */}
                        <div className="overflow-hidden flex flex-col items-center">
                            <motion.h1
                                className="text-3xl md:text-5xl font-serif tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] drop-shadow-sm"
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                            >
                                VISHNAVI
                            </motion.h1>
                            <motion.div
                                className="h-px w-24 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mt-2"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 1, duration: 0.8 }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
