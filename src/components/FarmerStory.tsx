"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function FarmerStory() {
    return (
        <motion.section
            className="px-10 py-20 max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
        >
            <div className="mb-6 mx-auto w-16 h-1 bg-jaggeryBrown" />
            <h2 className="text-3xl font-serif text-templeGreen">
                From Our Farmers
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-700">
                Our products come directly from South Indian farmers
                who follow traditional organic practices passed down through generations.
                We ensure fair trade and pure, unadulterated quality in every grain.
            </p>
            <div className="mt-8">
                <Link
                    href="/farmers/join"
                    className="inline-block px-6 py-3 border border-templeGreen text-templeGreen font-bold rounded-lg hover:bg-templeGreen hover:text-white transition duration-300"
                >
                    Are you a Farmer? Join Us 🌾
                </Link>
            </div>
        </motion.section>
    );
}
