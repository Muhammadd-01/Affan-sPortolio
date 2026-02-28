"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { personalInfo } from "@/data/portfolio";
import {
    Github,
    Linkedin,
    Twitter,
    Facebook,
    Mail,
    Phone,
    MapPin,
    Heart,
    Coffee,
    Code,
    Sparkles,
    ExternalLink,
    ArrowUpRight,
    GraduationCap,
    Award,
    Instagram,
} from "lucide-react";


// Navigation links
const quickLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Resume", href: "#resume" },
    { name: "Contact", href: "#contact" },
];

// Services offered
const services = [
    "Web Development",
    "Mobile Apps",
    "UI/UX Design",
    "API Development",
    "Cloud Solutions",
    "Consulting",
];

export default function Footer() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const socialLinks = [
        { icon: Github, href: personalInfo.social.github, label: "GitHub", color: "#FFFFFF" },
        { icon: Linkedin, href: personalInfo.social.linkedin, label: "LinkedIn", color: "#0A66C2" },
        { icon: Twitter, href: personalInfo.social.twitter, label: "Twitter", color: "#1DA1F2" },
        { icon: Instagram, href: personalInfo.social.instagram, label: "Instagram", color: "#E4405F" },
        { icon: Facebook, href: personalInfo.social.facebook, label: "Facebook", color: "#1877F2" },
    ];

    return (
        <footer ref={ref} className="relative py-20 overflow-hidden border-t border-glass-border">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                <motion.div
                    className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent"
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-1"
                    >
                        <motion.div
                            className="text-3xl font-heading font-bold text-gradient mb-4"
                            whileHover={{ scale: 1.02 }}
                        >
                            {personalInfo.name.split(" ")[0]}
                            <span className="text-neon-blue">.</span>
                        </motion.div>
                        <p className="text-foreground/60 text-sm leading-relaxed mb-6">
                            {personalInfo.tagline}
                        </p>

                        {/* Social Links */}
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-3">
                                {socialLinks.slice(0, 4).map((social, index) => (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2.5 rounded-lg glass hover:bg-glass-white transition-all group"
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                        transition={{ delay: index * 0.1 + 0.2 }}
                                        whileHover={{
                                            scale: 1.1,
                                            y: -3,
                                            boxShadow: `0 10px 30px ${social.color}30`,
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <social.icon
                                            className="w-5 h-5 transition-colors"
                                            style={{ color: social.color }}
                                        />
                                    </motion.a>
                                ))}
                            </div>
                            <div className="flex gap-3">
                                {socialLinks.slice(4).map((social, index) => (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2.5 rounded-lg glass hover:bg-glass-white transition-all group"
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                        transition={{ delay: index * 0.1 + 0.4 }}
                                        whileHover={{
                                            scale: 1.1,
                                            y: -3,
                                            boxShadow: `0 10px 30px ${social.color}30`,
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <social.icon
                                            className="w-5 h-5 transition-colors"
                                            style={{ color: social.color }}
                                        />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h3 className="text-lg font-heading font-semibold mb-6 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-neon-blue" />
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <motion.li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-foreground/60 hover:text-neon-blue transition-colors text-sm flex items-center gap-2 group"
                                    >
                                        <motion.span
                                            className="w-1.5 h-1.5 rounded-full bg-glass-border group-hover:bg-neon-blue transition-colors"
                                            whileHover={{ scale: 1.5 }}
                                        />
                                        {link.name}
                                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Services */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3 className="text-lg font-heading font-semibold mb-6 flex items-center gap-2">
                            <Code className="w-4 h-4 text-neon-purple" />
                            Services
                        </h3>
                        <ul className="space-y-3">
                            {services.map((service, index) => (
                                <motion.li
                                    key={service}
                                    className="text-foreground/60 text-sm flex items-center gap-2"
                                    whileHover={{ x: 5, color: "#8B5CF6" }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-neon-purple/50" />
                                    {service}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h3 className="text-lg font-heading font-semibold mb-6 flex items-center gap-2">
                            <Mail className="w-4 h-4 text-neon-green" />
                            Get in Touch
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href={`mailto:${personalInfo.email}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-foreground/60 hover:text-neon-blue transition-colors text-sm flex items-center gap-3 group"
                                >
                                    <div className="p-2 rounded-lg bg-glass-white group-hover:bg-neon-blue/20 transition-colors">
                                        <Mail className="w-4 h-4 text-neon-blue" />
                                    </div>
                                    <span className="break-all">{personalInfo.email}</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`tel:${personalInfo.phone}`}
                                    className="text-foreground/60 hover:text-neon-purple transition-colors text-sm flex items-center gap-3 group"
                                >
                                    <div className="p-2 rounded-lg bg-glass-white group-hover:bg-neon-purple/20 transition-colors">
                                        <Phone className="w-4 h-4 text-neon-purple" />
                                    </div>
                                    {personalInfo.phone}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={personalInfo.locationLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-foreground/60 hover:text-neon-green transition-colors text-sm flex items-center gap-3 group"
                                >
                                    <div className="p-2 rounded-lg bg-glass-white group-hover:bg-neon-green/20 transition-colors">
                                        <MapPin className="w-4 h-4 text-neon-green" />
                                    </div>
                                    {personalInfo.location}
                                </a>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Stats Row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 mb-8 border-y border-glass-border"
                >
                    {[
                        { label: "Projects Completed", value: "15+", icon: Code },
                        { label: "Code Contributions", value: "250+", icon: Sparkles },
                        { label: "Years Experience", value: "3+", icon: GraduationCap },
                        { label: "Cups of Coffee", value: "1000+", icon: Coffee },
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            className="text-center"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <stat.icon className="w-5 h-5 mx-auto mb-2 text-neon-blue" />
                            <div className="text-2xl font-heading font-bold text-gradient">{stat.value}</div>
                            <div className="text-foreground/50 text-xs mt-1">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/40"
                >
                    <div className="flex items-center gap-2">
                        <span>Designed & Built with</span>
                        <motion.span
                            className="text-neon-purple"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            ♥
                        </motion.span>
                        <span>by</span>
                        <span className="text-gradient font-medium">{personalInfo.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span>© {new Date().getFullYear()} All Rights Reserved</span>
                        <span className="hidden md:inline text-glass-border">|</span>
                        <motion.a
                            href="#"
                            className="hover:text-neon-blue transition-colors"
                            whileHover={{ x: 2 }}
                        >
                            Privacy Policy
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
