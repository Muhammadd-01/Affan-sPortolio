"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence, LayoutGroup } from "framer-motion";
import { ExternalLink, X, Star, ChevronRight, Code, Smartphone, Globe, Github } from "lucide-react";

const projects = [
    {
        id: 1,
        title: "Recipe Explorer",
        category: "Website",
        image: "/recipe.png",
        description: "A deliciously responsive recipe site featuring step-by-step cooking instructions, ingredient filters, and user-submitted dishes.",
        technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
        github: "https://github.com/Muhammadd-01/Recipe_App.git",
        live: "https://recipe-app-two-weld.vercel.app",
        featured: false,
        color: "#00E5FF",
    },
    {
        id: 2,
        title: "To-Do List App",
        category: "Website",
        image: "/todo.png",
        description: "A powerful to-do list app with task management, priority filtering, and a sleek UI built with local storage persistence.",
        technologies: ["React", "Local Storage", "Tailwind CSS"],
        github: "https://github.com/Muhammadd-01/To-Do_App.git",
        live: "https://to-do-app-silk-nu.vercel.app",
        featured: false,
        color: "#8B5CF6",
    },
    {
        id: 9,
        title: "Dar ul Ruqyah",
        category: "Website",
        image: "/darulruqyah.png",
        description: "Islamic Paranormal Investigation website providing guidance and Ruqyah services online with a spiritual modern design.",
        technologies: ["React", "TailwindCSS", "Vite"],
        github: "https://github.com/Muhammadd-01/Paranormal_investigating_website.git",
        live: "https://dar-ul-ruqyah.vercel.app/",
        featured: true,
        color: "#00FF9C",
    },
    {
        id: 10,
        title: "Al Ghani Quran Institute",
        category: "Website",
        image: "/alghani.png",
        description: "Official website for Al Ghani Quran Institute offering online courses and Quran learning resources.",
        technologies: ["React", "TailwindCSS", "Vite"],
        github: "https://github.com/Muhammadd-01/AL_Ghani_Quran_Academy.git",
        live: "https://al-ghani-quran-academy.vercel.app/",
        featured: true,
        color: "#FF006E",
    },
    {
        id: 3,
        title: "Elegance Barber Salon",
        category: "Web Application",
        image: "/salon.png",
        description: "A modern barber salon booking system with appointment scheduling, customer management, and payment integration.",
        technologies: ["PHP", "Laravel", "MySQL"],
        github: "https://github.com/Muhammadd-01/ElaganceSalon.git",
        live: "#",
        featured: false,
        color: "#00E5FF",
    },
    {
        id: 4,
        title: "Auction Bidding Site",
        category: "Web Application",
        image: "/auction.png",
        description: "A real-time auction bidding platform with user authentication, live bids, and comprehensive admin controls.",
        technologies: ["C#", "ASP.NET Core", "SQL Server"],
        github: "https://github.com/Muhammadd-01/Auction_Project.git",
        live: "#",
        featured: false,
        color: "#8B5CF6",
    },
    {
        id: 5,
        title: "Medicare Website",
        category: "Web Application",
        image: "/medicare.png",
        description: "A medical website that suggests medicines based on symptoms, with dosage levels and secure feedback.",
        technologies: ["React", "Vite", "TailwindCSS"],
        github: "https://github.com/Muhammadd-01/Official-Medicare.git",
        live: "https://official-medicare.vercel.app",
        featured: true,
        color: "#00FF9C",
    },
    {
        id: 6,
        title: "Archive Site",
        category: "Web Application",
        image: "/archive.png",
        description: "A digital archive platform for storing, categorizing, and exploring historical records with smooth filtering.",
        technologies: ["React", "Vite", "JavaScript"],
        github: "https://github.com/Muhammadd-01/archieveSite.git",
        live: "https://archieve-site.vercel.app",
        featured: false,
        color: "#FF006E",
    },
    {
        id: 7,
        title: "Fitness Tracker App",
        category: "Mobile App",
        image: "/fitness.png",
        description: "A mobile app for tracking workouts, diet, and progress with real-time analytics and push notifications.",
        technologies: ["Flutter", "Firebase", "Dart"],
        github: "https://github.com/Muhammadd-01/FitnessTrackerApp.git",
        live: "#",
        featured: false,
        color: "#00E5FF",
    },
    {
        id: 11,
        title: "WatchHub",
        category: "Mobile App",
        image: "/watchhub.png",
        description: "A mobile video streaming app to watch trending content with a clean, engaging interface.",
        technologies: ["Flutter", "Firebase"],
        github: "https://github.com/Muhammadd-01/WatchHub_Project.git",
        live: "#",
        featured: false,
        color: "#8B5CF6",
    },
    {
        id: 13,
        title: "Currency Converter",
        category: "Mobile App",
        image: "/currency.png",
        description: "A mobile app for converting currencies with live exchange rates and historical data charts.",
        technologies: ["Flutter", "API", "Dart"],
        github: "#",
        live: "#",
        featured: false,
        color: "#00FF9C",
    },
];

type Project = (typeof projects)[0];

function FallbackVisual({ category, color }: { category: string; color: string }) {
    const Icon = category === "Mobile App" ? Smartphone : category === "Web Application" ? Code : Globe;
    return (
        <div className="absolute inset-0 flex items-center justify-center"
            style={{ background: `radial-gradient(circle, ${color}15 0%, transparent 70%)` }}>
            <Icon size={48} style={{ color, filter: `drop-shadow(0 0 20px ${color})` }} />
        </div>
    );
}

// ── Dark Modal — no scrollbars ───────────────────────────────────────────────
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
    const [imgErr, setImgErr] = useState(false);
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.93)", backdropFilter: "blur(18px)" }}
        >
            <motion.div
                initial={{ scale: 0.82, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.86, opacity: 0, y: 24 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-xl rounded-3xl"
                style={{
                    background: "#0c0c0c",
                    border: `1px solid ${project.color}45`,
                    boxShadow: `0 0 80px ${project.color}18, 0 0 160px ${project.color}08, inset 0 0 60px ${project.color}04`,
                    overflow: "hidden",
                }}
            >
                <div className="absolute top-0 left-0 w-40 h-40 pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${project.color}10 0%, transparent 70%)` }} />
                <div className="absolute bottom-0 right-0 w-40 h-40 pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${project.color}07 0%, transparent 70%)` }} />

                <button onClick={onClose}
                    className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full flex items-center justify-center transition-all"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <X size={15} className="text-foreground/60 hover:text-foreground transition-colors" />
                </button>

                <div className="relative h-48 flex-shrink-0" style={{ overflow: "hidden" }}>
                    {imgErr
                        ? <FallbackVisual category={project.category} color={project.color} />
                        : <img src={project.image} alt={project.title} className="w-full h-full object-cover" onError={() => setImgErr(true)} />
                    }
                    <div className="absolute inset-0"
                        style={{ background: `linear-gradient(to bottom, transparent 20%, #0c0c0c 100%)` }} />
                    <div className="absolute bottom-3 left-5">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold"
                            style={{ background: `${project.color}18`, border: `1px solid ${project.color}50`, color: project.color }}>
                            {project.category}
                        </span>
                    </div>
                </div>

                <div className="px-6 pb-7 pt-1">
                    <h2 className="text-2xl font-heading font-bold mb-2"
                        style={{ color: "#EDEDED", textShadow: `0 0 25px ${project.color}45` }}>
                        {project.title}
                    </h2>
                    <p className="text-foreground/55 text-sm leading-relaxed mb-5">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((t) => (
                            <span key={t} className="px-3 py-1 rounded-lg text-xs font-medium"
                                style={{ background: `${project.color}10`, border: `1px solid ${project.color}30`, color: project.color }}>
                                {t}
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-3">
                        {project.github !== "#" && (
                            <motion.a href={project.github} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium"
                                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "#EDEDED" }}
                                whileHover={{ scale: 1.04, borderColor: "rgba(255,255,255,0.28)" }} whileTap={{ scale: 0.96 }}>
                                <Github size={14} /> GitHub
                            </motion.a>
                        )}
                        {project.live !== "#" && (
                            <motion.a href={project.live} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium"
                                style={{ background: `${project.color}20`, border: `1px solid ${project.color}55`, color: project.color }}
                                whileHover={{ scale: 1.04, boxShadow: `0 0 22px ${project.color}35` }} whileTap={{ scale: 0.96 }}>
                                <ExternalLink size={14} /> Live Demo
                            </motion.a>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ── Project Card — drops in from top on filter change ────────────────────────
function ProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: (p: Project) => void }) {
    const [hovered, setHovered] = useState(false);
    const [imgErr, setImgErr] = useState(false);
    const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
    const cardRef = useRef<HTMLDivElement>(null);

    const onMove = (e: React.MouseEvent) => {
        const el = cardRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
    };

    return (
        <motion.div
            ref={cardRef}
            layout
            // Fly in from the TOP each time cards are (re)rendered after a filter change
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => { setHovered(false); setMouse({ x: 0.5, y: 0.5 }); }}
            onMouseMove={onMove}
            onClick={() => onClick(project)}
            className="relative group cursor-pointer"
        >
            <motion.div
                className="relative rounded-2xl overflow-hidden border"
                animate={{
                    borderColor: hovered ? `${project.color}55` : "rgba(255,255,255,0.06)",
                    boxShadow: hovered ? `0 0 40px ${project.color}18, inset 0 0 30px ${project.color}06` : "0 0 0px transparent",
                }}
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.028) 0%, rgba(255,255,255,0.01) 100%)" }}
                transition={{ duration: 0.25 }}
            >
                {project.featured && (
                    <motion.div
                        className="absolute top-3 left-3 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
                        style={{ background: project.color, color: "#0A0A0A" }}
                        animate={{ boxShadow: [`0 0 8px ${project.color}90`, `0 0 22px ${project.color}`, `0 0 8px ${project.color}90`] }}
                        transition={{ duration: 2, repeat: Infinity }}>
                        <Star size={10} className="fill-current" /> Featured
                    </motion.div>
                )}

                <div className="relative h-48" style={{ overflow: "hidden" }}>
                    {imgErr
                        ? <FallbackVisual category={project.category} color={project.color} />
                        : <motion.img src={project.image} alt={project.title} className="w-full h-full object-cover"
                            animate={{ scale: hovered ? 1.07 : 1 }} transition={{ duration: 0.45, ease: "easeOut" }}
                            onError={() => setImgErr(true)} />
                    }
                    <div className="absolute inset-0"
                        style={{ background: "linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.08) 60%)" }} />
                    <motion.div className="absolute inset-0 flex items-center justify-center"
                        animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.22 }}
                        style={{ background: `radial-gradient(circle, ${project.color}22 0%, transparent 70%)` }}>
                        <motion.span
                            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={hovered ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.18 }}
                            style={{ background: `${project.color}22`, border: `1px solid ${project.color}60`, color: project.color }}>
                            View Details <ChevronRight size={13} />
                        </motion.span>
                    </motion.div>
                </div>

                <div className="p-5">
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: project.color }}>
                        {project.category}
                    </span>
                    <h3 className="text-base font-bold font-heading mt-1.5 mb-2 transition-colors duration-200"
                        style={{ color: hovered ? project.color : "#EDEDED" }}>
                        {project.title}
                    </h3>
                    <p className="text-foreground/45 text-sm line-clamp-2 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.technologies.slice(0, 3).map((t) => (
                            <span key={t} className="px-2 py-0.5 rounded-md text-xs border"
                                style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)", color: "rgba(237,237,237,0.55)" }}>
                                {t}
                            </span>
                        ))}
                        {project.technologies.length > 3 && (
                            <span className="px-2 py-0.5 rounded-md text-xs font-medium"
                                style={{ background: `${project.color}15`, border: `1px solid ${project.color}35`, color: project.color }}>
                                +{project.technologies.length - 3}
                            </span>
                        )}
                    </div>
                    <div className="flex gap-2">
                        {project.github !== "#" && (
                            <motion.a href={project.github} target="_blank" rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                                whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.92 }}>
                                <Github size={13} className="text-foreground/55" />
                            </motion.a>
                        )}
                        {project.live !== "#" && (
                            <motion.a href={project.live} target="_blank" rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="w-8 h-8 rounded-lg flex items-center justify-center"
                                style={{ background: `${project.color}18`, border: `1px solid ${project.color}45`, color: project.color }}
                                whileHover={{ scale: 1.12, boxShadow: `0 0 15px ${project.color}40` }} whileTap={{ scale: 0.92 }}>
                                <ExternalLink size={13} />
                            </motion.a>
                        )}
                    </div>
                </div>

                <div className="absolute inset-0 pointer-events-none" style={{
                    opacity: hovered ? 1 : 0,
                    transition: "opacity 0.25s ease",
                    background: `radial-gradient(circle at ${mouse.x * 100}% ${mouse.y * 100}%, ${project.color}0C 0%, transparent 55%)`,
                }} />
            </motion.div>
        </motion.div>
    );
}

// ── Featured hero-style card ──────────────────────────────────────────────────
function FeaturedProjectCard({ project, onClick, reverse }: { project: Project; onClick: (p: Project) => void; reverse?: boolean }) {
    const [hovered, setHovered] = useState(false);
    const [imgErr, setImgErr] = useState(false);
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            onClick={() => onClick(project)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="cursor-pointer"
        >
            <motion.div
                className="grid md:grid-cols-2 rounded-3xl overflow-hidden border"
                animate={{
                    borderColor: hovered ? `${project.color}55` : "rgba(255,255,255,0.06)",
                    boxShadow: hovered ? `0 0 60px ${project.color}18` : "none",
                }}
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.025), rgba(255,255,255,0.01))" }}
                transition={{ duration: 0.3 }}
            >
                <div className={`relative h-56 md:h-full ${reverse ? "md:order-2" : ""}`} style={{ overflow: "hidden" }}>
                    {imgErr
                        ? <FallbackVisual category={project.category} color={project.color} />
                        : <motion.img src={project.image} alt={project.title} className="w-full h-full object-cover"
                            animate={{ scale: hovered ? 1.05 : 1 }} transition={{ duration: 0.5 }}
                            onError={() => setImgErr(true)} />
                    }
                    <div className="absolute inset-0" style={{
                        background: reverse
                            ? "linear-gradient(to left, #0A0A0A 0%, transparent 55%)"
                            : "linear-gradient(to right, #0A0A0A 0%, transparent 55%)",
                    }} />
                </div>
                <div className={`flex flex-col justify-center p-8 ${reverse ? "md:order-1" : ""}`}>
                    <div className="flex items-center gap-2 mb-3">
                        <motion.span className="w-2 h-2 rounded-full" style={{ backgroundColor: project.color }}
                            animate={{ opacity: [1, 0.4, 1], boxShadow: [`0 0 6px ${project.color}`, `0 0 14px ${project.color}`, `0 0 6px ${project.color}`] }}
                            transition={{ duration: 1.8, repeat: Infinity }} />
                        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: project.color }}>★ Featured</span>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-heading font-bold mb-3 transition-colors duration-200"
                        style={{ color: hovered ? project.color : "#EDEDED" }}>
                        {project.title}
                    </h3>
                    <p className="text-foreground/55 mb-5 leading-relaxed text-sm">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.technologies.map((t) => (
                            <span key={t} className="px-3 py-1 rounded-lg text-sm"
                                style={{ background: `${project.color}15`, border: `1px solid ${project.color}40`, color: project.color }}>
                                {t}
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-3">
                        {project.github !== "#" && (
                            <motion.a href={project.github} target="_blank" rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium"
                                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#EDEDED" }}
                                whileHover={{ scale: 1.04, borderColor: "rgba(255,255,255,0.25)" }}>
                                <Github size={14} /> Code
                            </motion.a>
                        )}
                        {project.live !== "#" && (
                            <motion.a href={project.live} target="_blank" rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium"
                                style={{ background: `${project.color}22`, border: `1px solid ${project.color}55`, color: project.color }}
                                whileHover={{ scale: 1.04, boxShadow: `0 0 20px ${project.color}40` }}>
                                <ExternalLink size={14} /> Live Demo
                            </motion.a>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ── Animated Filter Tabs ──────────────────────────────────────────────────────
const CATEGORIES = ["All", "Website", "Web Application", "Mobile App"] as const;
type Category = (typeof CATEGORIES)[number];

function FilterTabs({ active, onChange }: { active: Category; onChange: (c: Category) => void }) {
    return (
        <LayoutGroup>
            <div className="flex flex-wrap justify-center gap-2 mb-14">
                {CATEGORIES.map((c) => {
                    const isActive = c === active;
                    return (
                        <motion.button
                            key={c}
                            onClick={() => onChange(c)}
                            className="relative px-5 py-2.5 rounded-xl text-sm font-medium outline-none focus:outline-none"
                            style={{ color: isActive ? "#0A0A0A" : "rgba(237,237,237,0.55)", zIndex: 1 }}
                            whileHover={{ scale: 1.07, y: -2 }}
                            whileTap={{ scale: 0.93 }}
                        >
                            {isActive && (
                                <motion.span layoutId="filterPill" className="absolute inset-0 rounded-xl"
                                    style={{ background: "linear-gradient(135deg, #00E5FF, #8B5CF6, #00FF9C)", zIndex: -1 }}
                                    transition={{ type: "spring", stiffness: 420, damping: 32 }} />
                            )}
                            {!isActive && (
                                <span className="absolute inset-0 rounded-xl"
                                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", zIndex: -1 }} />
                            )}
                            <span className="relative font-semibold">{c}</span>
                            {isActive && (
                                <motion.span className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
                                    style={{ background: "#00FF9C", boxShadow: "0 0 6px #00FF9C" }}
                                    animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.7, 1, 0.7] }}
                                    transition={{ duration: 1.5, repeat: Infinity }} />
                            )}
                        </motion.button>
                    );
                })}
            </div>
        </LayoutGroup>
    );
}

// ── Main Section ─────────────────────────────────────────────────────────────
export default function ProjectsSection() {
    const [filter, setFilter] = useState<Category>("All");
    const [selected, setSelected] = useState<Project | null>(null);
    const sectionRef = useRef(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const featured = projects.filter((p) => p.featured);
    const rest = filter === "All"
        ? projects.filter((p) => !p.featured)
        : projects.filter((p) => p.category === filter && !p.featured);

    // On filter change: scroll up so animated cards fly in visibly from top
    const handleFilterChange = useCallback((c: Category) => {
        setFilter(c);
        setTimeout(() => {
            gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 60);
    }, []);

    return (
        <section ref={sectionRef} id="projects" className="section relative py-32 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="gradient-orb gradient-orb-purple w-[500px] h-[500px] -top-32 -right-32 absolute opacity-20" />
                <div className="gradient-orb gradient-orb-green w-[400px] h-[400px] bottom-0 -left-32 absolute opacity-15" />
            </div>
            <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: "radial-gradient(circle at 2px 2px, rgba(0,255,156,0.06) 1px, transparent 0)",
                backgroundSize: "40px 40px",
            }} />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <motion.span className="text-neon-purple text-sm font-medium uppercase tracking-widest mb-4 block"
                        animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
                        My Work
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
                        Featured{" "}
                        <span className="relative">
                            <span className="text-gradient">Projects</span>
                            <motion.span className="absolute -bottom-2 left-0 right-0 h-1 rounded-full"
                                style={{ background: "linear-gradient(90deg, #00E5FF, #8B5CF6, #00FF9C)" }}
                                initial={{ scaleX: 0 }}
                                animate={isInView ? { scaleX: 1 } : {}}
                                transition={{ delay: 0.5, duration: 0.8 }} />
                        </span>
                    </h2>
                    <p className="text-foreground/50 max-w-xl mx-auto mt-4">
                        A curated selection of projects that showcase my passion and skills.
                    </p>
                </motion.div>

                {/* Featured */}
                <div className="space-y-6 mb-20">
                    {featured.slice(0, 2).map((p, i) => (
                        <FeaturedProjectCard key={p.id} project={p} onClick={setSelected} reverse={i % 2 !== 0} />
                    ))}
                </div>

                {/* Filter */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}>
                    <FilterTabs active={filter} onChange={handleFilterChange} />
                </motion.div>

                {/* Grid — ref for scroll-into-view */}
                <div ref={gridRef} style={{ scrollMarginTop: "120px" }}>
                    <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        <AnimatePresence mode="popLayout">
                            {rest.map((p, i) => (
                                <ProjectCard key={p.id} project={p} index={i} onClick={setSelected} />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>

            <AnimatePresence>
                {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
            </AnimatePresence>
        </section>
    );
}
