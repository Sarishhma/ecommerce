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

interface AdminProductFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: Product | null
  onClose: () => void
  onSubmit: (payload: CreateProductPayload) => void
  isSubmitting?: boolean
}

export const AdminProductForm = ({
  open,
  onOpenChange,
  product,
  onClose,
  onSubmit,
  isSubmitting = false,
}: AdminProductFormProps) => {
  const isEditing = !!product

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [costPrice, setCostPrice] = useState('')
  const [unit, setUnit] = useState('pcs')
  const [barcode, setBarcode] = useState('')
  const [category, setCategory] = useState<string>('')
  const [openingCount, setOpeningCount] = useState('0')
  const [minimumStock, setMinimumStock] = useState('10')
  const [isTaxable, setIsTaxable] = useState(true)

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    if (product) {
      setTitle(product.title)
      setDescription(product.description || '')
      setPrice(String(product.price))
      setCostPrice(String(product.cost_price))
      setUnit(product.unit || 'pcs')
      setBarcode(product.barcode ?? '')
      setCategory(product.category ? String(product.category) : '')
      setOpeningCount(String(product.opening_count ?? 0))
      setMinimumStock(String(product.minimum_stock ?? 10))
      setIsTaxable(product.is_taxable ?? true)
      setImagePreview(product.image)
      setImageFile(null)
    } else {
      setTitle('')
      setDescription('')
      setPrice('')
      setCostPrice('')
      setUnit('pcs')
      setBarcode('')
      setCategory('')
      setOpeningCount('0')
      setMinimumStock('10')
      setIsTaxable(true)
      setImagePreview(null)
      setImageFile(null)
    }
  }, [product, open])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const payload: CreateProductPayload = {
      title,
      description,
      price: Number(price),
      cost_price: Number(costPrice || 0),
      unit,
      barcode: barcode || null,
      category: category ? Number(category) : null,
      opening_count: Number(openingCount),
      minimum_stock: Number(minimumStock),
      is_taxable: isTaxable,
      image: imageFile || imagePreview,
    }

    onSubmit(payload)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[650px] rounded-2xl border-[#E6D5C3] bg-[#FFFDF9] p-0 shadow-xl">
        <DialogHeader className="p-6 pb-4 border-b border-[#E6D5C3] bg-[#F5EBE0]/40 rounded-t-2xl">
          <DialogTitle className="text-xl font-bold text-[#2A1810]">
            {isEditing ? 'Edit Product' : 'Create New Product'}
          </DialogTitle>
          <DialogDescription className="text-sm text-[#7F6656] mt-1">
            {isEditing
              ? 'Update the details of your inventory item'
              : 'Add a new product to your system catalog'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 text-[#3C2A21]">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-[#7F6656]">
              Product Image
            </Label>
            <div className="flex items-center gap-4 rounded-xl border border-dashed border-[#D8C4B6] bg-[#FAF7F2] p-3">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-[#D8C4B6] bg-white">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt={title || 'Product Preview'}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#F5EBE0]/50">
                    <ImagePlus className="h-6 w-6 text-[#A89280]" />
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="h-9 rounded-lg border-[#D8C4B6] bg-white text-xs text-[#2A1810] file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:bg-[#5C3D2E] file:text-white hover:file:bg-[#422A1D] cursor-pointer"
                />
                <p className="text-xs text-[#7F6656]">
                  Upload a PNG, JPG or WEBP image file.
                </p>
              </div>
            </div>
          </div>

          {/* Title & Category */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="title" className="text-sm font-semibold text-[#2A1810]">
                Product Name <span className="text-rose-600">*</span>
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Product title"
                className="h-10 rounded-lg border-[#D8C4B6] bg-white text-sm focus-visible:ring-2 focus-visible:ring-[#5C3D2E]"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="category" className="text-sm font-semibold text-[#2A1810]">
                Category ID
              </Label>
              <div className="relative">
                <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A89280]" />
                <Input
                  id="category"
                  type="number"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. 1"
                  className="h-10 pl-10 rounded-lg border-[#D8C4B6] bg-white text-sm focus-visible:ring-2 focus-visible:ring-[#5C3D2E]"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="description" className="text-sm font-semibold text-[#2A1810]">
              Description
            </Label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Product description..."
              rows={3}
              className="flex w-full rounded-lg border border-[#D8C4B6] bg-white px-3 py-2 text-sm text-[#2A1810] outline-none placeholder:text-[#A89280] focus-visible:ring-2 focus-visible:ring-[#5C3D2E] transition-all resize-none"
            />
          </div>

          {/* Pricing */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="price" className="text-sm font-semibold text-[#2A1810]">
                Selling Price <span className="text-rose-600">*</span>
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A89280]" />
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  className="h-10 pl-10 rounded-lg border-[#D8C4B6] bg-white text-sm tabular-nums focus-visible:ring-2 focus-visible:ring-[#5C3D2E]"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="costPrice" className="text-sm font-semibold text-[#2A1810]">
                Cost Price
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A89280]" />
                <Input
                  id="costPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={costPrice}
                  onChange={(e) => setCostPrice(e.target.value)}
                  placeholder="0.00"
                  className="h-10 pl-10 rounded-lg border-[#D8C4B6] bg-white text-sm tabular-nums focus-visible:ring-2 focus-visible:ring-[#5C3D2E]"
                />
              </div>
            </div>
          </div>

          {/* Units & Barcode */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="unit" className="text-sm font-semibold text-[#2A1810]">
                Unit
              </Label>
              <Input
                id="unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="pcs, kg, box"
                className="h-10 rounded-lg border-[#D8C4B6] bg-white text-sm focus-visible:ring-2 focus-visible:ring-[#5C3D2E]"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="barcode" className="text-sm font-semibold text-[#2A1810]">
                Barcode
              </Label>
              <div className="relative">
                <BarcodeIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A89280]" />
                <Input
                  id="barcode"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  placeholder="8901234567890"
                  className="h-10 pl-10 rounded-lg border-[#D8C4B6] bg-white text-sm font-mono focus-visible:ring-2 focus-visible:ring-[#5C3D2E]"
                />
              </div>
            </div>
          </div>

          {/* Stock Counts */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="openingCount" className="text-sm font-semibold text-[#2A1810]">
                Opening Stock Count
              </Label>
              <Input
                id="openingCount"
                type="number"
                value={openingCount}
                onChange={(e) => setOpeningCount(e.target.value)}
                className="h-10 rounded-lg border-[#D8C4B6] bg-white text-sm focus-visible:ring-2 focus-visible:ring-[#5C3D2E]"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="minimumStock" className="text-sm font-semibold text-[#2A1810]">
                Minimum Stock Level
              </Label>
              <Input
                id="minimumStock"
                type="number"
                value={minimumStock}
                onChange={(e) => setMinimumStock(e.target.value)}
                className="h-10 rounded-lg border-[#D8C4B6] bg-white text-sm focus-visible:ring-2 focus-visible:ring-[#5C3D2E]"
              />
            </div>
          </div>

          <DialogFooter className="pt-4 border-t border-[#E6D5C3] gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-lg h-10 border-[#D8C4B6] bg-white text-[#5C3D2E] hover:bg-[#F5EBE0]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg h-10 bg-[#5C3D2E] px-6 text-[#FFFDF9] hover:bg-[#422A1D]"
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