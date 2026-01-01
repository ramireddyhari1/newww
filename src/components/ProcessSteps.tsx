"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const steps = [
    {
        title: "Vedic Bilona Method",
        desc: "Hand-churned in clay pots, just as Ayurveda prescribes.",
        image: "/process/bilona.png",
    },
    {
        title: "Single Origin A2 Milk",
        desc: "Sourced exclusively from free-grazing indigenous Gir cows.",
        image: "/process/cow.png",
    },
    {
        title: "Farm to Home",
        desc: "Zero preservatives. Delivered fresh from our organic farms.",
        image: "/process/farm.png",
    }
];

export default function ProcessSteps() {
    return (
        <section className="py-24 bg-[#FDF5E6]/50 border-t border-b border-[#B8860B]/10 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-templeGold/20 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 relative">
                <div className="text-center mb-20">
                    <span className="text-templeGold tracking-[0.2em] text-sm font-bold uppercase mb-2 block">Our Heritage</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-[#4A3B32]">The Vedic Difference</h2>
                    <p className="mt-4 text-[#4A3B32]/70 max-w-2xl mx-auto font-sans leading-relaxed">
                        We don't just sell organic products; we revive ancient traditions.
                        Every jar tells a story of purity, patience, and purpose.
                    </p>
                </div>

                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-[220px] left-[15%] right-[15%] h-1 bg-templeGold/10 -z-10">
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="h-full bg-templeGold/40"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center relative z-10">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.3 }}
                            className="flex flex-col items-center hover:-translate-y-2 transition-transform duration-500"
                        >
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 1 }}
                                className="w-56 h-56 mx-auto rounded-full border-4 border-double border-templeGold/30 bg-ivory overflow-hidden mb-8 shadow-xl relative group p-2"
                            >
                                <div className="w-full h-full rounded-full overflow-hidden relative">
                                    <Image
                                        src={step.image}
                                        alt={step.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Inner Glow */}
                                    <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(184,134,11,0.2)] rounded-full pointer-events-none" />
                                </div>
                            </motion.div>

                            {/* Step Number Badge */}
                            <div className="w-8 h-8 rounded-full bg-templeGold text-ivory flex items-center justify-center font-bold mb-4 shadow-md text-sm">
                                {index + 1}
                            </div>

                            <h3 className="text-2xl font-serif text-[#4A3B32] mb-3">{step.title}</h3>
                            <p className="text-[#4A3B32]/70 text-base leading-relaxed max-w-xs">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
