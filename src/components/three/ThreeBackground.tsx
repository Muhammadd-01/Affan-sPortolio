"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";
import { Text } from "@react-three/drei";

// Global mouse position
const mouseState = { x: 0, y: 0 };

// Binary particles - 0s and 1s floating
function BinaryParticles() {
    const groupRef = useRef<THREE.Group>(null);
    const particleCount = 150;

    const particles = useMemo(() => {
        const items: {
            char: string;
            position: [number, number, number];
            speed: number;
            opacity: number;
            size: number;
        }[] = [];

        for (let i = 0; i < particleCount; i++) {
            items.push({
                char: Math.random() > 0.5 ? "1" : "0",
                position: [
                    (Math.random() - 0.5) * 80,
                    (Math.random() - 0.5) * 60 + 30,
                    (Math.random() - 0.5) * 30 - 20,
                ],
                speed: 0.02 + Math.random() * 0.03,
                opacity: 0.1 + Math.random() * 0.15,
                size: 0.3 + Math.random() * 0.4,
            });
        }
        return items;
    }, []);

    useFrame(() => {
        if (!groupRef.current) return;

        groupRef.current.children.forEach((mesh, i) => {
            const particle = particles[i];

            // Move down slowly
            mesh.position.y -= particle.speed;

            // Reset when off screen
            if (mesh.position.y < -35) {
                mesh.position.y = 35;
                mesh.position.x = (Math.random() - 0.5) * 80;
            }

            // Subtle horizontal drift
            mesh.position.x += Math.sin(Date.now() * 0.001 + i) * 0.002;
        });
    });

    return (
        <group ref={groupRef}>
            {particles.map((particle, i) => (
                <mesh key={i} position={particle.position}>
                    <planeGeometry args={[particle.size, particle.size * 1.5]} />
                    <meshBasicMaterial
                        color={i % 3 === 0 ? "#00E5FF" : i % 3 === 1 ? "#8B5CF6" : "#00FF9C"}
                        transparent
                        opacity={particle.opacity}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            ))}
        </group>
    );
}

// Subtle dot grid particles
function DotGrid() {
    const pointsRef = useRef<THREE.Points>(null);
    const particleCount = 2000;

    const [positions, colors] = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        const col = new Float32Array(particleCount * 3);

        const neonColors = [
            [0, 0.9, 1],       // Cyan
            [0.55, 0.36, 0.96], // Purple
            [0, 1, 0.61],      // Green
        ];

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // Create a wide spread
            pos[i3] = (Math.random() - 0.5) * 100;
            pos[i3 + 1] = (Math.random() - 0.5) * 80;
            pos[i3 + 2] = (Math.random() - 0.5) * 40 - 30;

            const color = neonColors[Math.floor(Math.random() * neonColors.length)];
            col[i3] = color[0];
            col[i3 + 1] = color[1];
            col[i3 + 2] = color[2];
        }

        return [pos, col];
    }, []);

    useFrame((state) => {
        if (!pointsRef.current) return;

        // Very slow rotation
        pointsRef.current.rotation.y = state.clock.elapsedTime * 0.01;

        // Subtle wave
        const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            posArray[i3 + 1] += Math.sin(state.clock.elapsedTime * 0.3 + posArray[i3] * 0.02) * 0.003;
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={particleCount}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.08}
                vertexColors
                transparent
                opacity={0.4}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// Camera controller - subtle movement
function CameraController() {
    const { camera } = useThree();

    useFrame(() => {
        camera.position.x += (mouseState.x * 2 - camera.position.x) * 0.01;
        camera.position.y += (-mouseState.y * 1.5 - camera.position.y) * 0.01;
        camera.lookAt(0, 0, -20);
    });

    return null;
}

export default function ThreeBackground() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseState.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouseState.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    if (!isClient) return null;

    return (
        <div className="fixed inset-0 -z-10">
            <Canvas
                camera={{ position: [0, 0, 30], fov: 60 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: "transparent" }}
            >
                <CameraController />
                <DotGrid />
                <BinaryParticles />
                <ambientLight intensity={0.1} />
            </Canvas>

            {/* Subtle gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background/80 pointer-events-none" />
        </div>
    );
}
