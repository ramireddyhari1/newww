"use client";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";

interface TempleCardProps {
    title: string;
    desc: string;
    image?: string;
    price?: number;
    id?: string;
}

export default function TempleCard({
    title,
    desc,
    image,
    price,
    id
}: TempleCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.02 }}
            className="group relative bg-white pb-6 shadow-xl hover:shadow-2xl transition-shadow duration-500 overflow-hidden border-t-4 border-templeGreen rounded-b-xl flex flex-col h-full perspective-1000"
        >
            {/* Glimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 z-20 pointer-events-none" />

            {image && (
                <div className="relative h-64 w-full overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                </div>
            )}

            <div className="p-6 flex-1 flex flex-col relative z-10 bg-white/95 backdrop-blur-sm">
                <h3 className="text-2xl font-serif text-templeGreen mb-2 group-hover:text-templeGold transition-colors tracking-wide">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">{desc}</p>

                {price && id && (
                    <div className="mt-auto pt-4 border-t border-gray-100">
                        <div className="flex justify-between items-end mb-4 group-hover:-translate-y-1 transition-transform duration-300">
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-400 uppercase tracking-wider">Price</span>
                                <span className="font-bold text-2xl text-jaggeryBrown">₹{price}</span>
                            </div>
                        </div>

                        {/* Interactive Slide Up Button */}
                        <div className="overflow-hidden">
                            <div className="transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                                <AddToCartButton
                                    id={id}
                                    name={title}
                                    price={price}
                                    image={image}
                                    className="w-full py-3 rounded-lg text-sm font-bold uppercase tracking-widest shadow-lg bg-templeGreen text-white hover:bg-templeGold transition-colors"
                                />
                            </div>
                            {/* Placeholder/Prompt when not hovering (optional, or just empty space) */}
                            <div className="text-center text-xs text-templeGreen/50 transform group-hover:-translate-y-full transition-transform duration-300 uppercase tracking-widest mt-[-20px] pb-2">
                                Hover to Buy
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
