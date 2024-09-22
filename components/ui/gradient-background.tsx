import React from "react";

const GradientBackground: React.FC = () => {
  return (
    <div
      className="relative mx-auto h-[100px] sm:h-[50rem] overflow-hidden my-0 sm:my-[-18.8rem]"
      style={
        {
          ["--color" as string]: "var(--color-one)",
          maskImage:
            "radial-gradient(ellipse at center center, #000, transparent 50%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center center, #000, transparent 50%)",
        } as React.CSSProperties
      }
    >
      <div
        className="absolute inset-0 h-full w-full opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at bottom center, var(--color), transparent 70%)",
        }}
      />
      <div
        className="absolute -left-1/2 top-1/2 aspect-[1/0.7] w-[200%] rounded-[50%] border-t bg-background"
        style={{
          borderColor: "hsl(var(--border))",
        }}
      />
    </div>
  );
};

export default GradientBackground;
