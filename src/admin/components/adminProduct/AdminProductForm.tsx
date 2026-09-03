import { useEffect, useState } from 'react'
import { ImagePlus, DollarSign, Tag, Barcode as BarcodeIcon, Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { Product, CreateProductPayload } from '@/features/product/types/product.types'
import type { Category } from '@/features/category/types/category.types'

interface AdminProductFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: Product | null
  onClose: () => void
  onSubmit: (payload: CreateProductPayload, id?: string | number) => void
  isSubmitting?: boolean,
  categories: Category[]
}

export const AdminProductForm = ({
  open,
  onOpenChange,
  product,
  onClose,
  onSubmit,
  isSubmitting = false,
  categories
  
}: AdminProductFormProps) => {
  const isEditing = !!product

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [costPrice, setCostPrice] = useState('')
  const [unit, setUnit] = useState('pcs')
  const [barcode, setBarcode] = useState('')
  const [category, setCategory] = useState<string>('')
  // const [openingCount, setOpeningCount] = useState('0')
  // const [minimumStock, setMinimumStock] = useState('10')
  const [isTaxable, setIsTaxable] = useState(true)

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    if (product) {
      setTitle(product.title)
      setDescription(product.description || '')
      setPrice(String(product.price))
      setCostPrice(String(product.cost_price ?? ''))
      setUnit(product.unit || 'pcs')
      setBarcode(product.barcode ?? '')
      setCategory(product.category_id!==null && product.category_id !=undefined ? String(product.category_id) : '')
      // setOpeningCount(String(product.opening_count ?? 0))
      // setMinimumStock(String(product.minimum_stock ?? 10))
      setIsTaxable(product.is_taxable ?? true)
      setImagePreview(product.image || null)
      setImageFile(null)
    } else {
      setTitle('')
      setDescription('')
      setPrice('')
      setCostPrice('')
      setUnit('pcs')
      setBarcode('')
      setCategory('')
      // setOpeningCount('0')
      // setMinimumStock('10')
      setIsTaxable(true)
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview)
      }
      setImagePreview(null)
      setImageFile(null)
    }
  }, [product, open])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview)
      }
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (isSubmitting) return

    const payload: CreateProductPayload = {
      title: title.trim(),
      description: description.trim() || undefined,
      price: parseFloat(price) || 0,
      cost_price: costPrice ? parseFloat(costPrice) : 0,
      unit: unit.trim() || 'pcs',
      barcode: barcode.trim() || null,
      category: category ? Number(category) : null,
      // opening_count: parseInt(openingCount, 10) || 0,
      // minimum_stock: parseInt(minimumStock, 10) || 0,
      is_taxable: isTaxable,
      image: imageFile || (isEditing ? product?.image : null),
    }

    onSubmit(payload, product?.id)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[650px] rounded-2xl border border-border bg-ivory p-0 shadow-xl">
        <DialogHeader className="p-6 pb-4 border-b border-sand bg-sand/20 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-terracotta/10 flex items-center justify-center">
              <span className="text-terracotta text-base font-bold">P</span>
            </div>
            <div>
              <DialogTitle className="font-display text-xl text-charcoal">
                {isEditing ? 'Edit Product' : 'Create New Product'}
              </DialogTitle>
              <DialogDescription className="text-xs text-stone mt-0.5">
                {isEditing
                  ? 'Update the details of your inventory item'
                  : 'Add a new product to your system catalog'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 text-charcoal">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-stone">
              Product Image
            </Label>
            <div className="flex items-center gap-4 rounded-xl border border-dashed border-border bg-sand/20 p-3.5">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-border bg-white/80">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt={title || 'Product Preview'}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-sand/30">
                    <ImagePlus className="h-6 w-6 text-stone" />
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="h-9 rounded-xl border-border bg-white/70 text-xs text-charcoal file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-sand file:text-charcoal hover:file:bg-sand/80 cursor-pointer"
                />
                <p className="text-xs text-stone">
                  Upload a PNG, JPG or WEBP image file.
                </p>
              </div>
            </div>
          </div>

          {/* Title & Category */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="title" className="text-xs font-semibold uppercase tracking-wider text-stone">
                Product Name <span className="text-terracotta">*</span>
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Product title"
                className="h-10 rounded-xl border-border bg-white/70 text-sm text-charcoal placeholder:text-stone focus-visible:ring-2 focus-visible:ring-terracotta/20 focus-visible:border-terracotta"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="category" className="text-xs font-semibold uppercase tracking-wider text-stone">
                Categories
              </Label>
              <div className="relative">
                <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone" />
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 rounded-xl border border-border bg-white/70 text-sm text-charcoal focus-visible:ring-2 focus-visible:ring-terracotta/20 focus-visible:border-terracotta outline-none transition-all"
                >
                  <option value="">Select Category</option>
                  {
                    categories.map((cat)=>(
                      <option key={cat.id} value={cat.id}>
                        {cat.title}
                      </option>
                    ))
                  }
                </select>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="description" className="text-xs font-semibold uppercase tracking-wider text-stone">
              Description
            </Label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Product description..."
              rows={3}
              className="flex w-full rounded-xl border border-border bg-white/70 px-3.5 py-2.5 text-sm text-charcoal outline-none placeholder:text-stone focus-visible:ring-2 focus-visible:ring-terracotta/20 focus-visible:border-terracotta transition-all resize-none"
            />
          </div>

          {/* Pricing */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="price" className="text-xs font-semibold uppercase tracking-wider text-stone">
                Selling Price <span className="text-terracotta">*</span>
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone" />
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  className="h-10 pl-10 rounded-xl border-border bg-white/70 text-sm tabular-nums text-charcoal focus-visible:ring-2 focus-visible:ring-terracotta/20 focus-visible:border-terracotta"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="costPrice" className="text-xs font-semibold uppercase tracking-wider text-stone">
                Cost Price
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone" />
                <Input
                  id="costPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={costPrice}
                  onChange={(e) => setCostPrice(e.target.value)}
                  placeholder="0.00"
                  className="h-10 pl-10 rounded-xl border-border bg-white/70 text-sm tabular-nums text-charcoal focus-visible:ring-2 focus-visible:ring-terracotta/20 focus-visible:border-terracotta"
                />
              </div>
            </div>
          </div>

          {/* Units & Barcode */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="unit" className="text-xs font-semibold uppercase tracking-wider text-stone">
                Unit
              </Label>
              <Input
                id="unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="pcs, kg, box"
                className="h-10 rounded-xl border-border bg-white/70 text-sm text-charcoal focus-visible:ring-2 focus-visible:ring-terracotta/20 focus-visible:border-terracotta"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="barcode" className="text-xs font-semibold uppercase tracking-wider text-stone">
                Barcode
              </Label>
              <div className="relative">
                <BarcodeIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone" />
                <Input
                  id="barcode"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  placeholder="8901234567890"
                  className="h-10 pl-10 rounded-xl border-border bg-white/70 text-sm font-mono text-charcoal focus-visible:ring-2 focus-visible:ring-terracotta/20 focus-visible:border-terracotta"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="pt-4 border-t border-sand/60 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl h-10 border-border bg-white text-charcoal hover:bg-sand/40"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl h-10 bg-terracotta px-6 text-ivory hover:bg-copper transition-colors shadow-sm"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : isEditing ? (
                'Save Changes'
              ) : (
                'Create Product'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}