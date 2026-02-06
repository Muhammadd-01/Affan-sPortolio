"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

// Matrix-style falling code characters
function MatrixRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}[]();:=+-%*@#$!?";
        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);
        const drops: number[] = Array(columns).fill(1);

        const draw = () => {
            ctx.fillStyle = "rgba(10, 10, 10, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#00E5FF";
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const char = chars[Math.floor(Math.random() * chars.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                // Random color between cyan, purple, and green
                const colors = ["#00E5FF", "#8B5CF6", "#00FF9C"];
                ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];

                ctx.fillText(char, x, y);

                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 50);

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 opacity-30"
        />
    );
}

// Animated code snippets
function FloatingCode() {
    const codeSnippets = [
        "const magic = () => ✨",
        "function create() {}",
        "import { dream } from 'future'",
        "await buildAmazing()",
        "export default Success",
        "<Component {...props} />",
        "npm run perfection",
        "git commit -m 'excellence'",
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {codeSnippets.map((code, index) => (
                <motion.div
                    key={index}
                    className="absolute font-mono text-xs text-neon-blue/20"
                    initial={{
                        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                        y: -50,
                        opacity: 0,
                    }}
                    animate={{
                        y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 100,
                        opacity: [0, 0.3, 0.3, 0],
                    }}
                    transition={{
                        duration: 8 + Math.random() * 4,
                        delay: index * 0.8,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    {code}
                </motion.div>
            ))}
        </div>
    );
}

// Main loading screen component
export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0);
    const [loadingText, setLoadingText] = useState("Initializing");
    const [showContent, setShowContent] = useState(true);

    const loadingStages = [
        { progress: 15, text: "Loading assets..." },
        { progress: 30, text: "Compiling components..." },
        { progress: 45, text: "Initializing Three.js..." },
        { progress: 60, text: "Setting up animations..." },
        { progress: 75, text: "Loading portfolio data..." },
        { progress: 90, text: "Almost ready..." },
        { progress: 100, text: "Welcome!" },
    ];

    useEffect(() => {
        let currentStage = 0;
        const interval = setInterval(() => {
            if (currentStage < loadingStages.length) {
                setProgress(loadingStages[currentStage].progress);
                setLoadingText(loadingStages[currentStage].text);
                currentStage++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    setShowContent(false);
                    setTimeout(onComplete, 500);
                }, 500);
            }
        }, 400);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {showContent && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[9999] bg-background flex items-center justify-center overflow-hidden"
                >
                    {/* Matrix rain background */}
                    <MatrixRain />

                    {/* Floating code */}
                    <FloatingCode />

                    {/* Gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/50 to-background pointer-events-none" />

                    {/* Content */}
                    <div className="relative z-10 text-center">
                        {/* Logo/Name */}
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", duration: 1 }}
                            className="mb-12"
                        >
                            <motion.div
                                className="text-6xl md:text-8xl font-heading font-bold"
                                animate={{
                                    textShadow: [
                                        "0 0 20px #00E5FF, 0 0 40px #00E5FF",
                                        "0 0 40px #8B5CF6, 0 0 80px #8B5CF6",
                                        "0 0 20px #00FF9C, 0 0 40px #00FF9C",
                                        "0 0 20px #00E5FF, 0 0 40px #00E5FF",
                                    ],
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                <span className="text-gradient">MA</span>
                            </motion.div>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-foreground/50 text-sm tracking-[0.3em] uppercase mt-4"
                            >
                                Muhammad Affan
                            </motion.p>
                        </motion.div>

                        {/* Progress bar container */}
                        <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "300px" }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="relative mx-auto"
                        >
                            {/* Progress bar background */}
                            <div className="h-1 bg-glass-border rounded-full overflow-hidden">
                                {/* Progress bar fill */}
                                <motion.div
                                    className="h-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green"
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                />
                            </div>

                            {/* Progress percentage */}
                            <motion.div
                                className="mt-4 flex justify-between items-center text-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <span className="text-foreground/40 font-mono">{loadingText}</span>
                                <span className="text-neon-blue font-mono">{progress}%</span>
                            </motion.div>
                        </motion.div>

                        {/* Decorative elements */}
                        <motion.div
                            className="absolute -top-20 -left-20 w-40 h-40 border border-neon-blue/20 rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                            className="absolute -bottom-20 -right-20 w-60 h-60 border border-neon-purple/20 rounded-full"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Corner brackets */}
                        <div className="absolute top-8 left-8 text-neon-blue/30 font-mono text-2xl">&lt;</div>
                        <div className="absolute top-8 right-8 text-neon-blue/30 font-mono text-2xl">/&gt;</div>
                        <div className="absolute bottom-8 left-8 text-neon-purple/30 font-mono text-2xl">{"{"}</div>
                        <div className="absolute bottom-8 right-8 text-neon-purple/30 font-mono text-2xl">{"}"}</div>
                    </div>

                    {/* Scanning line effect */}
                    <motion.div
                        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-neon-blue to-transparent"
                        initial={{ top: 0 }}
                        animate={{ top: "100%" }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
