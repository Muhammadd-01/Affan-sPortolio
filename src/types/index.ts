export interface Project {
    id: number;
    title: string;
    description: string;
    longDescription: string;
    image: string;
    tech: string[];
    liveUrl: string;
    githubUrl: string;
    featured: boolean;
    category: string;
}

export interface Skill {
    name: string;
    level: number;
    color: string;
}

export interface SkillCategory {
    category: string;
    icon: React.ComponentType<{ className?: string }>;
    items: Skill[];
}

export interface TimelineItem {
    year: string;
    title: string;
    description: string;
}

export interface NavLink {
    name: string;
    href: string;
}
