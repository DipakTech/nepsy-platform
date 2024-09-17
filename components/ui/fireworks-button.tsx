"use client";
import confetti from "canvas-confetti";
import { Button } from "./button";

export const ConfettiButton = () => {
  return (
    <Button
      onClick={() => {
        confetti();
      }}
    >
      click for confetti
    </Button>
  );
};
