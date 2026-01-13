import React from "react";
import { CgMenu } from "react-icons/cg";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="p-4 border-b border-gray-700 flex items-center sticky top-0 bg-[#0e0e0f] z-20 h-16.25">
      <button onClick={toggleSidebar} className="text-white cursor-pointer">
        <CgMenu size={24} />
      </button>
      <img src="/axisAI.png" alt="logo" className="h-8 w-8 ml-2 select-none" />
      <h1 className="text-lg font-bold ml-4 select-none">Axis AI</h1>
    </header>
  );
};

export default Header;
