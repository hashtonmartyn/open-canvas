import { Languages, BookOpen, SlidersVertical, SmilePlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReadingLevelOptions } from "./ReadingLevelOptions";
import { TranslateOptions } from "./TranslateOptions";
import { LengthOptions } from "./LengthOptions";
import { MagicPencilSVG } from "@/components/icons/magic_pencil";
import { GraphInput } from "@opencanvas/shared/types";
import { 
  ActionsToolbarBase, 
  ToolbarOption, 
  SharedComponentProps 
} from "@/components/artifacts/components/ActionsToolbarBase";

export interface ActionsToolbarProps {
  streamMessage: (params: GraphInput) => Promise<void>;
  isTextSelected: boolean;
}

export function ActionsToolbar(props: ActionsToolbarProps) {
  const { streamMessage, isTextSelected } = props;

  const toolbarOptions: ToolbarOption[] = [
    {
      id: "translate",
      tooltip: "Translate",
      icon: <Languages className="w-[26px] h-[26px]" />,
      component: (props: SharedComponentProps) => <TranslateOptions {...props} />,
    },
    {
      id: "readingLevel",
      tooltip: "Reading level",
      icon: <BookOpen className="w-[26px] h-[26px]" />,
      component: (props: SharedComponentProps) => (
        <ReadingLevelOptions {...props} />
      ),
    },
    {
      id: "adjustLength",
      tooltip: "Adjust the length",
      icon: <SlidersVertical className="w-[26px] h-[26px]" />,
      component: (props: SharedComponentProps) => <LengthOptions {...props} />,
    },
    {
      id: "addEmojis",
      tooltip: "Add emojis",
      icon: <SmilePlus className="w-[26px] h-[26px]" />,
      component: null,
    },
  ];

  const handleOptionClick = async (
    event: React.MouseEvent,
    optionId: string
  ) => {
    if (optionId === "addEmojis") {
      await streamMessage({
        regenerateWithEmojis: true,
      });
    }
  };

  const mainIcon = (
    <MagicPencilSVG
      className={cn(
        "w-[26px] h-[26px]",
        isTextSelected
          ? "text-gray-400"
          : "hover:text-gray-900 transition-colors"
      )}
    />
  );

  return (
    <ActionsToolbarBase
      streamMessage={streamMessage}
      isTextSelected={isTextSelected}
      toolbarOptions={toolbarOptions}
      mainIcon={mainIcon}
      handleOptionClick={handleOptionClick}
      className="w-fit-content"
    />
  );
}
