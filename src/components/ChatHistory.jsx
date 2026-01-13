import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { IoChatbubbleOutline } from "react-icons/io5";

const ChatHistory = () => {
  const { chatHistory } = useSelector((state) => state.chat);
  const { id } = useParams();

  // Filter only user messages for the history list
  const userPrompts = chatHistory.filter((chat) => chat.role === "user");

  return (
    <div className="flex flex-col px-2">
      <h3 className="text-xs font-semibold text-gray-400 mb-2 px-2 uppercase tracking-wider select-none">
        Recent Chats
      </h3>
      {userPrompts.map((chat) => (
        <Link
          key={chat.id}
          to={`/chat/${chat.id}`}
          className={`w-full flex items-center gap-2 p-2 rounded-lg text-sm mb-1 hover:bg-[#2a2a2a] transition-colors text-gray-300 hover:text-white ${
            Number(id) === chat.id ? "bg-[#2a2a2a] text-white" : ""
          }`}
        >
          <IoChatbubbleOutline className="min-w-4" />
          <span className="truncate">
            {chat.content.slice(0, 25)}
            {chat.content.length > 25 ? "..." : ""}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default ChatHistory;
