
"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

type StickyScrollProps = {
  content: {
    title: string;
    description: string;
  }[];
};

export const StickyScroll = ({
  content,
}: StickyScrollProps) => {
  const [activeCard, setActiveCard] = useState(0);

  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });

  const cardLength = content.length;

  useMotionValueEvent(
    scrollYProgress,
    "change",
    (latest) => {
      const cardsBreakpoints = content.map(
        (_, index) => index / cardLength
      );

      const closestBreakpointIndex = cardsBreakpoints.reduce(
        (acc, breakpoint, index) => {
          const distance = Math.abs(latest - breakpoint);

          const currentDistance = Math.abs(
            latest - cardsBreakpoints[acc]
          );

          return distance < currentDistance ? index : acc;
        },
        0
      );

      setActiveCard(closestBreakpointIndex);
    }
  );

  const backgroundColors = [
    "rgb(15, 23, 42)",
    "rgb(0, 0, 0)",
    "rgb(23, 23, 23)",
  ];

  const linearGradients = [
    "linear-gradient(to bottom right, #06b6d4, #10b981)",
    "linear-gradient(to bottom right, #ec4899, #6366f1)",
    "linear-gradient(to bottom right, #f97316, #eab308)",
  ];

  return (
    <motion.div
      ref={ref}
      animate={{
        backgroundColor:
          backgroundColors[
            activeCard % backgroundColors.length
          ],
      }}
      className="sticky-scrollbar relative flex h-120 justify-center gap-10 overflow-y-auto rounded-md p-10"
    >
      {/* Left content */}
      <div className="relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div
              key={item.title + index}
              className="my-20"
            >
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity:
                    activeCard === index ? 1 : 0.3,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="text-2xl font-bold text-slate-100"
              >
                {item.title}
              </motion.h2>

              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity:
                    activeCard === index ? 1 : 0.3,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="mt-10 max-w-sm text-lg text-slate-300"
              >
                {item.description}
              </motion.p>
            </div>
          ))}

          <div className="h-40" />
        </div>
      </div>

      {/* Right sticky card */}
      <motion.div
        animate={{
          background:
            linearGradients[
              activeCard % linearGradients.length
            ],
        }}
        transition={{
          duration: 0.5,
        }}
        className="sticky top-10 hidden h-60 w-80 shrink-0 overflow-hidden rounded-md bg-white lg:block"
      />
    </motion.div>
  );
};
