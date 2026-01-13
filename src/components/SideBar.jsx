import React from "react";
import ChatHistory from "./ChatHistory";
import { IoClose } from "react-icons/io5";

const SideBar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      ></div>
      <div
        className={`bg-[#1a1a1a] h-full flex flex-col border-r border-gray-700
                    fixed top-0 left-0 w-64 z-40
                    transform transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-16.25 flex justify-end items-center p-4">
          <button
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-white cursor-pointer"
          >
            <IoClose size={26} />
          </button>
        </div>
        <div className="grow overflow-y-auto custom-scrollbar absolute top-0 mt-[21.66px]">
          <ChatHistory />
        </div>
      </div>
    </>
  );
};

export default SideBar;
