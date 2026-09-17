"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in ms, applied only once the element is visible. */
  delay?: number;
  /** Element/component to render as. Defaults to "div"; use "li" inside lists. */
  as?: "div" | "li";
}

/**
 * Fades and lifts children into place the first time they scroll into view.
 * Fires once (never re-triggers on scroll back) and collapses to an instant
 * appearance under prefers-reduced-motion via the motion-reduce: variant.
 */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as;

  return (
    <Tag
      ref={ref}
      data-visible={visible || undefined}
      style={visible ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        "opacity-0 translate-y-3 transition-[opacity,transform] duration-500 ease-out",
        "data-[visible]:opacity-100 data-[visible]:translate-y-0",
        "motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0",
        className
      )}
    >
      {children}
    </Tag>
  );
}
