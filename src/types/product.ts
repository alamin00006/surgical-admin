export type ProductStatus = "published" | "draft" | "archived";

export interface Product {
  id: string;
  name: string;
  category: string;
  sales: number;
  revenue: number;
  rating: number;
  status: ProductStatus;
  lastUpdated: string;
}

export const statusVariantMap: Record<
  ProductStatus,
  "default" | "secondary" | "outline"
> = {
  published: "default",
  draft: "secondary",
  archived: "outline",
};
