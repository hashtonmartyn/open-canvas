"use client";

import { forwardRef } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconButton, IconButtonProps } from "./icon-button";

export type TooltipIconButtonProps = IconButtonProps & {
  tooltip: string | React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  /**
   * @default 700
   */
  delayDuration?: number;
};

export const TooltipIconButton = forwardRef<
  HTMLButtonElement,
  TooltipIconButtonProps
>(
  (
    { children, tooltip, side = "bottom", className, delayDuration, ...rest },
    ref
  ) => {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={delayDuration ?? 700}>
          <TooltipTrigger asChild>
            <IconButton
              {...rest}
              className={className}
              ref={ref}
            >
              {children}
              <span className="sr-only">{tooltip}</span>
            </IconButton>
          </TooltipTrigger>
          <TooltipContent side={side}>{tooltip}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);

TooltipIconButton.displayName = "TooltipIconButton";
