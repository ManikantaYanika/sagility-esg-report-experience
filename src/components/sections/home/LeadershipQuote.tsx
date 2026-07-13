import { motion } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";
import { CEO } from "@/data/leadership";
import { fadeRise } from "@/lib/motion";

/**
 * LeadershipQuote — CEO voice (homepage §6).
 * Signature stripe glyph (two parallel diagonals — design-system §4)
 * drawn as an original SVG in mint.
 */
function StripeGlyph() {
  return (
    <svg aria-hidden viewBox="0 0 48 40" className="h-10 w-12 fill-brand-mint">
      <path d="M8 40 L22 0 h10 L18 40 Z" />
      <path d="M26 40 L40 0 h8 L34 40 Z" />
    </svg>
  );
}

export function LeadershipQuote() {
  return (
    <section aria-label="Leadership message" className="py-section md:py-section-lg">
      <Container width="measure" className="max-w-3xl">
        <motion.figure
          variants={fadeRise}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="text-center"
        >
          <div className="flex justify-center">
            <StripeGlyph />
          </div>
          <blockquote className="mt-8">
            <p className="font-display text-h3 font-light leading-relaxed text-ink-strong md:text-[1.875rem]">
              “{CEO.quote}”
            </p>
          </blockquote>
          <figcaption className="mt-8">
            <p className="text-body-l font-semibold text-ink-strong">{CEO.name}</p>
            <p className="mt-1 text-body text-neutral-500">{CEO.role}</p>
          </figcaption>
          <div className="mt-8 flex justify-center">
            <Button variant="tertiary" to={CEO.href}>
              Read all leadership messages
            </Button>
          </div>
        </motion.figure>
      </Container>
    </section>
  );
}
