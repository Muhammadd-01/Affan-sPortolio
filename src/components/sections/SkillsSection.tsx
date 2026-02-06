"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { skills } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { Zap, TrendingUp } from "lucide-react";

// 3D Rotating skill card
function SkillCard3D({
    skill,
    index,
    isInView
}: {
    skill: { name: string; level: number; color: string };
    index: number;
    isInView: boolean;
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x, y });
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50, rotateX: -15 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ delay: index * 0.08, duration: 0.6, ease: "easeOut" }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                transformStyle: "preserve-3d",
                transform: isHovered
                    ? `perspective(1000px) rotateY(${mousePosition.x * 20}deg) rotateX(${-mousePosition.y * 20}deg) scale(1.05)`
                    : "perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)",
                transition: "transform 0.2s ease-out",
            }}
            className="group cursor-pointer"
            data-tech={skill.name}
        >
            <div
                className="relative glass rounded-2xl p-6 h-full overflow-hidden"
                style={{
                    boxShadow: isHovered ? `0 20px 40px ${skill.color}30` : "none",
                }}
            >
                {/* Animated background gradient */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: `radial-gradient(circle at ${(mousePosition.x + 0.5) * 100}% ${(mousePosition.y + 0.5) * 100}%, ${skill.color}20 0%, transparent 50%)`,
                    }}
                />

                {/* Floating orb */}
                <motion.div
                    className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-20"
                    style={{ backgroundColor: skill.color }}
                    animate={{
                        scale: isHovered ? [1, 1.2, 1] : 1,
                        rotate: [0, 180, 360],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                {/* Content */}
                <div className="relative z-10">
                    {/* Skill Header */}
                    <div className="flex items-center justify-between mb-6">
                        <motion.h4
                            className="text-xl font-heading font-bold"
                            style={{ color: isHovered ? skill.color : undefined }}
                            animate={{ x: isHovered ? 5 : 0 }}
                        >
                            {skill.name}
                        </motion.h4>

                        <motion.div
                            className="flex items-center gap-1 text-sm"
                            style={{ color: skill.color }}
                            animate={{ scale: isHovered ? 1.1 : 1 }}
                        >
                            <TrendingUp className="w-4 h-4" />
                            <span className="font-mono font-bold">{skill.level}%</span>
                        </motion.div>
                    </div>

                    {/* Progress Bar with glow */}
                    <div className="relative">
                        <div className="h-3 bg-background/50 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={isInView ? { width: `${skill.level}%` } : {}}
                                transition={{ delay: index * 0.1 + 0.5, duration: 1, ease: "easeOut" }}
                                className="h-full rounded-full relative"
                                style={{
                                    background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})`,
                                }}
                            >
                                {/* Shimmer effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                    animate={{ x: ["-100%", "100%"] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: index * 0.2 }}
                                />
                            </motion.div>
                        </div>

                        {/* Glow under progress */}
                        <motion.div
                            className="absolute -bottom-2 left-0 h-4 blur-lg opacity-50 rounded-full"
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${skill.level}%` } : {}}
                            transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                            style={{ backgroundColor: skill.color }}
                        />
                    </div>

                    {/* Experience indicator */}
                    <motion.div
                        className="mt-4 flex items-center gap-2 text-xs text-foreground/50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                    >
                        <Zap className="w-3 h-3" style={{ color: skill.color }} />
                        <span>
                            {skill.level >= 90 ? "Expert" : skill.level >= 75 ? "Advanced" : skill.level >= 60 ? "Proficient" : "Learning"}
                        </span>
                    </motion.div>
                </div>

                {/* Corner accent */}
                <div
                    className="absolute bottom-0 right-0 w-16 h-16 opacity-10"
                    style={{
                        background: `linear-gradient(135deg, transparent 50%, ${skill.color} 50%)`,
                    }}
                />
            </div>
        </motion.div>
    );
}

// Animated category icon
function CategoryIcon({ icon: Icon, color, isActive }: { icon: React.ElementType; color: string; isActive: boolean }) {
    return (
        <motion.div
            className="relative"
            animate={{ rotate: isActive ? 360 : 0 }}
            transition={{ duration: 0.5 }}
        >
            <Icon className="w-5 h-5" />
            {isActive && (
                <motion.div
                    className="absolute inset-0"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    style={{ backgroundColor: color, borderRadius: "50%" }}
                />
            )}
        </motion.div>
    );
}

export default function SkillsSection() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [activeCategory, setActiveCategory] = useState(skills[0].category);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    const activeSkills = skills.find(s => s.category === activeCategory)?.items || [];

    return (
        <section
            id="skills"
            ref={ref}
            className="section relative py-32 overflow-hidden"
        >
            {/* Animated Background */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ y: backgroundY }}
            >
                <div className="gradient-orb gradient-orb-blue w-[600px] h-[600px] top-0 right-0 absolute opacity-20" />
                <div className="gradient-orb gradient-orb-green w-[400px] h-[400px] bottom-20 -left-32 absolute opacity-20" />
            </motion.div>

            {/* Grid pattern */}
            <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.1) 1px, transparent 0)`,
                backgroundSize: "40px 40px",
            }} />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <motion.span
                        className="text-neon-green text-sm font-medium uppercase tracking-widest mb-4 block"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        Technical Arsenal
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
                        Skills &{" "}
                        <span className="relative">
                            <span className="text-gradient">Expertise</span>
                            <motion.span
                                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple rounded-full"
                                initial={{ scaleX: 0 }}
                                animate={isInView ? { scaleX: 1 } : {}}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            />
                        </span>
                    </h2>
                    <p className="text-foreground/60 max-w-xl mx-auto mt-4">
                        Constantly learning, always improving. Here&apos;s my technical toolkit.
                    </p>
                </motion.div>

                {/* Category Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {skills.map((category, index) => {
                        const Icon = category.icon;
                        const isActive = activeCategory === category.category;
                        return (
                            <motion.button
                                key={category.category}
                                onClick={() => setActiveCategory(category.category)}
                                className={cn(
                                    "relative flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all overflow-hidden",
                                    isActive
                                        ? "text-background"
                                        : "glass hover:bg-glass-white text-foreground/70"
                                )}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeSkillTab"
                                        className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center gap-2">
                                    <CategoryIcon icon={Icon} color="#00E5FF" isActive={isActive} />
                                    {category.category}
                                </span>
                            </motion.button>
                        );
                    })}
                </motion.div>

                {/* Skills Grid */}
                <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    {activeSkills.map((skill, index) => (
                        <SkillCard3D
                            key={skill.name}
                            skill={skill}
                            index={index}
                            isInView={isInView}
                        />
                    ))}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="text-center mt-16"
                >
                    <p className="text-foreground/50 text-sm">
                        Want to see these skills in action?
                    </p>
                    <motion.a
                        href="#projects"
                        className="inline-flex items-center gap-2 text-neon-blue hover:text-neon-purple transition-colors mt-2 font-medium"
                        whileHover={{ x: 5 }}
                    >
                        Check out my projects
                        <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            →
                        </motion.span>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}
