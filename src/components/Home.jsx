import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import ChatBox from "./ChatBox";
import Loading from "./Loading";
import Welcome from "./Welcome";
import ChatMessage from "./ChatMessage";

const Home = () => {
  const { chatHistory, isLoading } = useSelector((state) => state.chat);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isLoading]);

  return (
    // Force the main container to take the full height of the viewport
    <div className="w-full h-screen flex flex-col bg-[#0e0e0f] relative">
      {/* 1. Scrollable Chat Area */}
      <div
        className="flex-1 w-full overflow-y-auto px-4 pt-12 pb-4 
          [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-[#3c3e41]
          [&::-webkit-scrollbar-thumb]:rounded-full"
      >
        <div className="max-w-4xl mx-auto w-full flex flex-col">
          {chatHistory.length === 0 && !isLoading ? (
            <Welcome />
          ) : (
            <ChatMessage chatHistory={chatHistory} />
          )}
          <Loading isLoading={isLoading} chatHistory={chatHistory} />
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 2. Fixed Input Area */}
      <div className="w-full bg-[#0e0e0f] p-4 flex justify-center">
        <div className="max-w-4xl w-full">
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default Home;
