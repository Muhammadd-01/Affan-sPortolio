"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { projects } from "@/data/portfolio";
import { ExternalLink, Github, X, Eye, Code, ChevronRight, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface Project {
    id: number;
    title: string;
    description: string;
    longDescription: string;
    image: string;
    tech: string[];
    liveUrl: string;
    githubUrl: string;
    featured: boolean;
    category: string;
}

export default function ProjectsSection() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [filter, setFilter] = useState("All");
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];
    const filteredProjects = filter === "All"
        ? projects
        : projects.filter(p => p.category === filter);

    return (
        <section
            id="projects"
            ref={ref}
            className="section relative py-32 overflow-hidden"
        >
            {/* Animated Background */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="gradient-orb gradient-orb-purple w-[600px] h-[600px] -top-20 -left-48"
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="gradient-orb gradient-orb-blue w-[500px] h-[500px] bottom-0 right-0"
                    animate={{
                        x: [0, -30, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
            </div>

            {/* Hex pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-5" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 17.32v25.36L30 60 0 42.68V17.32z' fill='none' stroke='%2300E5FF' stroke-width='0.5'/%3E%3C/svg%3E")`,
                backgroundSize: "60px 60px",
            }} />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        className="inline-flex items-center gap-2 text-neon-purple text-sm font-medium uppercase tracking-widest mb-4"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Layers className="w-4 h-4" />
                        Featured Work
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
                        My{" "}
                        <span className="relative inline-block">
                            <span className="text-gradient">Projects</span>
                            <motion.svg
                                className="absolute -bottom-2 left-0 w-full"
                                viewBox="0 0 200 10"
                                initial={{ pathLength: 0 }}
                                animate={isInView ? { pathLength: 1 } : {}}
                                transition={{ delay: 0.5, duration: 1 }}
                            >
                                <motion.path
                                    d="M0 5 Q50 0 100 5 T200 5"
                                    fill="none"
                                    stroke="url(#gradient)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#8B5CF6" />
                                        <stop offset="50%" stopColor="#00E5FF" />
                                        <stop offset="100%" stopColor="#00FF9C" />
                                    </linearGradient>
                                </defs>
                            </motion.svg>
                        </span>
                    </h2>
                    <p className="text-foreground/60 max-w-xl mx-auto mt-4">
                        A showcase of my best work. Each project represents a unique challenge solved with creativity and code.
                    </p>
                </motion.div>

                {/* Filter Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 px-2"
                >
                    {categories.map((category, index) => (
                        <motion.button
                            key={category}
                            onClick={() => setFilter(category)}
                            className={cn(
                                "relative px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium transition-all text-xs sm:text-sm overflow-hidden",
                                filter === category
                                    ? "text-background"
                                    : "glass hover:bg-glass-white text-foreground/70"
                            )}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            {filter === category && (
                                <motion.div
                                    layoutId="activeProjectTab"
                                    className="absolute inset-0 bg-gradient-to-r from-neon-purple to-neon-blue"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">{category}</span>
                        </motion.button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    layout
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <ProjectCard3D
                                key={project.id}
                                project={project}
                                index={index}
                                isInView={isInView}
                                onClick={() => setSelectedProject(project)}
                                isHovered={hoveredId === project.id}
                                onHover={() => setHoveredId(project.id)}
                                onLeave={() => setHoveredId(null)}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Project Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}

function ProjectCard3D({
    project,
    index,
    isInView,
    onClick,
    isHovered,
    onHover,
    onLeave,
}: {
    project: Project;
    index: number;
    isInView: boolean;
    onClick: () => void;
    isHovered: boolean;
    onHover: () => void;
    onLeave: () => void;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
    const translateZ = useTransform(mouseXSpring, [-0.5, 0.5], ["-10px", "10px"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const xPct = (e.clientX - rect.left) / rect.width - 0.5;
        const yPct = (e.clientY - rect.top) / rect.height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        onLeave();
    };

    // Generate gradient based on project
    const gradientColors = [
        "from-neon-blue/30 via-neon-purple/20 to-neon-green/30",
        "from-neon-purple/30 via-neon-blue/20 to-neon-green/30",
        "from-neon-green/30 via-neon-blue/20 to-neon-purple/30",
    ];

    return (
        <motion.div
            ref={cardRef}
            layout
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={onHover}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="group cursor-pointer perspective-1000"
        >
            <motion.div
                className="relative glass rounded-2xl overflow-hidden h-full"
                style={{
                    boxShadow: isHovered
                        ? "0 25px 50px -12px rgba(139, 92, 246, 0.4), 0 0 30px rgba(0, 229, 255, 0.2)"
                        : "none",
                }}
            >
                {/* Image/Gradient Area */}
                <div className={cn(
                    "relative h-56 bg-gradient-to-br overflow-hidden",
                    gradientColors[index % 3]
                )}>
                    {/* Animated pattern */}
                    <motion.div
                        className="absolute inset-0 opacity-30"
                        animate={{
                            backgroundPosition: ["0% 0%", "100% 100%"],
                        }}
                        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
                        style={{
                            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(0, 229, 255, 0.3) 0%, transparent 50%),
                               radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)`,
                            backgroundSize: "200% 200%",
                        }}
                    />

                    {/* Large letter */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ translateZ: "30px" }}
                    >
                        <span className="text-[120px] font-heading font-bold text-white/5 select-none">
                            {project.title.charAt(0)}
                        </span>
                    </motion.div>

                    {/* Floating preview icon */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ translateZ: "50px" }}
                    >
                        <motion.div
                            className="p-4 rounded-full glass"
                            whileHover={{ scale: 1.1 }}
                            animate={isHovered ? { y: [0, -5, 0] } : {}}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            <Eye className="w-8 h-8 text-white" />
                        </motion.div>
                    </motion.div>

                    {/* Featured Badge */}
                    {project.featured && (
                        <motion.div
                            className="absolute top-4 right-4 px-3 py-1.5 rounded-full glass border border-neon-green/50 backdrop-blur-md"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                            style={{ translateZ: "20px" }}
                        >
                            <span className="text-neon-green text-xs font-medium flex items-center gap-1">
                                <motion.span
                                    className="w-1.5 h-1.5 rounded-full bg-neon-green"
                                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                                Featured
                            </span>
                        </motion.div>
                    )}

                    {/* Category tag */}
                    <div
                        className="absolute bottom-4 left-4 px-3 py-1 rounded-full glass text-xs text-foreground/70"
                    >
                        {project.category}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6" style={{ transform: "translateZ(25px)" }}>
                    <motion.h3
                        className="text-xl font-heading font-bold mb-2 group-hover:text-neon-blue transition-colors flex items-center gap-2"
                    >
                        {project.title}
                        <motion.span
                            animate={isHovered ? { x: [0, 5, 0] } : {}}
                            transition={{ duration: 0.5, repeat: Infinity }}
                        >
                            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.span>
                    </motion.h3>

                    <p className="text-foreground/60 text-sm mb-4 line-clamp-2">
                        {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 4).map((tech, i) => (
                            <motion.span
                                key={tech}
                                data-tech={tech}
                                className="px-2.5 py-1 text-xs rounded-lg bg-glass-white text-foreground/70 border border-glass-border"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                whileHover={{
                                    scale: 1.1,
                                    backgroundColor: "rgba(0, 229, 255, 0.1)",
                                    borderColor: "rgba(0, 229, 255, 0.3)",
                                }}
                            >
                                {tech}
                            </motion.span>
                        ))}
                        {project.tech.length > 4 && (
                            <span className="px-2.5 py-1 text-xs rounded-lg glass text-foreground/50">
                                +{project.tech.length - 4} more
                            </span>
                        )}
                    </div>
                </div>

                {/* Hover glow effect */}
                <motion.div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, transparent 50%, rgba(0, 229, 255, 0.1) 100%)",
                    }}
                />
            </motion.div>
        </motion.div>
    );
}

function ProjectModal({
    project,
    onClose,
}: {
    project: Project;
    onClose: () => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
            onClick={onClose}
        >
            {/* Backdrop */}
            <motion.div
                className="absolute inset-0 bg-background/95 backdrop-blur-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />

            {/* Modal */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative glass-strong rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
                {/* Header Image */}
                <div className="relative h-72 bg-gradient-to-br from-neon-blue/30 via-neon-purple/30 to-neon-green/30 overflow-hidden">
                    {/* Animated background */}
                    <motion.div
                        className="absolute inset-0"
                        animate={{
                            background: [
                                "radial-gradient(circle at 20% 50%, rgba(0, 229, 255, 0.4) 0%, transparent 50%)",
                                "radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.4) 0%, transparent 50%)",
                                "radial-gradient(circle at 50% 80%, rgba(0, 255, 156, 0.4) 0%, transparent 50%)",
                            ],
                        }}
                        transition={{ duration: 5, repeat: Infinity }}
                    />

                    {/* Large letter */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.span
                            className="text-[200px] font-heading font-bold text-white/10"
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 10, repeat: Infinity }}
                        >
                            {project.title.charAt(0)}
                        </motion.span>
                    </div>

                    {/* Close Button */}
                    <motion.button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-3 rounded-full glass hover:bg-glass-white transition-colors z-10"
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <X className="w-6 h-6" />
                    </motion.button>

                    {/* Featured badge */}
                    {project.featured && (
                        <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-neon-green/20 border border-neon-green/50 text-neon-green text-sm font-medium">
                            ✨ Featured Project
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-8 overflow-y-auto max-h-[calc(90vh-18rem)]">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                        <div>
                            <motion.span
                                className="text-neon-purple text-sm font-medium"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                {project.category}
                            </motion.span>
                            <motion.h3
                                className="text-3xl md:text-4xl font-heading font-bold mt-1"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                {project.title}
                            </motion.h3>
                        </div>
                    </div>

                    <motion.p
                        className="text-foreground/70 leading-relaxed mb-8 text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {project.longDescription}
                    </motion.p>

                    {/* Tech Stack */}
                    <motion.div
                        className="mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h4 className="text-sm font-medium text-foreground/50 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Code className="w-4 h-4" />
                            Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-3">
                            {project.tech.map((tech, i) => (
                                <motion.span
                                    key={tech}
                                    data-tech={tech}
                                    className="px-4 py-2 text-sm rounded-xl glass hover:bg-glass-white transition-all border border-glass-border"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.4 + i * 0.05 }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold"
                            whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0, 229, 255, 0.3)" }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <ExternalLink className="w-5 h-5" />
                            View Live Demo
                        </motion.a>
                        <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-foreground/20 hover:border-neon-purple font-semibold transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Github className="w-5 h-5" />
                            View Source Code
                        </motion.a>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
}
