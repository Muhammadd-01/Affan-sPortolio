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
        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);

        // Each column has its own drop position
        const drops: number[] = Array(columns).fill(1);
        const speeds: number[] = Array(columns).fill(0).map(() => 0.5 + Math.random() * 0.5);

        // Characters for the matrix rain
        const chars = "01";

        // Colors
        const colors = ["#00E5FF", "#8B5CF6", "#00FF9C"];

        // Draw function
        const draw = () => {
            // Semi-transparent black to create trail effect
            ctx.fillStyle = "rgba(10, 10, 10, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `${fontSize}px 'Courier New', monospace`;

            for (let i = 0; i < drops.length; i++) {
                // Random character
                const char = chars[Math.floor(Math.random() * chars.length)];

                // Random color with varying brightness
                const colorIndex = Math.floor(Math.random() * colors.length);
                const brightness = 0.3 + Math.random() * 0.7;

                // Set color with opacity
                ctx.fillStyle = colors[colorIndex];
                ctx.globalAlpha = brightness * 0.4; // Keep it subtle

                // Draw the character
                const x = i * fontSize;
                const y = drops[i] * fontSize;
                ctx.fillText(char, x, y);

                // Reset global alpha
                ctx.globalAlpha = 1;

                // Move drop down
                drops[i] += speeds[i];

                // Reset drop when it goes off screen
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
                    drops[i] = 0;
                    speeds[i] = 0.5 + Math.random() * 0.5;
                }
            }
        };

        // Animation loop
        const interval = setInterval(draw, 50);

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

            {/* Matrix rain canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 opacity-60"
            />

            {/* Gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background/70 pointer-events-none" />

            {/* Subtle vignette */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse at center, transparent 0%, rgba(10,10,10,0.4) 100%)"
                }}
            />
        </div>
    );
}
