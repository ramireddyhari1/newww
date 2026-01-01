"use client";
import { motion } from "framer-motion";

export default function AnimatedTempleDivider() {
    return (
        <motion.svg viewBox="0 0 1200 60" className="w-full h-10">
            <motion.path
                d="M0 30 L80 30 L100 15 L120 30 L160 30
           L180 20 L200 30 L240 30
           L260 10 L280 30 L1200 30"
                fill="none"
                stroke="#8b5a2b"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2 }}
            />
        </motion.svg>
    );
}
