import React from "react";
import ReactMarkdown from "react-markdown";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { FaRegCopy } from "react-icons/fa";

const ChatDetailBox = ({ who }) => {
  return (
    <>
      <div
        className="flex-1 w-full break-all px-4 pb-4 
"
      >
        <div className="max-w-4xl mx-auto w-full flex flex-col">
          <div
            className={`text-white  p-3 rounded-lg max-w-[90%] relative group w-fit wrap-break-word ${
              who.role === "user"
                ? "bg-gray-600 self-end mt-6 mb-2"
                : "self-start"
            }`}
          >
            {who.role === "user" ? (
              <div className="flex items-center justify-end gap-3 mb-2">
                <img
                  src="/axisAI.png"
                  alt="logo"
                  className="h-10 w-10 rounded-full"
                />
                <p className="font-bold mb-1">You</p>
              </div>
            ) : (
              <div className="flex items-center gap-3 mb-2">
                <img
                  src="/axisAI.png"
                  alt="logo"
                  className="h-10 w-10 rounded-full"
                />
                <p className="font-bold mb-1">Axis AI</p>
              </div>
            )}

            <div
              className={`w-full overflow-x-auto break-all 
                        ${who.role === "ai" ? "ml-13" : ""}
                        [&::-webkit-scrollbar]:h-2
                        [&::-webkit-scrollbar-track]:bg-transparent
                        [&::-webkit-scrollbar-thumb]:bg-[#828e9e]
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        hover:[&::-webkit-scrollbar-thumb]:bg-[#697889]`}
            >
              <ReactMarkdown>{who.content}</ReactMarkdown>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      className="mt-2"
                      onClick={() => {
                        navigator.clipboard.writeText(who.content);
                        toast.success(`Text copied to clipboard`);
                      }}
                    >
                      <FaRegCopy />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Copy to clipboard</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ChatDetailBox;
