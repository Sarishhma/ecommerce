import type { CartItem } from "@/redux";


export const mockCartItems: CartItem[] = [
  {
    id: 'cart-item-1',
    productId: 'prod-rudraksha-5mukhi',
    slug: '5-mukhi-rudraksha-mala',
    name: '5 Mukhi Rudraksha Mala',
    image: '/images/products/5-mukhi-mala.jpg',
    price: 1850,
    compareAtPrice: 2200,
    quantity: 1,
    maxQuantity: 8,
    variant: { id: 'var-108-8mm', label: '108 Beads / 8mm' },
  },
  {
    id: 'cart-item-2',
    productId: 'prod-amethyst-bracelet',
    slug: 'amethyst-crystal-bracelet',
    name: 'Amethyst Crystal Bracelet',
    image: '/images/products/amethyst-bracelet.jpg',
    price: 950,
    quantity: 2,
    maxQuantity: 15,
  },
  {
    id: 'cart-item-3',
    productId: 'prod-clear-quartz-pendant',
    slug: 'clear-quartz-pendant',
    name: 'Clear Quartz Pendant',
    image: '/images/products/clear-quartz-pendant.jpg',
    price: 1200,
    quantity: 1,
    maxQuantity: 5,
  },
];