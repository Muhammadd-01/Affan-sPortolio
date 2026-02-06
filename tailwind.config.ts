import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0A0A0A",
                foreground: "#EDEDED",
                neon: {
                    blue: "#00E5FF",
                    purple: "#8B5CF6",
                    green: "#00FF9C",
                    pink: "#FF006E",
                },
                glass: {
                    white: "rgba(255, 255, 255, 0.05)",
                    border: "rgba(255, 255, 255, 0.1)",
                },
            },
            fontFamily: {
                heading: ["var(--font-space-grotesk)", "sans-serif"],
                body: ["var(--font-inter)", "sans-serif"],
            },
            animation: {
                "glow-pulse": "glow-pulse 2s ease-in-out infinite",
                "float": "float 6s ease-in-out infinite",
                "shimmer": "shimmer 2s linear infinite",
                "spin-slow": "spin 8s linear infinite",
                "bounce-slow": "bounce 3s ease-in-out infinite",
                "gradient": "gradient 8s linear infinite",
            },
            keyframes: {
                "glow-pulse": {
                    "0%, 100%": { boxShadow: "0 0 20px rgba(0, 229, 255, 0.5)" },
                    "50%": { boxShadow: "0 0 40px rgba(0, 229, 255, 0.8), 0 0 60px rgba(139, 92, 246, 0.4)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },
                gradient: {
                    "0%, 100%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "neon-gradient": "linear-gradient(135deg, #00E5FF 0%, #8B5CF6 50%, #00FF9C 100%)",
            },
            boxShadow: {
                "neon-blue": "0 0 20px rgba(0, 229, 255, 0.5), 0 0 40px rgba(0, 229, 255, 0.3)",
                "neon-purple": "0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.3)",
                "neon-green": "0 0 20px rgba(0, 255, 156, 0.5), 0 0 40px rgba(0, 255, 156, 0.3)",
                "glass": "0 8px 32px rgba(0, 0, 0, 0.3)",
            },
        },
    },
    plugins: [],
};
export default config;
