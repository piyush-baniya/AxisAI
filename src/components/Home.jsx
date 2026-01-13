import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import ChatBox from "./ChatBox";
import ReactMarkdown from "react-markdown";
import Loading from "./Loading";
import Welcome from "./Welcome";

const Home = () => {
  const { chatHistory, isLoading } = useSelector((state) => state.chat);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  return (
    <div className="w-full h-full flex flex-col items-center relative">
      <div
        className="grow w-full overflow-y-auto flex flex-col px-4 pb-24 [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-[#3c3e41]
            [&::-webkit-scrollbar-thumb]:rounded-full
            hover:[&::-webkit-scrollbar-thumb]:bg-[#484b4e] mt-12 overflow-x-hidden"
      >
        {chatHistory.length === 0 && !isLoading ? (
          <Welcome />
        ) : (
          chatHistory.map((chat, index) => (
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
          ))
        )}
        <Loading isLoading={isLoading} chatHistory={chatHistory} />
        <div ref={messagesEndRef} />
      </div>
      <div className="absolute bottom-4 w-full flex justify-center">
        <ChatBox />
      </div>
    </div>
  );
};

export default Home;
