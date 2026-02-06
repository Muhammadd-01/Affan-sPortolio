"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    glow?: boolean;
    hover3D?: boolean;
    children?: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, glow = false, hover3D = false, children, ...props }, ref) => {
        const [rotateX, setRotateX] = React.useState(0);
        const [rotateY, setRotateY] = React.useState(0);
        const [isHovered, setIsHovered] = React.useState(false);

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

        return (
            <motion.div
                ref={ref}
                className={cn(
                    "rounded-2xl glass p-6 transition-all duration-300 relative overflow-hidden",
                    glow && "hover:shadow-[0_0_30px_rgba(0,229,255,0.3)]",
                    hover3D && "transform-gpu",
                    className
                )}
                style={{
                    transformStyle: "preserve-3d",
                    transform: hover3D ? `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)` : undefined,
                }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                whileHover={!hover3D ? { y: -5, scale: 1.02 } : undefined}
                transition={{ duration: 0.3 }}
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
                {children}
            </motion.div>
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
