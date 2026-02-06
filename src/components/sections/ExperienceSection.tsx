"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
    Briefcase,
    GraduationCap,
    Award,
    MapPin,
    Calendar,
    ExternalLink,
} from "lucide-react";

interface Experience {
    title: string;
    company: string;
    location: string;
    period: string;
    description: string[];
    type: "work" | "education" | "award";
}

const experiences: Experience[] = [
    {
        title: "Senior Full-Stack Developer",
        company: "Tech Innovations Inc.",
        location: "Remote",
        period: "2023 - Present",
        description: [
            "Leading development of enterprise-scale applications",
            "Mentoring junior developers and conducting code reviews",
            "Implementing CI/CD pipelines and DevOps best practices",
        ],
        type: "work",
    },
    {
        title: "Full-Stack Developer",
        company: "Digital Solutions Co.",
        location: "San Francisco, CA",
        period: "2021 - 2023",
        description: [
            "Built and maintained multiple React/Next.js applications",
            "Integrated third-party APIs and payment systems",
            "Improved application performance by 40%",
        ],
        type: "work",
    },
    {
        title: "Computer Science Degree",
        company: "University of Technology",
        location: "New York, NY",
        period: "2017 - 2021",
        description: [
            "Bachelor of Science in Computer Science",
            "Specialized in Software Engineering and AI",
            "Dean's List - All semesters",
        ],
        type: "education",
    },
];

export default function ExperienceSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const getIcon = (type: string) => {
        switch (type) {
            case "work":
                return Briefcase;
            case "education":
                return GraduationCap;
            case "award":
                return Award;
            default:
                return Briefcase;
        }
    };

    const getColor = (type: string) => {
        switch (type) {
            case "work":
                return "neon-blue";
            case "education":
                return "neon-purple";
            case "award":
                return "neon-green";
            default:
                return "neon-blue";
        }
    };

    return (
        <section
            id="experience"
            ref={ref}
            className="section relative py-32 overflow-hidden"
        >
            <div className="gradient-orb gradient-orb-blue w-80 h-80 -top-40 -left-40 absolute opacity-20" />
            <div className="gradient-orb gradient-orb-purple w-64 h-64 bottom-20 right-0 absolute opacity-20" />

            <div className="max-w-5xl mx-auto px-6">
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
                        className="text-center mb-16"
                    >
                        <span className="text-neon-blue text-sm font-medium uppercase tracking-widest mb-4 block">
                            My Journey
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
                            Experience &{" "}
                            <span className="text-gradient">Education</span>
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green mx-auto rounded-full" />
                    </motion.div>

                    {/* Timeline */}
                    <div className="relative">
                        {/* Central Line */}
                        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-blue via-neon-purple to-neon-green" />

                        {experiences.map((exp, index) => {
                            const Icon = getIcon(exp.type);
                            const color = getColor(exp.type);
                            const isEven = index % 2 === 0;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: index * 0.2, duration: 0.6 }}
                                    className={`relative flex items-start gap-8 mb-12 ${isEven ? "md:flex-row" : "md:flex-row-reverse"
                                        }`}
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10">
                                        <div className={`w-4 h-4 rounded-full bg-${color} shadow-${color}`} />
                                    </div>

                                    {/* Content Card */}
                                    <div className={`ml-16 md:ml-0 md:w-1/2 ${isEven ? "md:pr-16" : "md:pl-16"}`}>
                                        <div className="glass rounded-2xl p-6 hover:bg-glass-white transition-all duration-300 group">
                                            <div className="flex items-start gap-4">
                                                <div className={`p-3 rounded-xl bg-${color}/20 shrink-0`}>
                                                    <Icon className={`w-6 h-6 text-${color}`} />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-heading font-bold group-hover:text-neon-blue transition-colors">
                                                        {exp.title}
                                                    </h3>
                                                    <p className="text-foreground/80 font-medium mt-1">
                                                        {exp.company}
                                                    </p>
                                                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-foreground/50">
                                                        <span className="flex items-center gap-1">
                                                            <MapPin className="w-4 h-4" />
                                                            {exp.location}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="w-4 h-4" />
                                                            {exp.period}
                                                        </span>
                                                    </div>
                                                    <ul className="mt-4 space-y-2">
                                                        {exp.description.map((item, i) => (
                                                            <li
                                                                key={i}
                                                                className="text-foreground/60 text-sm flex items-start gap-2"
                                                            >
                                                                <span className={`w-1.5 h-1.5 rounded-full bg-${color} mt-2 shrink-0`} />
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
