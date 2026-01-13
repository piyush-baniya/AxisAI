import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { IoArrowBack } from "react-icons/io5";
import ChatDetailBox from "./ChatDetailBox";
import ChatBox from "./ChatBox";

const ChatDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { chatHistory } = useSelector((state) => state.chat);

  const promptIndex = chatHistory.findIndex((chat) => chat.id === Number(id));
  const prompt = chatHistory[promptIndex];
  const response = chatHistory[promptIndex + 1];
  console.log("Prompt:", prompt);
  console.log("Response:", response);

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
