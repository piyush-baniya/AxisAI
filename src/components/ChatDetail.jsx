import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoArrowBack } from "react-icons/io5";
import ChatDetailBox from "./ChatDetailBox";
import { Button } from "./ui/button";
import NotFound from "./NotFound";

const ChatDetail = ({ toggleSidebar }) => {
  const { id } = useParams();
  const { chatHistory } = useSelector((state) => state.chat);

  const promptIndex = chatHistory.findIndex((chat) => chat.id === Number(id));
  const prompt = chatHistory[promptIndex];
  const response = chatHistory[promptIndex + 1];

  useEffect(() => {
    toggleSidebar(false);
  }, []);

  if (!prompt) {
    return <NotFound />;
  }

  return (
    <div
      className="w-full h-full flex flex-col overflow-auto items-center relative           [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-[#3c3e41]
          [&::-webkit-scrollbar-thumb]:rounded-full"
    >
      <Link to="/">
        <Button variant="secondary" className="mt-3">
          <IoArrowBack /> Back to Chat
        </Button>
      </Link>
      <ChatDetailBox who={prompt} />
      <ChatDetailBox who={response} />
    </div>
  );
};

export default ChatDetail;
