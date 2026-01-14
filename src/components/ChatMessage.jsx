import React, { useState, useEffect } from "react";
import { FaRegCopy } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

// --- Typing Effect---
const Typewriter = ({ text, speed = 10 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return <ReactMarkdown>{displayedText}</ReactMarkdown>;
};

const ChatMessage = ({ chatHistory }) => {
  return (
    <>
      {chatHistory.map((chat, index) => {
        const isLastMessage = index === chatHistory.length - 1;
        const isAI = chat.role === "ai";
        const isUser = chat.role === "user";

        return (
          <div
            key={index}
            className={`text-white  p-3 rounded-lg max-w-[90%] relative group w-fit wrap-break-word ${
              isUser ? "bg-blue-600 self-end mt-6 mb-2" : "self-start"
            }`}
          >
            <div
              className={`flex items-center gap-3 mb-2 ${
                isUser ? "justify-start" : ""
              }`}
            >
              <img
                src={isUser ? "/profile.jpg" : "/axisAI.png"}
                alt="logo"
                className="h-10 w-10 rounded-full"
              />
              <p className="font-bold mb-1">{isUser ? "You" : "Axis AI"}</p>
            </div>

            <div
              className={`w-full overflow-x-auto break-all 
            ${isAI ? "ml-13" : ""}
            [&::-webkit-scrollbar]:h-2
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-[#828e9e]
            [&::-webkit-scrollbar-thumb]:rounded-full
            hover:[&::-webkit-scrollbar-thumb]:bg-[#697889]`}
            >
              {isAI && isLastMessage ? (
                <Typewriter text={chat.content} />
              ) : (
                <ReactMarkdown>{chat.content}</ReactMarkdown>
              )}

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      className="mt-2"
                      onClick={() => {
                        navigator.clipboard.writeText(chat.content);
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
        );
      })}
    </>
  );
};

export default ChatMessage;
