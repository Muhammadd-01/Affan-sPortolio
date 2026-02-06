import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
    title: "Affan | Full-Stack Developer & Creative Technologist",
    description:
        "Premium portfolio showcasing cutting-edge web development, creative technology, and innovative digital experiences. Specializing in React, Next.js, TypeScript, and modern web technologies.",
    keywords: [
        "Full-Stack Developer",
        "Web Developer",
        "React Developer",
        "Next.js",
        "TypeScript",
        "Portfolio",
        "Creative Technologist",
    ],
    authors: [{ name: "Affan" }],
    icons: {
        icon: "/favicon.svg",
    },
    openGraph: {
        title: "Affan | Full-Stack Developer & Creative Technologist",
        description: "Crafting Digital Experiences That Push Boundaries",
        type: "website",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "Affan | Full-Stack Developer",
        description: "Crafting Digital Experiences That Push Boundaries",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
                {children}
                {/* Noise Overlay */}
                <div className="noise-overlay" />
            </body>
        </html>
    );
}
