// src/components/sidebar.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Package,
  Settings,
  ChevronLeft,
  ChevronDown,
  BarChart3,
  FileText,
  Home,
  Inbox,
  Calendar,
  Folder,
  Download,
  Upload,
  MessageSquare,
  Search,
  Bell,
  Shield,
} from "lucide-react";
import { cn } from "@/helpers/utils/twMerge";

// Menu items with dropdown support
const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    badge: "3",
  },
  {
    title: "Inbox",
    url: "/dashboard/inbox",
    icon: Inbox,
    badge: "12+",
  },
  {
    title: "Calendar",
    url: "/dashboard/calendar",
    icon: Calendar,
  },
  {
    title: "Team",
    icon: Users,
    children: [
      {
        title: "Members",
        url: "/dashboard/team/members",
        icon: Users,
      },
      {
        title: "Roles",
        url: "/dashboard/team/roles",
        icon: Shield,
      },
      {
        title: "Permissions",
        url: "/dashboard/team/permissions",
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
        url: "/dashboard/projects",
        icon: Folder,
      },
      {
        title: "Active",
        url: "/dashboard/projects/active",
        icon: BarChart3,
        badge: "5",
      },
      {
        title: "Archived",
        url: "/dashboard/projects/archived",
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
        url: "/dashboard/documents/templates",
        icon: FileText,
      },
      {
        title: "Shared",
        url: "/dashboard/documents/shared",
        icon: Upload,
        badge: "New",
      },
    ],
  },
  {
    title: "Messages",
    url: "/dashboard/messages",
    icon: MessageSquare,
    badge: "5",
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: BarChart3,
  },
];

const secondaryItems = [
  {
    title: "Search",
    url: "/dashboard/search",
    icon: Search,
  },
  {
    title: "Notifications",
    url: "/dashboard/notifications",
    icon: Bell,
    badge: "3",
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

interface MenuItemProps {
  item: (typeof menuItems)[0];
  collapsed: boolean;
  pathname: string;
  level?: number;
}

function MenuItem({ item, collapsed, pathname, level = 0 }: MenuItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = pathname === item.url;
  const isChildActive =
    hasChildren && item.children.some((child) => pathname === child.url);

  const handleClick = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  const content = (
    <div
      className={cn(
        "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group",
        isActive
          ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 border-r-2 border-blue-500"
          : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/50",
        collapsed ? "justify-center" : "justify-between",
        level > 0 && "ml-4"
      )}
    >
      <div className="flex items-center min-w-0">
        <item.icon
          className={cn(
            "h-4 w-4 shrink-0 transition-colors",
            isActive
              ? "text-blue-600 dark:text-blue-400"
              : "text-gray-500 dark:text-gray-400"
          )}
        />
        {!collapsed && (
          <span
            className={cn(
              "ml-3 truncate transition-opacity",
              isActive && "font-semibold"
            )}
          >
            {item.title}
          </span>
        )}
      </div>

      {!collapsed && (
        <div className="flex items-center space-x-2 ml-2">
          {item.badge && (
            <span
              className={cn(
                "px-1.5 py-0.5 text-xs font-medium rounded-full",
                isActive
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                  : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
              )}
            >
              {item.badge}
            </span>
          )}
          {hasChildren && (
            <ChevronDown
              className={cn(
                "h-3 w-3 transition-transform duration-200 text-gray-400",
                isOpen && "rotate-180"
              )}
            />
          )}
        </div>
      )}
    </div>
  );

  return (
    <div>
      {hasChildren ? (
        <div>
          <button onClick={handleClick} className="w-full text-left">
            {content}
          </button>

          {!collapsed && isOpen && (
            <div className="mt-1 space-y-1">
              {item.children.map((child, index) => (
                <Link key={index} href={child.url} className="block">
                  <MenuItem
                    item={child}
                    collapsed={collapsed}
                    pathname={pathname}
                    level={level + 1}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : (
        <Link href={item.url as string}>{content}</Link>
      )}
    </div>
  );
}

// Collapsed menu item for when sidebar is collapsed
function CollapsedMenuItem({
  item,
  pathname,
}: {
  item: (typeof menuItems)[0];
  pathname: string;
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const isActive = pathname === item.url;
  const hasChildren = item.children && item.children.length > 0;

  if (hasChildren) {
    return (
      <div className="relative">
        <button
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className={cn(
            "w-10 h-10 flex items-center justify-center rounded-lg transition-colors relative",
            isActive
              ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
              : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/50"
          )}
        >
          <item.icon className="h-4 w-4" />
          {/* {item.badge && (
            <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs font-medium bg-red-500 text-white rounded-full min-w-[1rem] h-4 flex items-center justify-center">
              {item.badge as any}
            </span>
          )} */}
        </button>

        {showTooltip && (
          <div className="absolute left-full top-0 ml-2 z-50">
            <div className="bg-gray-900 text-white text-sm rounded-lg py-2 px-3 whitespace-nowrap shadow-lg">
              {item.title}
              <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.url as string}
      className={cn(
        "w-10 h-10 flex items-center justify-center rounded-lg transition-colors relative",
        isActive
          ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
          : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/50"
      )}
    >
      <item.icon className="h-4 w-4" />
      {item.badge && (
        <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs font-medium bg-red-500 text-white rounded-full min-w-4 h-4 flex items-center justify-center">
          {item.badge}
        </span>
      )}
    </Link>
  );
}

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 relative z-40",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AK</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                AdminKit
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">v2.1.0</p>
            </div>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "p-1.5 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
            collapsed ? "mx-auto" : ""
          )}
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform text-gray-500",
              collapsed && "rotate-180"
            )}
          />
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {collapsed ? (
          // Collapsed view - icons only with tooltips
          <div className="space-y-2">
            {menuItems.map((item, index) => (
              <CollapsedMenuItem key={index} item={item} pathname={pathname} />
            ))}
          </div>
        ) : (
          // Expanded view - full menu with text
          <div className="space-y-1">
            <div className="px-3 py-2">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Main Menu
              </span>
            </div>
            {menuItems.map((item, index) => (
              <MenuItem
                key={index}
                item={item}
                collapsed={collapsed}
                pathname={pathname}
              />
            ))}
          </div>
        )}
      </nav>

      {/* Secondary Navigation */}
      <div
        className={cn(
          "p-4 border-t border-gray-200 dark:border-gray-800",
          collapsed ? "space-y-2" : "space-y-1"
        )}
      >
        {!collapsed && (
          <div className="px-3 py-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Quick Access
            </span>
          </div>
        )}

        {secondaryItems.map((item, index) =>
          collapsed ? (
            <CollapsedMenuItem key={index} item={item} pathname={pathname} />
          ) : (
            <Link
              key={index}
              href={item.url}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors group",
                pathname === item.url
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                  : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/50"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span className="ml-3 truncate">{item.title}</span>
              {item.badge && (
                <span
                  className={cn(
                    "ml-auto px-1.5 py-0.5 text-xs font-medium rounded-full",
                    pathname === item.url
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          )
        )}
      </div>

      {/* User Profile Section */}
      <div
        className={cn(
          "p-4 border-t border-gray-200 dark:border-gray-800",
          collapsed ? "flex justify-center" : ""
        )}
      >
        {collapsed ? (
          <div className="w-8 h-8 bg-linear-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
            JD
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-linear-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
              JD
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                John Doe
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                Administrator
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
