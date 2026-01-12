import React, { useRef } from "react";
import { IoIosSend } from "react-icons/io";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setPrompt } from "@/store/features/chatSlice";
import { generateContent } from "@/api/geminiAPI";

const ChatBox = () => {
  const textareaRef = useRef(null);
  const input = useSelector((state) => state.chat.prompt);
  const dispatch = useDispatch();

  const handleInput = (e) => {
    dispatch(setPrompt(e.target.value));
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setPrompt(""));
    const response = await generateContent(input);
    console.log(response);
    console.log("Form submitted with input:", input);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      dispatch(setPrompt(""));
      handleSubmit(e);
    }
  };

  return (
    <div className="h-screen w-full bg-[#0e0e0f] flex flex-col items-center justify-end p-4">
      <div className="bg-[#2a2a2a] overflow-hidden w-[95%] rounded-4xl relative pr-1">
        <form onSubmit={(e) => handleSubmit(e)}>
          <textarea
            ref={textareaRef}
            onChange={(e) => handleInput(e)}
            onKeyDown={(e) => handleEnter(e)}
            value={input}
            rows={1}
            className="bg-[#2a2a2a]text-white w-full outline-none resize-none mt-1 p-4 text-white [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-[#3c3e41]
            [&::-webkit-scrollbar-thumb]:rounded-full
            hover:[&::-webkit-scrollbar-thumb]:bg-[#484b4e] rounded-4xl max-h-40"
            placeholder="Ask Axis AI"
          />
          <Button
            type="submit"
            className="bg-[#2a2a2a] rounded-full absolute bottom-2 right-4 h-10 w-10 flex items-center justify-center"
          >
            <IoIosSend />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
