
"use client";

import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { cn } from "@/utils/cn";

export function Button({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration = 3000,
  className,
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  as?: any;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: any;
}) {
  return (
    <Component
      className={cn(
        "relative h-16 w-40 overflow-hidden bg-transparent p-px",
        containerClassName
      )}
      style={{
        borderRadius,
      }}
      {...otherProps}
    >
      {/* Moving border */}
      <div
        className="absolute inset-0"
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        <MovingBorder
          duration={duration}
          rx="30%"
          ry="30%"
        >
          <div
            className={cn(
              "h-20 w-20 rounded-full bg-sky-400 opacity-80 blur-[2px]",
              borderClassName
            )}
          />
        </MovingBorder>
      </div>

      {/* Button content */}
      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center rounded-[inherit] border border-slate-800 bg-slate-900/90 text-sm text-white backdrop-blur-xl",
          className
        )}
      >
        {children}
      </div>
    </Component>
  );
}

export const MovingBorder = ({
  children,
  duration = 2000,
  rx = "30%",
  ry = "30%",
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}) => {
  const pathRef = useRef<SVGRectElement | null>(null);

  const progress = useMotionValue(0);

  useAnimationFrame((time) => {
    const path = pathRef.current;

    if (!path) return;

    const length = path.getTotalLength();

    if (length === 0) return;

    const progressValue = (time * length) / duration;

    progress.set(progressValue % length);
  });

  const x = useTransform(progress, (value) => {
    const path = pathRef.current;

    if (!path) return 0;

    return path.getPointAtLength(value).x;
  });

  const y = useTransform(progress, (value) => {
    const path = pathRef.current;

    if (!path) return 0;

    return path.getPointAtLength(value).y;
  });

  const transform = useMotionTemplate`
    translateX(${x}px)
    translateY(${y}px)
    translateX(-50%)
    translateY(-50%)
  `;

  return (
    <>
      <svg
        className="absolute inset-0 h-full w-full"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        {...otherProps}
      >
        <rect
          ref={pathRef}
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          fill="none"
        />
      </svg>

      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};