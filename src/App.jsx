import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ChatDetail from "./components/ChatDetail";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import { Toaster } from "@/components/ui/sonner";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-[#0e0e0f] text-white overflow-hidden">
      <SideBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="grow flex flex-col h-full relative">
        <Header toggleSidebar={toggleSidebar} />
        <Toaster position="top-right" richColors />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/chat/:id"
            element={<ChatDetail toggleSidebar={toggleSidebar} />}
          />
          <Route path="*" element={<NotFound />} />{" "}
          {/* not found 404 error route */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
