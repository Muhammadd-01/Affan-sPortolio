"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { techColorMap } from "@/data/portfolio";

interface CursorState {
    isPointer: boolean;
    isHidden: boolean;
    techColor: string | null;
    techName: string | null;
    scale: number;
    isClicking: boolean;
}

// Code-themed cursor icons
const codeIcons = {
    default: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="16,18 22,12 16,6"/>
        <polyline points="8,6 2,12 8,18"/>
    </svg>`,
    pointer: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M5 3l14 9-7 2-4 7-3-18z"/>
    </svg>`,
};

export default function TechCursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const trailX = useMotionValue(-100);
    const trailY = useMotionValue(-100);

    const [cursorState, setCursorState] = useState<CursorState>({
        isPointer: false,
        isHidden: false,
        techColor: null,
        techName: null,
        scale: 1,
        isClicking: false,
    });

    const springConfig = { damping: 20, stiffness: 400 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const trailSpringConfig = { damping: 30, stiffness: 180 };
    const trailXSpring = useSpring(trailX, trailSpringConfig);
    const trailYSpring = useSpring(trailY, trailSpringConfig);

    // Code particles trail
    const [codeTrails, setCodeTrails] = useState<{ id: number; x: number; y: number; char: string }[]>([]);
    const trailRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const codeChars = ['<', '>', '/', '{', '}', '(', ')', ';', ':', '=', '#', '*', '@'];

    const handleMouseMove = useCallback((e: MouseEvent) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        trailX.set(e.clientX);
        trailY.set(e.clientY);

        // Add code character trails
        const dx = e.clientX - trailRef.current.x;
        const dy = e.clientY - trailRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 30) {
            trailRef.current = { x: e.clientX, y: e.clientY };
            const char = codeChars[Math.floor(Math.random() * codeChars.length)];
            setCodeTrails(prev => [
                ...prev.slice(-6),
                { id: Date.now() + Math.random(), x: e.clientX, y: e.clientY, char }
            ]);
        }
    }, [cursorX, cursorY, trailX, trailY]);

    const handleMouseOver = useCallback((e: MouseEvent) => {
        const target = e.target as HTMLElement;

        const isClickable = Boolean(
            target.tagName === "BUTTON" ||
            target.tagName === "A" ||
            target.closest("button") ||
            target.closest("a") ||
            target.dataset.cursor === "pointer"
        );

        const techName = target.dataset.tech || target.closest("[data-tech]")?.getAttribute("data-tech");
        const techColor = techName ? techColorMap[techName] || null : null;

        setCursorState(prev => ({
            ...prev,
            isPointer: isClickable,
            techColor,
            techName: techName || null,
            scale: isClickable ? 1.5 : 1,
        }));
    }, []);

    const handleMouseDown = useCallback(() => {
        setCursorState(prev => ({ ...prev, isClicking: true, scale: 0.8 }));
    }, []);

    const handleMouseUp = useCallback(() => {
        setCursorState(prev => ({ ...prev, isClicking: false, scale: prev.isPointer ? 1.5 : 1 }));
    }, []);

    const handleMouseLeave = useCallback(() => {
        setCursorState(prev => ({ ...prev, isHidden: true }));
    }, []);

    const handleMouseEnter = useCallback(() => {
        setCursorState(prev => ({ ...prev, isHidden: false }));
    }, []);

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [handleMouseMove, handleMouseOver, handleMouseDown, handleMouseUp, handleMouseLeave, handleMouseEnter]);

    // Cleanup trails
    useEffect(() => {
        const interval = setInterval(() => {
            setCodeTrails(prev => prev.slice(-5));
        }, 150);
        return () => clearInterval(interval);
    }, []);

    const cursorColor = cursorState.techColor || "#00E5FF";

    return (
        <>
            {/* Code character trails */}
            <AnimatePresence>
                {codeTrails.map((trail) => (
                    <motion.div
                        key={trail.id}
                        className="fixed pointer-events-none z-[9995] font-mono text-lg font-bold"
                        style={{
                            left: trail.x,
                            top: trail.y,
                            color: cursorColor,
                            textShadow: `0 0 10px ${cursorColor}, 0 0 20px ${cursorColor}`,
                        }}
                        initial={{ opacity: 1, scale: 1, x: -10, y: -10 }}
                        animate={{ opacity: 0, scale: 0.5, y: -30 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {trail.char}
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Tech name tooltip with code styling */}
            <AnimatePresence>
                {cursorState.techName && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0, y: 10 }}
                        className="fixed pointer-events-none z-[9999] px-3 py-1.5 rounded-lg font-mono text-xs whitespace-nowrap"
                        style={{
                            x: cursorXSpring,
                            y: cursorYSpring,
                            translateX: "15px",
                            translateY: "25px",
                            backgroundColor: "rgba(10,10,10,0.9)",
                            border: `1px solid ${cursorColor}`,
                            color: cursorColor,
                            boxShadow: `0 0 15px ${cursorColor}40`,
                        }}
                    >
                        <span className="opacity-50">&lt;</span>
                        {cursorState.techName}
                        <span className="opacity-50">/&gt;</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main cursor - Code brackets */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998]"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <motion.div
                    animate={{
                        scale: cursorState.scale,
                        opacity: cursorState.isHidden ? 0 : 1,
                        rotate: cursorState.isClicking ? 15 : 0,
                    }}
                    transition={{ duration: 0.15 }}
                    className="relative"
                >
                    {/* Code brackets cursor */}
                    <div className="relative flex items-center justify-center">
                        {/* Left bracket */}
                        <motion.span
                            className="text-2xl font-mono font-bold"
                            style={{
                                color: cursorColor,
                                textShadow: `0 0 10px ${cursorColor}, 0 0 20px ${cursorColor}`,
                            }}
                            animate={{
                                x: cursorState.isPointer ? -3 : 0,
                            }}
                        >
                            {'<'}
                        </motion.span>

                        {/* Center dot */}
                        <motion.div
                            className="w-2 h-2 rounded-full mx-0.5"
                            style={{
                                backgroundColor: cursorColor,
                                boxShadow: `0 0 10px ${cursorColor}, 0 0 20px ${cursorColor}`,
                            }}
                            animate={{
                                scale: [1, 1.3, 1],
                            }}
                            transition={{ duration: 1, repeat: Infinity }}
                        />

                        {/* Right bracket */}
                        <motion.span
                            className="text-2xl font-mono font-bold"
                            style={{
                                color: cursorColor,
                                textShadow: `0 0 10px ${cursorColor}, 0 0 20px ${cursorColor}`,
                            }}
                            animate={{
                                x: cursorState.isPointer ? 3 : 0,
                            }}
                        >
                            {'>'}
                        </motion.span>
                    </div>

                    {/* Orbiting code particles */}
                    {[0, 1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            className="absolute text-xs font-mono"
                            style={{
                                color: cursorColor,
                                opacity: 0.6,
                            }}
                            animate={{
                                rotate: [0, 360],
                            }}
                            transition={{
                                duration: 3 + i * 0.5,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        >
                            <motion.span
                                style={{
                                    display: "block",
                                    transform: `translateX(${18 + i * 4}px)`,
                                }}
                            >
                                {['(', ')', '{', '}'][i]}
                            </motion.span>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Outer ring with code pattern */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9997]"
                style={{
                    x: trailXSpring,
                    y: trailYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <motion.svg
                    width="50"
                    height="50"
                    viewBox="0 0 50 50"
                    className="overflow-visible"
                    animate={{
                        scale: cursorState.isPointer ? 1.4 : 1,
                        opacity: cursorState.isHidden ? 0 : 0.5,
                        rotate: [0, 360],
                    }}
                    transition={{
                        scale: { duration: 0.2 },
                        opacity: { duration: 0.2 },
                        rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                    }}
                >
                    {/* Dashed circle */}
                    <circle
                        cx="25"
                        cy="25"
                        r="22"
                        fill="none"
                        stroke={cursorColor}
                        strokeWidth="1"
                        strokeDasharray="4 4"
                        style={{ filter: `drop-shadow(0 0 3px ${cursorColor})` }}
                    />

                    {/* Corner accents */}
                    {cursorState.isPointer && (
                        <>
                            <circle cx="25" cy="3" r="2" fill={cursorColor} />
                            <circle cx="47" cy="25" r="2" fill={cursorColor} />
                            <circle cx="25" cy="47" r="2" fill={cursorColor} />
                            <circle cx="3" cy="25" r="2" fill={cursorColor} />
                        </>
                    )}
                </motion.svg>
            </motion.div>

            {/* Click effect - code explosion */}
            <ClickCodeEffect color={cursorColor} />
        </>
    );
}

function ClickCodeEffect({ color }: { color: string }) {
    const [effects, setEffects] = useState<{ id: number; x: number; y: number }[]>([]);
    const codeSnippets = ['const', 'let', 'function', 'return', 'async', 'await', '=>', '{}', '[]', '();'];

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const newEffect = { id: Date.now(), x: e.clientX, y: e.clientY };
            setEffects(prev => [...prev, newEffect]);
            setTimeout(() => {
                setEffects(prev => prev.filter(ef => ef.id !== newEffect.id));
            }, 1000);
        };

        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, []);

    return (
        <>
            {effects.map(effect => (
                <div key={effect.id} className="fixed pointer-events-none z-[9996]"
                    style={{ left: effect.x, top: effect.y }}>
                    {/* Code snippets burst */}
                    {codeSnippets.slice(0, 6).map((snippet, i) => (
                        <motion.div
                            key={i}
                            className="absolute font-mono text-xs font-bold"
                            style={{ color }}
                            initial={{
                                x: 0,
                                y: 0,
                                opacity: 1,
                                scale: 1,
                            }}
                            animate={{
                                x: Math.cos(i * (Math.PI / 3)) * 60,
                                y: Math.sin(i * (Math.PI / 3)) * 60,
                                opacity: 0,
                                scale: 0.5,
                            }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            {snippet}
                        </motion.div>
                    ))}

                    {/* Ripple rings */}
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={`ring-${i}`}
                            className="absolute rounded-full"
                            style={{
                                border: `1px solid ${color}`,
                                left: "50%",
                                top: "50%",
                                translateX: "-50%",
                                translateY: "-50%",
                            }}
                            initial={{ width: 0, height: 0, opacity: 0.8 }}
                            animate={{ width: 100 + i * 20, height: 100 + i * 20, opacity: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                        />
                    ))}
                </div>
            ))}
        </>
    );
}
