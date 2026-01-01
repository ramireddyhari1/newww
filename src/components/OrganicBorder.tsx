"use client";
import React from "react";
import { motion } from "framer-motion";

interface OrganicBorderProps {
    children: React.ReactNode;
    className?: string;
    variant?: "simple" | "leaves" | "glow";
    color?: string; // Default to organic green/gold
}

export default function OrganicBorder({
    children,
    className = "",
    variant = "simple",
    color = "#C28E0E", // Turmeric gold
}: OrganicBorderProps) {

    const lineDraw = {
        hidden: { scaleX: 0, opacity: 0 },
        visible: {
            scaleX: 1,
            opacity: 1,
            transition: { delay: 0.8, duration: 1.5, ease: "easeInOut" }
        }
    };

    const vertLineDraw = {
        hidden: { scaleY: 0, opacity: 0 },
        visible: {
            scaleY: 1,
            opacity: 1,
            transition: { delay: 0.8, duration: 1.5, ease: "easeInOut" }
        }
    };

    return (
        <div className={`relative ${className}`}>
            {/* The Royal Frame Layer */}
            <div className="absolute inset-0 z-0 pointer-events-none">

                {/* --- TOP LEFT CORNER --- */}
                <div className="absolute top-0 left-0 w-16 h-16 md:w-24 md:h-24">
                    <CornerFlourish color={color} rotation={0} />
                </div>

                {/* --- TOP RIGHT CORNER --- */}
                <div className="absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24">
                    <CornerFlourish color={color} rotation={90} />
                </div>

                {/* --- BOTTOM RIGHT CORNER --- */}
                <div className="absolute bottom-0 right-0 w-16 h-16 md:w-24 md:h-24">
                    <CornerFlourish color={color} rotation={180} />
                </div>

                {/* --- BOTTOM LEFT CORNER --- */}
                <div className="absolute bottom-0 left-0 w-16 h-16 md:w-24 md:h-24">
                    <CornerFlourish color={color} rotation={270} />
                </div>


                {/* --- CONNECTING LINES --- */}
                {/* Top Line */}
                <motion.div
                    className="absolute top-0 left-20 right-20 h-[2px] bg-gradient-to-r from-transparent via-current to-transparent opacity-50"
                    style={{ color: color, originX: 0.5 }}
                    variants={lineDraw}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                />
                {/* Bottom Line */}
                <motion.div
                    className="absolute bottom-0 left-20 right-20 h-[2px] bg-gradient-to-r from-transparent via-current to-transparent opacity-50"
                    style={{ color: color, originX: 0.5 }}
                    variants={lineDraw}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                />
                {/* Left Line */}
                <motion.div
                    className="absolute top-20 bottom-20 left-0 w-[2px] bg-gradient-to-b from-transparent via-current to-transparent opacity-50"
                    style={{ color: color, originY: 0.5 }}
                    variants={vertLineDraw}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                />
                {/* Right Line */}
                <motion.div
                    className="absolute top-20 bottom-20 right-0 w-[2px] bg-gradient-to-b from-transparent via-current to-transparent opacity-50"
                    style={{ color: color, originY: 0.5 }}
                    variants={vertLineDraw}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                />

                {/* Floating Leaves for 'leaves' variant */}
                {variant === "leaves" && (
                    <>
                        <FloatingLeaf delay={0} top="-10px" left="10px" />
                        <FloatingLeaf delay={1} top="-10px" right="10px" />
                        <FloatingLeaf delay={2} bottom="-10px" right="10px" />
                        <FloatingLeaf delay={3} bottom="-10px" left="10px" />
                    </>
                )}
            </div>

            {/* Content Content */}
            <div className="relative z-10 p-6 md:p-10">
                {children}
            </div>
        </div>
    );
}

// Ornate Corner Component
function CornerFlourish({ color, rotation }: { color: string, rotation: number }) {
    return (
        <motion.svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            style={{ rotate: rotation }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
        >
            {/* Outer Curve */}
            <motion.path
                d="M10,90 Q10,10 90,10"
                fill="none"
                stroke={color}
                strokeWidth="3" // Thicker stroke
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            {/* Inner Decorative Scroll */}
            <motion.path
                d="M20,90 Q20,35 35,35 T65,35"
                fill="none"
                stroke={color}
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
            />
            {/* Dot Accent */}
            <motion.circle
                cx="65" cy="35" r="3" fill={color}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 1.8, duration: 0.3 }}
            />
            {/* Leaf Shape */}
            <motion.path
                d="M10,10 Q25,25 40,10 Q25,-5 10,10 Z"
                fill={color}
                opacity="0.3"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
            />
        </motion.svg>
    );
}

// Sub-component for a floating organic particle
function FloatingLeaf({ delay, top, left, right, bottom }: { delay: number; top?: string; left?: string; right?: string; bottom?: string }) {
    return (
        <motion.div
            className="absolute w-5 h-5 text-templeGreen"
            style={{ top, left, right, bottom }}
            animate={{
                y: [0, -5, 0],
                rotate: [0, 15, -15, 0],
                opacity: [0.7, 1, 0.7],
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay,
            }}
        >
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2C12,2 4,12 12,22C20,12 12,2 12,2Z" />
            </svg>
        </motion.div>
    );
}
