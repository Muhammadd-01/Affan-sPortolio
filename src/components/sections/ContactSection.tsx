"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { personalInfo } from "@/data/portfolio";
import {
    Mail,
    Phone,
    MapPin,
    Send,
    Github,
    Linkedin,
    Twitter,
    CheckCircle,
    Loader2,
    Sparkles,
    MessageSquare,
    ArrowRight,
} from "lucide-react";

export default function ContactSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormState({ name: "", email: "", subject: "", message: "" });

        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    const socialLinks = [
        { icon: Github, href: personalInfo.social.github, label: "GitHub", color: "#FFFFFF" },
        { icon: Linkedin, href: personalInfo.social.linkedin, label: "LinkedIn", color: "#0A66C2" },
        { icon: Twitter, href: personalInfo.social.twitter, label: "Twitter", color: "#1DA1F2" },
    ];

    return (
        <section
            id="contact"
            ref={ref}
            className="section relative py-32 overflow-hidden"
        >
            {/* Animated Background */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="gradient-orb gradient-orb-green w-[600px] h-[600px] -top-48 -right-48"
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, -50, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="gradient-orb gradient-orb-blue w-[500px] h-[500px] bottom-0 -left-32"
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, 30, 0],
                        y: [0, -40, 0],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
            </div>

            {/* Decorative circuit lines */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
                <svg className="absolute top-0 left-0 w-full h-full">
                    <defs>
                        <pattern id="circuit" width="100" height="100" patternUnits="userSpaceOnUse">
                            <path d="M0 50h30M70 50h30M50 0v30M50 70v30" stroke="#00E5FF" strokeWidth="0.5" fill="none" />
                            <circle cx="50" cy="50" r="3" fill="#00E5FF" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#circuit)" />
                </svg>
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        className="inline-flex items-center gap-2 text-neon-green text-sm font-medium uppercase tracking-widest mb-4"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <MessageSquare className="w-4 h-4" />
                        Let&apos;s Connect
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
                        Get In{" "}
                        <span className="relative inline-block">
                            <span className="text-gradient">Touch</span>
                            <motion.div
                                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple rounded-full"
                                initial={{ scaleX: 0 }}
                                animate={isInView ? { scaleX: 1 } : {}}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            />
                        </span>
                    </h2>
                    <p className="text-foreground/60 max-w-xl mx-auto mt-4">
                        Have a project in mind? Let&apos;s create something extraordinary together.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="lg:col-span-2 space-y-8"
                    >
                        {/* Info Cards */}
                        <div className="space-y-4">
                            {[
                                { icon: Mail, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
                                { icon: Phone, label: "Phone", value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
                                { icon: MapPin, label: "Location", value: personalInfo.location, href: null },
                            ].map((item, index) => (
                                <motion.a
                                    key={item.label}
                                    href={item.href || undefined}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                                    className="flex items-center gap-4 p-4 glass rounded-xl group hover:bg-glass-white transition-all"
                                    whileHover={{ x: 10, scale: 1.02 }}
                                >
                                    <motion.div
                                        className="p-3 rounded-lg bg-neon-blue/20 text-neon-blue group-hover:bg-neon-blue group-hover:text-background transition-colors"
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <item.icon className="w-5 h-5" />
                                    </motion.div>
                                    <div>
                                        <p className="text-foreground/50 text-xs uppercase tracking-wider">{item.label}</p>
                                        <p className="font-medium group-hover:text-neon-blue transition-colors">{item.value}</p>
                                    </div>
                                    {item.href && (
                                        <motion.div
                                            className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                        >
                                            <ArrowRight className="w-4 h-4 text-neon-blue" />
                                        </motion.div>
                                    )}
                                </motion.a>
                            ))}
                        </div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="pt-6 border-t border-glass-border"
                        >
                            <p className="text-foreground/50 text-sm mb-4 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-neon-purple" />
                                Connect with me
                            </p>
                            <div className="flex gap-4">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 glass rounded-xl hover:bg-glass-white transition-all group"
                                        whileHover={{
                                            scale: 1.1,
                                            y: -5,
                                            boxShadow: `0 10px 30px ${social.color}30`,
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 + 0.7 }}
                                    >
                                        <social.icon
                                            className="w-5 h-5 transition-colors"
                                            style={{ color: social.color }}
                                        />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="lg:col-span-3"
                    >
                        <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 relative overflow-hidden">
                            {/* Form background glow */}
                            <motion.div
                                className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-neon-blue/20 blur-3xl"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.5, 0.3],
                                }}
                                transition={{ duration: 4, repeat: Infinity }}
                            />

                            <div className="relative z-10 space-y-6">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {/* Name Field */}
                                    <motion.div
                                        className="relative"
                                        whileHover={{ y: -2 }}
                                    >
                                        <label className="text-foreground/50 text-xs uppercase tracking-wider mb-2 block">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formState.name}
                                            onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                                            onFocus={() => setFocusedField("name")}
                                            onBlur={() => setFocusedField(null)}
                                            className="w-full px-4 py-3 bg-background/50 rounded-xl border-2 border-glass-border focus:border-neon-blue focus:outline-none transition-all"
                                            placeholder="John Doe"
                                        />
                                        {focusedField === "name" && (
                                            <motion.div
                                                className="absolute inset-0 rounded-xl pointer-events-none"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1, boxShadow: "0 0 20px rgba(0, 229, 255, 0.3)" }}
                                            />
                                        )}
                                    </motion.div>

                                    {/* Email Field */}
                                    <motion.div
                                        className="relative"
                                        whileHover={{ y: -2 }}
                                    >
                                        <label className="text-foreground/50 text-xs uppercase tracking-wider mb-2 block">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={formState.email}
                                            onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                                            onFocus={() => setFocusedField("email")}
                                            onBlur={() => setFocusedField(null)}
                                            className="w-full px-4 py-3 bg-background/50 rounded-xl border-2 border-glass-border focus:border-neon-purple focus:outline-none transition-all"
                                            placeholder="john@example.com"
                                        />
                                        {focusedField === "email" && (
                                            <motion.div
                                                className="absolute inset-0 rounded-xl pointer-events-none"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1, boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)" }}
                                            />
                                        )}
                                    </motion.div>
                                </div>

                                {/* Subject Field */}
                                <motion.div
                                    className="relative"
                                    whileHover={{ y: -2 }}
                                >
                                    <label className="text-foreground/50 text-xs uppercase tracking-wider mb-2 block">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formState.subject}
                                        onChange={(e) => setFormState(prev => ({ ...prev, subject: e.target.value }))}
                                        onFocus={() => setFocusedField("subject")}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full px-4 py-3 bg-background/50 rounded-xl border-2 border-glass-border focus:border-neon-green focus:outline-none transition-all"
                                        placeholder="Project Inquiry"
                                    />
                                    {focusedField === "subject" && (
                                        <motion.div
                                            className="absolute inset-0 rounded-xl pointer-events-none"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1, boxShadow: "0 0 20px rgba(0, 255, 156, 0.3)" }}
                                        />
                                    )}
                                </motion.div>

                                {/* Message Field */}
                                <motion.div
                                    className="relative"
                                    whileHover={{ y: -2 }}
                                >
                                    <label className="text-foreground/50 text-xs uppercase tracking-wider mb-2 block">
                                        Message
                                    </label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={formState.message}
                                        onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                                        onFocus={() => setFocusedField("message")}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full px-4 py-3 bg-background/50 rounded-xl border-2 border-glass-border focus:border-neon-blue focus:outline-none transition-all resize-none"
                                        placeholder="Tell me about your project..."
                                    />
                                    {focusedField === "message" && (
                                        <motion.div
                                            className="absolute inset-0 rounded-xl pointer-events-none"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1, boxShadow: "0 0 20px rgba(0, 229, 255, 0.3)" }}
                                        />
                                    )}
                                </motion.div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting || isSubmitted}
                                    className="w-full py-4 rounded-xl font-semibold relative overflow-hidden group disabled:opacity-70"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {/* Button background */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple"
                                        animate={{
                                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                                        }}
                                        transition={{ duration: 5, repeat: Infinity }}
                                        style={{ backgroundSize: "200% 200%" }}
                                    />

                                    {/* Button content */}
                                    <span className="relative z-10 flex items-center justify-center gap-2 text-background">
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Sending...
                                            </>
                                        ) : isSubmitted ? (
                                            <>
                                                <CheckCircle className="w-5 h-5" />
                                                Message Sent!
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                Send Message
                                            </>
                                        )}
                                    </span>
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
