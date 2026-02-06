"use client";

import { useRef, useEffect, useState } from "react";

export default function ThreeBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        const setSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setSize();
        window.addEventListener("resize", setSize);

        // Matrix rain configuration
        const fontSize = 16;
        const columns = Math.floor(canvas.width / fontSize);

        // Each column has its own drop position
        const drops: number[] = Array(columns).fill(1);
        const speeds: number[] = Array(columns).fill(0).map(() => 0.3 + Math.random() * 0.7);

        // Characters for the matrix rain - binary
        const chars = "01";

        // Neon colors
        const colors = ["#00E5FF", "#8B5CF6", "#00FF9C"];

        // Draw function
        const draw = () => {
            // Trail effect - darker for more prominent characters
            ctx.fillStyle = "rgba(10, 10, 10, 0.03)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `bold ${fontSize}px 'Courier New', monospace`;

            for (let i = 0; i < drops.length; i++) {
                // Random character
                const char = chars[Math.floor(Math.random() * chars.length)];

                // Color and brightness
                const colorIndex = i % colors.length;
                const brightness = 0.5 + Math.random() * 0.5;

                // Draw the character with glow effect
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                // Glow effect
                ctx.shadowBlur = 10;
                ctx.shadowColor = colors[colorIndex];
                ctx.fillStyle = colors[colorIndex];
                ctx.globalAlpha = brightness * 0.7;
                ctx.fillText(char, x, y);

                // Leading character is brighter
                if (Math.random() > 0.98) {
                    ctx.globalAlpha = 1;
                    ctx.shadowBlur = 20;
                    ctx.fillText(char, x, y);
                }

                // Reset shadow
                ctx.shadowBlur = 0;
                ctx.globalAlpha = 1;

                // Move drop down
                drops[i] += speeds[i];

                // Reset drop when it goes off screen
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.97) {
                    drops[i] = 0;
                    speeds[i] = 0.3 + Math.random() * 0.7;
                }
            }
        };

        // Animation loop - faster for more prominent effect
        const interval = setInterval(draw, 35);

        return () => {
            window.removeEventListener("resize", setSize);
            clearInterval(interval);
        };
    }, [isClient]);

    if (!isClient) return null;

    return (
        <div className="fixed inset-0 -z-10">
            {/* Base dark background */}
            <div className="absolute inset-0 bg-background" />

            {/* Matrix rain canvas - more visible */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 opacity-80"
            />

            {/* Lighter gradient for better visibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background/60 pointer-events-none" />

            {/* Subtle vignette */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse at center, transparent 0%, rgba(10,10,10,0.3) 100%)"
                }}
            />
        </div>
    );
}
