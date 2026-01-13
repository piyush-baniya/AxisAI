import React, { useRef } from "react";
import { IoIosSend } from "react-icons/io";
import { IoReloadCircleOutline } from "react-icons/io5";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  setUserPrompt,
  addChatHistory,
  setIsLoading,
} from "@/store/features/chatSlice";
import { generateContent } from "@/api/geminiAPI";

const ChatBox = () => {
  const textareaRef = useRef(null);
  const input = useSelector((state) => state.chat.UserPrompt);
  const loading = useSelector((state) => state.chat.isLoading);
  const dispatch = useDispatch();

  const handleInput = (e) => {
    dispatch(setUserPrompt(e.target.value));
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    dispatch(
      addChatHistory({
        id: Math.floor(Math.random() * 1000000) + Date.now(),
        role: "user",
        content: input,
      })
    );
    dispatch(setUserPrompt(""));
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    dispatch(setIsLoading(true));

    try {
      const res = await generateContent(input);
      dispatch(addChatHistory({ role: "ai", content: res }));
    } catch (error) {
      console.error("Error generating content:", error.name);
      dispatch(
        addChatHistory({
          role: "ai",
          content: `Error Generating Response: ${error}`,
        })
      );
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-[#2a2a2a] w-full rounded-full relative border border-[#3c3e41] shadow-2xl">
      <form onSubmit={handleSubmit} className="flex items-end p-2">
        <textarea
          ref={textareaRef}
          onChange={handleInput}
          onKeyDown={handleEnter}
          value={input}
          disabled={loading}
          rows={1}
          className="bg-transparent flex-1 outline-none resize-none p-3 text-white max-h-40 disabled:opacity-50             [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar]:h-2
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-[#828e9e]
            [&::-webkit-scrollbar-thumb]:rounded-full
            hover:[&::-webkit-scrollbar-thumb]:bg-[#697889]"
          placeholder={loading ? "Axis AI is thinking..." : "Ask Axis AI"}
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="submit"
                disabled={loading || !input.trim()}
                className="bg-[#3c3e41] hover:bg-[#484b4e] rounded-full h-11 w-11 flex items-center justify-center mb-1 mr-1 transition-all"
              >
                {loading ? (
                  <IoReloadCircleOutline className="animate-spin text-xl" />
                ) : (
                  <IoIosSend className="text-xl" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Send</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </form>
    </div>
  );
};

export default ChatBox;
