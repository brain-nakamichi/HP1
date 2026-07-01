"use client";

import { ElementType, ReactNode, useEffect, useRef } from "react";

type RevealProps = {
  as?: ElementType;
  className?: string;
  delay?: number;
  children?: ReactNode;
};

/**
 * スクロールで要素がふわっと表示されるラッパー。
 * `as` で描画するタグを指定でき、意味的なマークアップを保てます。
 */
export default function Reveal({
  as: Tag = "div",
  className = "",
  delay = 0,
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`.trim()}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </Tag>
  );
}
