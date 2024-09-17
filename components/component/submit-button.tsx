"use client";

import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const SubmitButton = ({
  handleClick,
  bodyText,
  className,
  isDisabled,
}: {
  handleClick: () => void;
  bodyText: string;
  className: string;
  isDisabled?: boolean;
}) => {
  return (
    <Button
      disabled={isDisabled}
      className={cn(className)}
      onClick={handleClick}
    >
      {bodyText}
    </Button>
  );
};

export default SubmitButton;
