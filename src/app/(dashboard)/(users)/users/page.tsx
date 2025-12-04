// src/app/dashboard/users/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";
import { UsersTable } from "@/components/users/UsersTable";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          User Management
        </h1>
        <Link href="/dashboard/users/add">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </Link>
      </div>

      <UsersTable />
    </div>
  );
}
