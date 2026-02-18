import {
    Code2,
    Palette,
    Server,
    Smartphone,
    Database,
    Cloud,
    GitBranch,
    Terminal,
    Figma,
    Globe,
    Cpu,
    Shield,
} from "lucide-react";


export const personalInfo = {
    name: "Muhammad Affan",
    title: "Full-Stack Developer & Creative Technologist",
    tagline: "Crafting Digital Experiences That Push Boundaries",
    email: "affan.work05@gmail.com",
    phone: "+923128538773",
    whatsapp: "+923128538773",
    location: "Global",
    resumeUrl: "/resume.pdf",
    social: {
        github: "https://github.com/affan",
        linkedin: "https://linkedin.com/in/affan",
        twitter: "https://twitter.com/affan",
    },
};

export const aboutContent = {
    story: `I'm a passionate developer who transforms complex problems into elegant solutions. 
  With a deep love for both code and creativity, I build digital experiences that not only 
  work flawlessly but also captivate and inspire.`,
    mission: `My mission is to push the boundaries of what's possible on the web, creating 
  applications that feel magical while maintaining peak performance and accessibility.`,
    highlights: [
        { year: "2020", title: "Started Coding Journey", description: "Discovered the magic of programming" },
        { year: "2021", title: "First Major Project", description: "Built a full-stack application" },
        { year: "2022", title: "Freelance Success", description: "Delivered 20+ client projects" },
        { year: "2023", title: "Tech Lead Role", description: "Leading development teams" },
        { year: "2024", title: "Innovation Focus", description: "AI & cutting-edge technologies" },
    ],
};

export const skills = [
    {
        category: "Frontend",
        icon: Code2,
        items: [
            { name: "React", level: 95, color: "#61DAFB" },
            { name: "Next.js", level: 90, color: "#FFFFFF" },
            { name: "TypeScript", level: 88, color: "#3178C6" },
            { name: "Tailwind CSS", level: 92, color: "#06B6D4" },
            { name: "Framer Motion", level: 85, color: "#FF0055" },
        ],
    },
    {
        category: "Backend",
        icon: Server,
        items: [
            { name: "Node.js", level: 88, color: "#339933" },
            { name: "Python", level: 82, color: "#3776AB" },
            { name: "Express", level: 85, color: "#FFFFFF" },
            { name: "GraphQL", level: 78, color: "#E10098" },
            { name: "REST APIs", level: 90, color: "#00E5FF" },
        ],
    },
    {
        category: "Mobile",
        icon: Smartphone,
        items: [
            { name: "React Native", level: 80, color: "#61DAFB" },
            { name: "Flutter", level: 75, color: "#02569B" },
            { name: "iOS", level: 65, color: "#FFFFFF" },
            { name: "Android", level: 70, color: "#3DDC84" },
        ],
    },
    {
        category: "Databases",
        icon: Database,
        items: [
            { name: "PostgreSQL", level: 85, color: "#4169E1" },
            { name: "MongoDB", level: 88, color: "#47A248" },
            { name: "Firebase", level: 90, color: "#FFCA28" },
            { name: "Redis", level: 75, color: "#DC382D" },
        ],
    },
    {
        category: "Cloud & DevOps",
        icon: Cloud,
        items: [
            { name: "AWS", level: 78, color: "#FF9900" },
            { name: "Docker", level: 82, color: "#2496ED" },
            { name: "Vercel", level: 92, color: "#FFFFFF" },
            { name: "CI/CD", level: 80, color: "#00E5FF" },
        ],
    },
    {
        category: "Design",
        icon: Palette,
        items: [
            { name: "Figma", level: 85, color: "#F24E1E" },
            { name: "UI/UX", level: 80, color: "#8B5CF6" },
            { name: "Motion Design", level: 75, color: "#FF006E" },
        ],
    },
];

export const projects = [
    {
        id: 1,
        title: "NexoVate Digital",
        description: "A premium software agency website with Hollywood-grade animations and modern UI/UX design.",
        longDescription: "Built a stunning digital agency website featuring advanced animations, interactive particles, and a cyberpunk aesthetic. The site showcases cutting-edge web technologies and premium design patterns.",
        image: "/projects/nexovate.jpg",
        tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion", "Three.js"],
        liveUrl: "https://nexovate.com",
        githubUrl: "https://github.com/affan/nexovate",
        featured: true,
        category: "Web Development",
    },
    {
        id: 2,
        title: "AI Chat Platform",
        description: "Real-time AI-powered chat application with advanced NLP capabilities.",
        longDescription: "Developed an intelligent chat platform leveraging GPT models for natural conversations, featuring real-time messaging, voice input, and smart suggestions.",
        image: "/projects/aichat.jpg",
        tech: ["React", "Node.js", "OpenAI", "Socket.io", "MongoDB"],
        liveUrl: "https://aichat.demo.com",
        githubUrl: "https://github.com/affan/aichat",
        featured: true,
        category: "AI/ML",
    },
    {
        id: 3,
        title: "E-Commerce Engine",
        description: "Scalable e-commerce platform with advanced analytics and inventory management.",
        longDescription: "Built a comprehensive e-commerce solution with real-time inventory tracking, AI-powered recommendations, and seamless payment integration.",
        image: "/projects/ecommerce.jpg",
        tech: ["Next.js", "Stripe", "PostgreSQL", "Redis", "AWS"],
        liveUrl: "https://shop.demo.com",
        githubUrl: "https://github.com/affan/ecommerce",
        featured: true,
        category: "Full-Stack",
    },
    {
        id: 4,
        title: "Mobile Fitness App",
        description: "Cross-platform fitness tracking app with AI workout recommendations.",
        longDescription: "Created a comprehensive fitness application with workout tracking, nutrition planning, and AI-powered personalized recommendations.",
        image: "/projects/fitness.jpg",
        tech: ["Flutter", "Firebase", "TensorFlow", "Node.js"],
        liveUrl: "https://fitness.demo.com",
        githubUrl: "https://github.com/affan/fitness",
        featured: false,
        category: "Mobile",
    },
    {
        id: 5,
        title: "Crypto Dashboard",
        description: "Real-time cryptocurrency portfolio tracker with advanced analytics.",
        longDescription: "Developed a sleek crypto dashboard featuring real-time price updates, portfolio analytics, and customizable alerts.",
        image: "/projects/crypto.jpg",
        tech: ["React", "D3.js", "WebSocket", "CoinGecko API"],
        liveUrl: "https://crypto.demo.com",
        githubUrl: "https://github.com/affan/crypto",
        featured: false,
        category: "Web Development",
    },
    {
        id: 6,
        title: "Smart Home IoT",
        description: "IoT platform for smart home automation and monitoring.",
        longDescription: "Built an IoT hub connecting smart devices with intuitive controls, automation rules, and energy monitoring.",
        image: "/projects/iot.jpg",
        tech: ["Python", "MQTT", "React", "Raspberry Pi", "AWS IoT"],
        liveUrl: "https://iot.demo.com",
        githubUrl: "https://github.com/affan/smarthome",
        featured: false,
        category: "IoT",
    },
];

export const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Resume", href: "#resume" },
    { name: "Contact", href: "#contact" },
];


export const techColorMap: Record<string, string> = {
    React: "#61DAFB",
    "Next.js": "#FFFFFF",
    TypeScript: "#3178C6",
    JavaScript: "#F7DF1E",
    "Node.js": "#339933",
    Python: "#3776AB",
    "Tailwind CSS": "#06B6D4",
    Tailwind: "#06B6D4",
    "Framer Motion": "#FF0055",
    Firebase: "#FFCA28",
    MongoDB: "#47A248",
    PostgreSQL: "#4169E1",
    AWS: "#FF9900",
    Docker: "#2496ED",
    Flutter: "#02569B",
    "Three.js": "#FFFFFF",
};
