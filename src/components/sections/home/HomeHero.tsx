import { motion } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";
import { WaveLines } from "@/components/sections/home/WaveLines";
import { AmbientParticles } from "@/components/sections/home/AmbientParticles";
import { EASE_SETTLE } from "@/lib/motion";

/**
 * HomeHero — blueprint §2.1.1.
 * Full-bleed deep-teal surface sitting beneath the (transparent) header.
 * Theme statement from the FY25 report; word-staggered entrance.
 */
const THEME_WORDS = ["People.", "Partnerships.", "Purpose."];

export function HomeHero() {
  return (
    <section
      aria-label="Introduction"
      className="relative -mt-16 overflow-hidden bg-brand-teal lg:-mt-[5.5rem]"
    >
      <WaveLines className="absolute inset-0" />
      <AmbientParticles className="absolute inset-0" />
      {/* Depth wash — keeps text zone quiet, edges alive. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_20%_10%,rgba(7,73,84,0)_0%,rgba(3,36,42,0.55)_100%)]"
      />

      <Container className="relative flex min-h-[92svh] flex-col justify-center pb-24 pt-40 lg:pt-48">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_SETTLE }}
          className="text-overline uppercase text-brand-mint"
        >
          Sustainability Report FY2024–25
        </motion.p>

        <h1 className="mt-6 max-w-4xl font-display text-[2.75rem] font-extralight leading-[1.08] text-white md:text-display-l lg:text-display-xl">
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_SETTLE }}
          >
            Empowering Progress<span className="text-brand-mint">.</span>
          </motion.span>
          <span className="mt-4 block font-light text-[0.5em] leading-snug text-white/85">
            {THEME_WORDS.map((word, i) => (
              <motion.span
                key={word}
                className="mr-3 inline-block"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 + i * 0.12, ease: EASE_SETTLE }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75, ease: EASE_SETTLE }}
          className="mt-8 max-w-2xl text-body-l text-white/75"
        >
          Building a resilient, inclusive, and ethical healthcare ecosystem — with a
          validated science-based climate roadmap, 38,754 people across five geographies,
          and governance our stakeholders can trust.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9, ease: EASE_SETTLE }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Button variant="primaryOnDark" to="/approach">
            Explore Our Approach
          </Button>
          <Button
            variant="secondary"
            to="/downloads"
            className="border-white/60 text-white hover:bg-white/10"
          >
            Download the Report
          </Button>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          aria-hidden
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <motion.span
            className="block h-10 w-px bg-gradient-to-b from-brand-mint/0 via-brand-mint to-brand-mint/0"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </Container>
    </section>
  );
}
