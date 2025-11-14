"use client";

import { useEffect, useRef } from "react";

export default function InfiniteScrollTrigger({
  onLoadMore,
}: {
  onLoadMore: () => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [onLoadMore]);

  return <div ref={ref} className="h-10 w-full"></div>;
}
