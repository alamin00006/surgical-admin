"use client";
import { Bell } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import { SidebarTrigger } from "../ui/sidebar";

const Header = () => {
  return (
    <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 w-full">
      <div className="flex items-center justify-between h-full px-6 ">
        <SidebarTrigger />
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Search bar</h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-accent transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Profile dropdown */}
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
};
export default Header;
