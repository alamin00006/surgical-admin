export interface SaleData {
  date: string;
  amount: number;
  items: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  sales: number;
  revenue: number;
  rating: number;
  status: "published" | "draft" | "pending";
  lastUpdated: string;
}

export interface StatsCard {
  title: string;
  value: string | number;
  change: number;
  trend: "up" | "down";
  icon: string;
}

export interface RecentActivity {
  id: string;
  type: "sale" | "review" | "update" | "message";
  title: string;
  description: string;
  time: string;
  amount?: number;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  sales: number;
}
