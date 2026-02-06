"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, Download, Eye, Award, Briefcase, GraduationCap, Code2 } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

// Resume highlight card
function HighlightCard({
    icon: Icon,
    title,
    items,
    color,
    delay
}: {
    icon: React.ElementType;
    title: string;
    items: string[];
    color: string;
    delay: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            whileHover={{ y: -5 }}
            className="glass rounded-xl p-6 relative overflow-hidden group"
        >
            <motion.div
                className={`absolute inset-0 ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                style={{ filter: "blur(40px)" }}
            />
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${color}`}>
                        <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-heading font-semibold text-lg">{title}</h4>
                </div>
                <ul className="space-y-2">
                    {items.map((item, i) => (
                        <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: delay + 0.1 + i * 0.05 }}
                            className="text-foreground/70 text-sm flex items-start gap-2"
                        >
                            <span className="text-neon-blue mt-1">▹</span>
                            {item}
                        </motion.li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
}

export default function ResumeSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const highlights = [
        {
            icon: Briefcase,
            title: "Experience",
            items: [
                "CEO at NexoVate Digital",
                "Full-Stack Developer",
                "4+ Years in Tech Industry",
                "Led 50+ Successful Projects"
            ],
            color: "bg-neon-blue/20 text-neon-blue"
        },
        {
            icon: Code2,
            title: "Technical Skills",
            items: [
                "React, Next.js, TypeScript",
                "Node.js, Python, Flutter",
                "MongoDB, PostgreSQL, Firebase",
                "AWS, Docker, CI/CD"
            ],
            color: "bg-neon-purple/20 text-neon-purple"
        },
        {
            icon: GraduationCap,
            title: "Education",
            items: [
                "Computer Science Degree",
                "Multiple Certifications",
                "Continuous Learning",
                "Tech Community Contributor"
            ],
            color: "bg-neon-green/20 text-neon-green"
        }
    ];

    return (
        <section
            id="resume"
            ref={ref}
            className="section relative py-24 md:py-32 overflow-hidden"
        >
            {/* Background */}
            <div className="gradient-orb gradient-orb-green w-80 h-80 top-20 -right-40 absolute opacity-20" />
            <div className="gradient-orb gradient-orb-purple w-64 h-64 bottom-0 left-0 absolute opacity-20" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12 md:mb-16"
                    >
                        <span className="text-neon-green text-sm font-medium uppercase tracking-widest mb-4 block">
                            My Credentials
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
                            View My{" "}
                            <span className="text-gradient">Resume</span>
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple mx-auto rounded-full" />
                    </motion.div>

                    {/* Highlights Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {highlights.map((highlight, index) => (
                            <HighlightCard
                                key={highlight.title}
                                {...highlight}
                                delay={index * 0.1}
                            />
                        ))}
                    </div>

                    {/* Resume Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-center neon-border"
                    >
                        {/* Animated Document Icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={isInView ? { scale: 1 } : {}}
                            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                            className="relative mx-auto w-24 h-32 sm:w-32 sm:h-40 mb-6 sm:mb-8"
                        >
                            {/* Document Shape */}
                            <div className="absolute inset-0 glass rounded-lg border-2 border-neon-blue/50 overflow-hidden">
                                {/* Decorative Lines */}
                                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 space-y-1.5 sm:space-y-2">
                                    <div className="h-1.5 sm:h-2 bg-neon-blue/30 rounded w-3/4" />
                                    <div className="h-1.5 sm:h-2 bg-neon-purple/30 rounded w-1/2" />
                                    <div className="h-1.5 sm:h-2 bg-neon-green/30 rounded w-2/3" />
                                </div>
                                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 space-y-1 sm:space-y-2">
                                    <div className="h-1 sm:h-1.5 bg-foreground/10 rounded" />
                                    <div className="h-1 sm:h-1.5 bg-foreground/10 rounded w-4/5" />
                                    <div className="h-1 sm:h-1.5 bg-foreground/10 rounded w-3/5" />
                                </div>
                            </div>

                            {/* Corner Fold */}
                            <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8">
                                <div className="absolute inset-0 bg-background transform rotate-45 translate-x-3 sm:translate-x-4 -translate-y-3 sm:-translate-y-4" />
                                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue to-neon-purple opacity-50 transform rotate-45 translate-x-3 sm:translate-x-4 -translate-y-3 sm:-translate-y-4" />
                            </div>

                            {/* Floating Animation */}
                            <motion.div
                                className="absolute -inset-4 rounded-xl"
                                animate={{
                                    boxShadow: [
                                        "0 0 20px rgba(0, 229, 255, 0.2)",
                                        "0 0 40px rgba(139, 92, 246, 0.3)",
                                        "0 0 20px rgba(0, 255, 156, 0.2)",
                                    ],
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </motion.div>

                        <h3 className="text-xl sm:text-2xl font-heading font-bold mb-2 sm:mb-3">
                            {personalInfo.name}&apos;s Resume
                        </h3>
                        <p className="text-foreground/60 mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base">
                            A comprehensive overview of my skills, experience, and achievements.
                            Download or view online to learn more about my professional journey.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                            <motion.a
                                href={personalInfo.resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary group flex items-center gap-2 w-full sm:w-auto justify-center text-sm sm:text-base"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                                    View Resume
                                </span>
                            </motion.a>

                            <motion.a
                                href={personalInfo.resumeUrl}
                                download
                                className="btn-secondary flex items-center gap-2 w-full sm:w-auto justify-center text-sm sm:text-base"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                                Download PDF
                            </motion.a>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
