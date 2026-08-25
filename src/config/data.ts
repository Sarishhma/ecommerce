import type {  Collection } from "../types";

/**
 * This file acts as a temporary data source during frontend development.
 */

export const categories = [
  "All",
  "Singing Bowls",
  "Jewelry",
  "Home Décor",
  "Felt",
  "Gifts",
] as const;

export type ProductCategory = (typeof categories)[number];



export const collections: Collection[] = [
  {
    name: "Singing Bowls",
    slug: "singing-bowls",
    count: "24 pieces",
    image: "/images/cc-collection-bowls.png",
    blurb: "Hand-hammered for resonance and ritual.",
  },
  {
    name: "Home Décor",
    slug: "home-decor",
    count: "48 pieces",
    image: "/images/cc-collection-decor.png",
    blurb: "Warm textures for a considered home.",
  },
  {
    name: "Handcrafted Jewelry",
    slug: "jewelry",
    count: "36 pieces",
    image: "/images/cc-collection-jewelry.png",
    blurb: "Silver, copper and stones, set by hand.",
  },
  {
    name: "Wooden Crafts",
    slug: "wooden-crafts",
    count: "19 pieces",
    image: "/images/cc-collection-wooden.png",
    blurb: "Carved from richly grained walnut.",
  },
  {
    name: "Felt Collection",
    slug: "felt",
    count: "42 pieces",
    image: "/images/cc-collection-felt.png",
    blurb: "Soft, felted wool in natural tones.",
  },
  {
    name: "Traditional Clothing",
    slug: "traditional-clothing",
    count: "27 pieces",
    image: "/images/cc-collection-clothing.png",
    blurb: "Handwoven pashmina, wool and scarves.",
  },
];

export const testimonials = [
  {
    id: 1,
    quote:
      "My singing bowl is easily the most beautiful object in our home. You can feel the care in every hammer mark, and the tone is simply magical.",
    author: "Amélie Rousseau",
    location: "Lyon, France",
    rating: 5,
    avatar: "/images/cc-avatar-1.png",
  },
  {
    id: 2,
    quote:
      "I stock Bijeshwori mala Traders pieces in my boutique and customers adore them. Knowing the artisans are paid fairly makes every sale feel meaningful.",
    author: "Daniel Okafor",
    location: "Melbourne, Australia",
    rating: 5,
    avatar: "/images/cc-avatar-2.png",
  },
  {
    id: 3,
    quote:
      "The felt baskets and woven throws transformed our reading nook. Beautifully made, thoughtfully packaged, and they arrived faster than expected.",
    author: "Greta Lindqvist",
    location: "Gothenburg, Sweden",
    rating: 5,
    avatar: "/images/cc-avatar-3.png",
  },
];

export const blogArticles = [
  {
    id: 1,
    title: "The Heritage of Nepalese Handicrafts",
    slug: "heritage-nepalese-handicrafts",
    excerpt:
      "How mountain valleys became home to some of the world's most enduring craft traditions.",
    category: "Heritage",
    readTime: "6 min read",
    image: "/images/cc-blog-1.png",
    date: "2025-11-15",
  },
  {
    id: 2,
    title: "How Handmade Products Preserve Culture",
    slug: "handmade-products-preserve-culture",
    excerpt:
      "Meet the makers keeping ancestral techniques alive—and why it matters more than ever.",
    category: "Community",
    readTime: "5 min read",
    image: "/images/cc-blog-2.png",
    date: "2025-10-28",
  },
  {
    id: 3,
    title: "Decorating Your Home with Artisan Pieces",
    slug: "decorating-with-artisan-pieces",
    excerpt:
      "Simple ways to layer texture, warmth and meaning into the spaces you live in.",
    category: "Living",
    readTime: "4 min read",
    image: "/images/cc-blog-3.png",
    date: "2025-10-10",
  },
];

export const galleryImages = [
  { src: "/images/cc-gallery-1.png", caption: "At Home" },
  { src: "/images/cc-gallery-3.png", caption: "The Himalayas" },
  { src: "/images/cc-gallery-4.png", caption: "Thoughtful Gifting" },
  { src: "/images/cc-blog-3.png", caption: "Lived-in Spaces" },
];

export const marqueeValues = [
  "Handmade by Skilled Artisans",
  "Authentic Nepalese Craftsmanship",
  "Fair Trade Partnerships",
  "Sustainable Materials",
  "Worldwide Shipping",
  "Ethically Sourced",
];

export const stats = [
  { value: "40+", label: "Artisan partners" },
  { value: "12", label: "Craft communities" },
  { value: "60+", label: "Countries shipped" },
  { value: "100%", label: "Handmade goods" },
];

export const wholesalePartners = [
  "Boutiques",
  "Hotels & Resorts",
  "Spas & Studios",
  "Gift Shops",
  "Interior Designers",
  "Concept Stores",
];

export const wholesaleBenefits = [
  "Wholesale pricing with low minimums",
  "Made-to-order and custom collections",
  "Reliable global shipping and lead times",
  "Story cards that share each maker's craft",
];

export const footerColumns = [
  {
    title: "Shop",
    links: [
      { name: "Singing Bowls", href: "/collections/singing-bowls" },
      { name: "Home Décor", href: "/collections/home-decor" },
      { name: "Jewelry", href: "/collections/jewelry" },
      { name: "Felt Collection", href: "/collections/felt" },
      { name: "Gifts", href: "/collections/gifts" },
    ],
  },
  {
    title: "Explore",
    links: [
      { name: "Collections", href: "/shop" },
      { name: "Our Story", href: "/story" },
      { name: "Wholesale", href: "/wholesale" },
      { name: "Journal", href: "/journal" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Contact", href: "#" },
      { name: "FAQs", href: "#" },
      { name: "Shipping", href: "#" },
      { name: "Returns", href: "#" },
      { name: "Privacy Policy", href: "#" },
    ],
  },
];