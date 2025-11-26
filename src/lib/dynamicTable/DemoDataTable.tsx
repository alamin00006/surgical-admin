"use client";

import { useState } from "react";
import { Package, TrendingUp, AlertCircle, Moon, Sun } from "lucide-react";
import DynamicTable from "./DynamicTable";

// Product type definition
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  sales: number;
  lastUpdated: string;
}

// Demo product data
const demoProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    price: 129.99,
    stock: 45,
    status: "In Stock",
    sales: 1245,
    lastUpdated: "2024-01-15",
  },
  {
    id: "2",
    name: "Organic Cotton T-Shirt",
    category: "Clothing",
    price: 29.99,
    stock: 3,
    status: "Low Stock",
    sales: 892,
    lastUpdated: "2024-01-14",
  },
  {
    id: "3",
    name: "Stainless Steel Water Bottle",
    category: "Accessories",
    price: 24.99,
    stock: 0,
    status: "Out of Stock",
    sales: 1567,
    lastUpdated: "2024-01-13",
  },
  {
    id: "4",
    name: "Smart Fitness Watch",
    category: "Electronics",
    price: 199.99,
    stock: 23,
    status: "In Stock",
    sales: 567,
    lastUpdated: "2024-01-12",
  },
  {
    id: "5",
    name: "Ceramic Coffee Mug Set",
    category: "Home & Kitchen",
    price: 34.99,
    stock: 67,
    status: "In Stock",
    sales: 234,
    lastUpdated: "2024-01-11",
  },
];

export default function DemoDataTable() {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  // Table columns configuration
  const productColumns = [
    {
      key: "name" as const,
      header: "Product Name",
      sortable: true,
      render: (value: string, row: Product) => (
        <div className="flex items-center gap-3">
          <div>
            <div className="font-medium text-gray-900 dark:text-white">
              {value}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {row.category}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "price" as const,
      header: "Price",
      sortable: true,
      align: "right" as const,
      render: (value: number) => (
        <div className="text-right">
          <div className="font-semibold text-gray-900 dark:text-white">
            ${value.toFixed(2)}
          </div>
        </div>
      ),
    },
    {
      key: "stock" as const,
      header: "Stock",
      sortable: true,
      align: "center" as const,
      render: (value: number, row: Product) => {
        let color =
          "text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400";
        if (row.status === "Low Stock")
          color =
            "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400";
        if (row.status === "Out of Stock")
          color = "text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400";

        return (
          <div className="flex flex-col items-center">
            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${color}`}
            >
              {row.status}
            </span>
            <span className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {value} units
            </span>
          </div>
        );
      },
    },
    {
      key: "sales" as const,
      header: "Sales",
      sortable: true,
      align: "right" as const,
      render: (value: number) => (
        <div className="flex items-center justify-end gap-2">
          <TrendingUp className="h-4 w-4 text-green-500 dark:text-green-400" />
          <span className="font-semibold text-gray-900 dark:text-white">
            {value.toLocaleString()}
          </span>
        </div>
      ),
    },
    {
      key: "lastUpdated" as const,
      header: "Last Updated",
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-gray-900 dark:text-gray-100">
          {new Date(value).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      ),
    },
  ];

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  const handleRowClick = (product: Product) => {
    console.log("Product clicked:", product);
  };

  return (
    <div
      className={`bg-gray-50 py-8 transition-colors duration-200 dark:bg-gray-900`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Header with Dark Mode Toggle */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Product Inventory
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Manage your product catalog and inventory levels
            </p>
          </div>
        </div>

        {/* Main Product Table */}
        <DynamicTable<Product>
          data={demoProducts}
          columns={productColumns}
          keyField="id"
          onRowClick={handleRowClick}
          searchable={true}
          onSearch={handleSearch}
          selectable={true}
          selectedRows={selectedProducts}
          onSelectionChange={setSelectedProducts}
          emptyState={{
            title: "No products found",
            description:
              "Get started by adding your first product to the inventory.",
            icon: (
              <Package className="h-12 w-12 text-gray-300 dark:text-gray-600" />
            ),
          }}
          className="mb-8"
        />
      </div>
    </div>
  );
}
