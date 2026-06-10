"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type WhenVisibleProps = {
  children: ReactNode;
  /** Placeholder height to avoid layout shift before content loads. */
  minHeight?: string;
  rootMargin?: string;
};

export default function WhenVisible({
  children,
  minHeight = "1px",
  rootMargin = "200px 0px",
}: WhenVisibleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [visible, rootMargin]);

  return (
    <div ref={ref} style={{ minHeight: visible ? undefined : minHeight }}>
      {visible ? children : null}
    </div>
  );
}
