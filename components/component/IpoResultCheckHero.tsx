"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import HeroIpoImage from "./ipo-image";
import ShimmerButton from "../magicui/shimmer-button";

const DeploymentHero = () => {
  const { data: session } = useSession();
  const { push } = useRouter();

  const handleButtonClick = () => {
    push(session?.user ? "/dashboard" : "/auth/signin");
  };

  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden px-4 py-20 md:px-8 md:py-40">
      <HeroIpoImage />

      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 z-0 grid h-full w-full -rotate-45 transform select-none grid-cols-2 gap-10 md:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="relative h-full w-full">
            {[0, 1].map((pos) => (
              <div
                key={pos}
                className={`absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)] bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)] [background-size:var(--width)_var(--height)] [mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)] [mask-composite:exclude] z-30 dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)] ${
                  pos === 0 ? "left-0" : "right-0"
                }`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Animated elements */}
      <div
        className="absolute left-96 top-20 m-auto h-14 w-px rounded-full bg-gradient-to-t from-orange-500 via-yellow-500 to-transparent"
        style={{
          willChange: "transform",
          transform:
            "translateX(249.429px) translateY(449.429px) rotate(-45deg)",
          opacity: 0,
        }}
      />

      {/* Particle effect */}
      <div
        className="absolute z-50 h-2 w-2"
        style={{
          left: "677.929px",
          top: "585.569px",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className="absolute -inset-x-10 top-0 m-auto h-[4px] w-10 rounded-full bg-gradient-to-r from-transparent via-orange-500 to-transparent blur-sm"
          style={{ opacity: 0, willChange: "opacity" }}
        />
        {[...Array(20)].map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-gradient-to-b from-orange-500 to-yellow-500"
            style={{
              opacity: 1,
              willChange: "transform, opacity",
              transform: "none",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-20 mx-auto mb-4 mt-4 max-w-4xl text-center">
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-green-500 dark:text-neutral-300 md:text-7xl">
          <span className="inline-block">
            Check Bulk IPO results in seconds, not hours.
          </span>
        </h2>
      </div>

      <p className="relative z-20 mx-auto mt-4 max-w-lg px-4 text-center text-base/6 text-green-500 dark:text-gray-200">
        We take your and your family&apos;s bulk information and check at once
        in a single click.
      </p>

      <div className="mb-10 mt-8 flex w-full items-center justify-center">
        <ShimmerButton onClick={handleButtonClick} className="shadow-2xl">
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
            {session?.user ? "Check Result" : "Signup for free"}
          </span>
        </ShimmerButton>
      </div>
    </div>
  );
};

export default DeploymentHero;
