import React, { useRef } from "react";
import { IoIosSend } from "react-icons/io";
import { IoReloadCircleOutline } from "react-icons/io5";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
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
    dispatch(setIsLoading(true));

    try {
      const res = await generateContent(input);
      dispatch(addChatHistory({ role: "ai", content: res }));
    } catch (error) {
      console.error("Error generating content:", error);
      dispatch(
        addChatHistory({
          role: "ai",
          content: "Sorry, something went wrong.",
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
    <div className="bg-[#2a2a2a] overflow-hidden w-[95%] rounded-4xl relative pr-1">
      <form onSubmit={(e) => handleSubmit(e)}>
        <textarea
          ref={textareaRef}
          onChange={(e) => handleInput(e)}
          onKeyDown={(e) => handleEnter(e)}
          value={input}
          disabled={loading}
          rows={1}
          className="bg-[#2a2a2a] w-full outline-none resize-none mt-1 p-4 text-white [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-[#3c3e41]
            [&::-webkit-scrollbar-thumb]:rounded-full
            hover:[&::-webkit-scrollbar-thumb]:bg-[#484b4e] rounded-4xl max-h-40 disabled:opacity-50"
          placeholder={loading ? "Axis AI is thinking..." : "Ask Axis AI"}
        />
        <Button
          type="submit"
          disabled={loading || !input.trim()}
          className="bg-[#2a2a2a] rounded-full absolute bottom-2 right-4 h-10 w-10 flex items-center justify-center disabled:opacity-50"
        >
          {loading ? (
            <IoReloadCircleOutline className="animate-spin" />
          ) : (
            <IoIosSend />
          )}
        </Button>
      </form>
    </div>
  );
};

export default ChatBox;
