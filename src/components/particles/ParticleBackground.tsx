"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Container, ISourceOptions } from "@tsparticles/engine";

interface ParticleBackgroundProps {
    variant?: "default" | "hero" | "dense";
}

export default function ParticleBackground({ variant = "default" }: ParticleBackgroundProps) {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = async (container?: Container): Promise<void> => {
        // Particles loaded
    };

    const options: ISourceOptions = useMemo(() => {
        const baseConfig: ISourceOptions = {
            fullScreen: { enable: false },
            background: {
                color: {
                    value: "transparent",
                },
            },
            fpsLimit: 60,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                    onHover: {
                        enable: true,
                        mode: "repulse",
                        parallax: {
                            enable: true,
                            force: 60,
                            smooth: 10,
                        },
                    },
                },
                modes: {
                    push: {
                        quantity: 4,
                    },
                    repulse: {
                        distance: 150,
                        duration: 0.4,
                    },
                    grab: {
                        distance: 200,
                        links: {
                            opacity: 0.5,
                        },
                    },
                },
            },
            particles: {
                color: {
                    value: ["#00E5FF", "#8B5CF6", "#00FF9C"],
                },
                links: {
                    color: "#00E5FF",
                    distance: 150,
                    enable: true,
                    opacity: 0.2,
                    width: 1,
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                        default: "bounce",
                    },
                    random: true,
                    speed: 1,
                    straight: false,
                    attract: {
                        enable: true,
                        rotate: {
                            x: 600,
                            y: 1200,
                        },
                    },
                },
                number: {
                    density: {
                        enable: true,
                        width: 1920,
                        height: 1080,
                    },
                    value: variant === "dense" ? 100 : variant === "hero" ? 80 : 60,
                },
                opacity: {
                    value: { min: 0.1, max: 0.5 },
                    animation: {
                        enable: true,
                        speed: 1,
                        sync: false,
                    },
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 3 },
                    animation: {
                        enable: true,
                        speed: 2,
                        sync: false,
                    },
                },
            },
            detectRetina: true,
        };

        return baseConfig;
    }, [variant]);

    if (!init) return null;

    return (
        <Particles
            id={`tsparticles-${variant}`}
            particlesLoaded={particlesLoaded}
            options={options}
            className="absolute inset-0 -z-10"
        />
    );
}
