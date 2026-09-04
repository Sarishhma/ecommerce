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

const formatCurrency = (value: number | undefined) => {
  if (value === undefined || value === null) return "—";

  return `Rs. ${value.toLocaleString("en-NP", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const AdminProductTable: React.FC<AdminProductTableProps> = ({
  products,
  isLoading,
  onEdit,
  onDelete,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-2 p-5 bg-ivory">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-4 rounded-xl border border-border bg-ivory/80 p-4"
          >
            <Skeleton className="h-10 w-10 rounded-lg bg-sand" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-40 bg-sand" />
              <Skeleton className="h-3 w-24 bg-sand" />
            </div>
            <Skeleton className="h-4 w-20 bg-sand" />
            <Skeleton className="h-4 w-20 bg-sand" />
            <Skeleton className="h-8 w-16 bg-sand" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center bg-ivory/80">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sand/60 border border-border shadow-sm">
          <PackageOpen className="h-7 w-7 text-terracotta" />
        </div>
        <h3 className="mt-5 font-sans font-semibold text-lg text-charcoal">
          No products found
        </h3>
        <p className="mt-1.5 max-w-xs text-sm text-charcoal/70">
          Try changing your search or add a new product.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto custom-scrollbar">
      <Table className="w-full min-w-[800px]">
        <TableHeader>
          <TableRow className="border-b border-border bg-sand/40">
            <TableHead className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-charcoal">
              Product
            </TableHead>
            <TableHead className="py-4 text-[11px] font-bold uppercase tracking-wider text-charcoal">
              Category
            </TableHead>
            <TableHead className="py-4 text-[11px] font-bold uppercase tracking-wider text-charcoal">
              SKU
            </TableHead>
            <TableHead className="py-4 text-right text-[11px] font-bold uppercase tracking-wider text-charcoal">
              Cost
            </TableHead>
            <TableHead className="py-4 text-right text-[11px] font-bold uppercase tracking-wider text-charcoal">
              Price
            </TableHead>
            <TableHead className="py-4 text-center text-[11px] font-bold uppercase tracking-wider text-charcoal">
              Unit
            </TableHead>
            <TableHead className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-wider text-charcoal">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-border/60">
          {products.map((product) => {
            const title = product.title?.trim() || "Untitled product";
            const unit = product.unit?.trim();

            return (
              <TableRow
                key={product.id}
                className="group transition-colors hover:bg-sand/30 border-none"
              >
                {/* Product */}
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-border bg-sand/50">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <ImageIcon className="h-4 w-4 text-charcoal/40" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="max-w-[200px] truncate font-semibold text-charcoal group-hover:text-terracotta transition-colors">
                        {title}
                      </p>
                      <p className="mt-0.5 text-[11px] font-medium text-charcoal/60">
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
                      className="rounded-md border-border bg-sand/30 font-semibold text-charcoal"
                    >
                      {product.category}
                    </Badge>
                  ) : (
                    <span className="text-sm font-medium text-charcoal/50">—</span>
                  )}
                </TableCell>

                {/* SKU */}
                <TableCell>
                  {product.barcode ? (
                    <div className="flex items-center gap-1.5 font-mono text-xs font-medium text-charcoal/80">
                      <Barcode className="h-4 w-4 text-charcoal/50" />
                      <span className="max-w-[120px] truncate">
                        {product.barcode}
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm font-medium text-charcoal/50">—</span>
                  )}
                </TableCell>

                {/* Cost */}
                <TableCell className="text-right font-mono text-sm font-medium text-charcoal/80">
                  {formatCurrency(product.cost_price)}
                </TableCell>

                {/* Selling price */}
                <TableCell className="text-right font-mono text-sm font-bold text-charcoal">
                  {formatCurrency(product.price)}
                </TableCell>

                {/* Unit */}
                <TableCell className="text-center">
                  {unit ? (
                    <Badge
                      variant="outline"
                      className="rounded-md border-border bg-sand/30 font-mono text-[11px] font-bold uppercase text-charcoal"
                    >
                      {unit}
                    </Badge>
                  ) : (
                    <span className="text-sm font-medium text-charcoal/50">—</span>
                  )}
                </TableCell>

                {/* Actions */}
                <TableCell className="px-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(product)}
                      className="h-9 w-9 rounded-lg text-charcoal/70 hover:bg-sand hover:text-charcoal shadow-sm border border-transparent hover:border-border"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(product)}
                      className="h-9 w-9 rounded-lg text-charcoal/70 hover:bg-destructive/10 hover:text-destructive shadow-sm border border-transparent hover:border-destructive/20"
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