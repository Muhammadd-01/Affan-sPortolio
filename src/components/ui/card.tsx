"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    glow?: boolean;
    hover3D?: boolean;
    children?: React.ReactNode;
}

const DEPTH_LAYERS = 10;
const FRONT_Z = DEPTH_LAYERS;
const DEFAULT_TILT_X = 2; // Subtle default tilt so depth is always visible
const DEFAULT_TILT_Y = -3;

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, glow = false, hover3D = false, children, ...props }, ref) => {
        const [rotateX, setRotateX] = React.useState(0);
        const [rotateY, setRotateY] = React.useState(0);
        const [isHovered, setIsHovered] = React.useState(false);

        const depthLayers = React.useMemo(
            () => Array.from({ length: DEPTH_LAYERS }, (_, i) => i),
            []
        );

        const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
            if (!hover3D) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            setRotateX((y - centerY) / 20);
            setRotateY((centerX - x) / 20);
        };

        const handleMouseLeave = () => {
            setRotateX(0);
            setRotateY(0);
            setIsHovered(false);
        };

        // Extract conflicting drag props
        const { onDrag, onDragStart, onDragEnd, ...safeProps } = props as Record<string, unknown>;

        // Use mouse-driven tilt on hover, subtle default tilt otherwise
        const activeRotX = hover3D ? (isHovered ? -rotateX : DEFAULT_TILT_X) : 0;
        const activeRotY = hover3D ? (isHovered ? rotateY : DEFAULT_TILT_Y) : 0;

        // Dynamic shadow offset based on tilt
        const shadowX = hover3D ? activeRotY * 1.5 : 0;
        const shadowY = hover3D ? -activeRotX * 1.5 : 0;

        return (
            <div
                style={hover3D ? { perspective: "1200px" } : undefined}
            >
            <motion.div
                ref={ref}
                className={cn(
                    "rounded-2xl glass p-6 transition-all duration-300 relative",
                    glow && "hover:shadow-[0_0_30px_rgba(0,229,255,0.3)]",
                    hover3D && "transform-gpu",
                    !hover3D && "overflow-hidden",
                    className
                )}
                style={{
                    transformStyle: "preserve-3d",
                }}
                animate={hover3D ? {
                    rotateX: activeRotX,
                    rotateY: activeRotY,
                    scale: isHovered ? 1.03 : 1,
                } : undefined}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                whileHover={!hover3D ? { y: -5, scale: 1.02 } : undefined}
                transition={hover3D ? { type: "spring", stiffness: 260, damping: 18 } : { duration: 0.3 }}
                {...safeProps}
            >
                {/* Shine effect on hover */}
                {isHovered && (
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 0, x: "-100%" }}
                        animate={{ opacity: 1, x: "100%" }}
                        transition={{ duration: 0.6 }}
                        style={{
                            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                        }}
                    />
                )}
                {/* Glowing border on hover */}
                {glow && isHovered && (
                    <motion.div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                            border: "1px solid rgba(0, 229, 255, 0.5)",
                            boxShadow: "inset 0 0 20px rgba(0, 229, 255, 0.1)",
                        }}
                    />
                )}

                {/* 3D Depth layers — dark glass at rest, neon on hover */}
                {hover3D && depthLayers.map((i) => {
                    const ratio = i / DEPTH_LAYERS;
                    const restBg = `rgba(15, 15, 25, ${0.85 - ratio * 0.15})`;
                    const hoverBg = `linear-gradient(135deg,
                        rgba(0, 229, 255, ${0.18 - ratio * 0.12}),
                        rgba(139, 92, 246, ${0.12 - ratio * 0.08}),
                        rgba(0, 255, 156, ${0.06 - ratio * 0.04}))`;
                    const restBorder = `1px solid rgba(255, 255, 255, ${0.06 - ratio * 0.04})`;
                    const hoverBorder = `1px solid rgba(0, 229, 255, ${0.25 - ratio * 0.18})`;
                    return (
                        <div
                            key={i}
                            className="absolute inset-0 rounded-2xl pointer-events-none"
                            style={{
                                transform: `translateZ(${-(i + 1)}px)`,
                                background: isHovered ? hoverBg : restBg,
                                border: isHovered ? hoverBorder : restBorder,
                                transition: "background 0.4s ease, border 0.4s ease",
                            }}
                        />
                    );
                })}

                {/* Dynamic 3D shadow — subtle at rest, bright on hover */}
                {hover3D && (
                    <motion.div
                        className="absolute inset-2 rounded-2xl pointer-events-none"
                        style={{
                            transform: `translateZ(${-(DEPTH_LAYERS + 2)}px)`,
                            filter: "blur(20px)",
                        }}
                        animate={{
                            opacity: isHovered ? 0.6 : 0.15,
                            x: shadowX,
                            y: shadowY,
                            background: isHovered
                                ? "linear-gradient(135deg, rgba(0, 229, 255, 0.3), rgba(139, 92, 246, 0.2))"
                                : "rgba(0, 0, 0, 0.4)",
                        }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    />
                )}

                {children}
            </motion.div>
            </div>
        );
    }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 pb-4", className)}
        {...props}
    />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            "text-xl font-heading font-semibold leading-none tracking-tight",
            className
        )}
        {...props}
    />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-foreground/60", className)}
        {...props}
    />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center pt-4", className)}
        {...props}
    />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
