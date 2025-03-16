"use client";

import { Globe } from "lucide-react";
import { ComposerAddAttachment } from "../assistant-ui/attachment";
import { AssistantSelect } from "../assistant-select";
import { TooltipIconButton } from "../assistant-ui/tooltip-icon-button";
import { useGraphContext } from "@/contexts/GraphContext";
import { useAssistantContext } from "@/contexts/AssistantContext";

interface ComposerActionsPopOutProps {
  userId: string | undefined;
  chatStarted: boolean;
}

export function ComposerActionsPopOut(props: ComposerActionsPopOutProps) {
  const {
    graphData: { searchEnabled, setSearchEnabled },
  } = useGraphContext();
  const { selectedAssistant } = useAssistantContext();
  const isDefaultSelected = !!selectedAssistant?.metadata?.is_default;

  return (
    <>
      <div className="flex items-center gap-4">
        {searchEnabled && (
          <TooltipIconButton
            tooltip="Web search"
            variant="ghost"
            className="size-7 flex-shrink-0 bg-blue-100 hover:bg-blue-100"
            onClick={() => setSearchEnabled((p) => !p)}
          >
            <Globe />
          </TooltipIconButton>
        )}


        {!searchEnabled && (
          <TooltipIconButton
            tooltip="Web search"
            variant="ghost"
            className="size-7 flex-shrink-0 hover:bg-blue-100 transition-colors ease-in-out"
            onClick={() => setSearchEnabled((p) => !p)}
          >
            <Globe />
          </TooltipIconButton>
        )}
        {isDefaultSelected && (
          <AssistantSelect
            userId={props.userId}
            chatStarted={props.chatStarted}
            className="hover:bg-blue-100 transition-colors ease-in-out"
          />
        )}
        {!isDefaultSelected && (
          <AssistantSelect
            userId={props.userId}
            chatStarted={props.chatStarted}
            className="bg-blue-100 hover:bg-blue-100 transition-colors ease-in-out"
          />
        )}

        <ComposerAddAttachment className="hover:bg-blue-100 transition-colors ease-in-out" />
      </div>

    </>
  );
}
