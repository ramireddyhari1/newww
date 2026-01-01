"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function IngredientSpotlight() {
    return (
        <section className="py-24 max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch bg-templeGreen rounded-3xl overflow-hidden text-ivory shadow-2xl relative">

                {/* Text Content */}
                <div className="relative p-10 md:p-20 flex flex-col justify-center z-10">
                    {/* Background Pattern for Texture */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <svg width="100%" height="100%">
                            <pattern id="motif" width="60" height="60" patternUnits="userSpaceOnUse">
                                <circle cx="30" cy="30" r="2" fill="#E0C097" />
                            </pattern>
                            <rect width="100%" height="100%" fill="url(#motif)" />
                        </svg>
                    </div>

                    <span className="text-templeGold tracking-[0.3em] text-sm font-bold uppercase mb-6 block border-l-4 border-templeGold pl-4">
                        Signature Collection
                    </span>

                    <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
                        Golden Elixir of Life: <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-templeGold to-[#FDD835]">
                            A2 Gir Cow Ghee
                        </span>
                    </h2>

                    <p className="text-ivory/90 mb-10 leading-relaxed text-xl font-light">
                        Our ghee involves no shortcuts. We collect milk from free-grazing Gir cows,
                        culture it into curd, churn it by hand (*Bilona*), and slow-boil the butter
                        over firewood. The result is not just ghee—it's a nutrient-dense superfood.
                    </p>

                    <div>
                        <Link href="/products/a2-ghee" className="inline-flex items-center gap-3 px-10 py-4 bg-templeGold text-jaggeryBrown text-lg font-serif font-bold tracking-wide rounded-full hover:bg-ivory hover:text-templeGreen shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                            Discover the Purity <span>➔</span>
                        </Link>
                    </div>
                </div>

                {/* Image Content */}
                <div className="relative h-[500px] md:h-auto min-h-[500px] bg-[#1A0505] overflow-hidden group">
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />

                    <div className="absolute inset-0 opacity-60 group-hover:scale-105 transition-transform duration-1000">
                        {/* Placeholder pattern remains, but arguably we should have a real image here. 
                            Keeping the structure but enhancing the container feel. */}
                        <svg width="100%" height="100%">
                            <rect width="100%" height="100%" fill="#2a120a" />
                        </svg>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center z-20">
                        <Image
                            src="/categories/ghee.png"
                            alt="A2 Gir Cow Ghee"
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                            priority
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}
