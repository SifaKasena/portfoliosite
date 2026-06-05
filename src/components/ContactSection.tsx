import { FadeIn } from "./FadeIn";
import { ArrowUpRight } from "lucide-react";

export const ContactSection = () => {
  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <FadeIn>
            <div>
              <span className="font-display text-sm tracking-widest uppercase text-text-muted block mb-4">
                Contact
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-6">
                Let&apos;s work together
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed max-w-md">
                I am currently open to new opportunities and collaborations. If you
                have a project in mind, or just want to say hello, send a message.
              </p>

              <div className="mt-10 space-y-4">
                <a
                  href="mailto:hello@alexjohnson.dev"
                  className="group inline-flex items-center gap-3 font-display text-text-primary hover:text-accent transition-colors duration-300"
                >
                  <span className="text-lg">hello@alexjohnson.dev</span>
                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
                <div className="flex gap-6">
                  {["GitHub", "LinkedIn", "Twitter"].map((platform) => (
                    <a
                      key={platform}
                      href="#"
                      className="font-display text-sm text-text-secondary hover:text-text-primary transition-colors duration-300"
                    >
                      {platform}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="font-display text-sm text-text-muted block mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-transparent border-b border-border-subtle py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-text-secondary transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="font-display text-sm text-text-muted block mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-transparent border-b border-border-subtle py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-text-secondary transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="font-display text-sm text-text-muted block mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full bg-transparent border-b border-border-subtle py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-text-secondary transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                className="font-display text-sm tracking-wide uppercase px-8 py-3 bg-text-primary text-bg-primary rounded-full hover:bg-accent hover:text-text-primary transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
