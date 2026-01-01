"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import MandalaPattern from "./MandalaPattern";
import OrganicBorder from "./OrganicBorder";

export default function GopuramHeader() {
    return (
        <section className="relative w-full py-12 md:py-20 text-center overflow-hidden">
            {/* Subtle Gradient Blend - Merges Header with Body */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#FFF8E7] via-[#FFFAF0] to-transparent opacity-90 pointer-events-none z-0" />

            {/* Rotating Mandala Background */}
            <MandalaPattern opacity={0.15} className="z-0" />

            <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto px-4">
                <OrganicBorder variant="leaves" className="w-full p-8 md:p-12 mb-8" color="#C28E0E">
                    <div className="mb-6 drop-shadow-xl hover:scale-105 transition duration-500 ease-in-out">
                        <Image
                            src="/logo.png"
                            alt="Vishnavi Organics Logo"
                            width={280}
                            height={280}
                            className="w-64 h-64 md:w-72 md:h-72 object-contain mx-auto"
                        />
                    </div>

                    <h1 className="text-6xl md:text-8xl font-serif text-templeGreen drop-shadow-md tracking-tight">
                        Vishnavi Organics
                    </h1>

                    <div className="mt-8 inline-block px-12 py-2 rounded-full border border-[#D4AF37]/60 bg-gradient-to-b from-[#FFFDF5] via-[#F3E5AB] to-[#E6CDB2] text-[#4A3B22] font-serif tracking-[0.25em] text-sm md:text-base uppercase shadow-sm">
                        <span className="opacity-90 font-medium">Est. 1990</span>
                    </div>

                    <p className="mt-5 text-xl md:text-2xl text-jaggeryBrown/80 font-light max-w-lg mx-auto leading-relaxed">
                        Pure • Natural • Farm to Home
                    </p>

                    {/* New CTA Button */}
                    <Link
                        href="/#products"
                        className="mt-8 px-10 py-3 bg-templeGold text-ivory text-xl font-serif rounded-full shadow-lg hover:bg-templeGreen hover:shadow-xl hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2"
                    >
                        Shop Now <span className="text-lg">➔</span>
                    </Link>
                </OrganicBorder>
            </div>

            <nav className="relative z-10 mt-12 flex flex-wrap justify-center gap-6 md:gap-12 text-jaggeryBrown font-serif text-lg md:text-xl tracking-wide">
                <Link href="/" className="hover:text-templeGreen hover:underline underline-offset-8 decoration-templeGold decoration-2 transition-all">Home</Link>
                <Link href="/#products" className="hover:text-templeGreen hover:underline underline-offset-8 decoration-templeGold decoration-2 transition-all">Products</Link>
                <Link href="/franchise/register" className="hover:text-templeGreen hover:underline underline-offset-8 decoration-templeGold decoration-2 transition-all">Partner With Us</Link>
                <Link href="/farmers/join" className="hover:text-templeGreen hover:underline underline-offset-8 decoration-templeGold decoration-2 transition-all">For Farmers</Link>
                <Link href="/admin" className="hover:text-templeGreen hover:underline underline-offset-8 decoration-templeGold decoration-2 transition-all">Login</Link>
                <CartIcon />
            </nav>
        </section>
    );
}

function CartIcon() {
    const { cartCount, setCartOpen } = useCart();
    return (
        <button onClick={() => setCartOpen(true)} className="relative group">
            <span className="text-2xl group-hover:text-templeGreen transition">🛒</span>
            {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md animate-in zoom-in">
                    {cartCount}
                </span>
            )}
        </button>
    )
}
