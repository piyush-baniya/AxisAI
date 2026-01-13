import React from "react";

const Loading = ({ isLoading, chatHistory }) => {
  return (
    <>
      {isLoading && chatHistory.length > 0 && (
        <div className="text-white mb-4 p-4 rounded-lg max-w-[80%]  self-start w-full sm:w-125">
          <div className="flex items-center gap-3 mb-2">
            <img
              src="/axisAI.png"
              alt="logo"
              className="h-10 w-10 rounded-full"
            />
            <p className="font-bold mb-1">Axis AI</p>
          </div>
          <div className="w-full space-y-2 mt-2 ml-13">
            <div className="h-3 bg-linear-to-r from-blue-700 via-cyan-300 to-cyan-500 rounded w-3/4 animate-pulse"></div>
            <div className="h-3 bg-linear-to-r from-blue-700 via-cyan-300 to-cyan-500 rounded w-1/2 animate-pulse"></div>
            <div className="h-3 bg-linear-to-r from-blue-700 via-cyan-300 to-cyan-500 rounded w-5/6 animate-pulse"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Loading;
