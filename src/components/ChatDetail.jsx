import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoArrowBack } from "react-icons/io5";
import ChatDetailBox from "./ChatDetailBox";

const ChatDetail = ({ toggleSidebar }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { chatHistory } = useSelector((state) => state.chat);

  const promptIndex = chatHistory.findIndex((chat) => chat.id === Number(id));
  const prompt = chatHistory[promptIndex];
  const response = chatHistory[promptIndex + 1];

  useEffect(() => {
    toggleSidebar(false);
  }, []);

  if (!prompt) {
    return (
      <div className="p-8 text-center text-gray-400">Prompt not found</div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center relative">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 w-fit transition-colors"
      >
        <IoArrowBack /> Back to Chat
      </button>

      <ChatDetailBox who={prompt} />
      <ChatDetailBox who={response} />
    </div>
  );
};

export default ChatDetail;
