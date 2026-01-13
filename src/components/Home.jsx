import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import ChatBox from "./ChatBox";
import Loading from "./Loading";
import Welcome from "./Welcome";
import ChatMessage from "./ChatMessage";

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
          <ChatMessage chatHistory={chatHistory} />
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
