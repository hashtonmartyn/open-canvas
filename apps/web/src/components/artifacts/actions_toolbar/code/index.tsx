import { MessageCircleCode, Code, ScrollText, Bug, BookA } from "lucide-react";
import { cn } from "@/lib/utils";
import { PortToLanguageOptions } from "./PortToLanguage";
import { ProgrammingLanguageOptions } from "@opencanvas/shared/types";
import { GraphInput } from "@opencanvas/shared/types";
import { 
  ActionsToolbarBase, 
  ToolbarOption, 
  SharedComponentProps 
} from "@/components/artifacts/components/ActionsToolbarBase";

export interface CodeToolbarProps {
  streamMessage: (params: GraphInput) => Promise<void>;
  isTextSelected: boolean;
  language: ProgrammingLanguageOptions;
}

export function CodeToolBar(props: CodeToolbarProps) {
  const { streamMessage, language, isTextSelected } = props;

  const toolbarOptions: ToolbarOption[] = [
    {
      id: "addComments",
      tooltip: "Add comments",
      icon: <MessageCircleCode className="w-[26px] h-[26px]" />,
      component: null,
    },
    {
      id: "addLogs",
      tooltip: "Add logs",
      icon: <ScrollText className="w-[26px] h-[26px]" />,
      component: null,
    },
    {
      id: "portLanguage",
      tooltip: "Port language",
      icon: <BookA className="w-[26px] h-[26px]" />,
      component: (
        props: SharedComponentProps
      ) => <PortToLanguageOptions {...props} language={language} />,
    },
    {
      id: "fixBugs",
      tooltip: "Fix bugs",
      icon: <Bug className="w-[26px] h-[26px]" />,
      component: null,
    },
  ];

  const handleOptionClick = async (
    event: React.MouseEvent,
    optionId: string
  ) => {
    if (optionId === "addComments") {
      await streamMessage({
        addComments: true,
      });
    } else if (optionId === "addLogs") {
      await streamMessage({
        addLogs: true,
      });
    } else if (optionId === "fixBugs") {
      await streamMessage({
        fixBugs: true,
      });
    }
  };

  const mainIcon = (
    <Code
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
      className="w-26"
    />
  );
}
