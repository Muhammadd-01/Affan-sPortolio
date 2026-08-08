"use client";

import { motion } from "framer-motion";
import { useState, useRef, useMemo, ReactNode } from "react";

const DEPTH_LAYERS = 10;
const FRONT_Z = DEPTH_LAYERS;
const DEFAULT_TILT_X = -3;
const DEFAULT_TILT_Y = 4;

export default function TiltCard({
    children,
    className = "",
}: {
    children: ReactNode;
    className?: string;
}) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        const el = cardRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
        setMousePosition({ x, y });
    };

    const rotX = isHovered ? -mousePosition.y * 1.5 : DEFAULT_TILT_X;
    const rotY = isHovered ? mousePosition.x * 1.5 : DEFAULT_TILT_Y;

    const depthLayers = useMemo(
        () => Array.from({ length: DEPTH_LAYERS }, (_, i) => i),
        []
    );

    const shadowX = -rotY * 1.5;
    const shadowY = rotX * 1.5;

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
            style={{ perspective: "1200px" }}
        >
            <motion.div
                className="w-full h-full relative"
                animate={{
                    rotateX: rotX,
                    rotateY: rotY,
                    scale: isHovered ? 1.03 : 1,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* ══════ DEPTH LAYERS — always visible, color changes on hover ══════ */}
                {depthLayers.map((i) => {
                    const ratio = i / DEPTH_LAYERS;
                    // At rest: dark glass matching the card background
                    // On hover: neon cyan/purple glow
                    const restBg = `rgba(15, 15, 25, ${0.85 - ratio * 0.15})`;
                    const hoverBg = `linear-gradient(135deg,
                        rgba(0, 229, 255, ${0.18 - ratio * 0.12}),
                        rgba(139, 92, 246, ${0.12 - ratio * 0.08}),
                        rgba(0, 255, 156, ${0.06 - ratio * 0.04}))`;
                    const restBorder = `1px solid rgba(255, 255, 255, ${0.06 - ratio * 0.04})`;
                    const hoverBorder = `1px solid rgba(0, 229, 255, ${0.25 - ratio * 0.18})`;

                    return (
                        <div
                            key={i}
                            className="absolute inset-0 rounded-2xl pointer-events-none"
                            style={{
                                transform: `translateZ(${FRONT_Z - i - 1}px)`,
                                background: isHovered ? hoverBg : restBg,
                                border: isHovered ? hoverBorder : restBorder,
                                transition: "background 0.4s ease, border 0.4s ease",
                            }}
                        />
                    );
                })}

                {/* ══════ FRONT FACE — the actual card content ══════ */}
                <div
                    className="relative w-full h-full"
                    style={{
                        transform: `translateZ(${FRONT_Z}px)`,
                        transformStyle: "preserve-3d",
                    }}
                >
                    {children}
                </div>

                {/* ══════ BACK FACE ══════ */}
                <div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                        transform: "translateZ(-1px)",
                        background: isHovered
                            ? "linear-gradient(135deg, rgba(0, 229, 255, 0.04), rgba(139, 92, 246, 0.03))"
                            : "rgba(10, 10, 20, 0.9)",
                        border: isHovered
                            ? "1px solid rgba(0, 229, 255, 0.06)"
                            : "1px solid rgba(255, 255, 255, 0.03)",
                        transition: "background 0.4s ease, border 0.4s ease",
                    }}
                />

                {/* ══════ DYNAMIC 3D SHADOW ══════ */}
                <motion.div
                    className="absolute inset-2 rounded-2xl pointer-events-none"
                    style={{
                        transform: "translateZ(-2px)",
                        filter: "blur(20px)",
                    }}
                    animate={{
                        opacity: isHovered ? 0.6 : 0.15,
                        x: shadowX,
                        y: shadowY,
                        background: isHovered
                            ? "linear-gradient(135deg, rgba(0, 229, 255, 0.3), rgba(139, 92, 246, 0.2))"
                            : "rgba(0, 0, 0, 0.4)",
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                />
            </motion.div>
        </motion.div>
    );
}
