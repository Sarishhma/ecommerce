import { Minus, Plus } from 'lucide-react'

interface QuantitySelectorProps {
  quantity: number
  onChange: (quantity: number) => void
}

export const QuantitySelector = ({ quantity, onChange }: QuantitySelectorProps) => (
  <div className="flex items-center justify-between border border-sand rounded-xl px-4 py-3 bg-white w-full sm:w-32">
    <button onClick={() => onChange(Math.max(1, quantity - 1))} className="text-stone hover:text-terracotta transition-colors">
      <Minus className="w-4 h-4" />
    </button>
    <span className="font-medium text-charcoal">{quantity}</span>
    <button onClick={() => onChange(quantity + 1)} className="text-stone hover:text-terracotta transition-colors">
      <Plus className="w-4 h-4" />
    </button>
  </div>
)