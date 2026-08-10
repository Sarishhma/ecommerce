import React from 'react'
import {
  Edit2,
  Trash2,
  PackageOpen,
  Image as ImageIcon,
  Barcode,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import type { Product } from '@/features/product'

interface AdminProductTableProps {
  products: Product[]
  isLoading: boolean
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value)

export const AdminProductTable: React.FC<AdminProductTableProps> = ({
  products,
  isLoading,
  onEdit,
  onDelete,
}) => {
  if (isLoading) {
    return (
      <div className="w-full space-y-2 p-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-3.5"
          >
            <Skeleton className="h-10 w-10 rounded-md" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 text-slate-500 border border-slate-200">
          <PackageOpen className="h-7 w-7 text-slate-400" />
        </div>
        <h3 className="mt-4 text-base font-semibold text-slate-800">
          No products found
        </h3>
        <p className="mt-1 text-sm text-slate-500 max-w-xs">
          Try adjusting your search criteria or add a new product to the catalog.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <Table className="w-full text-left text-sm">
          <TableHeader>
            <TableRow className="bg-slate-50 border-b border-slate-200">
              <TableHead className="py-3 pl-4 text-xs font-semibold uppercase tracking-wider text-slate-700">
                Product
              </TableHead>
              <TableHead className="py-3 text-xs font-semibold uppercase tracking-wider text-slate-700">
                Category
              </TableHead>
              <TableHead className="py-3 text-xs font-semibold uppercase tracking-wider text-slate-700">
                Barcode / SKU
              </TableHead>
              <TableHead className="py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-700">
                Cost Price
              </TableHead>
              <TableHead className="py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-700">
                Selling Price
              </TableHead>
              <TableHead className="py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-700">
                Opening
              </TableHead>
              <TableHead className="py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-700">
                Min Stock
              </TableHead>
              <TableHead className="py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-700">
                Unit
              </TableHead>
              <TableHead className="py-3 pr-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-700 w-24">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.map((product) => {
              const lowStock = product.opening_count <= product.minimum_stock

              return (
                <TableRow
                  key={product.id}
                  className="group border-b border-slate-100 transition-colors hover:bg-slate-50/80 cursor-pointer"
                  onClick={() => onEdit(product)}
                >
                  {/* Image & Product Name */}
                  <TableCell className="pl-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-50">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.title}
                            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <ImageIcon className="h-4 w-4 text-slate-400" />
                          </div>
                        )}
                      </div>
                      <span className="font-medium text-slate-900 truncate max-w-[180px] group-hover:text-blue-600 transition-colors">
                        {product.title}
                      </span>
                    </div>
                  </TableCell>

                  {/* Category */}
                  <TableCell className="py-3">
                    {product.category ? (
                      <Badge
                        variant="outline"
                        className="font-normal text-xs bg-slate-100/70 text-slate-700 border-slate-200"
                      >
                        {product.category}
                      </Badge>
                    ) : (
                      <span className="text-slate-400 font-mono text-xs">—</span>
                    )}
                  </TableCell>

                  {/* Barcode / SKU */}
                  <TableCell className="py-3">
                    {product.barcode ? (
                      <div className="flex items-center gap-1.5 text-slate-600 font-mono text-xs">
                        <Barcode className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span className="truncate max-w-[120px]">{product.barcode}</span>
                      </div>
                    ) : (
                      <span className="text-slate-400 font-mono text-xs">—</span>
                    )}
                  </TableCell>

                  {/* Cost Price */}
                  <TableCell className="py-3 text-right font-mono text-xs text-slate-500 tabular-nums">
                    {formatCurrency(product.cost_price)}
                  </TableCell>

                  {/* Selling Price */}
                  <TableCell className="py-3 text-right font-mono text-xs font-semibold text-slate-900 tabular-nums">
                    {formatCurrency(product.price)}
                  </TableCell>

                  {/* Opening Stock */}
                  <TableCell className="py-3 text-center">
                    <span
                      className={`font-mono text-xs font-semibold tabular-nums ${
                        lowStock ? 'text-amber-600' : 'text-slate-800'
                      }`}
                    >
                      {product.opening_count}
                    </span>
                  </TableCell>

                  {/* Minimum Stock */}
                  <TableCell className="py-3 text-center font-mono text-xs text-slate-500 tabular-nums">
                    {product.minimum_stock}
                  </TableCell>

                  {/* Unit */}
                  <TableCell className="py-3 text-center">
                    <Badge
                      variant="outline"
                      className="font-mono text-[11px] font-normal uppercase bg-slate-50 text-slate-600 border-slate-200"
                    >
                      {product.unit}
                    </Badge>
                  </TableCell>

                  {/* Direct Inline Action Buttons */}
                  <TableCell className="pr-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          onEdit(product)
                        }}
                        className="h-8 w-8 text-slate-500 hover:text-blue-600 hover:bg-slate-100"
                      >
                        <Edit2 className="h-4 w-4" />
                        <span className="sr-only">Edit product</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          onDelete(product)
                        }}
                        className="h-8 w-8 text-slate-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete product</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}