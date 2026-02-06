"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/navbar/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ResumeSection from "@/components/sections/ResumeSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/footer/Footer";
import FloatingButtons from "@/components/floating/WhatsAppButton";
import LoadingScreen from "@/components/ui/LoadingScreen";

// Dynamic imports for client-only components
const CustomCursor = dynamic(() => import("@/components/cursor/CustomCursor"), {
    ssr: false,
});

const ThreeBackground = dynamic(() => import("@/components/three/ThreeBackground"), {
    ssr: false,
});

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);

    const handleLoadingComplete = () => {
        setIsLoading(false);
        // Slight delay before showing content for smooth transition
        setTimeout(() => setShowContent(true), 100);
    };

    return (
        <>
            {/* Loading Screen */}
            <AnimatePresence>
                {isLoading && (
                    <LoadingScreen onComplete={handleLoadingComplete} />
                )}
            </AnimatePresence>

            {/* Main Content */}
            <AnimatePresence>
                {showContent && (
                    <motion.main
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative min-h-screen bg-transparent text-foreground overflow-x-hidden"
                    >
                        {/* Three.js Background - Fixed behind everything */}
                        <ThreeBackground />

                        {/* Custom Cursor */}
                        <CustomCursor />

                        {/* Navigation */}
                        <Navbar />

                        {/* Page Content - All sections transparent */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative z-10"
                        >
                            {/* Hero Section */}
                            <HeroSection />

                            {/* About Section */}
                            <AboutSection />

                            {/* Skills Section */}
                            <SkillsSection />

                            {/* Projects Section */}
                            <ProjectsSection />

                            {/* Resume Section */}
                            <ResumeSection />

                            {/* Contact Section */}
                            <ContactSection />

                            {/* Footer */}
                            <Footer />
                        </motion.div>

                        {/* Floating Buttons */}
                        <FloatingButtons />
                    </motion.main>
                )}
            </AnimatePresence>
        </>
    );
}
