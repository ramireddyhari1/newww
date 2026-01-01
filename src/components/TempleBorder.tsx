"use client";
import React from "react";
import AyurvedaMotifs from "./AyurvedaMotifs";

interface TempleBorderProps {
    children: React.ReactNode;
    className?: string;
}

export default function TempleBorder({ children, className = "" }: TempleBorderProps) {
    return (
        <div className={`relative w-full min-h-screen ${className}`}>

            {/* --- FLOATING ACCENTS (No Structural Border) --- */}
            <div className="fixed inset-0 pointer-events-none z-50">
                <AyurvedaMotifs className="w-full h-full" />

                {/* Subtle Top Gradient for Header Depth */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#FFF8E7] to-transparent opacity-80" />
            </div>

            {/* --- CONTENT AREA --- */}
            {/* Open, breathable padding. No box constraints. */}
            <div className="relative w-full h-full pt-16 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
                {children}
            </div>

        </div>
    );
}
