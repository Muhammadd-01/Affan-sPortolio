"use client";

import { useState, useEffect, useCallback } from "react";

export function useActiveSection(sectionIds: string[]): [string, (section: string) => void] {
    const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || "");

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight * 0.35;
            
            for (let i = sectionIds.length - 1; i >= 0; i--) {
                const id = sectionIds[i].replace("#", "");
                const element = document.getElementById(id);
                if (element) {
                    const top = element.offsetTop;
                    if (scrollPosition >= top) {
                        setActiveSection(sectionIds[i]);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => window.removeEventListener("scroll", handleScroll);
    }, [sectionIds]);

    return [activeSection, setActiveSection];
}

export function useSmoothScroll() {
    const scrollTo = useCallback((id: string) => {
        const element = document.getElementById(id.replace("#", ""));
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    }, []);

    return scrollTo;
}
