"use client";

import { useState, useRef, forwardRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { HiExternalLink, HiX } from "react-icons/hi";
import { Star, ArrowRight, Code, Smartphone, Globe } from "lucide-react";
import { projects as portfolioProjects, techColorMap } from "@/data/portfolio";
import TiltCard from "@/components/ui/TiltCard";

const projects = portfolioProjects.map(p => ({
    ...p,
    technologies: p.tech,
    live: p.liveUrl,
    github: p.githubUrl,
    color: techColorMap[p.tech[0]] || "#00E5FF"
}));

// Placeholder component for missing images
const ProjectPlaceholder = ({ title, category }: { title: string; category: string }) => {
    const getIcon = () => {
        switch (category) {
            case "Mobile App":
                return <Smartphone className="w-12 h-12" />;
            case "Web Application":
                return <Code className="w-12 h-12" />;
            default:
                return <Globe className="w-12 h-12" />;
        }
    };

    return (
        <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 flex flex-col items-center justify-center">
            <div className="text-cyan-400 mb-3">{getIcon()}</div>
            <span className="text-white/60 text-sm font-medium text-center px-4">{title}</span>
        </div>
    );
};

// ImageCarousel component
const ImageCarousel = ({ images, isHovered, title, category, isMobile, showDots }: { images: string[], isHovered?: boolean, title: string, category: string, isMobile?: boolean, showDots?: boolean }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        if (!images || images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images]);

    const currentImage = images && images.length > 0 ? images[currentIndex] : "";

    if (imageError || !currentImage) {
        return <ProjectPlaceholder title={title} category={category} />;
    }

    return (
        <>
            <AnimatePresence mode="wait">
                <motion.img
                    key={currentIndex}
                    src={currentImage}
                    alt={`${title} image ${currentIndex + 1}`}
                    className={`absolute inset-0 w-full h-full ${isMobile ? 'object-contain' : 'object-cover'}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, scale: isHovered ? 1.1 : 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    onError={() => setImageError(true)}
                />
            </AnimatePresence>
            {showDots && images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {images.map((_: string, i: number) => (
                        <button
                            key={i}
                            onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                            className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-cyan-400 w-5' : 'bg-white/40 hover:bg-white/60 w-2'}`}
                        />
                    ))}
                </div>
            )}
        </>
    );
};

const ProjectCard = forwardRef(({ project, index, onClick, ...props }: any, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageError, setImageError] = useState(false);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onClick(project)}
            className="h-full"
            layout
            {...props}
        >
            <TiltCard className="h-full">
            <motion.div
                className="relative h-full rounded-3xl overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 group cursor-pointer"
                animate={{
                    scale: isHovered ? 1.02 : 1,
                }}
                transition={{ duration: 0.1 }}
            >
                {/* Featured badge */}
                {project.featured && (
                    <div className="absolute top-4 left-4 z-20 flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black text-xs font-bold">
                        <Star className="w-3 h-3 fill-current" />
                        Featured
                    </div>
                )}

                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                    <ImageCarousel 
                        images={project.images || [project.image]} 
                        isHovered={isHovered} 
                        title={project.title} 
                        category={project.category}
                    />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                    {/* Hover overlay */}
                    <motion.div
                        className="absolute inset-0 bg-cyan-500/20 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.span
                            className="px-4 py-2 rounded-full bg-white/30 text-white text-sm font-medium flex items-center gap-2"
                            initial={{ y: 20, opacity: 0 }}
                            animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            View Details <ArrowRight className="w-4 h-4" />
                        </motion.span>
                    </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Category */}
                    <span className="text-cyan-400 text-xs uppercase tracking-wider font-medium">
                        {project.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mt-2 mb-3 group-hover:text-cyan-400 transition-colors">
                        {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                        {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech: string) => (
                            <span
                                key={tech}
                                className="px-2 py-1 rounded-md text-xs font-medium bg-white/5 text-gray-300 border border-white/10"
                            >
                                {tech}
                            </span>
                        ))}
                        {project.technologies.length > 3 && (
                            <span className="px-2 py-1 rounded-md text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                                +{project.technologies.length - 3}
                            </span>
                        )}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-3">
                        <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 transition-all"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FaGithub size={18} />
                        </motion.a>
                        {project.live !== "#" && (
                            <motion.a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500/30 transition-all"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <HiExternalLink size={18} />
                            </motion.a>
                        )}
                    </div>
                </div>

            </motion.div>
            </TiltCard>
        </motion.div>
    );
});

ProjectCard.displayName = "ProjectCard";

// Featured Project (larger card)
const FeaturedProject = ({ project, onClick }: any) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageError, setImageError] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onClick(project)}
            className="lg:col-span-1 relative group cursor-pointer h-full"
        >
            <TiltCard className="h-full">
            <div className="relative h-full rounded-3xl overflow-hidden bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-pink-500/10 border border-cyan-500/20">
                <div className="grid md:grid-cols-2 gap-6 p-6">
                    {/* Image */}
                    <div className="relative h-64 md:h-full rounded-2xl overflow-hidden">
                        <ImageCarousel 
                            images={project.images || [project.image]} 
                            isHovered={isHovered} 
                            title={project.title} 
                            category={project.category}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-3">
                            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                            <span className="text-amber-400 text-sm font-bold uppercase tracking-wider">Featured Project</span>
                        </div>

                        <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                            {project.title}
                        </h3>

                        <p className="text-gray-300 mb-6 line-clamp-3">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.technologies.map((tech: string) => (
                                <span
                                    key={tech}
                                    className="px-3 py-1 rounded-full text-sm font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center gap-4">
                            <motion.a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
                                whileHover={{ scale: 1.05 }}
                            >
                                <FaGithub size={18} /> GitHub
                            </motion.a>
                            {project.live !== "#" && (
                                <motion.a
                                    href={project.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-medium hover:opacity-90 transition-all"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <HiExternalLink size={18} /> Live Demo
                                </motion.a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            </TiltCard>
        </motion.div>
    );
};

// Project Detail Modal
const ProjectModal = ({ project, onClose }: any) => {
    const [imageError, setImageError] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        document.body.style.overflow = "hidden";
        document.body.classList.add("modal-open");
        return () => { 
            document.body.style.overflow = ""; 
            document.body.classList.remove("modal-open");
        };
    }, []);

    if (!mounted) return null;

    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className={`relative w-full ${project.category === "Mobile App" ? "max-w-6xl" : "max-w-4xl"} ${project.category === "Mobile App" ? "h-[90vh] overflow-hidden" : "max-h-[90vh] overflow-y-auto"} rounded-3xl bg-gradient-to-br from-gray-900 via-black to-gray-950 border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.9)]`}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all shadow-lg backdrop-blur-md"
                >
                    <HiX size={24} />
                </button>

                {project.category === "Mobile App" ? (
                    /* ── Mobile App: Expanded side-by-side showcase layout ── */
                    <div className="grid lg:grid-cols-[440px_1fr] md:grid-cols-[380px_1fr] gap-0 h-full">
                        {/* Image column – sticky, fills full modal height, never scrolls */}
                        <div className="relative h-full overflow-hidden border-r border-white/5 flex-shrink-0">
                            <ImageCarousel
                                images={project.images || [project.image]}
                                title={project.title}
                                category={project.category}
                                isMobile={false}
                                showDots={true}
                            />
                        </div>

                        {/* Details column – independently scrollable */}
                        <div className="p-6 md:p-10 flex flex-col justify-between bg-black/40 overflow-y-auto h-full">
                            <div>
                                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                                    <span className="text-cyan-400 text-xs md:text-sm uppercase tracking-widest font-bold flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                                        <Smartphone className="w-4 h-4 text-cyan-400" /> {project.category}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10">
                                            📱 iOS & Android
                                        </span>
                                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                            ⚡ 60 FPS Native
                                        </span>
                                    </div>
                                </div>

                                <h2 className="text-3xl lg:text-4xl font-extrabold text-white mt-2 mb-4 tracking-tight">{project.title}</h2>

                                <p className="text-gray-300 text-base md:text-lg mb-6 leading-relaxed bg-white/[0.02] p-4.5 rounded-2xl border border-white/5 shadow-inner">
                                    {project.longDescription || project.description}
                                </p>

                                {/* App Architecture & Highlights Grid */}
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-white/[0.02] to-transparent border border-cyan-500/20">
                                        <div className="text-cyan-400 font-semibold text-xs mb-1 flex items-center gap-1.5">
                                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" /> Architecture
                                        </div>
                                        <div className="text-white font-medium text-sm">{(project as any).architecture || "Clean Architecture + MVVM"}</div>
                                    </div>
                                    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-purple-500/10 via-white/[0.02] to-transparent border border-purple-500/20">
                                        <div className="text-purple-400 font-semibold text-xs mb-1 flex items-center gap-1.5">
                                            <span className="w-2 h-2 rounded-full bg-purple-400" /> State Management
                                        </div>
                                        <div className="text-white font-medium text-sm">{project.technologies.includes("Riverpod") ? "Riverpod Reactive State" : project.technologies.includes("Freezed") ? "Riverpod + Freezed" : "Reactive State Management"}</div>
                                    </div>
                                    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-white/[0.02] to-transparent border border-emerald-500/20">
                                        <div className="text-emerald-400 font-semibold text-xs mb-1 flex items-center gap-1.5">
                                            <span className="w-2 h-2 rounded-full bg-emerald-400" /> Backend & Cloud
                                        </div>
                                        <div className="text-white font-medium text-sm">{project.technologies.includes("Firebase") ? "Firebase Realtime Sync" : "REST & Cloud API"}</div>
                                    </div>
                                    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-white/[0.02] to-transparent border border-amber-500/20">
                                        <div className="text-amber-400 font-semibold text-xs mb-1 flex items-center gap-1.5">
                                            <span className="w-2 h-2 rounded-full bg-amber-400" /> User Experience
                                        </div>
                                        <div className="text-white font-medium text-sm">Offline-First & Haptic UI</div>
                                    </div>
                                </div>

                                {/* Key Features Section */}
                                <div className="mb-6">
                                    <h4 className="text-md font-bold text-white mb-3 flex items-center gap-2 tracking-wide uppercase text-sm">
                                        <span className="text-cyan-400">✨</span> Core Capabilities & Features
                                    </h4>
                                    <ul className="grid grid-cols-1 gap-2.5">
                                        {((project as any).features || [
                                            "Cross-platform responsive layout optimized for mobile and tablet displays",
                                            "Offline-first local database synchronization with real-time cloud backup",
                                            "Smooth fluid transitions, custom micro-animations, and haptic feedback",
                                            "Secure multi-layered user authentication and role-based access control"
                                        ]).map((feature: string, idx: number) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm text-gray-300 bg-white/[0.02] hover:bg-white/[0.05] p-3 rounded-xl border border-white/5 transition-all">
                                                <span className="text-cyan-400 font-bold mt-0.5">•</span>
                                                <span className="leading-snug">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mb-8">
                                    <h4 className="text-md font-bold text-white mb-3 text-sm tracking-wide uppercase">Technologies & Frameworks</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech: string) => (
                                            <span
                                                key={tech}
                                                className="px-4 py-1.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(0,229,255,0.05)]"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
                                <motion.a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-all shadow-md"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <FaGithub size={18} /> View Source Code
                                </motion.a>
                                {project.live !== "#" && (
                                    <motion.a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 text-black font-bold text-sm hover:opacity-95 transition-all shadow-[0_0_25px_rgba(0,229,255,0.3)]"
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <HiExternalLink size={19} /> Live Demo / Install
                                    </motion.a>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    /* ── Website / Web App: original stacked layout ── */
                    <>
                        {/* Image */}
                        <div className="relative h-64 md:h-80 overflow-hidden">
                            <ImageCarousel
                                images={project.images || [project.image]}
                                title={project.title}
                                category={project.category}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="p-8">
                            <span className="text-cyan-400 text-sm uppercase tracking-wider font-medium">
                                {project.category}
                            </span>

                            <h2 className="text-3xl font-bold text-white mt-2 mb-4">{project.title}</h2>

                            <p className="text-gray-300 mb-6">{project.longDescription || project.description}</p>

                            <div className="mb-6">
                                <h4 className="text-lg font-semibold text-white mb-3">Technologies Used</h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech: string) => (
                                        <span
                                            key={tech}
                                            className="px-4 py-2 rounded-full text-sm font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <motion.a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <FaGithub size={20} /> View on GitHub
                                </motion.a>
                                {project.live !== "#" && (
                                    <motion.a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-medium hover:opacity-90 transition-all"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <HiExternalLink size={20} /> Visit Live Site
                                    </motion.a>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </motion.div>
        </motion.div>,
        document.body
    );
};

const ProjectsSection = () => {
    const [filter, setFilter] = useState("All");
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const sectionRef = useRef(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const categories = ["All", "Website", "Web Application", "Mobile App"];
    const featuredProjects = projects.filter((p) => p.featured);
    
    // Display all featured projects in the top featured section.
    const topFeaturedIds = new Set(featuredProjects.map(p => p.id));
    
    const filteredProjects = filter === "All"
        ? projects.filter((p) => !topFeaturedIds.has(p.id))
        : projects.filter((p) => p.category === filter && !topFeaturedIds.has(p.id));

    const handleFilterChange = (category: string) => {
        setFilter(category);
    };

    return (
        <section ref={sectionRef} id="projects" className="py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="text-cyan-400 text-sm uppercase tracking-widest mb-4 block">
                        My Work
                    </span>
                    <h2 className="text-5xl md:text-6xl font-bold mb-4">
                        Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Projects</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-emerald-400 mx-auto rounded-full" />
                </motion.div>

                {/* Featured projects */}
                <div className="grid lg:grid-cols-2 gap-6 mb-12">
                    {featuredProjects.map((project) => (
                        <FeaturedProject
                            key={project.id}
                            project={project}
                            onClick={setSelectedProject}
                        />
                    ))}
                </div>

                {/* Filter buttons */}
                <motion.div
                    className="flex flex-wrap justify-center gap-3 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {categories.map((category) => (
                        <motion.button
                            key={category}
                            onClick={() => handleFilterChange(category)}
                            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${filter === category
                                ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-black"
                                : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {category}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Projects grid */}
                <div ref={gridRef} style={{ scrollMarginTop: "120px" }}>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project, index) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    index={index}
                                    onClick={setSelectedProject}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Project modal */}
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
};

export default ProjectsSection;
