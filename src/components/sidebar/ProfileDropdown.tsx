import {
  ChevronDown,
  CreditCard,
  HelpCircle,
  LogOut,
  User,
} from "lucide-react";
import { useState } from "react";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const profileMenuItems = [
    {
      title: "Profile",
      icon: User,
      url: "#",
    },
    {
      title: "Billing",
      icon: CreditCard,
      url: "#",
    },
    {
      title: "Help & Support",
      icon: HelpCircle,
      url: "#",
    },
    {
      title: "Sign out",
      icon: LogOut,
      url: "#",
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
          <span className="text-white text-sm font-medium">JD</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 rounded-lg border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg z-50 animate-in fade-in-50 slide-in-from-top-5 duration-200">
          {/* Profile header */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <span className="text-white text-sm font-medium">JD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">John Doe</p>
                <p className="text-xs text-muted-foreground truncate">
                  john.doe@example.com
                </p>
              </div>
            </div>
          </div>

          {/* Menu items */}
          <div className="p-2">
            {profileMenuItems.map((item, index) => (
              <a
                key={item.title}
                href={item.url}
                className={`flex items-center gap-3 w-full p-2 rounded-md text-sm transition-colors hover:bg-accent ${
                  index === profileMenuItems.length - 1
                    ? "text-red-600 hover:text-red-700"
                    : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.title}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
