import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change: number;
  trend: "up" | "down";
  icon: LucideIcon;
}

export function StatsCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
}: StatsCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
            <div
              className={`flex items-center text-xs ${
                trend === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend === "up" ? (
                <TrendingUp className="mr-1 h-3 w-3" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3" />
              )}
              {change}% from last month
            </div>
          </div>
          <div
            className={`
            flex items-center justify-center h-12 w-12 rounded-lg
            ${
              trend === "up"
                ? "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                : "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400"
            }
          `}
          >
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
