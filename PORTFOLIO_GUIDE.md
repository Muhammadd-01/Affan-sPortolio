# Portfolio Content Update Guide

This guide explains how to update the content of your portfolio, including personal information, projects, and skills.

## The Main Data File
Most of your portfolio's content is managed in a single file:
**[src/data/portfolio.ts](file:///c:/Users/muham/OneDrive/Desktop/Coding/Affan'sPortfolio/src/data/portfolio.ts)**

### 1. Updating Personal Info
Find the `personalInfo` object at the top of the file:
```typescript
export const personalInfo = {
    name: "Muhammad Affan",
    role: "AI & Full Stack Developer",
    email: "your-email@example.com",
    // Update these fields as needed
};
```

### 2. Updating Projects
The `projects` array contains all your project details. Each project is an object:
```typescript
export const projects = [
    {
        id: "unique-id",
        title: "Project Name",
        description: "Short description",
        longDescription: "Detailed description for the modal",
        image: "/projects/your-image.jpg",
        category: "AI/ML", // One of: "Full Stack", "AI/ML", "Web3", etc.
        tech: ["React", "Python", "OpenAI"],
        liveUrl: "https://...",
        githubUrl: "https://...",
        featured: true // Set to true to show 'Featured' badge
    },
    // Add more projects here
];
```

### 3. Updating Skills
The `skills` array is organized by categories. You can add or modify skills here:
```typescript
export const skills = [
    {
        category: "Frontend",
        icon: Layout, // Icon from lucide-react
        items: [
            { name: "React", level: 90 },
            { name: "Next.js", level: 85 },
        ],
    },
];
```

## Adding Images
Place your project images or profile photos in the `public` directory:
- Project images: `public/projects/`
- General assets: `public/`

Then reference them in the code with a leading slash: `/projects/my-project.jpg`.

## Technical Notes
- **Icons**: The site uses `lucide-react`. To use a new icon, import it at the top of the file.
- **Colors**: If you want to change the primary colors, look at `tailwind.config.ts`.
- **AI Pitch**: You can change the AI pitch text by editing the `aiPitchScript` string in **[src/data/pitch.ts](file:///c:/Users/muham/OneDrive/Desktop/Coding/Affan'sPortfolio/src/data/pitch.ts)**.
