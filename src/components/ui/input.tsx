"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    neonColor?: "blue" | "purple" | "green";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, neonColor = "blue", ...props }, ref) => {
        const colorMap = {
            blue: "focus:border-neon-blue focus:shadow-[0_0_20px_rgba(0,229,255,0.3)]",
            purple: "focus:border-neon-purple focus:shadow-[0_0_20px_rgba(139,92,246,0.3)]",
            green: "focus:border-neon-green focus:shadow-[0_0_20px_rgba(0,255,156,0.3)]",
        };

        return (
            <input
                type={type}
                className={cn(
                    "flex h-11 w-full rounded-xl bg-background/50 border-2 border-glass-border px-4 py-2 text-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground/40 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                    colorMap[neonColor],
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

export { Input };
