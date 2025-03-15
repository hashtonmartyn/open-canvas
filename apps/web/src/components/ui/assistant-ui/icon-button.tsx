import {forwardRef} from "react";
import {cn} from "@/lib/utils";
import {Button, ButtonProps} from "@/components/ui/button";

export type IconButtonProps = ButtonProps;

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, className, ...rest}, ref) => {
    return (
      <Button
        variant="ghost"
        size="icon"
        {...rest}
        className={cn("size-6 p-1", className)}
        ref={ref}
      >
        {children}
      </Button>
    )
  }
)

IconButton.displayName = "IconButton";
