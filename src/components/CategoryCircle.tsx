"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
    { name: "A2 Ghee", image: "/categories/ghee.png", link: "/#products" },
    { name: "Spices", image: "/categories/spices.png", link: "/#products" },
    { name: "Honey", image: "/categories/honey.png", link: "/#products" },
    { name: "Oils", image: "/categories/oils.png", link: "/#products" },
    { name: "Millet", image: "/categories/millet.png", link: "/#products" },
];

export default function CategoryCircle() {
    return (
        <section className="py-16 md:py-24 max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif text-[#4A3B32]">Shop by Ritual</h2>
                <div className="w-24 h-1 bg-[#B8860B] mx-auto mt-4 opacity-70" />
            </div>

            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                {categories.map((cat, index) => (
                    <Link href={cat.link} key={index} className="group flex flex-col items-center">
                        <div className="relative">
                            {/* Rotating Gold Halo */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute -inset-2 rounded-full border border-dashed border-templeGold/40"
                            />

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="relative w-36 h-36 md:w-44 md:h-44 rounded-full border-2 border-templeGold/30 p-1 group-hover:border-templeGold group-hover:shadow-[0_0_20px_rgba(184,134,11,0.4)] transition-all duration-500 bg-ivory"
                            >
                                <div className="w-full h-full rounded-full overflow-hidden relative flex items-center justify-center">
                                    <Image
                                        src={cat.image}
                                        alt={cat.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                            </motion.div>
                        </div>
                        <span className="mt-5 text-xl font-serif text-jaggeryBrown group-hover:text-templeGold transition-colors tracking-wide">
                            {cat.name}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
