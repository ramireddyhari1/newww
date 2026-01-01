"use client";
import React from "react";

export default function MotifStrip({ className = "" }: { className?: string }) {
    return (
        <div className={`w-full overflow-hidden flex ${className}`}>
            {/* Repeating SVG Pattern Strip */}
            <div className="flex w-full min-w-full"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='24' viewBox='0 0 60 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0C40 0 45 5 45 10C45 15 40 20 30 24C20 20 15 15 15 10C15 5 20 0 30 0Z' fill='%236B4F35' fill-opacity='0.8'/%3E%3Cpath d='M0 12L10 12M50 12L60 12' stroke='%23C5A059' stroke-width='2'/%3E%3Ccircle cx='30' cy='12' r='3' fill='%23C5A059'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat-x",
                    height: "24px"
                }}
            />
        </div>
    );
}
