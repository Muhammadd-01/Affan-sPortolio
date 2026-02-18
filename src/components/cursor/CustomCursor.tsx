"use client";

import { useEffect, useState, useCallback } from "react";
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

export default function CustomCursor() {
    const [isMobile, setIsMobile] = useState(false);
    const [hasMoved, setHasMoved] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const [cursorState, setCursorState] = useState<CursorState>({
        isPointer: false,
        isHidden: true, // Initial hidden
        techColor: null,
        techName: null,
        scale: 1,
        isClicking: false,
    });

    const [codeTrails, setCodeTrails] = useState<{ id: number; x: number; y: number; char: string }[]>([]);
    const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

    // Stiffer spring for main cursor to match system feel
    const springConfig = { damping: 25, stiffness: 450, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    // Trail with slightly more lag but less bounce
    const trailConfig = { damping: 30, stiffness: 200, mass: 0.8 };
    const trailXSpring = useSpring(cursorX, trailConfig);
    const trailYSpring = useSpring(cursorY, trailConfig);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const codeChars = ['<', '>', '/', '{', '}', '(', ')', ';', '0', '1'];

        // Fix jump: if this is the first move, jump there instantly
        if (!hasMoved) {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            // Jump the springs to current mouse position to prevent animation from -100
            cursorXSpring.set(e.clientX);
            cursorYSpring.set(e.clientY);
            trailXSpring.set(e.clientX);
            trailYSpring.set(e.clientY);

            setHasMoved(true);
            setCursorState(prev => ({ ...prev, isHidden: false }));
        } else {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        }

        // Add code trails on movement
        const dx = e.clientX - lastPos.x;
        const dy = e.clientY - lastPos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 40) {
            setLastPos({ x: e.clientX, y: e.clientY });
            const char = codeChars[Math.floor(Math.random() * codeChars.length)];
            setCodeTrails(prev => [
                ...prev.slice(-5),
                { id: Date.now() + Math.random(), x: e.clientX, y: e.clientY, char }
            ]);
        }
    }, [cursorX, cursorY, lastPos, hasMoved]);

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
            scale: isClickable ? 1.4 : 1,
        }));
    }, []);

    const handleMouseDown = useCallback(() => {
        setCursorState(prev => ({ ...prev, isClicking: true, scale: 0.8 }));
    }, []);

    const handleMouseUp = useCallback(() => {
        setCursorState(prev => ({ ...prev, isClicking: false, scale: prev.isPointer ? 1.4 : 1 }));
    }, []);

    const handleMouseLeave = useCallback(() => {
        setCursorState(prev => ({ ...prev, isHidden: true }));
    }, []);

    const handleMouseEnter = useCallback(() => {
        // Only show if we've actually moved once
        if (hasMoved) {
            setCursorState(prev => ({ ...prev, isHidden: false }));
        }
    }, [hasMoved]);

    useEffect(() => {
        // Check for mobile/touch
        const checkMobile = () => {
            const mobile = window.matchMedia("(pointer: coarse)").matches || window.innerWidth <= 768;
            setIsMobile(mobile);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        if (!isMobile) {
            window.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseover", handleMouseOver);
            document.addEventListener("mousedown", handleMouseDown);
            document.addEventListener("mouseup", handleMouseUp);
            document.addEventListener("mouseleave", handleMouseLeave);
            document.addEventListener("mouseenter", handleMouseEnter);
        }

        return () => {
            window.removeEventListener("resize", checkMobile);
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [isMobile, handleMouseMove, handleMouseOver, handleMouseDown, handleMouseUp, handleMouseLeave, handleMouseEnter]);

    // If mobile, don't render anything
    if (isMobile) return null;

    // Cleanup trails
    useEffect(() => {
        const interval = setInterval(() => {
            setCodeTrails(prev => prev.slice(-4));
        }, 200);
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
                        className="fixed pointer-events-none z-[9995] font-mono text-sm font-bold"
                        style={{
                            left: trail.x,
                            top: trail.y,
                            color: cursorColor,
                            textShadow: `0 0 8px ${cursorColor}`,
                        }}
                        initial={{ opacity: 0.8, scale: 1, x: -5, y: -5 }}
                        animate={{ opacity: 0, scale: 0.5, y: -20 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        {trail.char}
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Tech name tooltip */}
            <AnimatePresence>
                {cursorState.techName && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed pointer-events-none z-[9999] px-2 py-1 rounded font-mono text-xs whitespace-nowrap"
                        style={{
                            x: cursorXSpring,
                            y: cursorYSpring,
                            translateX: "20px",
                            translateY: "25px",
                            backgroundColor: "rgba(10,10,10,0.95)",
                            border: `1px solid ${cursorColor}`,
                            color: cursorColor,
                            boxShadow: `0 0 10px ${cursorColor}40`,
                        }}
                    >
                        <span className="opacity-50">&lt;</span>
                        {cursorState.techName}
                        <span className="opacity-50">/&gt;</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main cursor - Code brackets style */}
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
                        rotate: cursorState.isClicking ? 10 : 0,
                    }}
                    transition={{ duration: 0.15 }}
                    className="relative"
                >
                    {/* Code brackets cursor */}
                    <div className="flex items-center justify-center">
                        {/* Left bracket */}
                        <motion.span
                            className="text-xl font-mono font-bold"
                            style={{
                                color: cursorColor,
                                textShadow: `0 0 8px ${cursorColor}, 0 0 15px ${cursorColor}`,
                            }}
                            animate={{
                                x: cursorState.isPointer ? -2 : 0,
                            }}
                        >
                            {'<'}
                        </motion.span>

                        {/* Center dot */}
                        <motion.div
                            className="w-1.5 h-1.5 rounded-full mx-0.5"
                            style={{
                                backgroundColor: cursorColor,
                                boxShadow: `0 0 8px ${cursorColor}`,
                            }}
                            animate={{
                                scale: [1, 1.2, 1],
                            }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                        />

                        {/* Right bracket */}
                        <motion.span
                            className="text-xl font-mono font-bold"
                            style={{
                                color: cursorColor,
                                textShadow: `0 0 8px ${cursorColor}, 0 0 15px ${cursorColor}`,
                            }}
                            animate={{
                                x: cursorState.isPointer ? 2 : 0,
                            }}
                        >
                            {'>'}
                        </motion.span>
                    </div>
                </motion.div>
            </motion.div>

            {/* Outer dashed ring */}
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
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    animate={{
                        scale: cursorState.isPointer ? 1.3 : 1,
                        opacity: cursorState.isHidden ? 0 : 0.4,
                        rotate: [0, 360],
                    }}
                    transition={{
                        scale: { duration: 0.2 },
                        opacity: { duration: 0.2 },
                        rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                    }}
                >
                    <circle
                        cx="20"
                        cy="20"
                        r="18"
                        fill="none"
                        stroke={cursorColor}
                        strokeWidth="1"
                        strokeDasharray="3 3"
                        style={{ filter: `drop-shadow(0 0 3px ${cursorColor})` }}
                    />
                </motion.svg>
            </motion.div>

            {/* Click ripple effect */}
            <ClickRipple color={cursorColor} />
        </>
    );
}

function ClickRipple({ color }: { color: string }) {
    const [explosions, setExplosions] = useState<{ id: number; x: number; y: number; items: { char: string; angle: number; distance: number }[] }[]>([]);

    useEffect(() => {
        const codeKeywords = [
            "const", "let", "function", "return", "async", "await",
            "import", "export", "class", "=>", "if", "else",
            "useState", "useEffect", "props", "render", "null"
        ];

        const handleClick = (e: MouseEvent) => {
            // Create explosion items
            const items = Array(8).fill(0).map((_, i) => ({
                char: codeKeywords[Math.floor(Math.random() * codeKeywords.length)],
                angle: (i * 45) + Math.random() * 20,
                distance: 40 + Math.random() * 40,
            }));

            const newExplosion = { id: Date.now(), x: e.clientX, y: e.clientY, items };
            setExplosions(prev => [...prev, newExplosion]);

            setTimeout(() => {
                setExplosions(prev => prev.filter(exp => exp.id !== newExplosion.id));
            }, 800);
        };

        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, []);

    return (
        <>
            {explosions.map(explosion => (
                <div key={explosion.id} className="fixed pointer-events-none z-[9996]"
                    style={{ left: explosion.x, top: explosion.y }}>
                    {/* Code keyword explosion */}
                    {explosion.items.map((item, i) => {
                        const rad = (item.angle * Math.PI) / 180;
                        const endX = Math.cos(rad) * item.distance;
                        const endY = Math.sin(rad) * item.distance;

                        return (
                            <motion.div
                                key={i}
                                className="absolute font-mono text-xs font-bold whitespace-nowrap"
                                style={{
                                    color: color,
                                    textShadow: `0 0 8px ${color}`,
                                    left: "50%",
                                    top: "50%",
                                }}
                                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                                animate={{
                                    x: endX,
                                    y: endY,
                                    opacity: 0,
                                    scale: 0.5,
                                }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            >
                                {item.char}
                            </motion.div>
                        );
                    })}

                    {/* Ripple rings */}
                    {[0, 1].map((i) => (
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
                            initial={{ width: 0, height: 0, opacity: 0.6 }}
                            animate={{ width: 80 + i * 30, height: 80 + i * 30, opacity: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        />
                    ))}
                </div>
            ))}
        </>
    );
}

