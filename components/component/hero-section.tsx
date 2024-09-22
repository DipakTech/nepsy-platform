"use client";

import React from "react";
import { BorderBeam } from "../magicui/border-beam";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative mx-auto mt-10 sm:mt-32 max-w-7xl px-6 text-center md:px-8"
    >
      <div className=" group inline-flex h-10 items-center justify-center  gap-1 rounded-full border border-white/5 bg-white/10 px-3 text-xs text-white transition-all ease-in hover:cursor-pointer hover:bg-white/20 dark:text-black">
        <div className="relative mt-32 [perspective:2000px] after:absolute after:inset-0 after:z-50 after:[background:linear-gradient(to_top,hsl(var(--background))_30%,transparent)]">
          <div className="rounded-xl border border-white/10 bg-white bg-opacity-[0.01] relative overflow-hidden">
            <BorderBeam size={250} duration={12} delay={9} />
            <Image
              src="/screenshot/dashboard.png"
              alt="Hero Image"
              className="w-full h-auto overflow-hidden rounded-[inherit] border object-cover hidden dark:block"
              width={900}
              height={700}
            />
            <Image
              src="/screenshot/lightdashboard.png"
              alt="Hero Image"
              className="w-full h-auto rounded-[inherit] border object-cover block dark:hidden"
              width={900}
              height={700}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
