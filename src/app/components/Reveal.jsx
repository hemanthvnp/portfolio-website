import { motion, useReducedMotion } from "motion/react";

// One shared scroll reveal so every page animates the same way:
// fade up 12px, 0.5s ease-out, once, optional stagger via `delay`.
export function Reveal({ children, delay = 0, as = "div", className }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </Tag>
  );
}
