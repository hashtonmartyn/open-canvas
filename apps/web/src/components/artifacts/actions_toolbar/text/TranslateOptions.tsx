import {
  UsaFlag,
  ChinaFlag,
  IndiaFlag,
  SpanishFlag,
  FrenchFlag,
} from "@/components/icons/flags";
import { TooltipIconButton } from "@/components/ui/assistant-ui/tooltip-icon-button";
import { GraphInput } from "@opencanvas/shared/types";
import { LanguageOptions } from "@opencanvas/shared/types";
import {cn} from "@/lib/utils";

export interface TranslateOptionsProps {
  streamMessage: (params: GraphInput) => Promise<void>;
  handleClose: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function TranslateOptions(props: TranslateOptionsProps) {
  const { streamMessage } = props;

  const handleSubmit = async (language: LanguageOptions) => {
    props.handleClose();
    await streamMessage({
      language,
    });
  };

  return (
    <div className={cn("flex flex-col gap-3 items-center w-full", props.className)} style={props.style}>
      <TooltipIconButton
        tooltip="English"
        variant="ghost"
        className="transition-colors w-[36px] h-[36px]"
        delayDuration={400}
        onClick={async () => await handleSubmit("english")}
      >
        <UsaFlag />
      </TooltipIconButton>
      <TooltipIconButton
        tooltip="Mandarin"
        variant="ghost"
        className="transition-colors w-[36px] h-[36px]"
        delayDuration={400}
        onClick={async () => await handleSubmit("mandarin")}
      >
        <ChinaFlag />
      </TooltipIconButton>
      <TooltipIconButton
        tooltip="Hindi"
        variant="ghost"
        className="transition-colors w-[36px] h-[36px]"
        delayDuration={400}
        onClick={async () => await handleSubmit("hindi")}
      >
        <IndiaFlag />
      </TooltipIconButton>
      <TooltipIconButton
        tooltip="Spanish"
        variant="ghost"
        className="transition-colors w-[36px] h-[36px]"
        delayDuration={400}
        onClick={async () => await handleSubmit("spanish")}
      >
        <SpanishFlag />
      </TooltipIconButton>
      <TooltipIconButton
        tooltip="French"
        variant="ghost"
        className="transition-colors w-[36px] h-[36px]"
        delayDuration={400}
        onClick={async () => await handleSubmit("french")}
      >
        <FrenchFlag />
      </TooltipIconButton>
    </div>
  );
}
