"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Code2, Rocket, Coffee, Award, ExternalLink, Sparkles } from "lucide-react";

export default function AboutSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const [counters, setCounters] = useState({ projects: 0, experience: 0, contributions: 0, coffee: 0 });

    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    useEffect(() => {
        if (!isInView) return;
        const targets = { projects: 15, experience: 3, contributions: 250, coffee: 1000 };
        const steps = 60;
        const duration = 2000;
        (Object.keys(targets) as Array<keyof typeof targets>).forEach((key) => {
            let cur = 0;
            const inc = targets[key] / steps;
            const timer = setInterval(() => {
                cur += inc;
                if (cur >= targets[key]) { cur = targets[key]; clearInterval(timer); }
                setCounters((p) => ({ ...p, [key]: Math.floor(cur) }));
            }, duration / steps);
        });
    }, [isInView]);

    const stats = [
        { icon: <Rocket className="w-6 h-6" />, value: counters.projects, label: "Projects Completed", color: "#00E5FF" },
        { icon: <Code2 className="w-6 h-6" />, value: counters.experience, label: "Years Experience", color: "#8B5CF6" },
        { icon: <Award className="w-6 h-6" />, value: counters.contributions, label: "Code Contributions", color: "#00FF9C" },
        { icon: <Coffee className="w-6 h-6" />, value: counters.coffee, label: "Cups of Coffee", color: "#FF006E" },
    ];

    const highlightWords: Record<string, string> = {
        "full-stack": "#00E5FF",
        "React,": "#61DAFB",
        "Node.js,": "#6DB33F",
        "Flutter,": "#02569B",
        "MERN": "#00D8FF",
        "TailwindCSS,": "#06B6D4",
        "NexoVate": "#00E5FF",
        "Digital": "#00E5FF",
    };

    const renderText = (text: string) =>
        text.split(" ").map((word, i) => {
            const color = Object.entries(highlightWords).find(([k]) => word.includes(k))?.[1];
            return (
                <span key={i} style={color ? { color, fontWeight: 500 } : undefined}>
                    {word}{" "}
                </span>
            );
        });

    return (
        <section ref={sectionRef} id="about" className="section relative py-32 overflow-hidden">
            {/* Animated background */}
            <motion.div className="absolute inset-0 pointer-events-none" style={{ y: backgroundY }}>
                <div className="gradient-orb gradient-orb-blue w-[500px] h-[500px] top-0 -left-64 absolute opacity-20" />
                <div className="gradient-orb gradient-orb-purple w-[400px] h-[400px] bottom-0 -right-32 absolute opacity-15" />
            </motion.div>

            {/* Dot grid */}
            <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: "radial-gradient(circle at 2px 2px, rgba(139,92,246,0.08) 1px, transparent 0)",
                backgroundSize: "40px 40px",
            }} />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <motion.span
                        className="text-neon-blue text-sm font-medium uppercase tracking-widest mb-4 block"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        Get to Know Me
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
                        Who Am{" "}
                        <span className="relative">
                            <span className="text-gradient">I?</span>
                            <motion.span
                                className="absolute -bottom-2 left-0 right-0 h-1 rounded-full"
                                style={{ background: "linear-gradient(90deg, #00E5FF, #8B5CF6, #00FF9C)" }}
                                initial={{ scaleX: 0 }}
                                animate={isInView ? { scaleX: 1 } : {}}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            />
                        </span>
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left — Bio */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="space-y-6"
                    >
                        {/* Sparkle badge */}
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-neon-green/30"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.3 }}
                        >
                            <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
                                <Sparkles className="w-4 h-4 text-neon-green" />
                            </motion.span>
                            <span className="text-sm text-neon-green">Full-Stack Developer & Creator</span>
                        </motion.div>

                        {[
                            "I'm Muhammad Affan — a full-stack web developer, content creator, and lifelong learner. I specialize in building modern, real-world applications using the MERN stack and Flutter, with a strong focus on clean UI/UX, performance, and scalability.",
                            "Whether it's frontend magic or backend logic, I'm passionate about turning ideas into fully functional digital products. I believe in building with purpose — using clean code, thoughtful design, and scalable architecture.",
                        ].map((para, i) => (
                            <motion.p
                                key={i}
                                className="text-foreground/70 leading-relaxed text-lg"
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.35 + i * 0.12 }}
                            >
                                {renderText(para)}
                            </motion.p>
                        ))}

                        {/* CEO Badge */}
                        <motion.a
                            href="https://nexovate-digital.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-4 px-6 py-4 rounded-2xl glass neon-border"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.6 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            {/* Animated dot */}
                            <div className="relative flex-shrink-0">
                                <motion.span
                                    className="w-3 h-3 rounded-full bg-neon-blue block"
                                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                                <span className="absolute inset-0 w-3 h-3 rounded-full bg-neon-blue opacity-40 animate-ping" />
                            </div>
                            <div>
                                <p className="text-foreground/50 text-xs uppercase tracking-widest mb-0.5">Currently</p>
                                <p className="font-bold text-neon-blue">CEO at NexoVate Digital</p>
                            </div>
                            <ExternalLink className="w-4 h-4 text-neon-blue/60 group-hover:text-neon-blue transition-colors ml-auto" />
                        </motion.a>

                        <motion.p
                            className="text-foreground/70 leading-relaxed text-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.7 }}
                        >
                            Outside tech, I study Islamic knowledge, psychology, and history — blending traditional wisdom with modern tools. Committed to growth, discipline, and creating solutions that matter.
                        </motion.p>
                    </motion.div>

                    {/* Right — Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="grid grid-cols-2 gap-5"
                    >
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                                transition={{ delay: 0.4 + i * 0.1, type: "spring", stiffness: 120 }}
                                whileHover={{ y: -6, scale: 1.03 }}
                                className="relative group"
                            >
                                <div
                                    className="relative p-6 rounded-2xl glass overflow-hidden border border-white/5 transition-all duration-300"
                                    style={{
                                        boxShadow: `0 0 0px ${stat.color}00`,
                                        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 30px ${stat.color}30`;
                                        (e.currentTarget as HTMLDivElement).style.borderColor = `${stat.color}40`;
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                                        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.05)";
                                    }}
                                >
                                    {/* Radial glow */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                        style={{ background: `radial-gradient(circle at 30% 30%, ${stat.color}12 0%, transparent 70%)` }} />

                                    {/* Icon */}
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                                        style={{ background: `${stat.color}20`, color: stat.color }}
                                    >
                                        {stat.icon}
                                    </div>

                                    {/* Counter */}
                                    <div className="text-4xl font-heading font-bold text-foreground mb-1">
                                        {stat.value}
                                        <span style={{ color: stat.color }}>+</span>
                                    </div>
                                    <p className="text-foreground/50 text-sm">{stat.label}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Bottom tagline */}
                <motion.div
                    className="text-center mt-24"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.9 }}
                >
                    <p className="text-xl text-foreground/40">
                        Let&apos;s build something{" "}
                        <motion.span
                            className="text-neon-blue font-medium"
                            animate={{ textShadow: ["0 0 10px #00E5FF", "0 0 25px #00E5FF", "0 0 10px #00E5FF"] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            impactful
                        </motion.span>{" "}
                        together.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
