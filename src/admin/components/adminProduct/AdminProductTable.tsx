import {
  MoreHorizontal,
  Pencil,
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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Product } from '@/features/product'

interface AdminProductTableProps {
  products: Product[]
  isLoading: boolean
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
}

const currency = (value: number) =>
  new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value)

export const AdminProductTable = ({
  products,
  isLoading,
  onEdit,
  onDelete,
}: AdminProductTableProps) => {
  if (isLoading) {
    return (
      <div className="w-full space-y-2 p-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-4 rounded-lg border border-border/60 bg-card p-3.5"
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
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted text-muted-foreground border border-border/50">
          <PackageOpen className="h-7 w-7" />
        </div>
        <h3 className="mt-4 text-base font-semibold text-foreground">
          No products found
        </h3>
        <p className="mt-1 text-sm text-muted-foreground max-w-xs">
          Try adjusting your search criteria or add a new product to the catalog.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full overflow-hidden rounded-lg border border-border/60 bg-card shadow-sm">
      <div className="overflow-x-auto">
        <Table className="w-full text-left text-sm">
          <TableHeader>
            <TableRow className="border-b border-border/60 bg-muted/40 hover:bg-muted/40">
              <TableHead className="py-3 pl-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Product
              </TableHead>
              <TableHead className="py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Category
              </TableHead>
              <TableHead className="py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Barcode / SKU
              </TableHead>
              <TableHead className="py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Cost Price
              </TableHead>
              <TableHead className="py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Selling Price
              </TableHead>
              <TableHead className="py-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Opening
              </TableHead>
              <TableHead className="py-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Min Stock
              </TableHead>
              <TableHead className="py-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Unit
              </TableHead>
              <TableHead className="py-3 pr-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.map((product) => {
              const lowStock = product.opening_count <= product.minimum_stock
              const barcodeDisplay = product.barcode || product.sku

              return (
                <TableRow
                  key={product.id}
                  className="group border-b border-border/40 transition-colors hover:bg-muted/30 cursor-pointer"
                  onClick={() => onEdit(product)}
                >
                  {/* Image & Product Name */}
                  <TableCell className="pl-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md border border-border/60 bg-muted/50">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.title}
                            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <ImageIcon className="h-4 w-4 text-muted-foreground/50" />
                          </div>
                        )}
                      </div>
                      <span className="font-semibold text-foreground truncate max-w-[180px] group-hover:text-primary transition-colors">
                        {product.title}
                      </span>
                    </div>
                  </TableCell>

                  {/* Category */}
                  <TableCell className="py-3">
                    {product.category ? (
                      <Badge
                        variant="secondary"
                        className="bg-secondary text-secondary-foreground font-medium border-0 hover:bg-secondary/80"
                      >
                        {product.category}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground/50">—</span>
                    )}
                  </TableCell>

                  {/* Barcode / SKU */}
                  <TableCell className="py-3">
                    {barcodeDisplay ? (
                      <div className="flex items-center gap-1.5 text-muted-foreground font-mono text-xs">
                        <Barcode className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0" />
                        <span className="truncate max-w-[120px]">{barcodeDisplay}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground/40 font-mono text-xs">—</span>
                    )}
                  </TableCell>

                  {/* Cost Price */}
                  <TableCell className="py-3 text-right font-medium text-muted-foreground tabular-nums">
                    {currency(product.cost_price)}
                  </TableCell>

                  {/* Selling Price */}
                  <TableCell className="py-3 text-right font-semibold text-foreground tabular-nums">
                    {currency(product.price)}
                  </TableCell>

                  {/* Opening Stock */}
                  <TableCell className="py-3 text-center">
                    <span
                      className={`font-semibold tabular-nums ${
                        lowStock
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-foreground'
                      }`}
                    >
                      {product.opening_count}
                    </span>
                  </TableCell>

                  {/* Minimum Stock */}
                  <TableCell className="py-3 text-center text-muted-foreground tabular-nums font-medium">
                    {product.minimum_stock}
                  </TableCell>

                  {/* Unit */}
                  <TableCell className="py-3 text-center">
                    <span className="inline-block rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground uppercase font-mono border border-border/40">
                      {product.unit}
                    </span>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="pr-4 py-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end" className="w-36">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            onEdit(product)
                          }}
                          className="cursor-pointer"
                        >
                          <Pencil className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                          Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                          onClick={(e) => {
                            e.stopPropagation()
                            onDelete(product)
                          }}
                        >
                          <Trash2 className="mr-2 h-3.5 w-3.5" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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