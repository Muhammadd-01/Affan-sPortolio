"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Zap, TrendingUp, Code2, Globe, Layers, Wrench, Database, Smartphone } from "lucide-react";

// Tech icon via devicon CDN — no npm package needed
function TechIcon({ name, iconUrl, color }: { name: string; iconUrl: string; color: string }) {
    const [err, setErr] = useState(false);
    if (err) {
        // fallback: colored letter badge
        return (
            <span className="w-10 h-10 rounded-xl flex items-center justify-center text-base font-bold"
                style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}>
                {name[0]}
            </span>
        );
    }
    return (
        <img src={iconUrl} alt={name} width={40} height={40}
            className="object-contain"
            style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}
            onError={() => setErr(true)} />
    );
}

type Skill = { name: string; level: number; color: string; iconUrl: string };
type Category = { category: string; color: string; icon: React.ElementType; skills: Skill[] };

const D = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons"; // devicon base

const skillCategories: Category[] = [
    {
        category: "Frontend",
        color: "#00E5FF",
        icon: Code2,
        skills: [
            { name: "React.js", level: 95, color: "#61DAFB", iconUrl: `${D}/react/react-original.svg` },
            { name: "JavaScript", level: 90, color: "#F7DF1E", iconUrl: `${D}/javascript/javascript-original.svg` },
            { name: "HTML / CSS", level: 95, color: "#E34F26", iconUrl: `${D}/html5/html5-original.svg` },
            { name: "Tailwind CSS", level: 90, color: "#06B6D4", iconUrl: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" },
            { name: "Bootstrap", level: 85, color: "#7952B3", iconUrl: `${D}/bootstrap/bootstrap-original.svg` },
        ],
    },
    {
        category: "Backend",
        color: "#8B5CF6",
        icon: Layers,
        skills: [
            { name: "C#", level: 80, color: "#512BD4", iconUrl: `${D}/csharp/csharp-original.svg` },
            { name: "ASP.NET Core", level: 75, color: "#512BD4", iconUrl: `${D}/dotnetcore/dotnetcore-original.svg` },
            { name: "PHP", level: 70, color: "#777BB4", iconUrl: `${D}/php/php-original.svg` },
            { name: "Laravel", level: 80, color: "#FF2D20", iconUrl: `${D}/laravel/laravel-plain.svg` },
        ],
    },
    {
        category: "Full-Stack",
        color: "#00FF9C",
        icon: Globe,
        skills: [
            { name: "Next.js", level: 85, color: "#EDEDED", iconUrl: `${D}/nextjs/nextjs-original.svg` },
            { name: "Node.js", level: 80, color: "#6DB33F", iconUrl: `${D}/nodejs/nodejs-original.svg` },
            { name: "MERN Stack", level: 85, color: "#00D8FF", iconUrl: `${D}/mongodb/mongodb-original.svg` },
            { name: "Angular", level: 75, color: "#DD0031", iconUrl: `${D}/angularjs/angularjs-original.svg` },
        ],
    },
    {
        category: "Tools",
        color: "#FF006E",
        icon: Wrench,
        skills: [
            { name: "Git", level: 85, color: "#F05032", iconUrl: `${D}/git/git-original.svg` },
            { name: "GitHub", level: 90, color: "#EDEDED", iconUrl: `${D}/github/github-original.svg` },
            { name: "Vite", level: 90, color: "#646CFF", iconUrl: `${D}/vitejs/vitejs-original.svg` },
            { name: "Vercel", level: 85, color: "#EDEDED", iconUrl: "https://www.vectorlogo.zone/logos/vercel/vercel-icon.svg" },
        ],
    },
    {
        category: "Database",
        color: "#00E5FF",
        icon: Database,
        skills: [
            { name: "MySQL", level: 75, color: "#4479A1", iconUrl: `${D}/mysql/mysql-original.svg` },
            { name: "SQL Server", level: 70, color: "#CC2927", iconUrl: `${D}/microsoftsqlserver/microsoftsqlserver-plain.svg` },
        ],
    },
    {
        category: "Mobile",
        color: "#8B5CF6",
        icon: Smartphone,
        skills: [
            { name: "Flutter", level: 70, color: "#02569B", iconUrl: `${D}/flutter/flutter-original.svg` },
            { name: "Dart", level: 70, color: "#0175C2", iconUrl: `${D}/dart/dart-original.svg` },
        ],
    },
];

// Marquee
function SkillMarquee() {
    const all = skillCategories.flatMap((c) => c.skills);
    return (
        <div className="relative overflow-hidden py-5 mb-14">
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to right, #0A0A0A, transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to left, #0A0A0A, transparent)" }} />
            <motion.div className="flex gap-4 w-max"
                animate={{ x: [0, -1700] }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}>
                {[...all, ...all].map((s, i) => (
                    <div key={i} className="flex items-center gap-2.5 px-4 py-2 rounded-full glass border whitespace-nowrap"
                        style={{ borderColor: `${s.color}30` }}>
                        <TechIcon name={s.name} iconUrl={s.iconUrl} color={s.color} />
                        <span className="text-foreground/70 text-sm font-medium">{s.name}</span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

// Skill card
function SkillCard({ skill, index }: { skill: Skill; index: number }) {
    const [hovered, setHovered] = useState(false);
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.07 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <motion.div
                className="relative p-5 rounded-2xl glass border border-white/5 overflow-hidden"
                animate={{
                    borderColor: hovered ? `${skill.color}55` : "rgba(255,255,255,0.05)",
                    boxShadow: hovered ? `0 0 30px ${skill.color}20, inset 0 0 20px ${skill.color}06` : "none",
                }}
                transition={{ duration: 0.25 }}
            >
                <div className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                    style={{ opacity: hovered ? 1 : 0, background: `radial-gradient(circle at 30% 30%, ${skill.color}10 0%, transparent 65%)` }} />
                <div className="absolute top-0 right-0 w-16 h-16 opacity-10 pointer-events-none"
                    style={{ background: `linear-gradient(135deg, ${skill.color} 0%, transparent 70%)` }} />

                {/* Real icon */}
                <motion.div className="mb-3"
                    animate={{ scale: hovered ? 1.15 : 1, rotate: hovered ? 5 : 0 }}
                    transition={{ duration: 0.25 }}>
                    <TechIcon name={skill.name} iconUrl={skill.iconUrl} color={skill.color} />
                </motion.div>

                <h4 className="font-bold text-sm text-foreground mb-3 transition-colors duration-200"
                    style={{ color: hovered ? skill.color : undefined }}>
                    {skill.name}
                </h4>

                <div>
                    <div className="flex justify-between items-center text-xs mb-1.5">
                        <span className="text-foreground/40 flex items-center gap-1"><Zap size={10} /> Proficiency</span>
                        <motion.span style={{ color: skill.color }} animate={{ opacity: hovered ? 1 : 0.55 }}>{skill.level}%</motion.span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                        <motion.div className="h-full rounded-full relative overflow-hidden"
                            style={{ background: `linear-gradient(90deg, ${skill.color}70, ${skill.color})` }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.1, delay: 0.3 + index * 0.05, ease: "easeOut" }}>
                            <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                                animate={{ x: ["-100%", "100%"] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: index * 0.15 }} />
                        </motion.div>
                    </div>
                    <motion.div className="h-1.5 blur-sm rounded-full mt-0.5 opacity-35"
                        style={{ backgroundColor: skill.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, delay: 0.3 + index * 0.05 }} />
                </div>

                <motion.p className="text-xs mt-2 flex items-center gap-1"
                    style={{ color: skill.color }}
                    animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.2 }}>
                    <TrendingUp size={10} />
                    {skill.level >= 90 ? "Expert" : skill.level >= 75 ? "Advanced" : skill.level >= 60 ? "Proficient" : "Learning"}
                </motion.p>
            </motion.div>
        </motion.div>
    );
}

export default function SkillsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [activeIdx, setActiveIdx] = useState(0);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const active = skillCategories[activeIdx];

    return (
        <section id="skills" ref={ref} className="section relative py-32 overflow-hidden">
            <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
                <div className="gradient-orb gradient-orb-blue w-[500px] h-[500px] -top-32 -right-32 absolute opacity-20" />
                <div className="gradient-orb gradient-orb-purple w-[400px] h-[400px] bottom-0 -left-32 absolute opacity-15" />
                <div className="gradient-orb gradient-orb-green w-[300px] h-[300px] top-1/2 left-1/2 absolute opacity-10" />
            </motion.div>
            <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: "radial-gradient(circle at 2px 2px, rgba(0,229,255,0.07) 1px, transparent 0)",
                backgroundSize: "40px 40px",
            }} />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }} className="text-center mb-10">
                    <motion.span className="text-neon-green text-sm font-medium uppercase tracking-widest mb-4 block"
                        animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
                        Technical Arsenal
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
                        Skills &{" "}
                        <span className="relative">
                            <span className="text-gradient">Expertise</span>
                            <motion.span className="absolute -bottom-2 left-0 right-0 h-1 rounded-full"
                                style={{ background: "linear-gradient(90deg, #00E5FF, #8B5CF6, #00FF9C)" }}
                                initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}}
                                transition={{ delay: 0.5, duration: 0.8 }} />
                        </span>
                    </h2>
                    <p className="text-foreground/50 max-w-xl mx-auto mt-4">
                        Constantly learning, always building. Here&apos;s my technical toolkit.
                    </p>
                </motion.div>

                <SkillMarquee />

                {/* Category tabs */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }} className="flex flex-wrap justify-center gap-3 mb-12">
                    {skillCategories.map((cat, i) => {
                        const isActive = i === activeIdx;
                        const Icon = cat.icon;
                        return (
                            <motion.button key={cat.category} onClick={() => setActiveIdx(i)}
                                className="relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium overflow-hidden"
                                style={{
                                    background: isActive ? `${cat.color}20` : "rgba(255,255,255,0.03)",
                                    border: `1px solid ${isActive ? cat.color : "rgba(255,255,255,0.08)"}`,
                                    color: isActive ? cat.color : "rgba(237,237,237,0.55)",
                                    boxShadow: isActive ? `0 0 20px ${cat.color}28` : "none",
                                }}
                                whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                                {isActive && (
                                    <motion.div layoutId="skillTab" className="absolute inset-0 rounded-xl opacity-15"
                                        style={{ background: cat.color }}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                                )}
                                <Icon size={14} style={{ position: "relative", zIndex: 1 }} />
                                <span style={{ position: "relative", zIndex: 1 }}>{cat.category}</span>
                            </motion.button>
                        );
                    })}
                </motion.div>

                {/* Skills grid */}
                <motion.div key={active.category} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {active.skills.map((skill, i) => (
                        <SkillCard key={skill.name} skill={skill} index={i} />
                    ))}
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 }} className="text-center mt-16">
                    <p className="text-foreground/40 text-sm mb-2">Want to see these skills in action?</p>
                    <motion.a href="#projects"
                        className="inline-flex items-center gap-2 text-neon-blue hover:text-neon-green transition-colors font-medium"
                        whileHover={{ x: 6 }}>
                        Check out my projects
                        <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}
