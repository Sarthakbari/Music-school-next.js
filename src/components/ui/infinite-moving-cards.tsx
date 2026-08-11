
"use client";

import { cn } from "@/utils/cn";
import React, { useEffect, useRef, useState } from "react";

type InfiniteMovingCardsProps = {
  items: {
    quote: string;
    name: string;
    title: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
};

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: InfiniteMovingCardsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);

  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !scrollerRef.current) {
      return;
    }

    // Prevent duplicate cards if the component re-renders
    if (scrollerRef.current.dataset.duplicated === "true") {
      return;
    }

    // Duplicate all cards
    const scrollerContent = Array.from(
      scrollerRef.current.children
    );

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);

      if (scrollerRef.current) {
        scrollerRef.current.appendChild(duplicatedItem);
      }
    });

    scrollerRef.current.dataset.duplicated = "true";

    // Set animation direction
    containerRef.current.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse"
    );

    // Set animation speed
    let animationDuration = "40s";

    if (speed === "fast") {
      animationDuration = "20s";
    } else if (speed === "normal") {
      animationDuration = "40s";
    } else if (speed === "slow") {
      animationDuration = "80s";
    }

    containerRef.current.style.setProperty(
      "--animation-duration",
      animationDuration
    );

    setStart(true);
  }, [direction, speed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden",
        "mask-[linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={`${item.name}-${idx}`}
            className="relative w-87.5 max-w-full shrink-0 rounded-2xl border border-slate-700 px-8 py-6 md:w-112.5"
            style={{
              background:
                "linear-gradient(180deg, rgb(30, 41, 59), rgb(15, 23, 42))",
            }}
          >
            <blockquote>
              <span className="relative z-20 text-sm font-normal leading-[1.6] text-gray-100">
                {item.quote}
              </span>

              <div className="relative z-20 mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <span className="text-sm font-normal leading-[1.6] text-gray-400">
                    {item.name}
                  </span>

                  <span className="text-sm font-normal leading-[1.6] text-gray-400">
                    {item.title}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
