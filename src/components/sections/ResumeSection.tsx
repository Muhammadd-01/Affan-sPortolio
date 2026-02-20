"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { GraduationCap, Globe, Download, Eye, Calendar, MapPin, Sparkles } from "lucide-react";
import MagneticButton from "./MagneticButton";

const education = [
    {
        year: "2023 – Present",
        degree: "ADSE Diploma",
        school: "Aptech",
        description: "Advanced Diploma in Software Engineering — Full-stack development, databases, and software architecture.",
        color: "#00E5FF",
    },
    {
        year: "2021 – 2023",
        degree: "HSC (Intermediate)",
        school: "Superior Government College",
        description: "Pre-Engineering with focus on Mathematics, Physics, and Computer Science.",
        color: "#8B5CF6",
    },
    {
        year: "2020 – 2021",
        degree: "SSC (Matric)",
        school: "MJM School",
        description: "Completed matriculation with distinction in Science subjects.",
        color: "#00FF9C",
    },
];

const languages = [
    { name: "Urdu", level: "Native", percentage: 100, color: "#00E5FF" },
    { name: "English", level: "Fluent", percentage: 90, color: "#8B5CF6" },
];

export default function ResumeSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    const resumeUrl = "/AffanResume.pdf";

    return (
        <section id="resume" ref={ref} className="section relative py-32 overflow-hidden">
            {/* Bg orbs */}
            <motion.div className="absolute inset-0 pointer-events-none" style={{ y: backgroundY }}>
                <div className="gradient-orb gradient-orb-green w-[400px] h-[400px] top-0 right-0 absolute opacity-15" />
                <div className="gradient-orb gradient-orb-blue w-[300px] h-[300px] bottom-0 left-0 absolute opacity-15" />
            </motion.div>
            <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: "radial-gradient(circle at 2px 2px, rgba(0,255,156,0.07) 1px, transparent 0)",
                backgroundSize: "40px 40px",
            }} />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }} className="text-center mb-20">
                    <motion.span className="text-neon-green text-sm font-medium uppercase tracking-widest mb-4 block"
                        animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
                        My Credentials
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
                        Education &{" "}
                        <span className="relative">
                            <span className="text-gradient">Resume</span>
                            <motion.span className="absolute -bottom-2 left-0 right-0 h-1 rounded-full"
                                style={{ background: "linear-gradient(90deg, #00E5FF, #8B5CF6, #00FF9C)" }}
                                initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}}
                                transition={{ delay: 0.5, duration: 0.8 }} />
                        </span>
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Education Timeline */}
                    <div>
                        <motion.h3 initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.2 }}
                            className="text-xl font-heading font-bold mb-10 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                                style={{ background: "#00E5FF20", border: "1px solid #00E5FF40" }}>
                                <GraduationCap className="w-4 h-4 text-neon-blue" />
                            </div>
                            <span className="text-gradient">Education</span>
                        </motion.h3>

                        <div className="relative pl-6">
                            <motion.div className="absolute left-0 top-3 w-0.5 rounded-full"
                                style={{ background: "linear-gradient(to bottom, #00E5FF, #8B5CF6, #00FF9C)" }}
                                initial={{ height: 0 }}
                                animate={isInView ? { height: "calc(100% - 24px)" } : {}}
                                transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }} />

                            {education.map((edu, i) => (
                                <motion.div key={i}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.3 + i * 0.15 }}
                                    className="relative pb-10 last:pb-0">
                                    <motion.div className="absolute -left-6 top-3 w-4 h-4 rounded-full border-2 z-10"
                                        style={{ backgroundColor: edu.color, borderColor: "#0A0A0A", boxShadow: `0 0 12px ${edu.color}` }}
                                        initial={{ scale: 0 }}
                                        animate={isInView ? { scale: 1 } : {}}
                                        transition={{ delay: 0.4 + i * 0.15, type: "spring", stiffness: 200 }} />
                                    <motion.div className="absolute -left-6 top-3 w-4 h-4 rounded-full"
                                        style={{ backgroundColor: edu.color, opacity: 0.3 }}
                                        animate={{ scale: [1, 2.5], opacity: [0.3, 0] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }} />

                                    <motion.div className="glass rounded-2xl p-5 border border-white/5 overflow-hidden relative"
                                        whileHover={{ borderColor: `${edu.color}50`, boxShadow: `0 0 30px ${edu.color}20`, x: 6 }}
                                        transition={{ duration: 0.3 }}>
                                        <div className="absolute top-0 right-0 w-20 h-20 opacity-10 pointer-events-none"
                                            style={{ background: `radial-gradient(circle, ${edu.color} 0%, transparent 70%)` }} />
                                        <div className="flex items-center gap-2 text-xs mb-2" style={{ color: edu.color }}>
                                            <Calendar className="w-3.5 h-3.5" /> {edu.year}
                                        </div>
                                        <h4 className="font-bold text-foreground text-lg mb-1">{edu.degree}</h4>
                                        <div className="flex items-center gap-1.5 text-foreground/50 text-sm mb-3">
                                            <MapPin className="w-3.5 h-3.5" /> {edu.school}
                                        </div>
                                        <p className="text-foreground/50 text-sm">{edu.description}</p>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Languages + Download */}
                    <div className="space-y-8">
                        {/* Languages */}
                        <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.3 }}>
                            <h3 className="text-xl font-heading font-bold mb-8 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                                    style={{ background: "#8B5CF620", border: "1px solid #8B5CF640" }}>
                                    <Globe className="w-4 h-4 text-neon-purple" />
                                </div>
                                <span className="text-gradient">Languages</span>
                            </h3>
                            <div className="space-y-5">
                                {languages.map((lang, i) => (
                                    <motion.div key={i}
                                        initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: 0.4 + i * 0.1 }}
                                        className="glass rounded-2xl p-5 border border-white/5"
                                        whileHover={{ borderColor: `${lang.color}50`, boxShadow: `0 0 25px ${lang.color}15` }}>
                                        <div className="flex justify-between items-center mb-3">
                                            <h4 className="font-bold text-foreground">{lang.name}</h4>
                                            <span className="text-sm font-medium px-3 py-1 rounded-full"
                                                style={{ background: `${lang.color}20`, color: lang.color }}>
                                                {lang.level}
                                            </span>
                                        </div>
                                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div className="h-full rounded-full relative"
                                                style={{ background: `linear-gradient(90deg, ${lang.color}80, ${lang.color})` }}
                                                initial={{ width: 0 }}
                                                animate={isInView ? { width: `${lang.percentage}%` } : {}}
                                                transition={{ duration: 1.2, delay: 0.6 + i * 0.1, ease: "easeOut" }}>
                                                <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                                    animate={{ x: ["-100%", "100%"] }}
                                                    transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.3 }} />
                                            </motion.div>
                                        </div>
                                        <motion.div className="h-2 blur-md rounded-full mt-0.5 opacity-40"
                                            style={{ backgroundColor: lang.color }}
                                            initial={{ width: 0 }}
                                            animate={isInView ? { width: `${lang.percentage}%` } : {}}
                                            transition={{ duration: 1.2, delay: 0.6 + i * 0.1 }} />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Resume Card */}
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.6 }}
                            className="relative glass rounded-3xl p-8 border neon-border text-center overflow-hidden">
                            <motion.div className="absolute inset-0 pointer-events-none"
                                animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, repeat: Infinity }}
                                style={{ background: "radial-gradient(circle at 50% 50%, rgba(0,229,255,0.08) 0%, transparent 70%)" }} />

                            {/* Doc icon */}
                            <motion.div className="relative mx-auto w-24 h-32 mb-6"
                                initial={{ scale: 0 }}
                                animate={isInView ? { scale: 1 } : {}}
                                transition={{ delay: 0.7, type: "spring", stiffness: 200 }}>
                                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-full h-full glass rounded-xl border-2 border-neon-blue/40 overflow-hidden relative">
                                    <div className="absolute top-3 left-3 right-3 space-y-2">
                                        <div className="h-2 bg-neon-blue/30 rounded w-3/4" />
                                        <div className="h-2 bg-neon-purple/30 rounded w-1/2" />
                                        <div className="h-2 bg-neon-green/30 rounded w-2/3" />
                                    </div>
                                    <div className="absolute bottom-3 left-3 right-3 space-y-1.5">
                                        <div className="h-1.5 bg-foreground/10 rounded" />
                                        <div className="h-1.5 bg-foreground/10 rounded w-4/5" />
                                        <div className="h-1.5 bg-foreground/10 rounded w-3/5" />
                                    </div>
                                </motion.div>
                                <motion.div className="absolute -inset-2 rounded-xl blur-xl opacity-40"
                                    animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, repeat: Infinity }}
                                    style={{ background: "linear-gradient(135deg, #00E5FF, #8B5CF6)" }} />
                            </motion.div>

                            <motion.div className="inline-flex items-center gap-2 mb-3"
                                animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }}>
                                <Sparkles className="w-4 h-4 text-neon-blue" />
                                <span className="text-neon-blue text-sm font-medium uppercase tracking-widest">Resume</span>
                                <Sparkles className="w-4 h-4 text-neon-blue" />
                            </motion.div>
                            <h3 className="text-2xl font-heading font-bold mb-2">Muhammad Affan&apos;s Resume</h3>
                            <p className="text-foreground/50 text-sm mb-8 max-w-xs mx-auto">
                                A comprehensive overview of my skills, experience, and achievements.
                            </p>

                            {/* TWO BUTTONS: View + Download */}
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                {/* View Resume */}
                                <MagneticButton intensity={0.3}>
                                    <motion.a
                                        href={resumeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative overflow-hidden px-6 py-3 rounded-xl font-semibold flex items-center gap-2 justify-center border"
                                        style={{ background: "rgba(0,229,255,0.1)", borderColor: "#00E5FF60", color: "#00E5FF" }}
                                        whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(0,229,255,0.35)" }}
                                        whileTap={{ scale: 0.96 }}
                                    >
                                        <Eye className="w-4 h-4" />
                                        View Resume
                                    </motion.a>
                                </MagneticButton>

                                {/* Download Resume */}
                                <MagneticButton intensity={0.3}>
                                    <motion.a
                                        href={resumeUrl}
                                        download="Muhammad_Affan_Resume.pdf"
                                        className="group relative overflow-hidden px-6 py-3 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple font-semibold text-background flex items-center gap-2 justify-center"
                                        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,229,255,0.4)" }}
                                        whileTap={{ scale: 0.96 }}
                                    >
                                        <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                                        Download PDF
                                        {/* Shimmer sweep on hover */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                            initial={{ x: "-100%" }}
                                            whileHover={{ x: "100%" }}
                                            transition={{ duration: 0.5 }}
                                        />
                                    </motion.a>
                                </MagneticButton>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
