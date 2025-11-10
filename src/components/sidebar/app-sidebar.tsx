"use client";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  ChevronDown,
  ChevronRight,
  Users,
  FileText,
  BarChart3,
  MessageSquare,
  Folder,
  Download,
  Upload,
  Bell,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useState } from "react";

// Menu items with dropdown support
const menuItems = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
    badge: "3",
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
    badge: "12+",
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Team",
    icon: Users,
    children: [
      {
        title: "Members",
        url: "#",
        icon: Users,
      },
      {
        title: "Roles",
        url: "#",
        icon: Settings,
      },
      {
        title: "Permissions",
        url: "#",
        icon: FileText,
      },
    ],
  },
  {
    title: "Projects",
    icon: Folder,
    children: [
      {
        title: "All Projects",
        url: "#",
        icon: Folder,
      },
      {
        title: "Active",
        url: "#",
        icon: BarChart3,
        badge: "5",
      },
      {
        title: "Archived",
        url: "#",
        icon: Download,
      },
    ],
  },
  {
    title: "Documents",
    icon: FileText,
    children: [
      {
        title: "Templates",
        url: "#",
        icon: FileText,
      },
      {
        title: "Shared",
        url: "#",
        icon: Upload,
        badge: "New",
      },
    ],
  },
  {
    title: "Messages",
    url: "#",
    icon: MessageSquare,
    badge: "5",
  },
  {
    title: "Analytics",
    url: "#",
    icon: BarChart3,
  },
];

const secondaryItems = [
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Notifications",
    url: "#",
    icon: Bell,
    badge: "3",
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

interface DropdownMenuProps {
  item: {
    title: string;
    icon: any;
    children: any[];
  };
  isOpen: boolean;
  onToggle: () => void;
}

function DropdownMenu({ item, isOpen, onToggle }: DropdownMenuProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={onToggle}
        className="cursor-pointer transition-all duration-200 hover:bg-accent/50"
      >
        <item.icon className="w-4 h-4" />
        <span className="flex-1">{item.title}</span>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 transition-transform" />
        ) : (
          <ChevronRight className="w-4 h-4 transition-transform" />
        )}
      </SidebarMenuButton>
      {isOpen && (
        <div className="ml-4 mt-1 space-y-1 overflow-hidden animate-in fade-in-50 slide-in-from-top-2 duration-200">
          {item.children.map((child) => (
            <SidebarMenuButton
              key={child.title}
              asChild
              className="pl-8 text-sm hover:bg-accent/30 transition-colors"
            >
              <a href={child.url}>
                <child.icon className="w-4 h-4" />
                <span>{child.title}</span>
                {child.badge && (
                  <span className="ml-auto bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                    {child.badge}
                  </span>
                )}
              </a>
            </SidebarMenuButton>
          ))}
        </div>
      )}
    </SidebarMenuItem>
  );
}

export function AppSidebar() {
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(
    {}
  );

  const toggleDropdown = (title: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <Sidebar className="border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SidebarContent>
        {/* User Profile Section */}
        <SidebarGroup className="border-b pb-4">
          <SidebarGroupContent>
            <div className="flex items-center gap-3 p-2 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <span className="text-white text-sm font-medium">JD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">John Doe</p>
                <p className="text-xs text-muted-foreground truncate">Admin</p>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                if (item.children) {
                  return (
                    <DropdownMenu
                      key={item.title}
                      item={item}
                      isOpen={!!openDropdowns[item.title]}
                      onToggle={() => toggleDropdown(item.title)}
                    />
                  );
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className="transition-all duration-200 hover:bg-accent/50 group"
                    >
                      <a href={item.url}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                        {item.badge && (
                          <span className="ml-auto bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full group-hover:bg-blue-200 transition-colors">
                            {item.badge}
                          </span>
                        )}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Secondary Actions */}
        <SidebarGroup>
          <SidebarGroupLabel>Quick Access</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="transition-all duration-200 hover:bg-accent/50 group"
                  >
                    <a href={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <span className="ml-auto bg-orange-100 text-orange-800 text-xs px-2 py-0.5 rounded-full group-hover:bg-orange-200 transition-colors">
                          {item.badge}
                        </span>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Status Section */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <div className="p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-medium text-green-800">
                  System Status
                </span>
              </div>
              <p className="text-xs text-green-700">All systems operational</p>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
