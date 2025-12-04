"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Star, Package } from "lucide-react";

import DynamicTable from "@/helpers/utils/DynamicTable";
import { useGetAllProductsQuery } from "@/redux/api/productApi";

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

const BestSelling = () => {
  const { data, isLoading, refetch } = useGetAllProductsQuery(null);
  console.log(data);

  const columns: any[] = [
    {
      key: "name",
      header: "Product",
      width: "200px",
      render: (value: string, row: any) => (
        <div className="flex items-center space-x-2">
          <Package className="h-4 w-4 text-muted-foreground" />
          <span className="truncate max-w-[140px]">{value}</span>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      align: "center" as const,
      render: (value: string) => (
        <Badge variant="outline" className="text-xs">
          {value}
        </Badge>
      ),
    },
    {
      key: "sales",
      header: "Sales",
      align: "right" as const,
      sortable: true,
    },
    {
      key: "revenue",
      header: "Revenue",
      align: "right" as const,
      sortable: true,
      render: (value: number) => `$${value.toLocaleString()}`,
    },
    {
      key: "rating",
      header: "Rating",
      align: "right" as const,
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center justify-end">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
          {value}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      align: "center" as const,
      render: (value: string) => (
        <Badge
          variant={
            value === "published"
              ? "default"
              : value === "draft"
              ? "secondary"
              : "outline"
          }
          className="text-xs"
        >
          {value}
        </Badge>
      ),
    },
  ];

  return (
    <>
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
          <DynamicTable
            data={topProducts}
            keyField="id"
            columns={columns}
            searchable={true}
            selectable={true}
            emptyState={{
              icon: <Package className="h-12 w-12" />,
              title: "No products found",
              description: "Start adding products to see them here",
            }}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default BestSelling;
