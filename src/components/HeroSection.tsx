import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center pt-20 md:pt-24 pb-20 md:pb-28 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12 md:mb-16"
        >
          <span className="font-display text-sm tracking-widest uppercase text-text-muted">
            Developer & Designer — San Francisco
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-display text-[clamp(3.5rem,12vw,10rem)] font-bold leading-[0.9] tracking-tight text-text-primary"
        >
          Alex
          <br />
          Johnson
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-16 md:mt-24 flex flex-col md:flex-row md:items-end justify-between gap-10 md:gap-16"
        >
          <p className="max-w-xl text-lg md:text-xl text-text-secondary leading-relaxed">
            Building digital products at the intersection of precision engineering and
            thoughtful design. Currently shaping the future of web experiences.
          </p>

          <a
            href="#work"
            className="group inline-flex items-center gap-3 font-display text-sm tracking-wide text-text-primary hover:text-accent transition-colors duration-300"
          >
            <span className="uppercase">Scroll to explore</span>
            <ArrowDownRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
            />
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-border-subtle" />
    </section>
  );
};
