"use client";

import { motion, useInView, Variant } from "framer-motion";
import { useRef, ReactNode } from "react";

interface FadeInViewProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  className?: string;
  once?: boolean;
  align?: "left" | "center" | "right";
}

export default function FadeInView({
  children,
  delay = 0,
  direction = "up",
  duration = 0.8,
  className = "",
  once = true,
  align,
}: FadeInViewProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });

  const directionOffset = 40;

  const variants: { [key: string]: Variant } = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? directionOffset : direction === "down" ? -directionOffset : 0,
      x: direction === "left" ? directionOffset : direction === "right" ? -directionOffset : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    },
  };

  const alignmentStyles = align ? {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  }[align] : "";

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Custom luxury ease
      }}
      className={`${alignmentStyles} ${className}`}
    >
      {children}
    </motion.div>
  );
}
