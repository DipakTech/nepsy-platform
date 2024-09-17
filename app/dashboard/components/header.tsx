"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/component/toggle";

function useBoundedScroll(threshold: number) {
  const { scrollY } = useScroll();
  const scrollYBounded = useMotionValue(0);
  const scrollYBoundedProgress = useTransform(
    scrollYBounded,
    [0, threshold],
    [0, 1],
  );

  const clamp = (number: number, min: number, max: number) =>
    Math.min(Math.max(number, min), max);

  useEffect(() => {
    return scrollY.on("change", (current) => {
      const previous = scrollY.getPrevious();
      const diff = current - previous!;
      const newScrollYBounded = scrollYBounded.get() + diff;

      scrollYBounded.set(clamp(newScrollYBounded, 0, threshold));
    });
  }, [threshold, scrollY, scrollYBounded]);

  return { scrollYBounded, scrollYBoundedProgress };
}

export default function Header({
  className,
  wrapperClass,
}: {
  className?: string;
  wrapperClass?: string;
}) {
  const { scrollYBoundedProgress } = useBoundedScroll(400);
  const scrollYBoundedProgressDelayed = useTransform(
    scrollYBoundedProgress,
    [0, 0.75, 1],
    [0, 0, 1],
  );

  const router = useRouter();

  return (
    <div
      className={cn(
        "mx-auto flex w-full  flex-1 overflow-hidden dark:text-slate-900 overflow-x-hidden z-50",
        wrapperClass,
      )}
    >
      <div className="z-0 flex-1 overflow-y-scroll">
        <motion.header
          style={{
            height: useTransform(
              scrollYBoundedProgressDelayed,
              [0, 1],
              [50, 40],
            ),
            backgroundColor: useMotionTemplate`rgb(30, 41, 59 / ${useTransform(
              scrollYBoundedProgressDelayed,
              [0, 1],
              [1, 0.1],
            )})`, // Adjusted to use a dark slate color
          }}
          className={cn(
            "fixed inset-x-0 flex h-10 shadow backdrop-blur-md",
            className,
          )}
        >
          <div className="ml-auto flex w-full max-w-7xl items-center justify-between px-8">
            <motion.p
              style={{
                scale: useTransform(
                  scrollYBoundedProgressDelayed,
                  [0, 1],
                  [1, 0.9],
                ),
              }}
              onClick={() => router.push("/")}
              className="flex origin-left items-center text-xl font-semibold uppercase cursor-pointer"
            ></motion.p>
            <motion.nav
              style={{
                opacity: useTransform(
                  scrollYBoundedProgressDelayed,
                  [0, 1],
                  [1, 0],
                ),
              }}
              className=" sm:flex items-center space-x-6 text-sm font-medium text-slate-400"
            >
              <div className="flex items-center space-x-3"></div>
              <div className="flex gap-2 items-center ">
                <nav className="ml-auto flex items-center gap-2">
                  <ModeToggle />
                  {/* <UserButton /> */}
                </nav>
                {/* <MobileMenu /> */}
              </div>
            </motion.nav>
          </div>
        </motion.header>
      </div>
    </div>
  );
}
