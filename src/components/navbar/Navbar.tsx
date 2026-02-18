"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Volume2, VolumeX } from "lucide-react";
import { navLinks, personalInfo } from "@/data/portfolio";
import { aiPitchScript } from "@/data/pitch";
import { useActiveSection, useSmoothScroll } from "@/hooks/useNavigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const activeSection = useActiveSection(navLinks.map(link => link.href));
    const scrollTo = useSmoothScroll();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (href: string) => {
        scrollTo(href);
        setIsOpen(false);
    };

    const handleAIPitch = () => {
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
            return;
        }

        if (!("speechSynthesis" in window)) {
            console.error("Speech synthesis not supported");
            return;
        }

        const startSpeaking = () => {
            // Cancel any current speech for immediate start
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(aiPitchScript);

            // Deep, realistic male voice settings
            utterance.rate = 0.82;
            utterance.pitch = 0.75;
            utterance.volume = 1.0;

            const voices = window.speechSynthesis.getVoices();

            // Priority list for deep, realistic English voices
            const preferredVoices = [
                "Google UK English Male",
                "Microsoft David",
                "Microsoft James",
                "en-GB",
                "en-US",
            ];

            let selectedVoice = null;
            for (const name of preferredVoices) {
                selectedVoice = voices.find(v => v.name.includes(name) || v.lang.includes(name));
                if (selectedVoice) break;
            }

            if (!selectedVoice) {
                selectedVoice = voices.find(v => v.lang.startsWith("en"));
            }

            if (selectedVoice) {
                utterance.voice = selectedVoice;
            }

            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = (event) => {
                console.error("Speech synthesis error", event);
                setIsSpeaking(false);
            };

            window.speechSynthesis.speak(utterance);
        };

        // On mobile/Chrome, voices might not be loaded yet
        if (window.speechSynthesis.getVoices().length === 0) {
            window.speechSynthesis.onvoiceschanged = () => {
                startSpeaking();
                // Remove the listener once started
                window.speechSynthesis.onvoiceschanged = null;
            };
        } else {
            startSpeaking();
        }
    };

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled ? "py-3" : "py-5"
            )}
        >
            <div className="max-w-7xl mx-auto px-6">
                <div
                    className={cn(
                        "flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-300",
                        isScrolled ? "glass-strong shadow-neon-blue/20" : "bg-transparent"
                    )}
                >
                    {/* Logo */}
                    <motion.a
                        href="#hero"
                        onClick={(e) => {
                            e.preventDefault();
                            handleNavClick("#hero");
                        }}
                        className="text-2xl font-heading font-bold text-gradient"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {personalInfo.name}
                    </motion.a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <motion.button
                                key={link.href}
                                onClick={() => handleNavClick(link.href)}
                                className={cn(
                                    "relative px-4 py-2 text-sm font-medium transition-colors",
                                    activeSection === link.href
                                        ? "text-neon-blue"
                                        : "text-foreground/70 hover:text-foreground"
                                )}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {link.name}
                                {activeSection === link.href && (
                                    <motion.div
                                        layoutId="activeSection"
                                        className="absolute inset-0 rounded-lg bg-neon-blue/10 -z-10"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </motion.button>
                        ))}
                    </div>

                    {/* AI Pitch Button + Mobile Menu */}
                    <div className="flex items-center gap-3">
                        <motion.button
                            onClick={handleAIPitch}
                            className={cn(
                                "relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                                isSpeaking
                                    ? "bg-neon-purple text-white shadow-neon-purple"
                                    : "border border-neon-blue/50 text-neon-blue hover:bg-neon-blue/10"
                            )}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {isSpeaking ? (
                                <>
                                    <VolumeX className="w-4 h-4" />
                                    <span className="hidden sm:inline">Stop</span>
                                    {/* Animated waves */}
                                    <span className="absolute -right-1 -top-1">
                                        <span className="absolute inline-flex h-3 w-3 rounded-full bg-neon-purple opacity-75 animate-ping" />
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-purple" />
                                    </span>
                                </>
                            ) : (
                                <>
                                    <Volume2 className="w-4 h-4" />
                                    <span className="hidden sm:inline">AI Pitch</span>
                                </>
                            )}
                        </motion.button>

                        {/* Mobile Menu Toggle */}
                        <motion.button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-glass-white"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden mt-3 overflow-hidden"
                        >
                            <div className="glass-strong rounded-2xl p-4 space-y-2">
                                {navLinks.map((link, index) => (
                                    <motion.button
                                        key={link.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => handleNavClick(link.href)}
                                        className={cn(
                                            "block w-full text-left px-4 py-3 rounded-lg transition-colors",
                                            activeSection === link.href
                                                ? "bg-neon-blue/20 text-neon-blue"
                                                : "hover:bg-glass-white"
                                        )}
                                    >
                                        {link.name}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
}
