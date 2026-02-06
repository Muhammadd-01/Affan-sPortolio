"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
    {
        variants: {
            variant: {
                default:
                    "bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-lg shadow-neon-blue/25",
                secondary:
                    "border-2 border-neon-blue bg-transparent text-neon-blue",
                ghost:
                    "text-foreground/80 hover:text-foreground",
                destructive:
                    "bg-red-500 text-white hover:bg-red-600",
                neon:
                    "bg-transparent border-2 border-neon-green text-neon-green",
                magnetic:
                    "bg-gradient-to-r from-neon-purple to-neon-blue text-white",
            },
            size: {
                default: "h-11 px-6 py-2",
                sm: "h-9 px-4",
                lg: "h-12 px-8 text-base",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    magnetic?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, magnetic = false, children, ...props }, ref) => {
        const [position, setPosition] = React.useState({ x: 0, y: 0 });
        const [isHovered, setIsHovered] = React.useState(false);

        const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
            if (!magnetic) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            setPosition({ x: x * 0.3, y: y * 0.3 });
        };

        const handleMouseLeave = () => {
            setPosition({ x: 0, y: 0 });
            setIsHovered(false);
        };

        return (
            <motion.button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                animate={{
                    x: position.x,
                    y: position.y,
                }}
                whileHover={{ scale: magnetic ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                {...props}
            >
                {/* Hover gradient overlay */}
                <motion.div
                    className="absolute inset-0 opacity-0 pointer-events-none"
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    style={{
                        background: variant === "secondary" || variant === "neon"
                            ? "linear-gradient(135deg, rgba(0,229,255,0.1), rgba(139,92,246,0.1))"
                            : "linear-gradient(135deg, rgba(255,255,255,0.2), transparent)",
                    }}
                />
                {/* Shine effect */}
                {isHovered && (
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                        style={{
                            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                        }}
                    />
                )}
                <span className="relative z-10">{children}</span>
            </motion.button>
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
