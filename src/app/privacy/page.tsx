"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, ScrollText, Lock } from "lucide-react";

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-background text-foreground py-24 px-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-blue/5 blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neon-purple/5 blur-[120px]" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-neon-blue mb-12 hover:gap-3 transition-all"
                >
                    <ArrowLeft size={16} />
                    Back to Portfolio
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-5xl font-heading font-black mb-4 flex items-center gap-4">
                        <ShieldCheck className="text-neon-blue" size={48} />
                        PRIVACY & TERMS
                    </h1>
                    <p className="text-foreground/50 mb-16 text-lg">
                        Last updated: March 11, 2026. Your data security and rights are prioritized with military-grade precision.
                    </p>

                    <div className="space-y-12">
                        <section className="glass p-8 rounded-2xl border-white/5">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-neon-purple">
                                <Lock size={20} />
                                Privacy Policy
                            </h2>
                            <div className="space-y-4 text-foreground/70 leading-relaxed">
                                <p>
                                    At Muhammad Affan&apos;s Portfolio, we value your privacy. This section outlines how we handle information when you interact with this site.
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Data Collection:</strong> We do not collect any personal data through cookies or tracking pixels for advertising purposes.</li>
                                    <li><strong>Contact Information:</strong> If you use the contact form, your provided name, email, and message are used solely to respond to your inquiry.</li>
                                    <li><strong>Third-Party Services:</strong> We use industry-standard encryption and secure hosting providers (Vercel) to ensure your connection is safe.</li>
                                </ul>
                            </div>
                        </section>

                        <section className="glass p-8 rounded-2xl border-white/5">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-neon-green">
                                <ScrollText size={20} />
                                Terms of Service
                            </h2>
                            <div className="space-y-4 text-foreground/70 leading-relaxed">
                                <p>
                                    By accessing this website, you agree to be bound by these terms.
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Intellectual Property:</strong> All content, designs, and code displayed on this portfolio are the intellectual property of Muhammad Affan unless otherwise stated.</li>
                                    <li><strong>Usage:</strong> You may cite the projects and articles shown here for educational or non-commercial purposes, provided proper credit is given.</li>
                                    <li><strong>Disclaimer:</strong> The software and services described are provided &quot;as is&quot; without warranties of any kind.</li>
                                </ul>
                            </div>
                        </section>
                    </div>

                    <div className="mt-16 text-center text-foreground/30 text-sm">
                        <p>Questions regarding these policies? Contact: affan.work05@gmail.com</p>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
