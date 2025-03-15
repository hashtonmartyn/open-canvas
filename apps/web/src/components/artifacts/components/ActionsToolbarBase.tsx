import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { TooltipIconButton } from "@/components/ui/assistant-ui/tooltip-icon-button";
import { IconButton } from "@/components/ui/assistant-ui/icon-button";
import { GraphInput } from "@opencanvas/shared/types";

export type ToolbarOption = {
  id: string;
  tooltip: string;
  icon: React.ReactNode;
  component: ((props: SharedComponentProps) => React.ReactNode) | null;
};

export type SharedComponentProps = {
  streamMessage: (params: GraphInput) => Promise<void>;
  handleClose: () => void;
  [key: string]: any;
};

export interface ActionsToolbarBaseProps {
  streamMessage: (params: GraphInput) => Promise<void>;
  isTextSelected: boolean;
  toolbarOptions: ToolbarOption[];
  mainIcon: React.ReactNode;
  handleOptionClick: (event: React.MouseEvent, optionId: string) => Promise<void>;
  className?: string;
}

export function ActionsToolbarBase(props: ActionsToolbarBaseProps) {
  const { streamMessage, toolbarOptions, mainIcon, handleOptionClick, className } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeOption, setActiveOption] = useState<string | null>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        toolbarRef.current &&
        !toolbarRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
        setActiveOption(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleExpand = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (props.isTextSelected) return;
    setIsExpanded(!isExpanded);
    setActiveOption(null);
  };

  const handleMouseEnter = () => {
    if (props.isTextSelected) return;
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
    setActiveOption(null);
  };

  const handleClose = () => {
    setIsExpanded(false);
    setActiveOption(null);
  };

  const handleToolbarOptionClick = async (
    event: React.MouseEvent,
    optionId: string
  ) => {
    event.stopPropagation();

    const option = toolbarOptions.find(opt => opt.id === optionId);
    if (option?.component) {
      setActiveOption(optionId);
    } else {
      await handleOptionClick(event, optionId);
      setIsExpanded(false);
      setActiveOption(null);
    }
  };

  return (
    <div
      ref={toolbarRef}
      className={cn(
        "fixed bottom-4 right-4 transition-all duration-300 ease-in-out text-black flex flex-col items-center justify-center bg-white",
        isExpanded ? "w-fit-content min-h-fit rounded-3xl" : "w-12 h-12 rounded-full",
        className
      )}
      style={{
        transformOrigin: "bottom right"
      }}
      onClick={toggleExpand}
      onMouseLeave={handleMouseLeave}
    >
      {isExpanded ? (
        <div className="flex flex-col gap-8 items-center w-full border-[1px] border-gray-200 rounded-3xl py-4 px-3">
          {activeOption
            ? toolbarOptions
                .find((option) => option.id === activeOption)
                ?.component?.({
                  streamMessage,
                  handleClose,
                  className: "animate-toolbar-expand-up",
                  style: { animationFillMode: 'both' }
                })
            : [...toolbarOptions].map((option, index) => (
                <TooltipIconButton
                  key={option.id}
                  side={"left"}
                  tooltip={option.tooltip}
                  variant="ghost"
                  className="transition-colors w-[36px] h-[36px] animate-toolbar-expand-up"
                  style={{ 
                    animationDelay: `${index * 0.05}s`,
                    animationFillMode: 'both'
                  }}
                  delayDuration={400}
                  onClick={async (e) => await handleToolbarOptionClick(e, option.id)}
                >
                  {option.icon}
                </TooltipIconButton>
              ))}
        </div>
      ) : (
        <IconButton
          variant="outline"
          className={cn(
            "transition-colors w-[48px] h-[48px] p-0 rounded-xl",
            props.isTextSelected
              ? "cursor-default opacity-50 text-gray-400 hover:bg-background"
              : "cursor-pointer"
          )}
          onMouseEnter={handleMouseEnter}
        >
          {mainIcon}
        </IconButton>
      )}
    </div>
  );
}
