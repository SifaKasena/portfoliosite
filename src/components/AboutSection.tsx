import { FadeIn } from "./FadeIn";

const capabilities = [
  "Frontend Architecture",
  "Design Systems",
  "Interactive Prototyping",
  "Performance Engineering",
  "API Design & Integration",
  "Responsive UI Development",
];

const tools = [
  "React & Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Figma",
  "PostgreSQL",
  "Docker",
  "AWS",
];

const experience = [
  {
    role: "Senior Frontend Developer",
    company: "Tech Innovations Inc.",
    period: "2021 — Present",
  },
  {
    role: "Full Stack Developer",
    company: "Digital Solutions Ltd.",
    period: "2019 — 2021",
  },
  {
    role: "Freelance Developer",
    company: "Self-Employed",
    period: "2018 — Present",
  },
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 bg-bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-16 xl:gap-24">
          <div className="xl:col-span-5">
            <FadeIn>
              <span className="font-display text-sm tracking-widest uppercase text-text-muted block mb-4">
                Profile
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-8">
                About
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-6 text-lg text-text-secondary leading-relaxed">
                <p>
                  I am a software developer with over five years of experience
                  building web applications that people actually want to use. My
                  work sits at the intersection of engineering discipline and
                  design intuition.
                </p>
                <p>
                  I believe the best interfaces are the ones that feel invisible —
                  fast, predictable, and quietly beautiful. When I am not shipping
                  code, I am hiking, reading, or refining my sourdough technique.
                </p>
              </div>
            </FadeIn>
          </div>

          <div className="xl:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              <FadeIn delay={0.15}>
                <div>
                  <h3 className="font-display text-sm tracking-widest uppercase text-text-muted mb-6">
                    Capabilities
                  </h3>
                  <ul className="space-y-3">
                    {capabilities.map((capability) => (
                      <li
                        key={capability}
                        className="font-display text-text-primary flex items-center gap-3"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        {capability}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div>
                  <h3 className="font-display text-sm tracking-widest uppercase text-text-muted mb-6">
                    Tools
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tools.map((tool) => (
                      <span
                        key={tool}
                        className="font-display text-sm px-3 py-1.5 bg-bg-primary border border-border-subtle text-text-secondary rounded-md"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.25}>
              <div className="mt-16 pt-8 border-t border-border-subtle">
                <h3 className="font-display text-sm tracking-widest uppercase text-text-muted mb-6">
                  Experience
                </h3>
                <div className="space-y-6">
                  {experience.map((item) => (
                    <div
                      key={`${item.company}-${item.period}`}
                      className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-x-6"
                    >
                      <div className="min-w-0">
                        <span className="font-display text-text-primary font-medium">
                          {item.role}
                        </span>
                        <span className="text-text-muted mx-2">—</span>
                        <span className="text-text-secondary">{item.company}</span>
                      </div>
                      <span className="font-display text-sm text-text-muted shrink-0 sm:ml-auto">
                        {item.period}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};
