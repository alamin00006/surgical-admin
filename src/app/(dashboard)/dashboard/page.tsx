"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Download,
  Eye,
  MoreHorizontal,
  Star,
  ShoppingCart,
  MessageSquare,
  Edit,
  Moon,
  Sun,
  DollarSign,
  Package,
  Users,
  Activity,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useTheme } from "@/components/theme/theme-provider";
import { StatsCard } from "@/components/dashboard/statsCard/StatsCards";
import { RevenueChart } from "@/components/dashboard/revenue/RevenueChart";
import { RecentSales } from "@/components/dashboard/sales/RecentSalce";

// Mock data
const statsData = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: 12.5,
    trend: "up" as const,
    icon: DollarSign,
  },
  {
    title: "Total Sales",
    value: "1,234",
    change: 8.1,
    trend: "up" as const,
    icon: ShoppingCart,
  },
  {
    title: "Active Products",
    value: "42",
    change: -2.1,
    trend: "down" as const,
    icon: Package,
  },
  {
    title: "Customer Rating",
    value: "4.8/5",
    change: 0.5,
    trend: "up" as const,
    icon: Star,
  },
];

const topProducts = [
  {
    id: "1",
    name: "React Admin Dashboard",
    category: "React",
    sales: 234,
    revenue: 15230,
    rating: 4.9,
    status: "published" as const,
    lastUpdated: "2024-01-15",
  },
  {
    id: "2",
    name: "Vue E-commerce Template",
    category: "Vue",
    sales: 189,
    revenue: 12890,
    rating: 4.7,
    status: "published" as const,
    lastUpdated: "2024-01-14",
  },
  {
    id: "3",
    name: "Angular CRM System",
    category: "Angular",
    sales: 156,
    revenue: 9870,
    rating: 4.8,
    status: "published" as const,
    lastUpdated: "2024-01-13",
  },
  {
    id: "4",
    name: "Next.js Portfolio Theme",
    category: "Next.js",
    sales: 98,
    revenue: 6540,
    rating: 4.6,
    status: "draft" as const,
    lastUpdated: "2024-01-12",
  },
];

const recentActivities = [
  {
    id: "1",
    type: "sale" as const,
    title: "New Sale",
    description: "React Admin Dashboard sold to John Doe",
    time: "2 minutes ago",
    amount: 59,
    icon: ShoppingCart,
  },
  {
    id: "2",
    type: "review" as const,
    title: "New Review",
    description: "Vue E-commerce Template received a 5-star review",
    time: "1 hour ago",
    icon: Star,
  },
  {
    id: "3",
    type: "update" as const,
    title: "Product Updated",
    description: "Angular CRM System has been updated to v2.1",
    time: "3 hours ago",
    icon: Edit,
  },
  {
    id: "4",
    type: "message" as const,
    title: "Support Message",
    description: "New support message from Sarah Wilson",
    time: "5 hours ago",
    icon: MessageSquare,
  },
];

export default function DashboardPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6 lg:p-8 pt-4 md:pt-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Dashboard Overview
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Welcome back! Here's what's happening with your products today.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-9 w-9 p-0"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          <Button variant="outline" size="sm" className="h-9">
            <Download className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
          <Button size="sm" className="h-9">
            <Eye className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Analytics</span>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts and Recent Sales */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        {/* Revenue Chart */}
        <Card className="lg:col-span-4">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription className="mt-1">
                  Monthly revenue and sales performance
                </CardDescription>
              </div>
              <Activity className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="pl-2">
            <RevenueChart />
          </CardContent>
        </Card>

        {/* Recent Sales */}
        <Card className="lg:col-span-3">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription className="mt-1">
                  You made 26 sales this month
                </CardDescription>
              </div>
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>

      {/* Products and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        {/* Top Products */}
        <Card className="lg:col-span-4">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Top Performing Products</CardTitle>
                <CardDescription className="mt-1">
                  Your best-selling products and metrics
                </CardDescription>
              </div>
              <Package className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Product</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Category
                    </TableHead>
                    <TableHead className="text-right">Sales</TableHead>
                    <TableHead className="hidden md:table-cell text-right">
                      Revenue
                    </TableHead>
                    <TableHead className="text-right">Rating</TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Status
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <span className="truncate max-w-[140px]">
                            {product.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="outline" className="text-xs">
                          {product.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {product.sales}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-right">
                        ${product.revenue.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                          {product.rating}
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <Badge
                          variant={
                            product.status === "published"
                              ? "default"
                              : product.status === "draft"
                              ? "secondary"
                              : "outline"
                          }
                          className="text-xs"
                        >
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-3">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription className="mt-1">
                  Latest updates and notifications
                </CardDescription>
              </div>
              <Activity className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div
                      className={`
                      flex items-center justify-center h-8 w-8 rounded-full
                      ${
                        activity.type === "sale"
                          ? "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                          : activity.type === "review"
                          ? "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400"
                          : activity.type === "update"
                          ? "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                          : "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                      }`}
                    >
                      <activity.icon className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <p className="text-sm font-medium leading-none truncate">
                      {activity.title}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                  {activity.amount && (
                    <div className="text-sm font-medium text-green-600 dark:text-green-400 whitespace-nowrap">
                      +${activity.amount}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
