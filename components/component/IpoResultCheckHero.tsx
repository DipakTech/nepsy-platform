"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import HeroIpoImage from "./ipo-image";
import ShimmerButton from "../magicui/shimmer-button";
import { BackgroundLines } from "../ui/background-lines";

const DeploymentHero = () => {
  const { data: session } = useSession();
  const { push } = useRouter();

  const handleButtonClick = () => {
    push(session?.user ? "/dashboard" : "/auth/signin");
  };

  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden px-4 py-20 md:px-8 md:py-35">
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

      {/* Main content */}

      <div className="relative z-20 mx-auto  max-w-4xl text-center">
        <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
          Check Bulk IPO results in seconds, <br /> not hours..
        </h2>
      </div>

      <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
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
