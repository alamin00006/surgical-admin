"use client";

import { TrendingUp } from "lucide-react";

const chartData = [
  { month: "Jul", revenue: 12000, sales: 240 },
  { month: "Aug", revenue: 19000, sales: 320 },
  { month: "Sep", revenue: 15000, sales: 280 },
  { month: "Oct", revenue: 25000, sales: 400 },
  { month: "Nov", revenue: 22000, sales: 380 },
  { month: "Dec", revenue: 30000, sales: 450 },
];

export function RevenueChart() {
  const maxRevenue = Math.max(...chartData.map((d) => d.revenue));

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <TrendingUp className="h-4 w-4 text-green-600" />
        <span className="text-sm text-green-600">+15.2% from last month</span>
      </div>

      <div className="space-y-3">
        {chartData.map((data, index) => (
          <div key={data.month} className="flex items-center justify-between">
            <span className="text-sm font-medium w-12">{data.month}</span>
            <div className="flex-1 mx-3 sm:mx-4">
              <div className="relative h-6 sm:h-8 bg-muted rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-linear-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${(data.revenue / maxRevenue) * 100}%`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-xs text-foreground font-medium">
                  ${(data.revenue / 1000).toFixed(0)}k
                </div>
              </div>
            </div>
            <span className="text-sm text-muted-foreground w-12 text-right hidden sm:block">
              {data.sales} sales
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
