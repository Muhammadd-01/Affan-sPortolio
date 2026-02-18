"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { aboutContent } from "@/data/portfolio";
import { Calendar, Sparkles, Target, Rocket, Heart, Code2 } from "lucide-react";

// Animated counter
function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            const duration = 2000;
            const steps = 60;
            const increment = value / steps;
            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                if (current >= value) {
                    setCount(value);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(current));
                }
            }, duration / steps);
            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return (
        <span ref={ref} className="tabular-nums">
            {count}{suffix}
        </span>
    );
}

// Animated icon wrapper
function FloatingIcon({ icon: Icon, color, delay }: { icon: React.ElementType; color: string; delay: number }) {
    return (
        <motion.div
            className={`p-3 rounded-xl ${color}`}
            animate={{
                y: [0, -8, 0],
                rotate: [0, 5, -5, 0],
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                delay,
                ease: "easeInOut",
            }}
        >
            <Icon className="w-6 h-6" />
        </motion.div>
    );
}

// Animated stat card
function StatCard({
    icon: Icon,
    value,
    label,
    color,
    index
}: {
    icon: React.ElementType;
    value: string;
    label: string;
    color: string;
    index: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass rounded-2xl p-6 text-center relative overflow-hidden group"
        >
            {/* Background glow */}
            <motion.div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${color}`}
                style={{ filter: "blur(40px)" }}
            />

            <motion.div
                className="relative z-10"
                whileHover={{ scale: 1.05 }}
            >
                <Icon className="w-8 h-8 mx-auto mb-3 text-neon-blue" />
                <div className="text-3xl font-heading font-bold text-gradient mb-1">
                    {value}
                </div>
                <div className="text-foreground/50 text-sm">{label}</div>
            </motion.div>
        </motion.div>
    );
}

export default function AboutSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const stats = [
        { icon: Code2, value: "50+", label: "Projects Completed", color: "bg-neon-blue/20" },
        { icon: Heart, value: "30+", label: "Happy Clients", color: "bg-neon-purple/20" },
        { icon: Rocket, value: "4+", label: "Years Experience", color: "bg-neon-green/20" },
    ];

    return (
        <section
            id="about"
            ref={ref}
            className="section relative py-32 overflow-hidden"
        >
            {/* Animated Background */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <motion.div
                    className="gradient-orb gradient-orb-purple w-[500px] h-[500px] -top-48 -right-48"
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, -30, 0],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="gradient-orb gradient-orb-blue w-[400px] h-[400px] bottom-0 -left-32"
                    animate={{
                        scale: [1, 1.3, 1],
                        y: [0, -40, 0],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
            </motion.div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <motion.span
                        className="text-neon-blue text-sm font-medium uppercase tracking-widest mb-4 block"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        Get to Know Me
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
                        About{" "}
                        <span className="relative">
                            <span className="text-gradient">Me</span>
                            <motion.div
                                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green rounded-full"
                                initial={{ scaleX: 0 }}
                                animate={isInView ? { scaleX: 1 } : {}}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            />
                        </span>
                    </h2>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
                    {/* Story & Mission Cards */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="space-y-6"
                    >
                        {/* Story Card */}
                        <motion.div
                            className="glass rounded-2xl p-8 relative overflow-hidden group"
                            whileHover={{ y: -5 }}
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            />
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <FloatingIcon icon={Sparkles} color="bg-neon-blue/20 text-neon-blue" delay={0} />
                                    <h3 className="text-xl font-heading font-semibold">My Story</h3>
                                </div>
                                <p className="text-foreground/70 leading-relaxed">
                                    {aboutContent.story}
                                </p>
                            </div>
                        </motion.div>

                        {/* Mission Card */}
                        <motion.div
                            className="glass rounded-2xl p-8 relative overflow-hidden group"
                            whileHover={{ y: -5 }}
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            />
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <FloatingIcon icon={Target} color="bg-neon-purple/20 text-neon-purple" delay={0.5} />
                                    <h3 className="text-xl font-heading font-semibold">My Mission</h3>
                                </div>
                                <p className="text-foreground/70 leading-relaxed">
                                    {aboutContent.mission}
                                </p>
                            </div>
                        </motion.div>

                        {/* NexoVate Digital CEO Card */}
                        <motion.a
                            href="https://nexovate-digital.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass rounded-2xl p-6 relative overflow-hidden group flex flex-col sm:flex-row items-center sm:items-start gap-6 cursor-pointer"
                            whileHover={{ y: -5, scale: 1.02 }}
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-neon-green/10 to-neon-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            />

                            {/* NexoVate Logo - Inline SVG for infinity symbol */}
                            <div className="relative z-10 flex-shrink-0">
                                <motion.div
                                    className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 p-0.5 flex items-center justify-center"
                                    whileHover={{ rotate: [0, -5, 5, 0] }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="w-full h-full rounded-xl bg-background/90 flex items-center justify-center">
                                        <svg viewBox="0 0 100 60" className="w-12 h-12 md:w-14 md:h-14">
                                            <path
                                                d="M25 30 C25 15, 50 15, 50 30 C50 45, 75 45, 75 30 C75 15, 50 15, 50 30 C50 45, 25 45, 25 30"
                                                fill="none"
                                                stroke="url(#nexoGrad)"
                                                strokeWidth="8"
                                                strokeLinecap="round"
                                            />
                                            <defs>
                                                <linearGradient id="nexoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" stopColor="#3B82F6" />
                                                    <stop offset="50%" stopColor="#06B6D4" />
                                                    <stop offset="100%" stopColor="#22D3EE" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </div>
                                </motion.div>
                            </div>

                            <div className="relative z-10 flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <Rocket className="w-4 h-4 text-neon-green" />
                                    <span className="text-neon-green text-xs uppercase tracking-wider font-medium">Founder & CEO</span>
                                </div>
                                <h3 className="text-xl font-heading font-semibold group-hover:text-neon-blue transition-colors">
                                    NexoVate Digital
                                </h3>
                                <p className="text-foreground/60 text-sm mt-1">
                                    Leading a digital agency crafting innovative web & mobile solutions
                                </p>
                                <div className="flex items-center gap-2 mt-3 text-neon-blue/70 group-hover:text-neon-blue text-xs font-medium transition-colors">
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">Visit Website</span>
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </div>

                            {/* Arrow indicator */}
                            <motion.div
                                className="relative z-10 text-neon-blue/50 group-hover:text-neon-blue transition-colors"
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </motion.div>
                        </motion.a>
                    </motion.div>

                    {/* Timeline */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <FloatingIcon icon={Calendar} color="bg-neon-green/20 text-neon-green" delay={1} />
                            <h3 className="text-xl font-heading font-semibold">My Journey</h3>
                        </div>

                        {/* Timeline Line */}
                        <div className="relative">
                            <motion.div
                                className="absolute left-[19px] top-0 bottom-0 w-0.5"
                                style={{
                                    background: "linear-gradient(180deg, #00E5FF 0%, #8B5CF6 50%, #00FF9C 100%)",
                                }}
                                initial={{ height: 0 }}
                                animate={isInView ? { height: "100%" } : {}}
                                transition={{ delay: 0.5, duration: 1 }}
                            />

                            <div className="space-y-6">
                                {aboutContent.highlights.map((item, index) => (
                                    <motion.div
                                        key={item.year}
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: index * 0.15 + 0.6, duration: 0.5 }}
                                        className="relative pl-12 group"
                                    >
                                        {/* Dot */}
                                        <motion.div
                                            className="absolute left-0 top-2 w-10 h-10 rounded-full glass flex items-center justify-center border-2 border-neon-blue/50 group-hover:border-neon-blue transition-colors"
                                            whileHover={{ scale: 1.2 }}
                                        >
                                            <motion.div
                                                className="w-3 h-3 rounded-full bg-neon-blue"
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                                            />
                                        </motion.div>

                                        {/* Content */}
                                        <motion.div
                                            className="glass rounded-xl p-5 group-hover:bg-glass-white transition-colors"
                                            whileHover={{ x: 5 }}
                                        >
                                            <span className="text-neon-blue font-mono text-sm font-medium">
                                                {item.year}
                                            </span>
                                            <h4 className="text-lg font-semibold mt-1 group-hover:text-neon-blue transition-colors">
                                                {item.title}
                                            </h4>
                                            <p className="text-foreground/60 text-sm mt-1">
                                                {item.description}
                                            </p>
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                        <StatCard key={stat.label} {...stat} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
