import React from "react";
import {
  Edit2,
  Trash2,
  PackageOpen,
  Image as ImageIcon,
  Barcode,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Product } from "@/features/product";

interface AdminProductTableProps {
  products: Product[];
  isLoading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const formatCurrency = (value: number | undefined) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value ?? 0);

export const AdminProductTable: React.FC<
  AdminProductTableProps
> = ({
  products,
  isLoading,
  onEdit,
  onDelete,
}) => {

  if (isLoading) {
    return (
      <div className="space-y-2 p-5">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4"
          >
            <Skeleton className="h-10 w-10 rounded-lg" />

            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-24" />
            </div>

            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-16" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
          <PackageOpen className="h-6 w-6 text-gray-400" />
        </div>

        <h3 className="mt-4 font-semibold text-gray-900">
          No products found
        </h3>

        <p className="mt-1 max-w-xs text-sm text-gray-400">
          Try changing your search or add a new product.
        </p>

      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table className="w-full">

        <TableHeader>
          <TableRow className="border-b border-gray-100 bg-gray-50/70">

            <TableHead className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Product
            </TableHead>

            <TableHead className="py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Category
            </TableHead>

            <TableHead className="py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
              SKU
            </TableHead>

            <TableHead className="py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
              Cost
            </TableHead>

            <TableHead className="py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
              Price
            </TableHead>

            <TableHead className="py-4 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
              Stock
            </TableHead>

            <TableHead className="py-4 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
              Min
            </TableHead>

            <TableHead className="py-4 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
              Unit
            </TableHead>

            <TableHead className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
              Actions
            </TableHead>

          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product) => {

            // FIX: optional values
            const openingStock =
              product.opening_count ?? 0;

            const minimumStock =
              product.minimum_stock ?? 0;

            const lowStock =
              openingStock <= minimumStock;

            return (
              <TableRow
                key={product.id}
                className="group border-b border-gray-50 transition hover:bg-gray-50/70"
              >

                {/* Product */}
                <TableCell className="px-6 py-4">

                  <div className="flex items-center gap-3">

                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50">

                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.title}
                          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <ImageIcon className="h-4 w-4 text-gray-400" />
                        </div>
                      )}

                    </div>

                    <div className="min-w-0">
                      <p className="max-w-[200px] truncate font-medium text-gray-900">
                        {product.title}
                      </p>

                      <p className="mt-0.5 text-xs text-gray-400">
                        #{product.id}
                      </p>
                    </div>

                  </div>

                </TableCell>

                {/* Category */}
                <TableCell>

                  {product.category ? (
                    <Badge
                      variant="outline"
                      className="rounded-md border-gray-200 bg-gray-50 font-normal text-gray-600"
                    >
                      {product.category}
                    </Badge>
                  ) : (
                    <span className="text-xs text-gray-400">
                      —
                    </span>
                  )}

                </TableCell>

                {/* SKU */}
                <TableCell>

                  {product.barcode ? (
                    <div className="flex items-center gap-1.5 font-mono text-xs text-gray-500">

                      <Barcode className="h-3.5 w-3.5 text-gray-400" />

                      <span className="max-w-[120px] truncate">
                        {product.barcode}
                      </span>

                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">
                      —
                    </span>
                  )}

                </TableCell>

                {/* Cost */}
                <TableCell className="text-right font-mono text-xs text-gray-500">
                  {formatCurrency(product.cost_price)}
                </TableCell>

                {/* Selling price */}
                <TableCell className="text-right font-mono text-xs font-semibold text-gray-900">
                  {formatCurrency(product.price)}
                </TableCell>

                {/* Opening stock */}
                <TableCell className="text-center">

                  <span
                    className={`font-mono text-xs font-semibold ${
                      lowStock
                        ? "text-amber-600"
                        : "text-gray-800"
                    }`}
                  >
                    {openingStock}
                  </span>

                </TableCell>

                {/* Minimum stock */}
                <TableCell className="text-center font-mono text-xs text-gray-500">
                  {minimumStock}
                </TableCell>

                {/* Unit */}
                <TableCell className="text-center">

                  <Badge
                    variant="outline"
                    className="rounded-md border-gray-200 bg-gray-50 font-mono text-[11px] font-normal uppercase text-gray-600"
                  >
                    {product.unit}
                  </Badge>

                </TableCell>

                {/* Actions */}
                <TableCell className="px-6 text-right">

                  <div className="flex items-center justify-end gap-1">

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(product)}
                      className="h-8 w-8 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-900"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(product)}
                      className="h-8 w-8 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>

                  </div>

                </TableCell>

              </TableRow>
            );
          })}
        </TableBody>

      </Table>
    </div>
  );
};