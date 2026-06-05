import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "./FadeIn";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  year: string;
  tags: string[];
  liveLink: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Meridian Commerce",
    category: "Web",
    description:
      "A full-featured e-commerce platform with real-time inventory, seamless checkout, and a design system built for scale.",
    image:
      "https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    year: "2024",
    tags: ["React", "Node.js", "Stripe"],
    liveLink: "#",
  },
  {
    id: 2,
    title: "Kinetic Fitness",
    category: "Mobile",
    description:
      "Health tracking application with custom data visualizations, workout intelligence, and social coaching features.",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    year: "2024",
    tags: ["React Native", "Firebase", "D3"],
    liveLink: "#",
  },
  {
    id: 3,
    title: "Atlas Dashboard",
    category: "Web",
    description:
      "Operational workspace for distributed teams. Real-time collaboration, analytics, and a calm, dense interface.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    year: "2023",
    tags: ["TypeScript", "Socket.io", "Express"],
    liveLink: "#",
  },
  {
    id: 4,
    title: "Monolith Rebrand",
    category: "Design",
    description:
      "Complete identity and web experience for a fintech startup. From brand strategy to production-ready components.",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    year: "2023",
    tags: ["Figma", "Design System", "Next.js"],
    liveLink: "#",
  },
];

const categories = ["All", "Web", "Mobile", "Design"];

export const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section id="work" className="py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24">
            <div>
              <span className="font-display text-sm tracking-widest uppercase text-text-muted block mb-4">
                Selected Work
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
                Projects
              </h2>
            </div>

            <div className="flex gap-2">
              {categories.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`font-display text-sm px-4 py-2 rounded-full border transition-all duration-300 ${
                      isActive
                        ? "bg-text-primary text-bg-primary border-text-primary"
                        : "bg-transparent text-text-secondary border-border-subtle hover:border-text-muted"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 md:gap-y-24">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const isOffset = index % 2 === 1;
              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className={`group ${isOffset ? "md:mt-24" : ""}`}
                >
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="relative overflow-hidden aspect-[4/3] mb-5 bg-bg-secondary">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover md:grayscale md:group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-accent/5 md:bg-accent/0 md:group-hover:bg-accent/10 transition-colors duration-500" />
                      <div className="absolute top-4 right-4 bg-bg-primary/80 backdrop-blur-sm p-2 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowUpRight size={16} className="text-text-primary" />
                      </div>
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-xl md:text-2xl font-medium text-text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-text-secondary leading-relaxed max-w-sm">
                          {project.description}
                        </p>
                      </div>
                      <span className="font-display text-sm text-text-muted shrink-0 mt-1">
                        {project.year}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-display text-xs px-3 py-1 bg-bg-secondary text-text-muted rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </a>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
