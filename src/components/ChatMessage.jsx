import React from "react";
import ReactMarkdown from "react-markdown";

const ChatMessage = ({ chatHistory }) => {
  return (
    <>
      {chatHistory.map((chat, index) => (
        <div
          key={index}
          className={`text-white  p-3 rounded-lg max-w-[80%] ${
            chat.role === "user"
              ? "bg-gray-600 self-end mt-6 mb-2"
              : "self-start"
          }`}
        >
          {chat.role === "user" ? (
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
            className={`${
              chat.role === "ai" ? "ml-13" : "bg-gray-600"
            }  overflow-auto
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar]:h-2
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-[#828e9e]
            [&::-webkit-scrollbar-thumb]:rounded-full
            hover:[&::-webkit-scrollbar-thumb]:bg-[#697889]
                `}
          >
            <ReactMarkdown>{chat.content}</ReactMarkdown>
          </div>
        </div>
      ))}
    </>
  );
};

export default ChatMessage;
