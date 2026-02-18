"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, FileText, Mail, Sparkles } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import { useSmoothScroll } from "@/hooks/useNavigation";
import { useRef, useEffect, useState } from "react";

// Glitch text effect - with visible name
function GlitchText({ text, className }: { text: string; className?: string }) {
    return (
        <span className={`relative inline-block ${className}`}>
            <span
                className="relative z-10"
                style={{
                    background: "linear-gradient(135deg, #00E5FF, #8B5CF6, #00FF9C)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 0 20px rgba(0, 229, 255, 0.5))",
                }}
            >
                {text}
            </span>
            <span
                className="absolute inset-0 text-neon-blue opacity-50"
                style={{ transform: "translate(-2px, 2px)", clipPath: "inset(0 0 50% 0)" }}
            >
                {text}
            </span>
            <span
                className="absolute inset-0 text-neon-purple opacity-50"
                style={{ transform: "translate(2px, -2px)", clipPath: "inset(50% 0 0 0)" }}
            >
                {text}
            </span>
        </span>
    );
}

// Animated typing cursor
function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
    const [displayText, setDisplayText] = useState("");
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            let index = 0;
            const interval = setInterval(() => {
                if (index <= text.length) {
                    setDisplayText(text.slice(0, index));
                    index++;
                } else {
                    clearInterval(interval);
                }
            }, 50);
            return () => clearInterval(interval);
        }, delay);
        return () => clearTimeout(timeout);
    }, [text, delay]);

    useEffect(() => {
        const interval = setInterval(() => setShowCursor(prev => !prev), 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <span>
            {displayText}
            <span className={`text-neon-blue ${showCursor ? "opacity-100" : "opacity-0"}`}>|</span>
        </span>
    );
}

// Animated code block
function FloatingCodeBlock() {
    const codeLines = [
        { text: "const developer = {", color: "text-neon-purple" },
        { text: '  name: "Muhammad Affan",', color: "text-foreground/70" },
        { text: '  passion: "Creating",', color: "text-foreground/70" },
        { text: '  skills: ["React", "Next.js", "TypeScript"],', color: "text-neon-blue" },
        { text: "};", color: "text-neon-purple" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="hidden xl:block absolute right-10 top-1/2 -translate-y-1/2"
        >
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="glass rounded-xl p-6 font-mono text-sm border border-neon-blue/30"
            >
                {codeLines.map((line, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2 + i * 0.2 }}
                        className={line.color}
                    >
                        {line.text}
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}

// Animated statistics
function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.6 }}
            className="text-center"
        >
            <motion.div
                className="text-3xl md:text-4xl font-heading font-bold text-gradient"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay }}
            >
                {value}
            </motion.div>
            <div className="text-foreground/50 text-sm mt-1">{label}</div>
        </motion.div>
    );
}

export default function HeroSection() {
    const scrollTo = useSmoothScroll();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const roles = ["Full-Stack Developer", "Creative Technologist", "UI/UX Enthusiast", "Problem Solver"];
    const [currentRole, setCurrentRole] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentRole(prev => (prev + 1) % roles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [roles.length]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.4, 0.25, 1],
            },
        },
    };

    return (
        <section
            id="hero"
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Animated gradient orbs */}
            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 pointer-events-none"
            >
                <motion.div
                    className="gradient-orb gradient-orb-blue w-[500px] h-[500px] -top-32 -left-32 absolute"
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="gradient-orb gradient-orb-purple w-[400px] h-[400px] top-1/4 -right-32 absolute"
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, -30, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
                <motion.div
                    className="gradient-orb gradient-orb-green w-[300px] h-[300px] bottom-0 left-1/4 absolute"
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 40, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
            </motion.div>

            {/* Floating Code Block */}
            <FloatingCodeBlock />

            {/* Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{ y, opacity }}
                className="relative z-10 text-center px-6 max-w-5xl mx-auto"
            >
                {/* Status Badge */}
                <motion.div
                    variants={itemVariants}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-neon-green/30 mb-8"
                >
                    <motion.span
                        className="w-2 h-2 rounded-full bg-neon-green"
                        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-sm text-neon-green">Available for projects</span>
                </motion.div>

                {/* Main Heading with Glitch */}
                <motion.h1
                    variants={itemVariants}
                    className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold mb-4 px-2"
                >
                    <span className="text-foreground">Hi, I&apos;m </span>
                    <GlitchText text={personalInfo.name} className="text-gradient" />
                </motion.h1>

                {/* Animated Role */}
                <motion.div
                    variants={itemVariants}
                    className="h-12 md:h-16 mb-6 overflow-hidden"
                >
                    <motion.h2
                        key={currentRole}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-xl sm:text-2xl md:text-3xl text-neon-blue font-light"
                    >
                        <Sparkles className="inline w-6 h-6 mr-2" />
                        {roles[currentRole]}
                    </motion.h2>
                </motion.div>

                {/* Tagline with Typewriter */}
                <motion.p
                    variants={itemVariants}
                    className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto mb-8"
                >
                    <TypewriterText text={personalInfo.tagline} delay={1000} />
                </motion.p>

                {/* Stats */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap justify-center gap-6 sm:gap-12 mb-12"
                >
                    <StatCard value="50+" label="Projects" delay={1.5} />
                    <StatCard value="4+" label="Years Exp" delay={1.7} />
                    <StatCard value="30+" label="Happy Clients" delay={1.9} />
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <motion.button
                        onClick={() => scrollTo("#resume")}
                        className="group relative overflow-hidden px-8 py-4 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple font-semibold"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            View Resume
                        </span>
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-neon-purple to-neon-green"
                            initial={{ x: "100%" }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.button>

                    <motion.button
                        onClick={() => scrollTo("#contact")}
                        className="group px-8 py-4 rounded-xl border-2 border-neon-blue font-semibold relative overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">
                            <Mail className="w-5 h-5" />
                            Contact Me
                        </span>
                        <motion.div
                            className="absolute inset-0 bg-neon-blue"
                            initial={{ y: "100%" }}
                            whileHover={{ y: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.button>
                </motion.div>

                {/* Scroll Indicator - Below buttons, clickable */}
                <motion.div
                    variants={itemVariants}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5, duration: 1 }}
                    className="mt-16 cursor-pointer"
                    onClick={() => scrollTo("#about")}
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="flex flex-col items-center gap-2 text-foreground/50 hover:text-neon-blue transition-colors"
                    >
                        <span className="text-xs uppercase tracking-widest">Explore More</span>
                        <motion.div
                            className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-2"
                        >
                            <motion.div
                                className="w-1.5 h-1.5 rounded-full bg-neon-blue"
                                animate={{ y: [0, 16, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Decorative grid lines */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(0, 229, 255, 0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 229, 255, 0.03) 1px, transparent 1px)`,
                    backgroundSize: "50px 50px",
                }} />
            </div>
        </section>
    );
}
