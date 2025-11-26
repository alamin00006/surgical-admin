"use client";

import { useState, useMemo } from "react";
import {
  ChevronUp,
  ChevronDown,
  Search,
  AlertCircle,
  MoreVertical,
  SortAsc,
} from "lucide-react";
import { SortConfig, TableProps } from "./table.types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const DynamicTable = <T extends Record<string, any>>({
  data,
  columns,
  keyField,
  isLoading = false,
  searchable = false,
  onSearch,
  selectable = false,
  className = "",
  emptyState,
}: TableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(null);
  const [localSearch, setLocalSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"A-Z" | "Z-A">("A-Z");
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(
    new Set()
  );

  // Handle row selection
  const handleRowSelect = (id: string | number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedRows.size === sortedData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(sortedData.map((row) => row[keyField])));
    }
  };

  // Sort and filter data
  const sortedData = useMemo(() => {
    let sortableData = [...data];

    // Apply column sorting if configured
    if (sortConfig) {
      sortableData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    // Apply A-Z or Z-A sorting if no column sort is active
    if (!sortConfig) {
      if (sortOrder === "A-Z") {
        sortableData.sort((a, b) => {
          const aValue = a[columns[0].key];
          const bValue = b[columns[0].key];
          return aValue?.toString().localeCompare(bValue?.toString());
        });
      } else if (sortOrder === "Z-A") {
        sortableData.sort((a, b) => {
          const aValue = a[columns[0].key];
          const bValue = b[columns[0].key];
          return bValue?.toString().localeCompare(aValue?.toString());
        });
      }
    }

    // Local search filtering
    if (localSearch) {
      sortableData = sortableData.filter((row) =>
        columns.some((column) => {
          const value = row[column.key];
          return value
            ?.toString()
            .toLowerCase()
            .includes(localSearch.toLowerCase());
        })
      );
    }

    return sortableData;
  }, [data, sortConfig, localSearch, columns, sortOrder]);

  // Handle sort
  const handleSort = (key: keyof T) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig?.key === key) {
      direction = sortConfig.direction === "asc" ? "desc" : "asc";
    }
    setSortConfig({ key, direction });
  };

  const handleSearch = (query: string) => {
    setLocalSearch(query);
    onSearch?.(query);
  };

  return (
    <Card className={className}>
      {/* Table Header with Controls */}
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
          <div className="flex flex-1 items-center gap-4">
            {searchable && (
              <div className="relative max-w-md flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search your needed..."
                  value={localSearch}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {selectable && sortedData.length > 0 && (
              <div className="text-sm text-muted-foreground">
                {selectedRows.size} of {sortedData.length} selected
              </div>
            )}

            <Select
              value={sortOrder}
              onValueChange={(value: "A-Z" | "Z-A") => setSortOrder(value)}
            >
              <SelectTrigger className="w-[130px]">
                <SortAsc className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A-Z">A-Z</SelectItem>
                <SelectItem value="Z-A">Z-A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Table Container */}
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {selectable && (
                  <TableHead className="w-12">
                    <Checkbox
                      checked={
                        selectedRows.size === sortedData.length &&
                        sortedData.length > 0
                      }
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                )}
                {columns.map((column) => (
                  <TableHead
                    key={column.key as string}
                    className={
                      column.sortable ? "cursor-pointer hover:bg-muted/50" : ""
                    }
                    onClick={() => column.sortable && handleSort(column.key)}
                    style={{
                      width: column.width,
                      textAlign: column.align || "left",
                    }}
                  >
                    <div
                      className={`flex items-center gap-2 ${
                        column.align === "center"
                          ? "justify-center"
                          : column.align === "right"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <span className="whitespace-nowrap">{column.header}</span>
                      {column.sortable && (
                        <div className="flex flex-col">
                          <ChevronUp
                            className={`-mb-1 h-3 w-3 ${
                              sortConfig?.key === column.key &&
                              sortConfig.direction === "asc"
                                ? "text-primary"
                                : "text-muted-foreground"
                            }`}
                          />
                          <ChevronDown
                            className={`-mt-1 h-3 w-3 ${
                              sortConfig?.key === column.key &&
                              sortConfig.direction === "desc"
                                ? "text-primary"
                                : "text-muted-foreground"
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  </TableHead>
                ))}
                <TableHead className="w-16 text-right">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                // Using shadcn/ui Skeleton components
                Array.from({ length: 6 }).map((_, index) => (
                  <TableRow key={index}>
                    {selectable && (
                      <TableCell>
                        <Skeleton className="h-4 w-4" />
                      </TableCell>
                    )}
                    {columns.map((_, colIndex) => (
                      <TableCell key={colIndex}>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                    <TableCell>
                      <Skeleton className="h-8 w-8 ml-auto" />
                    </TableCell>
                  </TableRow>
                ))
              ) : sortedData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + (selectable ? 1 : 0) + 1}
                    className="h-32 text-center"
                  >
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      {emptyState?.icon || (
                        <AlertCircle className="mb-4 h-12 w-12 text-muted-foreground/50" />
                      )}
                      <h3 className="mb-2 text-lg font-medium">
                        {emptyState?.title || "No products found"}
                      </h3>
                      <p className="max-w-sm text-sm">
                        {emptyState?.description ||
                          "Try adjusting your search or filter to find what you are looking for."}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                sortedData.map((row) => (
                  <TableRow
                    key={row[keyField]}
                    data-state={
                      selectedRows.has(row[keyField]) ? "selected" : undefined
                    }
                  >
                    {selectable && (
                      <TableCell>
                        <Checkbox
                          checked={selectedRows.has(row[keyField])}
                          onCheckedChange={() => handleRowSelect(row[keyField])}
                        />
                      </TableCell>
                    )}
                    {columns.map((column) => (
                      <TableCell
                        key={column.key as string}
                        style={{ textAlign: column.align || "left" }}
                      >
                        {column.render ? (
                          column.render(row[column.key], row)
                        ) : (
                          <span>{row[column.key]}</span>
                        )}
                      </TableCell>
                    ))}
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination & Summary */}
        {sortedData.length > 0 && (
          <div className="border-t p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {sortedData.length} of {data.length} results
              </div>
              {/* Add pagination controls here using shadcn/ui components */}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DynamicTable;
