import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DollarSign } from "lucide-react";

const recentSales = [
  {
    id: "1",
    customer: "John Doe",
    email: "john@example.com",
    product: "React Admin Dashboard",
    amount: 59,
    avatar: "/avatars/01.png",
  },
  {
    id: "2",
    customer: "Sarah Wilson",
    email: "sarah@example.com",
    product: "Vue E-commerce Template",
    amount: 49,
    avatar: "/avatars/02.png",
  },
  {
    id: "3",
    customer: "Mike Johnson",
    email: "mike@example.com",
    product: "Angular CRM System",
    amount: 79,
    avatar: "/avatars/03.png",
  },
  {
    id: "4",
    customer: "Emily Davis",
    email: "emily@example.com",
    product: "Next.js Portfolio Theme",
    amount: 39,
    avatar: "/avatars/04.png",
  },
];

export function RecentSales() {
  return (
    <div className="space-y-4">
      {recentSales.map((sale) => (
        <div key={sale.id} className="flex items-center space-x-3">
          <Avatar className="h-8 w-8 sm:h-9 sm:w-9 shrink-0">
            <AvatarImage src={sale.avatar} alt={sale.customer} />
            <AvatarFallback className="text-xs">
              {sale.customer
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0 space-y-0.5">
            <p className="text-sm font-medium leading-none truncate">
              {sale.customer}
            </p>
            <p className="text-sm text-muted-foreground truncate hidden sm:block">
              {sale.email}
            </p>
            <p className="text-xs text-muted-foreground truncate sm:hidden">
              {sale.product}
            </p>
          </div>
          <div className="flex items-center text-green-600 dark:text-green-400 font-medium text-sm">
            <DollarSign className="h-3 w-3 mr-1" />
            {sale.amount}
          </div>
        </div>
      ))}
    </div>
  );
}
