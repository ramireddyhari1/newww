"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import OrganicBorder from "./OrganicBorder";

export default function KolamFooter() {
    const footerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: footerRef,
        offset: ["start end", "end end"]
    });

    // Rotate based on scroll position
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

    return (
        <footer ref={footerRef} className="relative bg-jaggeryBrown text-ivory pt-24 pb-12 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
            />

            {/* Rotating Giant Kolam - Scroll Linked */}
            <motion.div
                style={{ rotate }}
                className="absolute -top-40 -right-40 w-96 h-96 opacity-5 pointer-events-none"
            >
                <svg viewBox="0 0 200 200" className="w-full h-full">
                    {/* Complex concentric circles simulating a Kolam */}
                    <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" />
                    <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="M100 0 L120 80 L200 100 L120 120 L100 200 L80 120 L0 100 L80 80 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                </svg>
            </motion.div>

            <div className="max-w-7xl mx-auto px-10 relative z-10">
                <OrganicBorder variant="leaves" className="p-8" color="#e3b23c">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Brand */}
                        <div className="flex flex-col items-center md:items-start text-center md:text-left">
                            <motion.svg viewBox="0 0 200 200" className="w-24 h-24 mb-4">
                                <motion.circle
                                    cx="100"
                                    cy="100"
                                    r="60"
                                    stroke="#e3b23c"
                                    strokeWidth="2"
                                    fill="none"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 2 }}
                                />
                                <motion.path
                                    d="M100 40 L160 100 L100 160 L40 100 Z"
                                    stroke="#faf7f2"
                                    strokeWidth="1.5"
                                    fill="none"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1, rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                />
                            </motion.svg>
                            <h3 className="text-2xl font-serif text-turmeric mb-2">Vishnavi Organics</h3>
                            <p className="text-sm text-ivory/80">Preserving the sanctity of nature, delivered from our farm to your home.</p>
                        </div>

                        {/* Quick Links */}
                        <div className="text-center">
                            <h4 className="text-lg font-serif text-turmeric mb-6">Quick Links</h4>
                            <ul className="space-y-3 text-sm">
                                <li><Link href="/" className="hover:text-turmeric transition">Home</Link></li>
                                <li><Link href="/products" className="hover:text-turmeric transition">Our Products</Link></li>
                                <li><Link href="/farmers/join" className="hover:text-turmeric transition">Join as Farmer</Link></li>
                                <li><Link href="/franchise/register" className="hover:text-turmeric transition">Franchise Inquiry</Link></li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div className="text-center md:text-right">
                            <h4 className="text-lg font-serif text-turmeric mb-6">Contact Us</h4>
                            <p className="text-sm text-ivory/80 mb-2">Temple Street, Guntur, AP</p>
                            <p className="text-sm text-ivory/80 mb-2">+91 98765 43210</p>
                            <p className="text-sm text-ivory/80">support@vishnavi.com</p>

                            <div className="mt-6 flex justify-center md:justify-end gap-4 text-xs text-ivory/60">
                                <Link href="/privacy" className="hover:text-turmeric">Privacy</Link>
                                <span>•</span>
                                <Link href="/admin" className="hover:text-turmeric">Admin Login</Link>
                            </div>
                        </div>
                    </div>
                </OrganicBorder>
            </div>

            <div className="mt-16 text-center text-xs text-ivory/40 border-t border-ivory/10 pt-8">
                © {new Date().getFullYear()} Vishnavi Organics. All rights reserved.
            </div>
        </footer>
    );
}
