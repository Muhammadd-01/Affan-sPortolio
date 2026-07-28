"use client";

import { motion } from "framer-motion";
import { useState, useRef, ReactNode } from "react";

export default function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        const el = cardRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // Calculate mouse position relative to the center of the card
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20; // max rotation 10deg
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
        setMousePosition({ x, y });
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setMousePosition({ x: 0, y: 0 });
            }}
            onMouseMove={handleMouseMove}
            className={`relative group cursor-pointer ${className}`}
            style={{ perspective: "1000px" }}
        >
            <motion.div
                className="w-full h-full"
                animate={{
                    rotateX: isHovered ? -mousePosition.y * 1.5 : 0,
                    rotateY: isHovered ? mousePosition.x * 1.5 : 0,
                    scale: isHovered ? 1.02 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
}
