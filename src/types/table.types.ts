export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyField: keyof T;
  onRowClick?: (row: T) => void;
  isLoading?: boolean;
  searchable?: boolean;
  onSearch?: (query: string) => void;
  selectable?: boolean;
  selectedRows?: T[];
  onSelectionChange?: (selected: T[]) => void;
  className?: string;
  emptyState?: {
    title: string;
    description?: string;
    icon?: React.ReactNode;
  };
}

export interface SortConfig<T> {
  key: keyof T;
  direction: "asc" | "desc";
}

export interface Column<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
  align?: "left" | "center" | "right";
}
