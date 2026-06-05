import { FadeIn } from "./FadeIn";
import aboutData from "../data/about.json";

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
                {aboutData.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
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
                    {aboutData.capabilities.map((capability) => (
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
                    {aboutData.tools.map((tool) => (
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
                  {aboutData.experience.map((item) => (
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
