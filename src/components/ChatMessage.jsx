import React from "react";
import ReactMarkdown from "react-markdown";

const ChatMessage = ({ chatHistory }) => {
  return (
    <>
      {chatHistory.map((chat, index) => (
        <div
          key={index}
          className={`text-white  p-3 rounded-lg max-w-[80%] w-fit wrap-break-word ${
            chat.role === "user"
              ? "bg-gray-600 self-end mt-6 mb-2"
              : "bg-blue-600 self-start mt-6 mb-2"
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

          {/* Scrollable Content Area */}
          <div
            className={`w-full overflow-x-auto min-w-0 
            ${chat.role === "ai" ? "ml-0" : ""} overflow-auto break-all
            [&::-webkit-scrollbar]:h-2
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-[#828e9e]
            [&::-webkit-scrollbar-thumb]:rounded-full
            hover:[&::-webkit-scrollbar-thumb]:bg-[#697889]`}
          >
            <ReactMarkdown>{chat.content}</ReactMarkdown>
          </div>
        </div>
      ))}
    </>
  );
};

export default ChatMessage;
